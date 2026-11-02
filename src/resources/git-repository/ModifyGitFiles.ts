import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema, GitFileSchema } from './schemas';

// --------------- Schema ---------------

/** 修改仓库某文件 - 请求参数 */
export const ModifyGitFilesInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 修改的文件 */
  GitFiles: z.array(GitFileSchema).describe('修改的文件'),
  /** 最后次提交 Sha */
  LastCommitSha: z.string().describe('最后次提交 Sha'),
  /** 提交文本 */
  Message: z.string().describe('提交文本'),
  /** 要提交的新分支 */
  NewRef: z.string().optional().describe('要提交的新分支'),
  /** 基于改动的分支 */
  Ref: z.string().describe('基于改动的分支'),
});

/** 修改仓库某文件 - 响应数据 */
export const ModifyGitFilesOutputSchema = z.object({
  /** 本次提交详细信息 */
  GitCommit: GitCommitSchema.describe('本次提交详细信息'),
});

// --------------- Types ---------------

export type ModifyGitFilesInput = z.infer<typeof ModifyGitFilesInputSchema>;
export type ModifyGitFilesOutput = z.infer<typeof ModifyGitFilesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitFilesInput, ModifyGitFilesOutput> = {
  action: 'ModifyGitFiles',
  method: 'POST',
  inputSchema: ModifyGitFilesInputSchema,
  outputSchema: ModifyGitFilesOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库某文件 */
export const ModifyGitFiles = (
  client: CodingClient,
  params: ModifyGitFilesInput,
): Promise<Either<SdkError, ModifyGitFilesOutput>> => executeAction(client.config, spec, params);
