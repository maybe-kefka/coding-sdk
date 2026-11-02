import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** CD 部署流程删除 - 请求参数 */
export const DeleteCdPipelineInputSchema = z.object({
  /** CD 应用名 */
  Application: z.string().describe('CD 应用名'),
  /** 部署流程名称 */
  PipelineName: z.string().describe('部署流程名称'),
});

/** CD 部署流程删除 - 响应数据 */
export const DeleteCdPipelineOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteCdPipelineInput = z.infer<typeof DeleteCdPipelineInputSchema>;
export type DeleteCdPipelineOutput = z.infer<typeof DeleteCdPipelineOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteCdPipelineInput, DeleteCdPipelineOutput> = {
  action: 'DeleteCdPipeline',
  method: 'POST',
  inputSchema: DeleteCdPipelineInputSchema,
  outputSchema: DeleteCdPipelineOutputSchema,
};

// --------------- Action ---------------

/** CD 部署流程删除 */
export const DeleteCdPipeline = (
  client: CodingClient,
  params: DeleteCdPipelineInput,
): Promise<Either<SdkError, DeleteCdPipelineOutput>> => executeAction(client.config, spec, params);
