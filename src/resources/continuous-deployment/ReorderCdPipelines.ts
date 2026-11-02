import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PipelineIdIndexSchema, ReorderCdPipelinesResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 部署流程重排序 - 请求参数 */
export const ReorderCdPipelinesInputSchema = z.object({
  /** CD 应用名 */
  Application: z.string().describe('CD 应用名'),
  /** 部署流程排序列表 */
  PipelineIdsIndices: z.array(PipelineIdIndexSchema).describe('部署流程排序列表'),
});

/** 部署流程重排序 - 响应数据 */
export const ReorderCdPipelinesOutputSchema = z.object({
  /** CD 任务执行记录数据 */
  Data: ReorderCdPipelinesResponseDataSchema.describe('CD 任务执行记录数据'),
});

// --------------- Types ---------------

export type ReorderCdPipelinesInput = z.infer<typeof ReorderCdPipelinesInputSchema>;
export type ReorderCdPipelinesOutput = z.infer<typeof ReorderCdPipelinesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ReorderCdPipelinesInput, ReorderCdPipelinesOutput> = {
  action: 'ReorderCdPipelines',
  method: 'POST',
  inputSchema: ReorderCdPipelinesInputSchema,
  outputSchema: ReorderCdPipelinesOutputSchema,
};

// --------------- Action ---------------

/** 部署流程重排序 */
export const ReorderCdPipelines = (
  client: CodingClient,
  params: ReorderCdPipelinesInput,
): Promise<Either<SdkError, ReorderCdPipelinesOutput>> =>
  executeAction(client.config, spec, params);
