import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProtectedBranchSchema } from './schemas';

// --------------- Schema ---------------

/** 查询保护分支详情 - 请求参数 */
export const DescribeProtectedBranchInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 查询保护分支详情 - 响应数据 */
export const DescribeProtectedBranchOutputSchema = z.object({
  /** 保护分支详情 */
  ProtectedBranch: ProtectedBranchSchema.describe('保护分支详情'),
});

// --------------- Types ---------------

export type DescribeProtectedBranchInput = z.infer<typeof DescribeProtectedBranchInputSchema>;
export type DescribeProtectedBranchOutput = z.infer<typeof DescribeProtectedBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProtectedBranchInput, DescribeProtectedBranchOutput> = {
  action: 'DescribeProtectedBranch',
  method: 'POST',
  inputSchema: DescribeProtectedBranchInputSchema,
  outputSchema: DescribeProtectedBranchOutputSchema,
};

// --------------- Action ---------------

/** 查询保护分支详情 */
export const DescribeProtectedBranch = (
  client: CodingClient,
  params: DescribeProtectedBranchInput,
): Promise<Either<SdkError, DescribeProtectedBranchOutput>> =>
  executeAction(client.config, spec, params);
