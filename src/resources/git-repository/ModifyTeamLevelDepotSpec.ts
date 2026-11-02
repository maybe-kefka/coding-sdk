import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotSpecDetailSchema, DepotSpecTeamLevelParamSchema } from './schemas';

// --------------- Schema ---------------

/** 修改、新增团队级别的仓库规范 - 请求参数 */
export const ModifyTeamLevelDepotSpecInputSchema = z.object({
  /** 修改、新增团队级别的仓库规范参数 */
  Param: DepotSpecTeamLevelParamSchema.describe('修改、新增团队级别的仓库规范参数'),
});

/** 修改、新增团队级别的仓库规范 - 响应数据 */
export const ModifyTeamLevelDepotSpecOutputSchema = z.object({
  /** 仓库规范详细信息 */
  Detail: DepotSpecDetailSchema.nullable().describe('仓库规范详细信息'),
});

// --------------- Types ---------------

export type ModifyTeamLevelDepotSpecInput = z.infer<typeof ModifyTeamLevelDepotSpecInputSchema>;
export type ModifyTeamLevelDepotSpecOutput = z.infer<typeof ModifyTeamLevelDepotSpecOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyTeamLevelDepotSpecInput, ModifyTeamLevelDepotSpecOutput> = {
  action: 'ModifyTeamLevelDepotSpec',
  method: 'POST',
  inputSchema: ModifyTeamLevelDepotSpecInputSchema,
  outputSchema: ModifyTeamLevelDepotSpecOutputSchema,
};

// --------------- Action ---------------

/** 修改、新增团队级别的仓库规范 */
export const ModifyTeamLevelDepotSpec = (
  client: CodingClient,
  params: ModifyTeamLevelDepotSpecInput,
): Promise<Either<SdkError, ModifyTeamLevelDepotSpecOutput>> =>
  executeAction(client.config, spec, params);
