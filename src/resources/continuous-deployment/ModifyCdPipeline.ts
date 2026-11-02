import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ModifyCdPipelineResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 部署流程修改 - 请求参数 */
export const ModifyCdPipelineInputSchema = z.object({
  /** 部署流程 ID */
  PipelineConfigId: z.string().describe('部署流程 ID'),
  /** 部署流程 JSON 配置 */
  PipelineJsonContent: z.string().describe('部署流程 JSON 配置'),
});

/** CD 部署流程修改 - 响应数据 */
export const ModifyCdPipelineOutputSchema = z.object({
  /** 修改部署流程响应数据 */
  Data: ModifyCdPipelineResponseDataSchema.describe('修改部署流程响应数据'),
});

// --------------- Types ---------------

export type ModifyCdPipelineInput = z.infer<typeof ModifyCdPipelineInputSchema>;
export type ModifyCdPipelineOutput = z.infer<typeof ModifyCdPipelineOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyCdPipelineInput, ModifyCdPipelineOutput> = {
  action: 'ModifyCdPipeline',
  method: 'POST',
  inputSchema: ModifyCdPipelineInputSchema,
  outputSchema: ModifyCdPipelineOutputSchema,
};

// --------------- Action ---------------

/** CD 部署流程修改 */
export const ModifyCdPipeline = (
  client: CodingClient,
  params: ModifyCdPipelineInput,
): Promise<Either<SdkError, ModifyCdPipelineOutput>> => executeAction(client.config, spec, params);
