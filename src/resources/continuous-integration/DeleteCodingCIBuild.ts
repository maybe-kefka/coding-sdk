import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 构建删除 - 请求参数 */
export const DeleteCodingCIBuildInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
});

/** 构建删除 - 响应数据 */
export const DeleteCodingCIBuildOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteCodingCIBuildInput = z.infer<typeof DeleteCodingCIBuildInputSchema>;
export type DeleteCodingCIBuildOutput = z.infer<typeof DeleteCodingCIBuildOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteCodingCIBuildInput, DeleteCodingCIBuildOutput> = {
  action: 'DeleteCodingCIBuild',
  method: 'POST',
  inputSchema: DeleteCodingCIBuildInputSchema,
  outputSchema: DeleteCodingCIBuildOutputSchema,
};

// --------------- Action ---------------

/** 删除构建 */
export const DeleteCodingCIBuild = (
  client: CodingClient,
  params: DeleteCodingCIBuildInput,
): Promise<Either<SdkError, DeleteCodingCIBuildOutput>> =>
  executeAction(client.config, spec, params);
