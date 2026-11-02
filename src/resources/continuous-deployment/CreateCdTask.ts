import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CreateCdTaskResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 任务执行 - 请求参数 */
export const CreateCdTaskInputSchema = z.object({
  /** 任务 JSON 配置 */
  TaskJsonContent: z.string().describe('任务 JSON 配置'),
});

/** CD 任务执行 - 响应数据 */
export const CreateCdTaskOutputSchema = z.object({
  /** CD 任务执行记录数据 */
  Data: CreateCdTaskResponseDataSchema.describe('CD 任务执行记录数据'),
});

// --------------- Types ---------------

export type CreateCdTaskInput = z.infer<typeof CreateCdTaskInputSchema>;
export type CreateCdTaskOutput = z.infer<typeof CreateCdTaskOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCdTaskInput, CreateCdTaskOutput> = {
  action: 'CreateCdTask',
  method: 'POST',
  inputSchema: CreateCdTaskInputSchema,
  outputSchema: CreateCdTaskOutputSchema,
};

// --------------- Action ---------------

/** CD 任务执行 */
export const CreateCdTask = (
  client: CodingClient,
  params: CreateCdTaskInput,
): Promise<Either<SdkError, CreateCdTaskOutput>> => executeAction(client.config, spec, params);
