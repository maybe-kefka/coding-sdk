import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 构建停止 - 请求参数 */
export const StopCodingCIBuildInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
});

/** 构建停止 - 响应数据 */
export const StopCodingCIBuildOutputSchema = z.object({});

// --------------- Types ---------------

export type StopCodingCIBuildInput = z.infer<typeof StopCodingCIBuildInputSchema>;
export type StopCodingCIBuildOutput = z.infer<typeof StopCodingCIBuildOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<StopCodingCIBuildInput, StopCodingCIBuildOutput> = {
  action: 'StopCodingCIBuild',
  method: 'POST',
  inputSchema: StopCodingCIBuildInputSchema,
  outputSchema: StopCodingCIBuildOutputSchema,
};

// --------------- Action ---------------

/** 构建停止 */
export const StopCodingCIBuild = (
  client: CodingClient,
  params: StopCodingCIBuildInput,
): Promise<Either<SdkError, StopCodingCIBuildOutput>> => executeAction(client.config, spec, params);
