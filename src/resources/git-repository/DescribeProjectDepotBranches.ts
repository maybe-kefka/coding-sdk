import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotDetailDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取仓库分支列表 - 请求参数 */
export const DescribeProjectDepotBranchesInputSchema = z.object({
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 仓库 Id */
  Id: z.number().int().describe('仓库 Id'),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
});

/** 获取仓库分支列表 - 响应数据 */
export const DescribeProjectDepotBranchesOutputSchema = z.object({
  /** 返回 Branch 数据结构 */
  Data: DepotDetailDataSchema.describe('返回 Branch 数据结构'),
});

// --------------- Types ---------------

export type DescribeProjectDepotBranchesInput = z.infer<
  typeof DescribeProjectDepotBranchesInputSchema
>;
export type DescribeProjectDepotBranchesOutput = z.infer<
  typeof DescribeProjectDepotBranchesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectDepotBranchesInput, DescribeProjectDepotBranchesOutput> = {
  action: 'DescribeProjectDepotBranches',
  method: 'POST',
  inputSchema: DescribeProjectDepotBranchesInputSchema,
  outputSchema: DescribeProjectDepotBranchesOutputSchema,
};

// --------------- Action ---------------

/** 获取仓库分支列表 */
export const DescribeProjectDepotBranches = (
  client: CodingClient,
  params: DescribeProjectDepotBranchesInput,
): Promise<Either<SdkError, DescribeProjectDepotBranchesOutput>> =>
  executeAction(client.config, spec, params);
