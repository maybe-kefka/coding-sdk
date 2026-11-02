import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCodingCIBuildStatisticsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建任务统计 - 请求参数 */
export const DescribeCodingCIBuildStatisticsInputSchema = z.object({
  /** 结束时间 */
  EndTime: z.string().describe('结束时间'),
  /** MetricType 为 JOB 的时候使用该值，此时 ProjectId 可不传 */
  JobId: z
    .number()
    .int()
    .optional()
    .describe('MetricType 为 JOB 的时候使用该值，此时 ProjectId 可不传'),
  /** 统计维度 Project 还是 JOB 目前只有 PROJECT */
  MetricType: z.string().describe('统计维度 Project 还是 JOB 目前只有 PROJECT'),
  /** 统计间隔单位秒 */
  Period: z.number().int().describe('统计间隔单位秒'),
  /** MetricType 为 PROJECT 的时候使用该值，此时 JobId 可不传 */
  ProjectId: z
    .number()
    .int()
    .optional()
    .describe('MetricType 为 PROJECT 的时候使用该值，此时 JobId 可不传'),
  /** 开始时间 */
  StartTime: z.string().describe('开始时间'),
});

/** 构建任务统计 - 响应数据 */
export const DescribeCodingCIBuildStatisticsOutputSchema = z.object({
  /** 区间统计数据，单位毫秒 */
  Data: DescribeCodingCIBuildStatisticsResponseDataSchema.describe('区间统计数据，单位毫秒'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildStatisticsInput = z.infer<
  typeof DescribeCodingCIBuildStatisticsInputSchema
>;
export type DescribeCodingCIBuildStatisticsOutput = z.infer<
  typeof DescribeCodingCIBuildStatisticsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCodingCIBuildStatisticsInput,
  DescribeCodingCIBuildStatisticsOutput
> = {
  action: 'DescribeCodingCIBuildStatistics',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildStatisticsInputSchema,
  outputSchema: DescribeCodingCIBuildStatisticsOutputSchema,
};

// --------------- Action ---------------

/** 构建任务统计 */
export const DescribeCodingCIBuildStatistics = (
  client: CodingClient,
  params: DescribeCodingCIBuildStatisticsInput,
): Promise<Either<SdkError, DescribeCodingCIBuildStatisticsOutput>> =>
  executeAction(client.config, spec, params);
