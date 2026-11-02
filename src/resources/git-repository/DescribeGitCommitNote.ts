import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 获取提交注释 - 请求参数 */
export const DescribeGitCommitNoteInputSchema = z.object({
  /** 提交的 Sha */
  CommitSha: z.string().describe('提交的 Sha'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 注释 分支 Ref */
  NotesRef: z.string().describe('注释 分支 Ref'),
});

/** 获取提交注释 - 响应数据 */
export const DescribeGitCommitNoteOutputSchema = z.object({
  /** 提交注释 */
  CommitNote: z.string().describe('提交注释'),
});

// --------------- Types ---------------

export type DescribeGitCommitNoteInput = z.infer<typeof DescribeGitCommitNoteInputSchema>;
export type DescribeGitCommitNoteOutput = z.infer<typeof DescribeGitCommitNoteOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitNoteInput, DescribeGitCommitNoteOutput> = {
  action: 'DescribeGitCommitNote',
  method: 'POST',
  inputSchema: DescribeGitCommitNoteInputSchema,
  outputSchema: DescribeGitCommitNoteOutputSchema,
};

// --------------- Action ---------------

/** 获取提交注释 */
export const DescribeGitCommitNote = (
  client: CodingClient,
  params: DescribeGitCommitNoteInput,
): Promise<Either<SdkError, DescribeGitCommitNoteOutput>> =>
  executeAction(client.config, spec, params);
