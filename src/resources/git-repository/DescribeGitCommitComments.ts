import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitCommentSchema } from './schemas';

// --------------- Schema ---------------

/** 描述git提交评论 - 请求参数 */
export const DescribeGitCommitCommentsInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 页码数量 */
  PageNumber: z.number().int().describe('页码数量'),
  /** 页码大小 */
  PageSize: z.number().int().describe('页码大小'),
  /** 提交Sha */
  Sha: z.string().describe('提交Sha'),
});

/** 描述git提交评论 - 响应数据 */
export const DescribeGitCommitCommentsOutputSchema = z.object({
  /** 提交信息评论 */
  GitCommitComments: GitCommitCommentSchema.describe('提交信息评论'),
});

// --------------- Types ---------------

export type DescribeGitCommitCommentsInput = z.infer<typeof DescribeGitCommitCommentsInputSchema>;
export type DescribeGitCommitCommentsOutput = z.infer<typeof DescribeGitCommitCommentsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitCommentsInput, DescribeGitCommitCommentsOutput> = {
  action: 'DescribeGitCommitComments',
  method: 'POST',
  inputSchema: DescribeGitCommitCommentsInputSchema,
  outputSchema: DescribeGitCommitCommentsOutputSchema,
};

// --------------- Action ---------------

/** 获取commit评论 */
export const DescribeGitCommitComments = (
  client: CodingClient,
  params: DescribeGitCommitCommentsInput,
): Promise<Either<SdkError, DescribeGitCommitCommentsOutput>> =>
  executeAction(client.config, spec, params);
