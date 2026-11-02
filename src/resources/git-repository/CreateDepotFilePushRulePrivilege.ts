import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFilePushRuleSchema } from './schemas';

// --------------- Schema ---------------

/** 新增 git 仓库文件推送规则特权者 - 请求参数 */
export const CreateDepotFilePushRulePrivilegeInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 文件推送规则 ID */
  FilePushRuleId: z.number().int().describe('文件推送规则 ID'),
  /** 拒绝推送 */
  IsDeny: z.boolean().describe('拒绝推送'),
  /** 特权者是角色（IsUser和IsRole有且只能有一个为true） */
  IsRole: z.boolean().describe('特权者是角色（IsUser和IsRole有且只能有一个为true）'),
  /** 特权者是用户（IsUser和IsRole有且只能有一个为true） */
  IsUser: z.boolean().describe('特权者是用户（IsUser和IsRole有且只能有一个为true）'),
  /** 角色 ID */
  RoleId: z.number().int().optional().describe('角色 ID'),
  /** 用户全局 key */
  UserGlobalKey: z.string().describe('用户全局 key'),
});

/** 新增 git 仓库文件推送规则特权者 - 响应数据 */
export const CreateDepotFilePushRulePrivilegeOutputSchema = z.object({
  /** git 仓库文件推送规则列表 */
  GitFilePushRule: z.array(GitFilePushRuleSchema).nullable().describe('git 仓库文件推送规则列表'),
});

// --------------- Types ---------------

export type CreateDepotFilePushRulePrivilegeInput = z.infer<
  typeof CreateDepotFilePushRulePrivilegeInputSchema
>;
export type CreateDepotFilePushRulePrivilegeOutput = z.infer<
  typeof CreateDepotFilePushRulePrivilegeOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  CreateDepotFilePushRulePrivilegeInput,
  CreateDepotFilePushRulePrivilegeOutput
> = {
  action: 'CreateDepotFilePushRulePrivilege',
  method: 'POST',
  inputSchema: CreateDepotFilePushRulePrivilegeInputSchema,
  outputSchema: CreateDepotFilePushRulePrivilegeOutputSchema,
};

// --------------- Action ---------------

/** 新增git仓库文件推送规则特权者 */
export const CreateDepotFilePushRulePrivilege = (
  client: CodingClient,
  params: CreateDepotFilePushRulePrivilegeInput,
): Promise<Either<SdkError, CreateDepotFilePushRulePrivilegeOutput>> =>
  executeAction(client.config, spec, params);
