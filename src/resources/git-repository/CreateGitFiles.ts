import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema, GitFileSchema } from './schemas';

// --------------- Schema ---------------

/** 创建仓库文件 - 请求参数 */
export const CreateGitFilesInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 新增的文件 */
  GitFiles: z.array(GitFileSchema).describe('新增的文件'),
  /** 最后次提交 Sha */
  LastCommitSha: z.string().describe('最后次提交 Sha'),
  /** 提交文本 */
  Message: z.string().describe('提交文本'),
  /** 新分支 */
  NewRef: z.string().optional().describe('新分支'),
  /** 基于改动的分支 */
  Ref: z.string().describe('基于改动的分支'),
});

/** 创建仓库文件 - 响应数据 */
export const CreateGitFilesOutputSchema = z.object({
  /** 提交信息 */
  GitCommit: GitCommitSchema.describe('提交信息'),
});

// --------------- Types ---------------

export type CreateGitFilesInput = z.infer<typeof CreateGitFilesInputSchema>;
export type CreateGitFilesOutput = z.infer<typeof CreateGitFilesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitFilesInput, CreateGitFilesOutput> = {
  action: 'CreateGitFiles',
  method: 'POST',
  inputSchema: CreateGitFilesInputSchema,
  outputSchema: CreateGitFilesOutputSchema,
};

// --------------- Action ---------------

/** 创建仓库文件 */
export const CreateGitFiles = (
  client: CodingClient,
  params: CreateGitFilesInput,
): Promise<Either<SdkError, CreateGitFilesOutput>> => executeAction(client.config, spec, params);
