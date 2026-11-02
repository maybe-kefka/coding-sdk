import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BranchProtectionSchema } from './schemas';

// --------------- Schema ---------------

/** 查询单个保护分支规则 - 请求参数 */
export const DescribeBranchProtectionInputSchema = z.object({
  /** 保护分支规则id */
  BranchProtectionId: z.number().int().describe('保护分支规则id'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 查询单个保护分支规则 - 响应数据 */
export const DescribeBranchProtectionOutputSchema = z.object({
  /** 保护分支规则详情 */
  BranchProtection: BranchProtectionSchema.describe('保护分支规则详情'),
});

// --------------- Types ---------------

export type DescribeBranchProtectionInput = z.infer<typeof DescribeBranchProtectionInputSchema>;
export type DescribeBranchProtectionOutput = z.infer<typeof DescribeBranchProtectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeBranchProtectionInput, DescribeBranchProtectionOutput> = {
  action: 'DescribeBranchProtection',
  method: 'POST',
  inputSchema: DescribeBranchProtectionInputSchema,
  outputSchema: DescribeBranchProtectionOutputSchema,
};

// --------------- Action ---------------

/** 查询单个保护分支规则 */
export const DescribeBranchProtection = (
  client: CodingClient,
  params: DescribeBranchProtectionInput,
): Promise<Either<SdkError, DescribeBranchProtectionOutput>> =>
  executeAction(client.config, spec, params);
