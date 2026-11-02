import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactRepositoryFileListDataSchema, SpecifiedArtifactSchema } from './schemas';

// --------------- Schema ---------------

/** 制品仓库下可下载的文件列表获取 - 请求参数 */
export const DescribeArtifactRepositoryFileListInputSchema = z.object({
  /** 指定的制品 */
  Artifacts: z.array(SpecifiedArtifactSchema).optional().describe('指定的制品'),
  /** 翻页符。每次 list 操作会返回 ContinuationToken，在下一次 list 传入该值，即可接续上次 list 内容进行 list，最后一页该字段为空 */
  ContinuationToken: z
    .string()
    .optional()
    .describe(
      '翻页符。每次 list 操作会返回 ContinuationToken，在下一次 list 传入该值，即可接续上次 list 内容进行 list，最后一页该字段为空',
    ),
  /** 每页展示条数 */
  PageSize: z.number().int().optional().describe('每页展示条数'),
  /** 项目名称 */
  Project: z.string().describe('项目名称'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品仓库下可下载的文件列表获取 - 响应数据 */
export const DescribeArtifactRepositoryFileListOutputSchema = z.object({
  /** 返回数据体 */
  Data: ArtifactRepositoryFileListDataSchema.describe('返回数据体'),
});

// --------------- Types ---------------

export type DescribeArtifactRepositoryFileListInput = z.infer<
  typeof DescribeArtifactRepositoryFileListInputSchema
>;
export type DescribeArtifactRepositoryFileListOutput = z.infer<
  typeof DescribeArtifactRepositoryFileListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeArtifactRepositoryFileListInput,
  DescribeArtifactRepositoryFileListOutput
> = {
  action: 'DescribeArtifactRepositoryFileList',
  method: 'POST',
  inputSchema: DescribeArtifactRepositoryFileListInputSchema,
  outputSchema: DescribeArtifactRepositoryFileListOutputSchema,
};

// --------------- Action ---------------

/** 制品仓库下可下载的文件列表获取 */
export const DescribeArtifactRepositoryFileList = (
  client: CodingClient,
  params: DescribeArtifactRepositoryFileListInput,
): Promise<Either<SdkError, DescribeArtifactRepositoryFileListOutput>> =>
  executeAction(client.config, spec, params);
