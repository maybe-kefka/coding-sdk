import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 构建计划缓存清理 - 请求参数 */
export const ClearCodingCIJobCacheInputSchema = z.object({
  /** 构建计划ID */
  Id: z.number().int().describe('构建计划ID'),
});

/** 构建计划缓存清理 - 响应数据 */
export const ClearCodingCIJobCacheOutputSchema = z.object({});

// --------------- Types ---------------

export type ClearCodingCIJobCacheInput = z.infer<typeof ClearCodingCIJobCacheInputSchema>;
export type ClearCodingCIJobCacheOutput = z.infer<typeof ClearCodingCIJobCacheOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ClearCodingCIJobCacheInput, ClearCodingCIJobCacheOutput> = {
  action: 'ClearCodingCIJobCache',
  method: 'POST',
  inputSchema: ClearCodingCIJobCacheInputSchema,
  outputSchema: ClearCodingCIJobCacheOutputSchema,
};

// --------------- Action ---------------

/** 清理构建计划缓存 */
export const ClearCodingCIJobCache = (
  client: CodingClient,
  params: ClearCodingCIJobCacheInput,
): Promise<Either<SdkError, ClearCodingCIJobCacheOutput>> =>
  executeAction(client.config, spec, params);
