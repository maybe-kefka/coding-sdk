import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFilePushRuleSchema } from './schemas';

// --------------- Schema ---------------

/** 删除 git 仓库文件推送规则 - 请求参数 */
export const DeleteDepotFilePushRuleInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 文件推送规则 ID */
  FilePushRuleId: z.number().int().describe('文件推送规则 ID'),
});

/** 删除 git 仓库文件推送规则 - 响应数据 */
export const DeleteDepotFilePushRuleOutputSchema = z.object({
  /** git 仓库文件推送规则列表 */
  GitFilePushRule: z.array(GitFilePushRuleSchema).nullable().describe('git 仓库文件推送规则列表'),
});

// --------------- Types ---------------

export type DeleteDepotFilePushRuleInput = z.infer<typeof DeleteDepotFilePushRuleInputSchema>;
export type DeleteDepotFilePushRuleOutput = z.infer<typeof DeleteDepotFilePushRuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteDepotFilePushRuleInput, DeleteDepotFilePushRuleOutput> = {
  action: 'DeleteDepotFilePushRule',
  method: 'POST',
  inputSchema: DeleteDepotFilePushRuleInputSchema,
  outputSchema: DeleteDepotFilePushRuleOutputSchema,
};

// --------------- Action ---------------

/** 删除 git 仓库文件推送规则 */
export const DeleteDepotFilePushRule = (
  client: CodingClient,
  params: DeleteDepotFilePushRuleInput,
): Promise<Either<SdkError, DeleteDepotFilePushRuleOutput>> =>
  executeAction(client.config, spec, params);
