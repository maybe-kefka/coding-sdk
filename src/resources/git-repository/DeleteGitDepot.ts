import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除git仓库 - 请求参数 */
export const DeleteGitDepotInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 删除git仓库 - 响应数据 */
export const DeleteGitDepotOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitDepotInput = z.infer<typeof DeleteGitDepotInputSchema>;
export type DeleteGitDepotOutput = z.infer<typeof DeleteGitDepotOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitDepotInput, DeleteGitDepotOutput> = {
  action: 'DeleteGitDepot',
  method: 'POST',
  inputSchema: DeleteGitDepotInputSchema,
  outputSchema: DeleteGitDepotOutputSchema,
};

// --------------- Action ---------------

/** 删除git仓库 */
export const DeleteGitDepot = (
  client: CodingClient,
  params: DeleteGitDepotInput,
): Promise<Either<SdkError, DeleteGitDepotOutput>> => executeAction(client.config, spec, params);
