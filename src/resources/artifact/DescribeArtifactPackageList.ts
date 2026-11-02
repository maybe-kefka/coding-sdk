import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactPackagePageBeanSchema } from './schemas';

// --------------- Schema ---------------

/** 制品包（镜像）列表查询 - 请求参数 */
export const DescribeArtifactPackageListInputSchema = z.object({
  /** 包名前缀 */
  PackagePrefix: z.string().optional().describe('包名前缀'),
  /** 页码，默认：1 */
  PageNumber: z.number().int().optional().describe('页码，默认：1'),
  /** 每页展示数量，默认：10 */
  PageSize: z.number().int().optional().describe('每页展示数量，默认：10'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名称 */
  Repository: z.string().describe('仓库名称'),
});

/** 制品包（镜像）列表查询 - 响应数据 */
export const DescribeArtifactPackageListOutputSchema = z.object({
  /** 返回数据 */
  Data: ArtifactPackagePageBeanSchema.describe('返回数据'),
});

// --------------- Types ---------------

export type DescribeArtifactPackageListInput = z.infer<
  typeof DescribeArtifactPackageListInputSchema
>;
export type DescribeArtifactPackageListOutput = z.infer<
  typeof DescribeArtifactPackageListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactPackageListInput, DescribeArtifactPackageListOutput> = {
  action: 'DescribeArtifactPackageList',
  method: 'POST',
  inputSchema: DescribeArtifactPackageListInputSchema,
  outputSchema: DescribeArtifactPackageListOutputSchema,
};

// --------------- Action ---------------

/** 制品包（镜像）列表查询 */
export const DescribeArtifactPackageList = (
  client: CodingClient,
  params: DescribeArtifactPackageListInput,
): Promise<Either<SdkError, DescribeArtifactPackageListOutput>> =>
  executeAction(client.config, spec, params);
