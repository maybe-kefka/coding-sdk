import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { OpenApiIterationSchema } from './schemas';

// --------------- Schema ---------------

/** 修改迭代状态 - 请求参数 */
export const ModifyIterationStatusInputSchema = z.object({
  /** 结束时间，完成迭代必需，格式：2020-01-01 */
  EndAt: z.string().optional().describe('结束时间，完成迭代必需，格式：2020-01-01'),
  /** 迭代编号 */
  IterationCode: z.number().int().describe('迭代编号'),
  /** 移入迭代编号 */
  JoinIterationCode: z.number().int().optional().describe('移入迭代编号'),
  /** 迭代状态操作，类型：start：开始迭代、complete：完成迭代、restart：重新打开 */
  Operator: z
    .string()
    .describe('迭代状态操作，类型：start：开始迭代、complete：完成迭代、restart：重新打开'),
  /** 项目描述 */
  ProjectName: z.string().describe('项目描述'),
  /** 开始时间，开始迭代必需，格式：2020-01-01 */
  StartAt: z.string().optional().describe('开始时间，开始迭代必需，格式：2020-01-01'),
});

/** 修改迭代状态 - 响应数据 */
export const ModifyIterationStatusOutputSchema = z.object({
  /** 迭代信息 */
  Iteration: OpenApiIterationSchema.optional().describe('迭代信息'),
});

// --------------- Types ---------------

export type ModifyIterationStatusInput = z.infer<typeof ModifyIterationStatusInputSchema>;
export type ModifyIterationStatusOutput = z.infer<typeof ModifyIterationStatusOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyIterationStatusInput, ModifyIterationStatusOutput> = {
  action: 'ModifyIterationStatus',
  method: 'POST',
  inputSchema: ModifyIterationStatusInputSchema,
  outputSchema: ModifyIterationStatusOutputSchema,
};

// --------------- Action ---------------

/** 修改迭代状态 */
export const ModifyIterationStatus = (
  client: CodingClient,
  params: ModifyIterationStatusInput,
): Promise<Either<SdkError, ModifyIterationStatusOutput>> =>
  executeAction(client.config, spec, params);
