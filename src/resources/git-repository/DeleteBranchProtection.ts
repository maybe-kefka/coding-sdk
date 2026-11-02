import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除保护分支规则 - 请求参数 */
export const DeleteBranchProtectionInputSchema = z.object({
  /** 保护分支 Id */
  BranchProtectionId: z.number().int().describe('保护分支 Id'),
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
});

/** 删除保护分支规则 - 响应数据 */
export const DeleteBranchProtectionOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteBranchProtectionInput = z.infer<typeof DeleteBranchProtectionInputSchema>;
export type DeleteBranchProtectionOutput = z.infer<typeof DeleteBranchProtectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteBranchProtectionInput, DeleteBranchProtectionOutput> = {
  action: 'DeleteBranchProtection',
  method: 'POST',
  inputSchema: DeleteBranchProtectionInputSchema,
  outputSchema: DeleteBranchProtectionOutputSchema,
};

// --------------- Action ---------------

/** 删除保护分支规则 */
export const DeleteBranchProtection = (
  client: CodingClient,
  params: DeleteBranchProtectionInput,
): Promise<Either<SdkError, DeleteBranchProtectionOutput>> =>
  executeAction(client.config, spec, params);
