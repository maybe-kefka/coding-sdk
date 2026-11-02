import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 查询事项附件的下载地址 - 请求参数 */
export const DescribeIssueFileUrlInputSchema = z.object({
  /** 文件 ID */
  FileId: z.number().int().describe('文件 ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 事项Code, 对应页面的ID字段, ProjectName + IssueCode 可以查询事项的附件和描述中图片的下载地址 */
  IssueCode: z
    .number()
    .int()
    .optional()
    .describe(
      '事项Code, 对应页面的ID字段, ProjectName + IssueCode 可以查询事项的附件和描述中图片的下载地址',
    ),
  /** 是否查询事项评论中的图片路径， 可查询所有评论中的图片路径 */
  QueryComment: z
    .boolean()
    .optional()
    .describe('是否查询事项评论中的图片路径， 可查询所有评论中的图片路径'),
});

/** 查询事项附件的下载地址 - 响应数据 */
export const DescribeIssueFileUrlOutputSchema = z.object({
  /** 文件下载地址 */
  Url: z.string().describe('文件下载地址'),
  /** 事项附件下载地址列表 */
  AttachmentFileUrl: z.array(z.string()).optional().describe('事项附件下载地址列表'),
  /** 事项描述中图片下载地址列表 */
  DescriptionImageUrl: z.array(z.string()).optional().describe('事项描述中图片下载地址列表'),
  /** 事项评论中图片下载地址列表 */
  CommentImageUrl: z.array(z.string()).optional().describe('事项评论中图片下载地址列表'),
});

// --------------- Types ---------------

export type DescribeIssueFileUrlInput = z.infer<typeof DescribeIssueFileUrlInputSchema>;
export type DescribeIssueFileUrlOutput = z.infer<typeof DescribeIssueFileUrlOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueFileUrlInput, DescribeIssueFileUrlOutput> = {
  action: 'DescribeIssueFileUrl',
  method: 'POST',
  inputSchema: DescribeIssueFileUrlInputSchema,
  outputSchema: DescribeIssueFileUrlOutputSchema,
};

// --------------- Action ---------------

/** 查询事项附件的下载地址 */
export const DescribeIssueFileUrl = (
  client: CodingClient,
  params: DescribeIssueFileUrlInput,
): Promise<Either<SdkError, DescribeIssueFileUrlOutput>> =>
  executeAction(client.config, spec, params);
