import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 创建事项评论 - 请求参数 */
export const CreateIssueCommentInputSchema = z.object({
  /** 评论内容 */
  Content: z.string().describe('评论内容'),
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 父评论ID */
  ParentId: z.number().int().describe('父评论ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 创建事项评论 - 响应数据 */
export const CreateIssueCommentOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateIssueCommentInput = z.infer<typeof CreateIssueCommentInputSchema>;
export type CreateIssueCommentOutput = z.infer<typeof CreateIssueCommentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateIssueCommentInput, CreateIssueCommentOutput> = {
  action: 'CreateIssueComment',
  method: 'POST',
  inputSchema: CreateIssueCommentInputSchema,
  outputSchema: CreateIssueCommentOutputSchema,
};

// --------------- Action ---------------

/** 创建事项评论 */
export const CreateIssueComment = (
  client: CodingClient,
  params: CreateIssueCommentInput,
): Promise<Either<SdkError, CreateIssueCommentOutput>> =>
  executeAction(client.config, spec, params);
