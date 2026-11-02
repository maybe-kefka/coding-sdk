import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 创建提交注释 - 请求参数 */
export const CreateGitCommitNoteInputSchema = z.object({
  /** 提交信息 */
  CommitMessage: z.string().describe('提交信息'),
  /** 提交的 Sha */
  CommitSha: z.string().describe('提交的 Sha'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 注释的详情信息 */
  Note: z.string().describe('注释的详情信息'),
  /** 注释分支 ref。建议默认不填 */
  NotesRef: z.string().optional().describe('注释分支 ref。建议默认不填'),
});

/** 创建提交注释 - 响应数据 */
export const CreateGitCommitNoteOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateGitCommitNoteInput = z.infer<typeof CreateGitCommitNoteInputSchema>;
export type CreateGitCommitNoteOutput = z.infer<typeof CreateGitCommitNoteOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitCommitNoteInput, CreateGitCommitNoteOutput> = {
  action: 'CreateGitCommitNote',
  method: 'POST',
  inputSchema: CreateGitCommitNoteInputSchema,
  outputSchema: CreateGitCommitNoteOutputSchema,
};

// --------------- Action ---------------

/** 创建提交注释,注意：对于 NotesRef 参数建议默认为空，因为 git 会使用默认的 ref ：refs/notes/commits，如果填了这个参数，会用这个参数指定的 ref 来保存您的 git note，有可能会覆盖您原有的 ref。 */
export const CreateGitCommitNote = (
  client: CodingClient,
  params: CreateGitCommitNoteInput,
): Promise<Either<SdkError, CreateGitCommitNoteOutput>> =>
  executeAction(client.config, spec, params);
