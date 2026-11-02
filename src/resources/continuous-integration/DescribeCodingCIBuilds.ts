import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCodingCIBuildsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建计划的构建列表获取 - 请求参数 */
export const DescribeCodingCIBuildsInputSchema = z.object({
  /** 构建计划 ID */
  JobId: z.number().int().describe('构建计划 ID'),
  /** 页码 */
  PageNumber: z.number().int().describe('页码'),
  /** 每页条数 */
  PageSize: z.number().int().describe('每页条数'),
});

/** 构建计划的构建列表获取 - 响应数据 */
export const DescribeCodingCIBuildsOutputSchema = z.object({
  /** 构建列表 */
  Data: DescribeCodingCIBuildsDataSchema.describe('构建列表'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildsInput = z.infer<typeof DescribeCodingCIBuildsInputSchema>;
export type DescribeCodingCIBuildsOutput = z.infer<typeof DescribeCodingCIBuildsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildsInput, DescribeCodingCIBuildsOutput> = {
  action: 'DescribeCodingCIBuilds',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildsInputSchema,
  outputSchema: DescribeCodingCIBuildsOutputSchema,
};

// --------------- Action ---------------

/** 构建计划的构建列表获取 */
export const DescribeCodingCIBuilds = (
  client: CodingClient,
  params: DescribeCodingCIBuildsInput,
): Promise<Either<SdkError, DescribeCodingCIBuildsOutput>> =>
  executeAction(client.config, spec, params);
