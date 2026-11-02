import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIBuildStepDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建任务指定阶段的步骤获取 - 请求参数 */
export const DescribeCodingCIBuildStepInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
  /** 阶段 ID */
  StageId: z.number().int().describe('阶段 ID'),
});

/** 构建任务指定阶段的步骤获取 - 响应数据 */
export const DescribeCodingCIBuildStepOutputSchema = z.object({
  /** Step 信息 */
  Data: CodingCIBuildStepDataSchema.describe('Step 信息'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildStepInput = z.infer<typeof DescribeCodingCIBuildStepInputSchema>;
export type DescribeCodingCIBuildStepOutput = z.infer<typeof DescribeCodingCIBuildStepOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildStepInput, DescribeCodingCIBuildStepOutput> = {
  action: 'DescribeCodingCIBuildStep',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildStepInputSchema,
  outputSchema: DescribeCodingCIBuildStepOutputSchema,
};

// --------------- Action ---------------

/** 构建任务指定阶段的步骤获取 */
export const DescribeCodingCIBuildStep = (
  client: CodingClient,
  params: DescribeCodingCIBuildStepInput,
): Promise<Either<SdkError, DescribeCodingCIBuildStepOutput>> =>
  executeAction(client.config, spec, params);
