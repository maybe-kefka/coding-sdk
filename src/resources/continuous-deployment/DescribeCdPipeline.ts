import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdPipelineResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 部署流程执行记录获取 - 请求参数 */
export const DescribeCdPipelineInputSchema = z.object({
  /** 部署流程执行记录 ID */
  PipelineExecutionId: z.string().describe('部署流程执行记录 ID'),
});

/** CD 部署流程执行记录获取 - 响应数据 */
export const DescribeCdPipelineOutputSchema = z.object({
  /** 部署流程执行记录数据 */
  Data: DescribeCdPipelineResponseDataSchema.describe('部署流程执行记录数据'),
});

// --------------- Types ---------------

export type DescribeCdPipelineInput = z.infer<typeof DescribeCdPipelineInputSchema>;
export type DescribeCdPipelineOutput = z.infer<typeof DescribeCdPipelineOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdPipelineInput, DescribeCdPipelineOutput> = {
  action: 'DescribeCdPipeline',
  method: 'POST',
  inputSchema: DescribeCdPipelineInputSchema,
  outputSchema: DescribeCdPipelineOutputSchema,
};

// --------------- Action ---------------

/** CD 部署流程执行记录获取 */
export const DescribeCdPipeline = (
  client: CodingClient,
  params: DescribeCdPipelineInput,
): Promise<Either<SdkError, DescribeCdPipelineOutput>> =>
  executeAction(client.config, spec, params);
