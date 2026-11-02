import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotPushSettingSchema } from './schemas';

// --------------- Schema ---------------

/** 修改仓库推送设置 - 请求参数 */
export const ModifyDepotPushSettingInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 推送设置参数 */
  Param: DepotPushSettingSchema.describe('推送设置参数'),
});

/** 修改仓库推送设置 - 响应数据 */
export const ModifyDepotPushSettingOutputSchema = z.object({
  /** 推送设置信息 */
  Data: DepotPushSettingSchema.nullable().describe('推送设置信息'),
});

// --------------- Types ---------------

export type ModifyDepotPushSettingInput = z.infer<typeof ModifyDepotPushSettingInputSchema>;
export type ModifyDepotPushSettingOutput = z.infer<typeof ModifyDepotPushSettingOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotPushSettingInput, ModifyDepotPushSettingOutput> = {
  action: 'ModifyDepotPushSetting',
  method: 'POST',
  inputSchema: ModifyDepotPushSettingInputSchema,
  outputSchema: ModifyDepotPushSettingOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库推送设置 */
export const ModifyDepotPushSetting = (
  client: CodingClient,
  params: ModifyDepotPushSettingInput,
): Promise<Either<SdkError, ModifyDepotPushSettingOutput>> =>
  executeAction(client.config, spec, params);
