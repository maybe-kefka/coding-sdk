import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdTaskResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 任务执行记录获取 - 请求参数 */
export const DescribeCdTaskInputSchema = z.object({
  /** 任务执行记录 ID */
  TaskExecutionId: z.string().describe('任务执行记录 ID'),
});

/** CD 任务执行记录获取 - 响应数据 */
export const DescribeCdTaskOutputSchema = z.object({
  /** CD 任务执行记录数据 */
  Data: DescribeCdTaskResponseDataSchema.describe('CD 任务执行记录数据'),
});

// --------------- Types ---------------

export type DescribeCdTaskInput = z.infer<typeof DescribeCdTaskInputSchema>;
export type DescribeCdTaskOutput = z.infer<typeof DescribeCdTaskOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdTaskInput, DescribeCdTaskOutput> = {
  action: 'DescribeCdTask',
  method: 'POST',
  inputSchema: DescribeCdTaskInputSchema,
  outputSchema: DescribeCdTaskOutputSchema,
};

// --------------- Action ---------------

/** CD 任务执行记录获取 */
export const DescribeCdTask = (
  client: CodingClient,
  params: DescribeCdTaskInput,
): Promise<Either<SdkError, DescribeCdTaskOutput>> => executeAction(client.config, spec, params);
