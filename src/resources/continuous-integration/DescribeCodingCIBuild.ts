import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIBuildSchema } from './schemas';

// --------------- Schema ---------------

/** 构建记录详情查询 - 请求参数 */
export const DescribeCodingCIBuildInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
});

/** 构建记录详情查询 - 响应数据 */
export const DescribeCodingCIBuildOutputSchema = z.object({
  /** 构建详情 */
  Build: CodingCIBuildSchema.describe('构建详情'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildInput = z.infer<typeof DescribeCodingCIBuildInputSchema>;
export type DescribeCodingCIBuildOutput = z.infer<typeof DescribeCodingCIBuildOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildInput, DescribeCodingCIBuildOutput> = {
  action: 'DescribeCodingCIBuild',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildInputSchema,
  outputSchema: DescribeCodingCIBuildOutputSchema,
};

// --------------- Action ---------------

/** 查询构建记录详情 */
export const DescribeCodingCIBuild = (
  client: CodingClient,
  params: DescribeCodingCIBuildInput,
): Promise<Either<SdkError, DescribeCodingCIBuildOutput>> =>
  executeAction(client.config, spec, params);
