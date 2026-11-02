import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 将某次提交cherry-pick到指定分支 - 请求参数 */
export const ModifyGitCherryPickInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 提交 ID */
  Sha: z.string().describe('提交 ID'),
});

/** 将某次提交cherry-pick到指定分支 - 响应数据 */
export const ModifyGitCherryPickOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitCherryPickInput = z.infer<typeof ModifyGitCherryPickInputSchema>;
export type ModifyGitCherryPickOutput = z.infer<typeof ModifyGitCherryPickOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitCherryPickInput, ModifyGitCherryPickOutput> = {
  action: 'ModifyGitCherryPick',
  method: 'POST',
  inputSchema: ModifyGitCherryPickInputSchema,
  outputSchema: ModifyGitCherryPickOutputSchema,
};

// --------------- Action ---------------

/** 将某次提交cherry-pick到指定分支 */
export const ModifyGitCherryPick = (
  client: CodingClient,
  params: ModifyGitCherryPickInput,
): Promise<Either<SdkError, ModifyGitCherryPickOutput>> =>
  executeAction(client.config, spec, params);
