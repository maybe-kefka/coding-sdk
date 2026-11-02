import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CommitCommentSchema } from './schemas';

// --------------- Schema ---------------

/** 为某次提交创建一条评论 - 请求参数 */
export const CreateGitCommitCommentInputSchema = z.object({
  /** 评论的内容 */
  Content: z.string().describe('评论的内容'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** diff信息中的第几行 */
  Index: z.number().int().describe('diff信息中的第几行'),
  /** 文件路径 */
  Path: z.string().describe('文件路径'),
  /** 提交id */
  Sha: z.string().describe('提交id'),
});

/** 为某次提交创建一条评论 - 响应数据 */
export const CreateGitCommitCommentOutputSchema = z.object({
  /** 提交的评论详情 */
  Comment: CommitCommentSchema.nullable().describe('提交的评论详情'),
});

// --------------- Types ---------------

export type CreateGitCommitCommentInput = z.infer<typeof CreateGitCommitCommentInputSchema>;
export type CreateGitCommitCommentOutput = z.infer<typeof CreateGitCommitCommentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitCommitCommentInput, CreateGitCommitCommentOutput> = {
  action: 'CreateGitCommitComment',
  method: 'POST',
  inputSchema: CreateGitCommitCommentInputSchema,
  outputSchema: CreateGitCommitCommentOutputSchema,
};

// --------------- Action ---------------

/** 为某次提交创建一条评论 */
export const CreateGitCommitComment = (
  client: CodingClient,
  params: CreateGitCommitCommentInput,
): Promise<Either<SdkError, CreateGitCommitCommentOutput>> =>
  executeAction(client.config, spec, params);
