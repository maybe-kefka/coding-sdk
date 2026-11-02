import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdPipelineConfigResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 部署流程配置-根据名称获取 - 请求参数 */
export const DescribeCdPipelineConfigInputSchema = z.object({
  /** CD 应用名 */
  Application: z.string().describe('CD 应用名'),
  /** 部署流程名称 */
  PipelineName: z.string().describe('部署流程名称'),
});

/** CD 部署流程配置-根据名称获取 - 响应数据 */
export const DescribeCdPipelineConfigOutputSchema = z.object({
  /** CD 部署流程配置数据 */
  Data: DescribeCdPipelineConfigResponseDataSchema.describe('CD 部署流程配置数据'),
});

// --------------- Types ---------------

export type DescribeCdPipelineConfigInput = z.infer<typeof DescribeCdPipelineConfigInputSchema>;
export type DescribeCdPipelineConfigOutput = z.infer<typeof DescribeCdPipelineConfigOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdPipelineConfigInput, DescribeCdPipelineConfigOutput> = {
  action: 'DescribeCdPipelineConfig',
  method: 'POST',
  inputSchema: DescribeCdPipelineConfigInputSchema,
  outputSchema: DescribeCdPipelineConfigOutputSchema,
};

// --------------- Action ---------------

/** CD 部署流程配置-根据名称获取 */
export const DescribeCdPipelineConfig = (
  client: CodingClient,
  params: DescribeCdPipelineConfigInput,
): Promise<Either<SdkError, DescribeCdPipelineConfigOutput>> =>
  executeAction(client.config, spec, params);
