import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCodingCIBuildLogDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建日志获取 - 请求参数 */
export const DescribeCodingCIBuildLogInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
  /** 日志的开始位置 */
  Start: z.number().int().describe('日志的开始位置'),
});

/** 构建日志获取 - 响应数据 */
export const DescribeCodingCIBuildLogOutputSchema = z.object({
  /** 日志信息 */
  Data: DescribeCodingCIBuildLogDataSchema.describe('日志信息'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildLogInput = z.infer<typeof DescribeCodingCIBuildLogInputSchema>;
export type DescribeCodingCIBuildLogOutput = z.infer<typeof DescribeCodingCIBuildLogOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildLogInput, DescribeCodingCIBuildLogOutput> = {
  action: 'DescribeCodingCIBuildLog',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildLogInputSchema,
  outputSchema: DescribeCodingCIBuildLogOutputSchema,
};

// --------------- Action ---------------

/** 构建日志获取 */
export const DescribeCodingCIBuildLog = (
  client: CodingClient,
  params: DescribeCodingCIBuildLogInput,
): Promise<Either<SdkError, DescribeCodingCIBuildLogOutput>> =>
  executeAction(client.config, spec, params);
