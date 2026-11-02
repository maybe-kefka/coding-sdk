import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactRepositoryPageBeanSchema } from './schemas';

// --------------- Schema ---------------

/** 制品仓库列表查询 - 请求参数 */
export const DescribeArtifactRepositoryListInputSchema = z.object({
  /** 页码，默认：1 */
  PageNumber: z.number().int().optional().describe('页码，默认：1'),
  /** 每页展示数量，默认：10 */
  PageSize: z.number().int().optional().describe('每页展示数量，默认：10'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库类型:1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm */
  Type: z
    .number()
    .int()
    .optional()
    .describe(
      '仓库类型:1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm',
    ),
});

/** 制品仓库列表查询 - 响应数据 */
export const DescribeArtifactRepositoryListOutputSchema = z.object({
  /** 返回数据 */
  Data: ArtifactRepositoryPageBeanSchema.describe('返回数据'),
});

// --------------- Types ---------------

export type DescribeArtifactRepositoryListInput = z.infer<
  typeof DescribeArtifactRepositoryListInputSchema
>;
export type DescribeArtifactRepositoryListOutput = z.infer<
  typeof DescribeArtifactRepositoryListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactRepositoryListInput, DescribeArtifactRepositoryListOutput> =
  {
    action: 'DescribeArtifactRepositoryList',
    method: 'POST',
    inputSchema: DescribeArtifactRepositoryListInputSchema,
    outputSchema: DescribeArtifactRepositoryListOutputSchema,
  };

// --------------- Action ---------------

/** 查询当前团队指定项目的制品仓库列表 */
export const DescribeArtifactRepositoryList = (
  client: CodingClient,
  params: DescribeArtifactRepositoryListInput,
): Promise<Either<SdkError, DescribeArtifactRepositoryListOutput>> =>
  executeAction(client.config, spec, params);
