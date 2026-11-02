import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCodingCIBuildMetricsSchema } from './schemas';

// --------------- Schema ---------------

/** 构建计划度量查询 - 请求参数 */
export const DescribeCodingCIBuildMetricsInputSchema = z.object({
  /** 结束时间 2020-11-20 */
  EndTime: z.string().describe('结束时间 2020-11-20'),
  /** 项目 ID,Type 为 PROJECT 时必填 */
  ProjectId: z.number().int().optional().describe('项目 ID,Type 为 PROJECT 时必填'),
  /** 开始时间 2020-11-10 */
  StartTime: z.string().describe('开始时间 2020-11-10'),
  /** 查询级别 PROJECT 级别，TEAM 级别，目前只支持 PROJECT */
  Type: z.string().optional().describe('查询级别 PROJECT 级别，TEAM 级别，目前只支持 PROJECT'),
});

/** 构建计划度量查询 - 响应数据 */
export const DescribeCodingCIBuildMetricsOutputSchema = z.object({
  /** BuildMetrics 数组结构 */
  Data: z.array(DescribeCodingCIBuildMetricsSchema).nullable().describe('BuildMetrics 数组结构'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildMetricsInput = z.infer<
  typeof DescribeCodingCIBuildMetricsInputSchema
>;
export type DescribeCodingCIBuildMetricsOutput = z.infer<
  typeof DescribeCodingCIBuildMetricsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildMetricsInput, DescribeCodingCIBuildMetricsOutput> = {
  action: 'DescribeCodingCIBuildMetrics',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildMetricsInputSchema,
  outputSchema: DescribeCodingCIBuildMetricsOutputSchema,
};

// --------------- Action ---------------

/** 构建计划度量查询 */
export const DescribeCodingCIBuildMetrics = (
  client: CodingClient,
  params: DescribeCodingCIBuildMetricsInput,
): Promise<Either<SdkError, DescribeCodingCIBuildMetricsOutput>> =>
  executeAction(client.config, spec, params);
