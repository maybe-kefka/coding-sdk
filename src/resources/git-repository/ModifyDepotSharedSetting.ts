import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改仓库是否开源设置 - 请求参数 */
export const ModifyDepotSharedSettingInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 仓库是否开源 */
  IsShared: z.boolean().describe('仓库是否开源'),
});

/** 修改仓库是否开源设置 - 响应数据 */
export const ModifyDepotSharedSettingOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDepotSharedSettingInput = z.infer<typeof ModifyDepotSharedSettingInputSchema>;
export type ModifyDepotSharedSettingOutput = z.infer<typeof ModifyDepotSharedSettingOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotSharedSettingInput, ModifyDepotSharedSettingOutput> = {
  action: 'ModifyDepotSharedSetting',
  method: 'POST',
  inputSchema: ModifyDepotSharedSettingInputSchema,
  outputSchema: ModifyDepotSharedSettingOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库是否开源设置 */
export const ModifyDepotSharedSetting = (
  client: CodingClient,
  params: ModifyDepotSharedSettingInput,
): Promise<Either<SdkError, ModifyDepotSharedSettingOutput>> =>
  executeAction(client.config, spec, params);
