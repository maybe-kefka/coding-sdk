import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TriggerCdPipelineResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 部署流程触发 - 请求参数 */
export const TriggerCdPipelineInputSchema = z.object({
  /** CD 应用名 */
  Application: z.string().describe('CD 应用名'),
  /** 部署流程名称或 ID */
  PipelineNameOrId: z.string().describe('部署流程名称或 ID'),
  /** 触发参数 JSON 配置 */
  TriggerJsonContent: z.string().describe('触发参数 JSON 配置'),
});

/** 部署流程触发 - 响应数据 */
export const TriggerCdPipelineOutputSchema = z.object({
  /** 部署流程执行记录数据 */
  Data: TriggerCdPipelineResponseDataSchema.describe('部署流程执行记录数据'),
});

// --------------- Types ---------------

export type TriggerCdPipelineInput = z.infer<typeof TriggerCdPipelineInputSchema>;
export type TriggerCdPipelineOutput = z.infer<typeof TriggerCdPipelineOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<TriggerCdPipelineInput, TriggerCdPipelineOutput> = {
  action: 'TriggerCdPipeline',
  method: 'POST',
  inputSchema: TriggerCdPipelineInputSchema,
  outputSchema: TriggerCdPipelineOutputSchema,
};

// --------------- Action ---------------

/** 部署流程触发 */
export const TriggerCdPipeline = (
  client: CodingClient,
  params: TriggerCdPipelineInput,
): Promise<Either<SdkError, TriggerCdPipelineOutput>> => executeAction(client.config, spec, params);
