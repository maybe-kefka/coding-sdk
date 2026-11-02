import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 构建计划删除 - 请求参数 */
export const DeleteCodingCIJobInputSchema = z.object({
  /** 构建计划 ID */
  JobId: z.number().int().describe('构建计划 ID'),
});

/** 构建计划删除 - 响应数据 */
export const DeleteCodingCIJobOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteCodingCIJobInput = z.infer<typeof DeleteCodingCIJobInputSchema>;
export type DeleteCodingCIJobOutput = z.infer<typeof DeleteCodingCIJobOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteCodingCIJobInput, DeleteCodingCIJobOutput> = {
  action: 'DeleteCodingCIJob',
  method: 'POST',
  inputSchema: DeleteCodingCIJobInputSchema,
  outputSchema: DeleteCodingCIJobOutputSchema,
};

// --------------- Action ---------------

/** 删除构建计划 */
export const DeleteCodingCIJob = (
  client: CodingClient,
  params: DeleteCodingCIJobInput,
): Promise<Either<SdkError, DeleteCodingCIJobOutput>> => executeAction(client.config, spec, params);
