import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CommitFileSchema, GitCommitSchema } from './schemas';

// --------------- Schema ---------------

/** 创建一次提交 - 请求参数 */
export const CreateGitCommitInputSchema = z.object({
  /** 文件列表 */
  CommitFiles: z.array(CommitFileSchema).describe('文件列表'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 最后次提交 Sha */
  LastCommitSha: z.string().describe('最后次提交 Sha'),
  /** 提交文本 */
  Message: z.string().describe('提交文本'),
  /** 新分支（如果不修改分支名称，不需要传值） */
  NewRef: z.string().optional().describe('新分支（如果不修改分支名称，不需要传值）'),
  /** 基于改动的分支 */
  Ref: z.string().describe('基于改动的分支'),
});

/** 创建一次提交 - 响应数据 */
export const CreateGitCommitOutputSchema = z.object({
  /** 本次提交详细信息 */
  GitCommit: GitCommitSchema.describe('本次提交详细信息'),
});

// --------------- Types ---------------

export type CreateGitCommitInput = z.infer<typeof CreateGitCommitInputSchema>;
export type CreateGitCommitOutput = z.infer<typeof CreateGitCommitOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitCommitInput, CreateGitCommitOutput> = {
  action: 'CreateGitCommit',
  method: 'POST',
  inputSchema: CreateGitCommitInputSchema,
  outputSchema: CreateGitCommitOutputSchema,
};

// --------------- Action ---------------

/** 创建一次提交 */
export const CreateGitCommit = (
  client: CodingClient,
  params: CreateGitCommitInput,
): Promise<Either<SdkError, CreateGitCommitOutput>> => executeAction(client.config, spec, params);
