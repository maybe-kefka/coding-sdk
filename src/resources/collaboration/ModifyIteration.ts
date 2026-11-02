import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IterationSchema } from './schemas';

// --------------- Schema ---------------

/** 修改迭代 - 请求参数 */
export const ModifyIterationInputSchema = z.object({
  /** 处理人 ID */
  Assignee: z.number().int().optional().describe('处理人 ID'),
  /** 结束时间，格式：2020-01-01 */
  EndAt: z.string().date().optional().describe('结束时间，格式：2020-01-01'),
  /** 目标 */
  Goal: z.string().optional().describe('目标'),
  /** 迭代编号 */
  IterationCode: z.number().int().describe('迭代编号'),
  /** 标题 */
  Name: z.string().describe('标题'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 开始时间，格式：2020-01-01 */
  StartAt: z.string().date().optional().describe('开始时间，格式：2020-01-01'),
});

/** 修改迭代 - 响应数据 */
export const ModifyIterationOutputSchema = z.object({
  /** 迭代的具体信息 */
  Iteration: IterationSchema.describe('迭代的具体信息'),
});

// --------------- Types ---------------

export type ModifyIterationInput = z.infer<typeof ModifyIterationInputSchema>;
export type ModifyIterationOutput = z.infer<typeof ModifyIterationOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyIterationInput, ModifyIterationOutput> = {
  action: 'ModifyIteration',
  method: 'POST',
  inputSchema: ModifyIterationInputSchema,
  outputSchema: ModifyIterationOutputSchema,
};

// --------------- Action ---------------

/** 修改迭代 */
export const ModifyIteration = (
  client: CodingClient,
  params: ModifyIterationInput,
): Promise<Either<SdkError, ModifyIterationOutput>> => executeAction(client.config, spec, params);
