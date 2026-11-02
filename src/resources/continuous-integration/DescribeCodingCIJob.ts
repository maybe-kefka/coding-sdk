import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIJobSchema } from './schemas';

// --------------- Schema ---------------

/** 构建计划详情获取 - 请求参数 */
export const DescribeCodingCIJobInputSchema = z.object({
  /** 构建计划 ID */
  JobId: z.number().int().describe('构建计划 ID'),
});

/** 构建计划详情获取 - 响应数据 */
export const DescribeCodingCIJobOutputSchema = z.object({
  /** 构建计划详情 */
  Job: CodingCIJobSchema.describe('构建计划详情'),
});

// --------------- Types ---------------

export type DescribeCodingCIJobInput = z.infer<typeof DescribeCodingCIJobInputSchema>;
export type DescribeCodingCIJobOutput = z.infer<typeof DescribeCodingCIJobOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIJobInput, DescribeCodingCIJobOutput> = {
  action: 'DescribeCodingCIJob',
  method: 'POST',
  inputSchema: DescribeCodingCIJobInputSchema,
  outputSchema: DescribeCodingCIJobOutputSchema,
};

// --------------- Action ---------------

/** 构建计划详情获取 */
export const DescribeCodingCIJob = (
  client: CodingClient,
  params: DescribeCodingCIJobInput,
): Promise<Either<SdkError, DescribeCodingCIJobOutput>> =>
  executeAction(client.config, spec, params);
