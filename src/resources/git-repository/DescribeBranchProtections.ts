import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BranchProtectionSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库保护分支规则集合 - 请求参数 */
export const DescribeBranchProtectionsInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 查询仓库保护分支规则集合 - 响应数据 */
export const DescribeBranchProtectionsOutputSchema = z.object({
  /** 保护分支规则列表 */
  BranchProtections: z.array(BranchProtectionSchema).describe('保护分支规则列表'),
});

// --------------- Types ---------------

export type DescribeBranchProtectionsInput = z.infer<typeof DescribeBranchProtectionsInputSchema>;
export type DescribeBranchProtectionsOutput = z.infer<typeof DescribeBranchProtectionsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeBranchProtectionsInput, DescribeBranchProtectionsOutput> = {
  action: 'DescribeBranchProtections',
  method: 'POST',
  inputSchema: DescribeBranchProtectionsInputSchema,
  outputSchema: DescribeBranchProtectionsOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库保护分支规则集合 */
export const DescribeBranchProtections = (
  client: CodingClient,
  params: DescribeBranchProtectionsInput,
): Promise<Either<SdkError, DescribeBranchProtectionsOutput>> =>
  executeAction(client.config, spec, params);
