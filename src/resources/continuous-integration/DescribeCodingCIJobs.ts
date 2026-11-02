import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIJobSchema, FilterSchema } from './schemas';

// --------------- Schema ---------------

/** 构建计划查询（通过项目ID） - 请求参数 */
export const DescribeCodingCIJobsInputSchema = z.object({
  /** 过滤参数 */
  Filter: z.array(FilterSchema).optional().describe('过滤参数'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
});

/** 构建计划查询（通过项目ID） - 响应数据 */
export const DescribeCodingCIJobsOutputSchema = z.object({
  /** CI 任务列表 */
  JobList: z.array(CodingCIJobSchema).describe('CI 任务列表'),
});

// --------------- Types ---------------

export type DescribeCodingCIJobsInput = z.infer<typeof DescribeCodingCIJobsInputSchema>;
export type DescribeCodingCIJobsOutput = z.infer<typeof DescribeCodingCIJobsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIJobsInput, DescribeCodingCIJobsOutput> = {
  action: 'DescribeCodingCIJobs',
  method: 'POST',
  inputSchema: DescribeCodingCIJobsInputSchema,
  outputSchema: DescribeCodingCIJobsOutputSchema,
};

// --------------- Action ---------------

/** 构建计划查询（通过项目ID） */
export const DescribeCodingCIJobs = (
  client: CodingClient,
  params: DescribeCodingCIJobsInput,
): Promise<Either<SdkError, DescribeCodingCIJobsOutput>> =>
  executeAction(client.config, spec, params);
