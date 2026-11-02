import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 仓库解除归档 - 请求参数 */
export const ModifyGitDepotUnarchiveInputSchema = z.object({
  /** 仓库id */
  DepotId: z.string().describe('仓库id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 仓库解除归档 - 响应数据 */
export const ModifyGitDepotUnarchiveOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitDepotUnarchiveInput = z.infer<typeof ModifyGitDepotUnarchiveInputSchema>;
export type ModifyGitDepotUnarchiveOutput = z.infer<typeof ModifyGitDepotUnarchiveOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitDepotUnarchiveInput, ModifyGitDepotUnarchiveOutput> = {
  action: 'ModifyGitDepotUnarchive',
  method: 'POST',
  inputSchema: ModifyGitDepotUnarchiveInputSchema,
  outputSchema: ModifyGitDepotUnarchiveOutputSchema,
};

// --------------- Action ---------------

/** 仓库解除归档 */
export const ModifyGitDepotUnarchive = (
  client: CodingClient,
  params: ModifyGitDepotUnarchiveInput,
): Promise<Either<SdkError, ModifyGitDepotUnarchiveOutput>> =>
  executeAction(client.config, spec, params);
