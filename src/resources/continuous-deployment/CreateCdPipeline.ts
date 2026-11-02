import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CreateCdPipelineResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 部署流程创建 - 请求参数 */
export const CreateCdPipelineInputSchema = z.object({
  /** 部署流程 JSON 配置（注意：stages 的 refId 和 requisiteStageRefIds 字段必传） */
  PipelineJsonContent: z
    .string()
    .describe('部署流程 JSON 配置（注意：stages 的 refId 和 requisiteStageRefIds 字段必传）'),
});

/** CD 部署流程创建 - 响应数据 */
export const CreateCdPipelineOutputSchema = z.object({
  /** CD 部署流程数据 */
  Data: CreateCdPipelineResponseDataSchema.describe('CD 部署流程数据'),
});

// --------------- Types ---------------

export type CreateCdPipelineInput = z.infer<typeof CreateCdPipelineInputSchema>;
export type CreateCdPipelineOutput = z.infer<typeof CreateCdPipelineOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCdPipelineInput, CreateCdPipelineOutput> = {
  action: 'CreateCdPipeline',
  method: 'POST',
  inputSchema: CreateCdPipelineInputSchema,
  outputSchema: CreateCdPipelineOutputSchema,
};

// --------------- Action ---------------

/** CD 部署流程创建 */
export const CreateCdPipeline = (
  client: CodingClient,
  params: CreateCdPipelineInput,
): Promise<Either<SdkError, CreateCdPipelineOutput>> => executeAction(client.config, spec, params);
