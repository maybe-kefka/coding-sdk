import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** git变基操作 - 请求参数 */
export const ModifyGitRebaseInputSchema = z.object({
  /** 基础分支名字 */
  BaseBranchName: z.string().describe('基础分支名字'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 源分支名字 */
  SrcBranchName: z.string().describe('源分支名字'),
});

/** git变基操作 - 响应数据 */
export const ModifyGitRebaseOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitRebaseInput = z.infer<typeof ModifyGitRebaseInputSchema>;
export type ModifyGitRebaseOutput = z.infer<typeof ModifyGitRebaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitRebaseInput, ModifyGitRebaseOutput> = {
  action: 'ModifyGitRebase',
  method: 'POST',
  inputSchema: ModifyGitRebaseInputSchema,
  outputSchema: ModifyGitRebaseOutputSchema,
};

// --------------- Action ---------------

/** git变基操作 */
export const ModifyGitRebase = (
  client: CodingClient,
  params: ModifyGitRebaseInput,
): Promise<Either<SdkError, ModifyGitRebaseOutput>> => executeAction(client.config, spec, params);
