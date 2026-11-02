import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 新增保护分支规则管理员 - 请求参数 */
export const CreateBranchProtectionMemberInputSchema = z.object({
  /** 是否允许直接推送 */
  AllowPush: z.boolean().describe('是否允许直接推送'),
  /** 保护分支规则id */
  BranchProtectionId: z.number().int().describe('保护分支规则id'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 用户globalkey */
  UserGlobalKey: z.string().describe('用户globalkey'),
});

/** 新增保护分支规则管理员 - 响应数据 */
export const CreateBranchProtectionMemberOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateBranchProtectionMemberInput = z.infer<
  typeof CreateBranchProtectionMemberInputSchema
>;
export type CreateBranchProtectionMemberOutput = z.infer<
  typeof CreateBranchProtectionMemberOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateBranchProtectionMemberInput, CreateBranchProtectionMemberOutput> = {
  action: 'CreateBranchProtectionMember',
  method: 'POST',
  inputSchema: CreateBranchProtectionMemberInputSchema,
  outputSchema: CreateBranchProtectionMemberOutputSchema,
};

// --------------- Action ---------------

/** 新增保护分支规则管理员 */
export const CreateBranchProtectionMember = (
  client: CodingClient,
  params: CreateBranchProtectionMemberInput,
): Promise<Either<SdkError, CreateBranchProtectionMemberOutput>> =>
  executeAction(client.config, spec, params);
