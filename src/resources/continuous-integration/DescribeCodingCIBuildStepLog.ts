import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCodingCIBuildStepLogDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建步骤日志获取 - 请求参数 */
export const DescribeCodingCIBuildStepLogInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
  /** 阶段 ID */
  StageId: z.number().int().describe('阶段 ID'),
  /** 日志开始位置 */
  Start: z.number().int().describe('日志开始位置'),
  /** 步骤 ID */
  StepId: z.number().int().describe('步骤 ID'),
});

/** 构建步骤日志获取 - 响应数据 */
export const DescribeCodingCIBuildStepLogOutputSchema = z.object({
  /** 日志详情 */
  Data: DescribeCodingCIBuildStepLogDataSchema.describe('日志详情'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildStepLogInput = z.infer<
  typeof DescribeCodingCIBuildStepLogInputSchema
>;
export type DescribeCodingCIBuildStepLogOutput = z.infer<
  typeof DescribeCodingCIBuildStepLogOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildStepLogInput, DescribeCodingCIBuildStepLogOutput> = {
  action: 'DescribeCodingCIBuildStepLog',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildStepLogInputSchema,
  outputSchema: DescribeCodingCIBuildStepLogOutputSchema,
};

// --------------- Action ---------------

/** 构建步骤日志获取 */
export const DescribeCodingCIBuildStepLog = (
  client: CodingClient,
  params: DescribeCodingCIBuildStepLogInput,
): Promise<Either<SdkError, DescribeCodingCIBuildStepLogOutput>> =>
  executeAction(client.config, spec, params);
