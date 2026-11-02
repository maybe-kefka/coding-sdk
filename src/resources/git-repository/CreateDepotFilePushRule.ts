import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFilePushRuleSchema } from './schemas';

// --------------- Schema ---------------

/** 新增 git 仓库文件推送规则 - 请求参数 */
export const CreateDepotFilePushRuleInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 拒绝所有人推送 */
  IsDenyForAllUser: z.boolean().describe('拒绝所有人推送'),
  /** 文件路径 */
  Pattern: z.string().describe('文件路径'),
});

/** 新增 git 仓库文件推送规则 - 响应数据 */
export const CreateDepotFilePushRuleOutputSchema = z.object({
  /** git 仓库文件推送规则列表 */
  GitFilePushRule: z.array(GitFilePushRuleSchema).nullable().describe('git 仓库文件推送规则列表'),
});

// --------------- Types ---------------

export type CreateDepotFilePushRuleInput = z.infer<typeof CreateDepotFilePushRuleInputSchema>;
export type CreateDepotFilePushRuleOutput = z.infer<typeof CreateDepotFilePushRuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateDepotFilePushRuleInput, CreateDepotFilePushRuleOutput> = {
  action: 'CreateDepotFilePushRule',
  method: 'POST',
  inputSchema: CreateDepotFilePushRuleInputSchema,
  outputSchema: CreateDepotFilePushRuleOutputSchema,
};

// --------------- Action ---------------

/** 新增 git 仓库文件推送规则 */
export const CreateDepotFilePushRule = (
  client: CodingClient,
  params: CreateDepotFilePushRuleInput,
): Promise<Either<SdkError, CreateDepotFilePushRuleOutput>> =>
  executeAction(client.config, spec, params);
