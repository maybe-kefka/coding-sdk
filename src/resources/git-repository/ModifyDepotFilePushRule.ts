import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFilePushRuleSchema } from './schemas';

// --------------- Schema ---------------

/** 修改 git 仓库文件推送规则 - 请求参数 */
export const ModifyDepotFilePushRuleInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 文件推送规则 ID */
  FilePushRuleId: z.number().int().describe('文件推送规则 ID'),
  /** 拒绝所有人推送 */
  IsDenyForAllUser: z.boolean().describe('拒绝所有人推送'),
});

/** 修改 git 仓库文件推送规则 - 响应数据 */
export const ModifyDepotFilePushRuleOutputSchema = z.object({
  /** git 仓库文件推送规则列表 */
  GitFilePushRule: z.array(GitFilePushRuleSchema).nullable().describe('git 仓库文件推送规则列表'),
});

// --------------- Types ---------------

export type ModifyDepotFilePushRuleInput = z.infer<typeof ModifyDepotFilePushRuleInputSchema>;
export type ModifyDepotFilePushRuleOutput = z.infer<typeof ModifyDepotFilePushRuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotFilePushRuleInput, ModifyDepotFilePushRuleOutput> = {
  action: 'ModifyDepotFilePushRule',
  method: 'POST',
  inputSchema: ModifyDepotFilePushRuleInputSchema,
  outputSchema: ModifyDepotFilePushRuleOutputSchema,
};

// --------------- Action ---------------

/** 修改 git 仓库文件推送规则 */
export const ModifyDepotFilePushRule = (
  client: CodingClient,
  params: ModifyDepotFilePushRuleInput,
): Promise<Either<SdkError, ModifyDepotFilePushRuleOutput>> =>
  executeAction(client.config, spec, params);
