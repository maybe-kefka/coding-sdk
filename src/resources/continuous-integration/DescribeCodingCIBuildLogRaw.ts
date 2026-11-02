import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCodingCIBuildLogRawDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建完整日志查询（原始日志 Raw） - 请求参数 */
export const DescribeCodingCIBuildLogRawInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
  /** 日志开始位置 */
  Start: z.number().int().describe('日志开始位置'),
});

/** 构建完整日志查询（原始日志 Raw） - 响应数据 */
export const DescribeCodingCIBuildLogRawOutputSchema = z.object({
  /** 构建原始日志 */
  Data: DescribeCodingCIBuildLogRawDataSchema.describe('构建原始日志'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildLogRawInput = z.infer<
  typeof DescribeCodingCIBuildLogRawInputSchema
>;
export type DescribeCodingCIBuildLogRawOutput = z.infer<
  typeof DescribeCodingCIBuildLogRawOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildLogRawInput, DescribeCodingCIBuildLogRawOutput> = {
  action: 'DescribeCodingCIBuildLogRaw',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildLogRawInputSchema,
  outputSchema: DescribeCodingCIBuildLogRawOutputSchema,
};

// --------------- Action ---------------

/** 构建完整日志查询（原始日志 Raw） */
export const DescribeCodingCIBuildLogRaw = (
  client: CodingClient,
  params: DescribeCodingCIBuildLogRawInput,
): Promise<Either<SdkError, DescribeCodingCIBuildLogRawOutput>> =>
  executeAction(client.config, spec, params);
