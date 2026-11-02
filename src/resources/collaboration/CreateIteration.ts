import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IterationSchema } from './schemas';

// --------------- Schema ---------------

/** 创建迭代 - 请求参数 */
export const CreateIterationInputSchema = z.object({
  /** 处理人 ID */
  Assignee: z.number().int().optional().describe('处理人 ID'),
  /** 结束时间，格式：2020-01-01 */
  EndAt: z.string().date().optional().describe('结束时间，格式：2020-01-01'),
  /** 目标 */
  Goal: z.string().optional().describe('目标'),
  /** 标题 */
  Name: z.string().describe('标题'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 开始时间，格式：2020-01-01 */
  StartAt: z.string().date().optional().describe('开始时间，格式：2020-01-01'),
});

/** 创建迭代 - 响应数据 */
export const CreateIterationOutputSchema = z.object({
  /** 迭代的具体信息 */
  Iteration: IterationSchema.describe('迭代的具体信息'),
});

// --------------- Types ---------------

export type CreateIterationInput = z.infer<typeof CreateIterationInputSchema>;
export type CreateIterationOutput = z.infer<typeof CreateIterationOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateIterationInput, CreateIterationOutput> = {
  action: 'CreateIteration',
  method: 'POST',
  inputSchema: CreateIterationInputSchema,
  outputSchema: CreateIterationOutputSchema,
};

// --------------- Action ---------------

/** 创建迭代 */
export const CreateIteration = (
  client: CodingClient,
  params: CreateIterationInput,
): Promise<Either<SdkError, CreateIterationOutput>> => executeAction(client.config, spec, params);
