import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改事项评论 - 请求参数 */
export const ModifyIssueCommentInputSchema = z.object({
  /** 评论 ID */
  CommentId: z.number().int().describe('评论 ID'),
  /** 评论内容 */
  Content: z.string().describe('评论内容'),
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 修改事项评论 - 响应数据 */
export const ModifyIssueCommentOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyIssueCommentInput = z.infer<typeof ModifyIssueCommentInputSchema>;
export type ModifyIssueCommentOutput = z.infer<typeof ModifyIssueCommentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyIssueCommentInput, ModifyIssueCommentOutput> = {
  action: 'ModifyIssueComment',
  method: 'POST',
  inputSchema: ModifyIssueCommentInputSchema,
  outputSchema: ModifyIssueCommentOutputSchema,
};

// --------------- Action ---------------

/** 修改事项评论 */
export const ModifyIssueComment = (
  client: CodingClient,
  params: ModifyIssueCommentInput,
): Promise<Either<SdkError, ModifyIssueCommentOutput>> =>
  executeAction(client.config, spec, params);
