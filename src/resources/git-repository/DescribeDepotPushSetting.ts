import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotPushSettingSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库推送设置 - 请求参数 */
export const DescribeDepotPushSettingInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
});

/** 查询仓库推送设置 - 响应数据 */
export const DescribeDepotPushSettingOutputSchema = z.object({
  /** 推送设置信息 */
  Data: DepotPushSettingSchema.nullable().describe('推送设置信息'),
});

// --------------- Types ---------------

export type DescribeDepotPushSettingInput = z.infer<typeof DescribeDepotPushSettingInputSchema>;
export type DescribeDepotPushSettingOutput = z.infer<typeof DescribeDepotPushSettingOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotPushSettingInput, DescribeDepotPushSettingOutput> = {
  action: 'DescribeDepotPushSetting',
  method: 'POST',
  inputSchema: DescribeDepotPushSettingInputSchema,
  outputSchema: DescribeDepotPushSettingOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库推送设置 */
export const DescribeDepotPushSetting = (
  client: CodingClient,
  params: DescribeDepotPushSettingInput,
): Promise<Either<SdkError, DescribeDepotPushSettingOutput>> =>
  executeAction(client.config, spec, params);
