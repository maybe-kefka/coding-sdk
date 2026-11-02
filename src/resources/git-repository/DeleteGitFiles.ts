import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema } from './schemas';

// --------------- Schema ---------------

/** 删除文件并提交 - 请求参数 */
export const DeleteGitFilesInputSchema = z.object({
  /** 提交信息 */
  CommitMessage: z.string().describe('提交信息'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 文件路径列表 */
  Paths: z.array(z.string()).describe('文件路径列表'),
  /** 分支名 */
  Ref: z.string().describe('分支名'),
});

/** 删除文件并提交 - 响应数据 */
export const DeleteGitFilesOutputSchema = z.object({
  /** 提交信息 */
  GitCommit: GitCommitSchema.describe('提交信息'),
});

// --------------- Types ---------------

export type DeleteGitFilesInput = z.infer<typeof DeleteGitFilesInputSchema>;
export type DeleteGitFilesOutput = z.infer<typeof DeleteGitFilesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitFilesInput, DeleteGitFilesOutput> = {
  action: 'DeleteGitFiles',
  method: 'POST',
  inputSchema: DeleteGitFilesInputSchema,
  outputSchema: DeleteGitFilesOutputSchema,
};

// --------------- Action ---------------

/** 删除文件并提交 */
export const DeleteGitFiles = (
  client: CodingClient,
  params: DeleteGitFilesInput,
): Promise<Either<SdkError, DeleteGitFilesOutput>> => executeAction(client.config, spec, params);
