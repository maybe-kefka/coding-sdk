import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProtectedBranchSchema } from './schemas';

// --------------- Schema ---------------

/** 查询保护分支 - 请求参数 */
export const DescribeProtectedBranchesInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
});

/** 查询保护分支 - 响应数据 */
export const DescribeProtectedBranchesOutputSchema = z.object({
  /** 保护分支列表 */
  ProtectedBranches: z.array(ProtectedBranchSchema).describe('保护分支列表'),
});

// --------------- Types ---------------

export type DescribeProtectedBranchesInput = z.infer<typeof DescribeProtectedBranchesInputSchema>;
export type DescribeProtectedBranchesOutput = z.infer<typeof DescribeProtectedBranchesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProtectedBranchesInput, DescribeProtectedBranchesOutput> = {
  action: 'DescribeProtectedBranches',
  method: 'POST',
  inputSchema: DescribeProtectedBranchesInputSchema,
  outputSchema: DescribeProtectedBranchesOutputSchema,
};

// --------------- Action ---------------

/** 查询保护分支 */
export const DescribeProtectedBranches = (
  client: CodingClient,
  params: DescribeProtectedBranchesInput,
): Promise<Either<SdkError, DescribeProtectedBranchesOutput>> =>
  executeAction(client.config, spec, params);
