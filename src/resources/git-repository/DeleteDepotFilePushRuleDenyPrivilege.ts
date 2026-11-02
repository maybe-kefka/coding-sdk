import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFilePushRuleSchema } from './schemas';

// --------------- Schema ---------------

/** 删除 git 仓库特权者文件推送权限 - 请求参数 */
export const DeleteDepotFilePushRuleDenyPrivilegeInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 文件推送规则 ID */
  FilePushRuleId: z.number().int().describe('文件推送规则 ID'),
  /** 特权者是角色（IsUser和IsRole有且只能有一个为true） */
  IsRole: z.boolean().describe('特权者是角色（IsUser和IsRole有且只能有一个为true）'),
  /** 特权者是用户（IsUser和IsRole有且只能有一个为true） */
  IsUser: z.boolean().describe('特权者是用户（IsUser和IsRole有且只能有一个为true）'),
  /** 角色 ID */
  RoleId: z.number().int().optional().describe('角色 ID'),
  /** 用户全局 key */
  UserGlobalKey: z.string().describe('用户全局 key'),
});

/** 删除 git 仓库特权者文件推送权限 - 响应数据 */
export const DeleteDepotFilePushRuleDenyPrivilegeOutputSchema = z.object({
  /** git 仓库文件推送规则列表 */
  GitFilePushRule: z.array(GitFilePushRuleSchema).nullable().describe('git 仓库文件推送规则列表'),
});

// --------------- Types ---------------

export type DeleteDepotFilePushRuleDenyPrivilegeInput = z.infer<
  typeof DeleteDepotFilePushRuleDenyPrivilegeInputSchema
>;
export type DeleteDepotFilePushRuleDenyPrivilegeOutput = z.infer<
  typeof DeleteDepotFilePushRuleDenyPrivilegeOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DeleteDepotFilePushRuleDenyPrivilegeInput,
  DeleteDepotFilePushRuleDenyPrivilegeOutput
> = {
  action: 'DeleteDepotFilePushRuleDenyPrivilege',
  method: 'POST',
  inputSchema: DeleteDepotFilePushRuleDenyPrivilegeInputSchema,
  outputSchema: DeleteDepotFilePushRuleDenyPrivilegeOutputSchema,
};

// --------------- Action ---------------

/** 删除 git 仓库特权者文件推送权限 */
export const DeleteDepotFilePushRuleDenyPrivilege = (
  client: CodingClient,
  params: DeleteDepotFilePushRuleDenyPrivilegeInput,
): Promise<Either<SdkError, DeleteDepotFilePushRuleDenyPrivilegeOutput>> =>
  executeAction(client.config, spec, params);
