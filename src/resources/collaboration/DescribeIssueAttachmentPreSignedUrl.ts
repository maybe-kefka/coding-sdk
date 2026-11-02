import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiIssueIssueAttachmentPreSignSchema } from './schemas';

// --------------- Schema ---------------

/** 拿到预签名，上传文件 - 请求参数 */
export const DescribeIssueAttachmentPreSignedUrlInputSchema = z.object({
  /** 文件名 */
  FileName: z.string().describe('文件名'),
  /** 文件大小 */
  FileSize: z.number().int().describe('文件大小'),
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
});

/** 拿到预签名，上传文件 - 响应数据 */
export const DescribeIssueAttachmentPreSignedUrlOutputSchema = z.object({
  /** 预签名信息 */
  PreSign: ApiIssueIssueAttachmentPreSignSchema.describe('预签名信息'),
});

// --------------- Types ---------------

export type DescribeIssueAttachmentPreSignedUrlInput = z.infer<
  typeof DescribeIssueAttachmentPreSignedUrlInputSchema
>;
export type DescribeIssueAttachmentPreSignedUrlOutput = z.infer<
  typeof DescribeIssueAttachmentPreSignedUrlOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeIssueAttachmentPreSignedUrlInput,
  DescribeIssueAttachmentPreSignedUrlOutput
> = {
  action: 'DescribeIssueAttachmentPreSignedUrl',
  method: 'POST',
  inputSchema: DescribeIssueAttachmentPreSignedUrlInputSchema,
  outputSchema: DescribeIssueAttachmentPreSignedUrlOutputSchema,
};

// --------------- Action ---------------

/** 拿到预签名，上传文件 */
export const DescribeIssueAttachmentPreSignedUrl = (
  client: CodingClient,
  params: DescribeIssueAttachmentPreSignedUrlInput,
): Promise<Either<SdkError, DescribeIssueAttachmentPreSignedUrlOutput>> =>
  executeAction(client.config, spec, params);
