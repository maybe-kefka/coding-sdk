import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除已合并到默认分支的分支 - 请求参数 */
export const DeleteGitMergedBranchesInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 删除已合并到默认分支的分支 - 响应数据 */
export const DeleteGitMergedBranchesOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitMergedBranchesInput = z.infer<typeof DeleteGitMergedBranchesInputSchema>;
export type DeleteGitMergedBranchesOutput = z.infer<typeof DeleteGitMergedBranchesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitMergedBranchesInput, DeleteGitMergedBranchesOutput> = {
  action: 'DeleteGitMergedBranches',
  method: 'POST',
  inputSchema: DeleteGitMergedBranchesInputSchema,
  outputSchema: DeleteGitMergedBranchesOutputSchema,
};

// --------------- Action ---------------

/** 删除已合并到默认分支的分支（此操作不会删除受保护的分支） */
export const DeleteGitMergedBranches = (
  client: CodingClient,
  params: DeleteGitMergedBranchesInput,
): Promise<Either<SdkError, DeleteGitMergedBranchesOutput>> =>
  executeAction(client.config, spec, params);
