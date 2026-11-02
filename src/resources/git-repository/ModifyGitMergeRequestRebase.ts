import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 合并请求中的源分支进行rebase操作 - 请求参数 */
export const ModifyGitMergeRequestRebaseInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPat: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 合并请求 资源ID */
  MergeId: z.number().int().describe('合并请求 资源ID'),
});

/** 合并请求中的源分支进行rebase操作 - 响应数据 */
export const ModifyGitMergeRequestRebaseOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitMergeRequestRebaseInput = z.infer<
  typeof ModifyGitMergeRequestRebaseInputSchema
>;
export type ModifyGitMergeRequestRebaseOutput = z.infer<
  typeof ModifyGitMergeRequestRebaseOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitMergeRequestRebaseInput, ModifyGitMergeRequestRebaseOutput> = {
  action: 'ModifyGitMergeRequestRebase',
  method: 'POST',
  inputSchema: ModifyGitMergeRequestRebaseInputSchema,
  outputSchema: ModifyGitMergeRequestRebaseOutputSchema,
};

// --------------- Action ---------------

/** 合并请求中的源分支进行rebase操作 */
export const ModifyGitMergeRequestRebase = (
  client: CodingClient,
  params: ModifyGitMergeRequestRebaseInput,
): Promise<Either<SdkError, ModifyGitMergeRequestRebaseOutput>> =>
  executeAction(client.config, spec, params);
