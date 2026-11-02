import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除团队级别的分支规范 - 请求参数 */
export const DeleteTeamLevelDepotSpecInputSchema = z.object({
  /** 仓库规范名字 */
  DepotSpecName: z.string().describe('仓库规范名字'),
});

/** 删除团队级别的分支规范 - 响应数据 */
export const DeleteTeamLevelDepotSpecOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteTeamLevelDepotSpecInput = z.infer<typeof DeleteTeamLevelDepotSpecInputSchema>;
export type DeleteTeamLevelDepotSpecOutput = z.infer<typeof DeleteTeamLevelDepotSpecOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteTeamLevelDepotSpecInput, DeleteTeamLevelDepotSpecOutput> = {
  action: 'DeleteTeamLevelDepotSpec',
  method: 'POST',
  inputSchema: DeleteTeamLevelDepotSpecInputSchema,
  outputSchema: DeleteTeamLevelDepotSpecOutputSchema,
};

// --------------- Action ---------------

/** 删除团队级别的分支规范 */
export const DeleteTeamLevelDepotSpec = (
  client: CodingClient,
  params: DeleteTeamLevelDepotSpecInput,
): Promise<Either<SdkError, DeleteTeamLevelDepotSpecOutput>> =>
  executeAction(client.config, spec, params);
