import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 仓库归档 - 请求参数 */
export const ModifyGitDepotArchiveInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 仓库归档 - 响应数据 */
export const ModifyGitDepotArchiveOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitDepotArchiveInput = z.infer<typeof ModifyGitDepotArchiveInputSchema>;
export type ModifyGitDepotArchiveOutput = z.infer<typeof ModifyGitDepotArchiveOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitDepotArchiveInput, ModifyGitDepotArchiveOutput> = {
  action: 'ModifyGitDepotArchive',
  method: 'POST',
  inputSchema: ModifyGitDepotArchiveInputSchema,
  outputSchema: ModifyGitDepotArchiveOutputSchema,
};

// --------------- Action ---------------

/** 仓库归档 */
export const ModifyGitDepotArchive = (
  client: CodingClient,
  params: ModifyGitDepotArchiveInput,
): Promise<Either<SdkError, ModifyGitDepotArchiveOutput>> =>
  executeAction(client.config, spec, params);
