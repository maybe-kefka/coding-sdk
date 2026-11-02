import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除保护分支规则管理员 - 请求参数 */
export const DeleteBranchProtectionMemberInputSchema = z.object({
  /** 保护分支规则id */
  BranchProtectionId: z.number().int().describe('保护分支规则id'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 用户globalkey */
  UserGlobalKey: z.string().describe('用户globalkey'),
});

/** 删除保护分支规则管理员 - 响应数据 */
export const DeleteBranchProtectionMemberOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteBranchProtectionMemberInput = z.infer<
  typeof DeleteBranchProtectionMemberInputSchema
>;
export type DeleteBranchProtectionMemberOutput = z.infer<
  typeof DeleteBranchProtectionMemberOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteBranchProtectionMemberInput, DeleteBranchProtectionMemberOutput> = {
  action: 'DeleteBranchProtectionMember',
  method: 'POST',
  inputSchema: DeleteBranchProtectionMemberInputSchema,
  outputSchema: DeleteBranchProtectionMemberOutputSchema,
};

// --------------- Action ---------------

/** 新增保护分支规则管理员 */
export const DeleteBranchProtectionMember = (
  client: CodingClient,
  params: DeleteBranchProtectionMemberInput,
): Promise<Either<SdkError, DeleteBranchProtectionMemberOutput>> =>
  executeAction(client.config, spec, params);
