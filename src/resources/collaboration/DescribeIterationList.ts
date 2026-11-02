import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeIterationListDataSchema } from './schemas';

// --------------- Schema ---------------

/** 迭代列表 - 请求参数 */
export const DescribeIterationListInputSchema = z.object({
  /** 处理人 ID 列表 */
  Assignee: z.array(z.number().int()).optional().describe('处理人 ID 列表'),
  /** 通过结束时间过滤，时间格式：2020-12-12 */
  EndDate: z.string().date().optional().describe('通过结束时间过滤，时间格式：2020-12-12'),
  /** 通过关键字搜索 */
  Keywords: z.string().optional().describe('通过关键字搜索'),
  /** 每页数量，默认 20 */
  Limit: z.number().int().optional().describe('每页数量，默认 20'),
  /** 偏移量，默认 0 */
  Offset: z.number().int().optional().describe('偏移量，默认 0'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 通过开始时间过滤，时间格式：2020-12-12 */
  StartDate: z.string().date().optional().describe('通过开始时间过滤，时间格式：2020-12-12'),
  /** 迭代状态,  WAIT_PROCESS,PROCESSING,COMPLETED */
  Status: z.array(z.string()).optional().describe('迭代状态,  WAIT_PROCESS,PROCESSING,COMPLETED'),
});

/** 迭代列表 - 响应数据 */
export const DescribeIterationListOutputSchema = z.object({
  /** 迭代列表信息 */
  Data: DescribeIterationListDataSchema.describe('迭代列表信息'),
});

// --------------- Types ---------------

export type DescribeIterationListInput = z.infer<typeof DescribeIterationListInputSchema>;
export type DescribeIterationListOutput = z.infer<typeof DescribeIterationListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIterationListInput, DescribeIterationListOutput> = {
  action: 'DescribeIterationList',
  method: 'POST',
  inputSchema: DescribeIterationListInputSchema,
  outputSchema: DescribeIterationListOutputSchema,
};

// --------------- Action ---------------

/** 迭代列表 */
export const DescribeIterationList = (
  client: CodingClient,
  params: DescribeIterationListInput,
): Promise<Either<SdkError, DescribeIterationListOutput>> =>
  executeAction(client.config, spec, params);
