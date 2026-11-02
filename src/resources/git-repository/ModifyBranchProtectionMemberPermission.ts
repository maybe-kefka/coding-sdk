import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 更改保护分支管理员权限 - 请求参数 */
export const ModifyBranchProtectionMemberPermissionInputSchema = z.object({
  /** 是否直接推送 */
  AllowPush: z.boolean().describe('是否直接推送'),
  /** 分支规则名称 */
  BranchRuleName: z.string().describe('分支规则名称'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 用户GlobalKey */
  UserGlobalKey: z.string().describe('用户GlobalKey'),
});

/** 更改保护分支管理员权限 - 响应数据 */
export const ModifyBranchProtectionMemberPermissionOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyBranchProtectionMemberPermissionInput = z.infer<
  typeof ModifyBranchProtectionMemberPermissionInputSchema
>;
export type ModifyBranchProtectionMemberPermissionOutput = z.infer<
  typeof ModifyBranchProtectionMemberPermissionOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  ModifyBranchProtectionMemberPermissionInput,
  ModifyBranchProtectionMemberPermissionOutput
> = {
  action: 'ModifyBranchProtectionMemberPermission',
  method: 'POST',
  inputSchema: ModifyBranchProtectionMemberPermissionInputSchema,
  outputSchema: ModifyBranchProtectionMemberPermissionOutputSchema,
};

// --------------- Action ---------------

/** 更改保护分支管理员权限 */
export const ModifyBranchProtectionMemberPermission = (
  client: CodingClient,
  params: ModifyBranchProtectionMemberPermissionInput,
): Promise<Either<SdkError, ModifyBranchProtectionMemberPermissionOutput>> =>
  executeAction(client.config, spec, params);
