import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改合并请求合并提交消息模版 - 请求参数 */
export const ModifyMergeRequestMergeCommitMessageTemplateInputSchema = z.object({
  /** 合并请求合并提交消息模版 */
  CommitMessageTemplate: z.string().describe('合并请求合并提交消息模版'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
});

/** 修改合并请求合并提交消息模版 - 响应数据 */
export const ModifyMergeRequestMergeCommitMessageTemplateOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyMergeRequestMergeCommitMessageTemplateInput = z.infer<
  typeof ModifyMergeRequestMergeCommitMessageTemplateInputSchema
>;
export type ModifyMergeRequestMergeCommitMessageTemplateOutput = z.infer<
  typeof ModifyMergeRequestMergeCommitMessageTemplateOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  ModifyMergeRequestMergeCommitMessageTemplateInput,
  ModifyMergeRequestMergeCommitMessageTemplateOutput
> = {
  action: 'ModifyMergeRequestMergeCommitMessageTemplate',
  method: 'POST',
  inputSchema: ModifyMergeRequestMergeCommitMessageTemplateInputSchema,
  outputSchema: ModifyMergeRequestMergeCommitMessageTemplateOutputSchema,
};

// --------------- Action ---------------

/** 修改合并请求合并提交消息模版 */
export const ModifyMergeRequestMergeCommitMessageTemplate = (
  client: CodingClient,
  params: ModifyMergeRequestMergeCommitMessageTemplateInput,
): Promise<Either<SdkError, ModifyMergeRequestMergeCommitMessageTemplateOutput>> =>
  executeAction(client.config, spec, params);
