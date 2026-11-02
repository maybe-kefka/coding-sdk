import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** CD 部署流程取消执行 - 请求参数 */
export const CancelCdPipelineInputSchema = z.object({
  /** 部署流程执行记录 ID */
  PipelineExecutionId: z.string().describe('部署流程执行记录 ID'),
  /** 取消原因 */
  Reason: z.string().optional().describe('取消原因'),
});

/** CD 部署流程取消执行 - 响应数据 */
export const CancelCdPipelineOutputSchema = z.object({});

// --------------- Types ---------------

export type CancelCdPipelineInput = z.infer<typeof CancelCdPipelineInputSchema>;
export type CancelCdPipelineOutput = z.infer<typeof CancelCdPipelineOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CancelCdPipelineInput, CancelCdPipelineOutput> = {
  action: 'CancelCdPipeline',
  method: 'POST',
  inputSchema: CancelCdPipelineInputSchema,
  outputSchema: CancelCdPipelineOutputSchema,
};

// --------------- Action ---------------

/** 取消执行中的 CD 部署流程 */
export const CancelCdPipeline = (
  client: CodingClient,
  params: CancelCdPipelineInput,
): Promise<Either<SdkError, CancelCdPipelineOutput>> => executeAction(client.config, spec, params);
