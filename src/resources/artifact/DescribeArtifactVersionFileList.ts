import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactVersionFileBeanSchema, MavenSchema } from './schemas';

// --------------- Schema ---------------

/** 指定制品版本可下载的文件列表获取 - 请求参数 */
export const DescribeArtifactVersionFileListInputSchema = z.object({
  /** maven 制品类型参数 */
  Maven: MavenSchema.optional().describe('maven 制品类型参数'),
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 指定制品版本可下载的文件列表获取 - 响应数据 */
export const DescribeArtifactVersionFileListOutputSchema = z.object({
  /** 文件列表 */
  InstanceSet: z.array(ArtifactVersionFileBeanSchema).describe('文件列表'),
});

// --------------- Types ---------------

export type DescribeArtifactVersionFileListInput = z.infer<
  typeof DescribeArtifactVersionFileListInputSchema
>;
export type DescribeArtifactVersionFileListOutput = z.infer<
  typeof DescribeArtifactVersionFileListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeArtifactVersionFileListInput,
  DescribeArtifactVersionFileListOutput
> = {
  action: 'DescribeArtifactVersionFileList',
  method: 'POST',
  inputSchema: DescribeArtifactVersionFileListInputSchema,
  outputSchema: DescribeArtifactVersionFileListOutputSchema,
};

// --------------- Action ---------------

/** 制品版本可下载的文件列表获取（暂仅支持类型为: 1-Generic;3-maven;4-npm;5-pypi 制品） */
export const DescribeArtifactVersionFileList = (
  client: CodingClient,
  params: DescribeArtifactVersionFileListInput,
): Promise<Either<SdkError, DescribeArtifactVersionFileListOutput>> =>
  executeAction(client.config, spec, params);
