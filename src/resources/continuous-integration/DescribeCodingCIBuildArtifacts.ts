import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BuildDescribeCodingCIBuildArtifactsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建任务制品查询 - 请求参数 */
export const DescribeCodingCIBuildArtifactsInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
});

/** 构建任务制品查询 - 响应数据 */
export const DescribeCodingCIBuildArtifactsOutputSchema = z.object({
  /** 构建任务的制品信息 */
  Data: BuildDescribeCodingCIBuildArtifactsDataSchema.describe('构建任务的制品信息'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildArtifactsInput = z.infer<
  typeof DescribeCodingCIBuildArtifactsInputSchema
>;
export type DescribeCodingCIBuildArtifactsOutput = z.infer<
  typeof DescribeCodingCIBuildArtifactsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildArtifactsInput, DescribeCodingCIBuildArtifactsOutput> =
  {
    action: 'DescribeCodingCIBuildArtifacts',
    method: 'POST',
    inputSchema: DescribeCodingCIBuildArtifactsInputSchema,
    outputSchema: DescribeCodingCIBuildArtifactsOutputSchema,
  };

// --------------- Action ---------------

/** 查询构建任务制品 */
export const DescribeCodingCIBuildArtifacts = (
  client: CodingClient,
  params: DescribeCodingCIBuildArtifactsInput,
): Promise<Either<SdkError, DescribeCodingCIBuildArtifactsOutput>> =>
  executeAction(client.config, spec, params);
