import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改合并请求压缩提交消息模版 - 请求参数 */
export const ModifyMergeRequestSquashCommitMessageTemplateInputSchema = z.object({
  /** 合并请求合并提交消息模版 */
  CommitMessageTemplate: z.string().describe('合并请求合并提交消息模版'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
});

/** 修改合并请求压缩提交消息模版 - 响应数据 */
export const ModifyMergeRequestSquashCommitMessageTemplateOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyMergeRequestSquashCommitMessageTemplateInput = z.infer<
  typeof ModifyMergeRequestSquashCommitMessageTemplateInputSchema
>;
export type ModifyMergeRequestSquashCommitMessageTemplateOutput = z.infer<
  typeof ModifyMergeRequestSquashCommitMessageTemplateOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  ModifyMergeRequestSquashCommitMessageTemplateInput,
  ModifyMergeRequestSquashCommitMessageTemplateOutput
> = {
  action: 'ModifyMergeRequestSquashCommitMessageTemplate',
  method: 'POST',
  inputSchema: ModifyMergeRequestSquashCommitMessageTemplateInputSchema,
  outputSchema: ModifyMergeRequestSquashCommitMessageTemplateOutputSchema,
};

// --------------- Action ---------------

/** 修改合并请求合并压缩提交消息模版 */
export const ModifyMergeRequestSquashCommitMessageTemplate = (
  client: CodingClient,
  params: ModifyMergeRequestSquashCommitMessageTemplateInput,
): Promise<Either<SdkError, ModifyMergeRequestSquashCommitMessageTemplateOutput>> =>
  executeAction(client.config, spec, params);
