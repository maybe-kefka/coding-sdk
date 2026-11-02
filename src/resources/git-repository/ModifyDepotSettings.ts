import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改仓库设置 - 请求参数 */
export const ModifyDepotSettingsInputSchema = z.object({
  /** 仓库路径， */
  DepotPath: z.string().describe('仓库路径，'),
  /** 是否开启状态检查 */
  DepotStatusCheckRequired: z.boolean().describe('是否开启状态检查'),
});

/** 修改仓库设置 - 响应数据 */
export const ModifyDepotSettingsOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDepotSettingsInput = z.infer<typeof ModifyDepotSettingsInputSchema>;
export type ModifyDepotSettingsOutput = z.infer<typeof ModifyDepotSettingsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotSettingsInput, ModifyDepotSettingsOutput> = {
  action: 'ModifyDepotSettings',
  method: 'POST',
  inputSchema: ModifyDepotSettingsInputSchema,
  outputSchema: ModifyDepotSettingsOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库设置 */
export const ModifyDepotSettings = (
  client: CodingClient,
  params: ModifyDepotSettingsInput,
): Promise<Either<SdkError, ModifyDepotSettingsOutput>> =>
  executeAction(client.config, spec, params);
