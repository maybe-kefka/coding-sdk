import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactVersionPageBeanSchema } from './schemas';

// --------------- Schema ---------------

/** 制品版本列表查询 - 请求参数 */
export const DescribeArtifactVersionListInputSchema = z.object({
  /** 包名称 */
  Package: z.string().describe('包名称'),
  /** 页码，默认：1 */
  PageNumber: z.number().int().optional().describe('页码，默认：1'),
  /** 每页展示数量，默认：10 */
  PageSize: z.number().int().optional().describe('每页展示数量，默认：10'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名称 */
  Repository: z.string().describe('仓库名称'),
});

/** 制品版本列表查询 - 响应数据 */
export const DescribeArtifactVersionListOutputSchema = z.object({
  /** 返回数据 */
  Data: ArtifactVersionPageBeanSchema.describe('返回数据'),
});

// --------------- Types ---------------

export type DescribeArtifactVersionListInput = z.infer<
  typeof DescribeArtifactVersionListInputSchema
>;
export type DescribeArtifactVersionListOutput = z.infer<
  typeof DescribeArtifactVersionListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactVersionListInput, DescribeArtifactVersionListOutput> = {
  action: 'DescribeArtifactVersionList',
  method: 'POST',
  inputSchema: DescribeArtifactVersionListInputSchema,
  outputSchema: DescribeArtifactVersionListOutputSchema,
};

// --------------- Action ---------------

/** 制品版本列表查询 */
export const DescribeArtifactVersionList = (
  client: CodingClient,
  params: DescribeArtifactVersionListInput,
): Promise<Either<SdkError, DescribeArtifactVersionListOutput>> =>
  executeAction(client.config, spec, params);
