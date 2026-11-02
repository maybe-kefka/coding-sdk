import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIBuildStageDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建任务阶段获取 - 请求参数 */
export const DescribeCodingCIBuildStageInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
});

/** 构建任务阶段获取 - 响应数据 */
export const DescribeCodingCIBuildStageOutputSchema = z.object({
  /** 包含步骤返回信息 */
  Data: CodingCIBuildStageDataSchema.describe('包含步骤返回信息'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildStageInput = z.infer<typeof DescribeCodingCIBuildStageInputSchema>;
export type DescribeCodingCIBuildStageOutput = z.infer<
  typeof DescribeCodingCIBuildStageOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildStageInput, DescribeCodingCIBuildStageOutput> = {
  action: 'DescribeCodingCIBuildStage',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildStageInputSchema,
  outputSchema: DescribeCodingCIBuildStageOutputSchema,
};

// --------------- Action ---------------

/** 构建任务阶段获取 */
export const DescribeCodingCIBuildStage = (
  client: CodingClient,
  params: DescribeCodingCIBuildStageInput,
): Promise<Either<SdkError, DescribeCodingCIBuildStageOutput>> =>
  executeAction(client.config, spec, params);
