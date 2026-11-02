import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除代码仓库分支 - 请求参数 */
export const DeleteGitBranchInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 删除代码仓库分支 - 响应数据 */
export const DeleteGitBranchOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitBranchInput = z.infer<typeof DeleteGitBranchInputSchema>;
export type DeleteGitBranchOutput = z.infer<typeof DeleteGitBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitBranchInput, DeleteGitBranchOutput> = {
  action: 'DeleteGitBranch',
  method: 'POST',
  inputSchema: DeleteGitBranchInputSchema,
  outputSchema: DeleteGitBranchOutputSchema,
};

// --------------- Action ---------------

/** 删除代码仓库分支 */
export const DeleteGitBranch = (
  client: CodingClient,
  params: DeleteGitBranchInput,
): Promise<Either<SdkError, DeleteGitBranchOutput>> => executeAction(client.config, spec, params);
