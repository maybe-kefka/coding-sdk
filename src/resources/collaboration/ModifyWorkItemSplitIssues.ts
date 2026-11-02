import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 项目集工作项分解&取消分解到项目中的事项 - 请求参数 */
export const ModifyWorkItemSplitIssuesInputSchema = z.object({
  /** 目标项目中的事项ID */
  IssueCode: z.string().describe('目标项目中的事项ID'),
  /** 项目集名称 */
  ProgramName: z.string().describe('项目集名称'),
  /** 目标项目名称  */
  ProjectName: z.string().describe('目标项目名称 '),
  /** true 表示分解， false 表示取消分解 */
  Split: z.string().describe('true 表示分解， false 表示取消分解'),
  /** 页面上工作项ID */
  WorkItemCode: z.number().int().describe('页面上工作项ID'),
});

/** 项目集工作项分解&取消分解到项目中的事项 - 响应数据 */
export const ModifyWorkItemSplitIssuesOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyWorkItemSplitIssuesInput = z.infer<typeof ModifyWorkItemSplitIssuesInputSchema>;
export type ModifyWorkItemSplitIssuesOutput = z.infer<typeof ModifyWorkItemSplitIssuesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyWorkItemSplitIssuesInput, ModifyWorkItemSplitIssuesOutput> = {
  action: 'ModifyWorkItemSplitIssues',
  method: 'POST',
  inputSchema: ModifyWorkItemSplitIssuesInputSchema,
  outputSchema: ModifyWorkItemSplitIssuesOutputSchema,
};

// --------------- Action ---------------

/** 项目集工作项分解/取消分解到项目中的事项 */
export const ModifyWorkItemSplitIssues = (
  client: CodingClient,
  params: ModifyWorkItemSplitIssuesInput,
): Promise<Either<SdkError, ModifyWorkItemSplitIssuesOutput>> =>
  executeAction(client.config, spec, params);
