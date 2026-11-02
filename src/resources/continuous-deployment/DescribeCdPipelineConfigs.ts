import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdPipelineConfigsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 应用下的所有部署流程配置获取 - 请求参数 */
export const DescribeCdPipelineConfigsInputSchema = z.object({
  /** CD 应用名 */
  Application: z.string().describe('CD 应用名'),
});

/** CD 应用下的所有部署流程配置获取 - 响应数据 */
export const DescribeCdPipelineConfigsOutputSchema = z.object({
  /** CD 部署流程配置数据 */
  Data: DescribeCdPipelineConfigsResponseDataSchema.describe('CD 部署流程配置数据'),
});

// --------------- Types ---------------

export type DescribeCdPipelineConfigsInput = z.infer<typeof DescribeCdPipelineConfigsInputSchema>;
export type DescribeCdPipelineConfigsOutput = z.infer<typeof DescribeCdPipelineConfigsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdPipelineConfigsInput, DescribeCdPipelineConfigsOutput> = {
  action: 'DescribeCdPipelineConfigs',
  method: 'POST',
  inputSchema: DescribeCdPipelineConfigsInputSchema,
  outputSchema: DescribeCdPipelineConfigsOutputSchema,
};

// --------------- Action ---------------

/** CD 应用下的所有部署流程配置获取 */
export const DescribeCdPipelineConfigs = (
  client: CodingClient,
  params: DescribeCdPipelineConfigsInput,
): Promise<Either<SdkError, DescribeCdPipelineConfigsOutput>> =>
  executeAction(client.config, spec, params);
