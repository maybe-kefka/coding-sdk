import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BranchProtectionSchema } from './schemas';

// --------------- Schema ---------------

/** 修改保护分支规则相关信息 - 请求参数 */
export const ModifyBranchProtectionInputSchema = z.object({
  /** 保护分支规则 */
  BranchProtection: BranchProtectionSchema.describe('保护分支规则'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
});

/** 修改保护分支规则相关信息 - 响应数据 */
export const ModifyBranchProtectionOutputSchema = z.object({
  /** 保护分支规则信息 */
  BranchProtection: BranchProtectionSchema.describe('保护分支规则信息'),
});

// --------------- Types ---------------

export type ModifyBranchProtectionInput = z.infer<typeof ModifyBranchProtectionInputSchema>;
export type ModifyBranchProtectionOutput = z.infer<typeof ModifyBranchProtectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyBranchProtectionInput, ModifyBranchProtectionOutput> = {
  action: 'ModifyBranchProtection',
  method: 'POST',
  inputSchema: ModifyBranchProtectionInputSchema,
  outputSchema: ModifyBranchProtectionOutputSchema,
};

// --------------- Action ---------------

/** 修改保护分支规则相关信息 */
export const ModifyBranchProtection = (
  client: CodingClient,
  params: ModifyBranchProtectionInput,
): Promise<Either<SdkError, ModifyBranchProtectionOutput>> =>
  executeAction(client.config, spec, params);
