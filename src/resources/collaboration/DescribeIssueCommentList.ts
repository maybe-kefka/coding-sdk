import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueCommentSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项评论列表 - 请求参数 */
export const DescribeIssueCommentListInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 是否查询评论中图片FileId */
  ShowFileId: z.boolean().optional().describe('是否查询评论中图片FileId'),
});

/** 查询事项评论列表 - 响应数据 */
export const DescribeIssueCommentListOutputSchema = z.object({
  /** 事项评论列表 */
  CommentList: z.array(IssueCommentSchema).describe('事项评论列表'),
});

// --------------- Types ---------------

export type DescribeIssueCommentListInput = z.infer<typeof DescribeIssueCommentListInputSchema>;
export type DescribeIssueCommentListOutput = z.infer<typeof DescribeIssueCommentListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueCommentListInput, DescribeIssueCommentListOutput> = {
  action: 'DescribeIssueCommentList',
  method: 'POST',
  inputSchema: DescribeIssueCommentListInputSchema,
  outputSchema: DescribeIssueCommentListOutputSchema,
};

// --------------- Action ---------------

/** 查询事项评论列表 */
export const DescribeIssueCommentList = (
  client: CodingClient,
  params: DescribeIssueCommentListInput,
): Promise<Either<SdkError, DescribeIssueCommentListOutput>> =>
  executeAction(client.config, spec, params);
