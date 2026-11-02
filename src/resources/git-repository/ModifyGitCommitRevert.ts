import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 还原某次提交 - 请求参数 */
export const ModifyGitCommitRevertInputSchema = z.object({
  /** 分支名 */
  BranchName: z.string().describe('分支名'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 提交描述 */
  Message: z.string().describe('提交描述'),
  /** 欲还原的提交 ID */
  Sha: z.string().describe('欲还原的提交 ID'),
});

/** 还原某次提交 - 响应数据 */
export const ModifyGitCommitRevertOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitCommitRevertInput = z.infer<typeof ModifyGitCommitRevertInputSchema>;
export type ModifyGitCommitRevertOutput = z.infer<typeof ModifyGitCommitRevertOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitCommitRevertInput, ModifyGitCommitRevertOutput> = {
  action: 'ModifyGitCommitRevert',
  method: 'POST',
  inputSchema: ModifyGitCommitRevertInputSchema,
  outputSchema: ModifyGitCommitRevertOutputSchema,
};

// --------------- Action ---------------

/** 还原某次提交 */
export const ModifyGitCommitRevert = (
  client: CodingClient,
  params: ModifyGitCommitRevertInput,
): Promise<Either<SdkError, ModifyGitCommitRevertOutput>> =>
  executeAction(client.config, spec, params);
