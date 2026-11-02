import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RunDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试计划详情 - 请求参数 */
export const DescribeTestRunInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 计划 ID */
  RunId: z.number().int().describe('计划 ID'),
});

/** 测试计划详情 - 响应数据 */
export const DescribeTestRunOutputSchema = z.object({
  /** 测试计划信息 */
  Data: RunDataSchema.nullable().describe('测试计划信息'),
});

// --------------- Types ---------------

export type DescribeTestRunInput = z.infer<typeof DescribeTestRunInputSchema>;
export type DescribeTestRunOutput = z.infer<typeof DescribeTestRunOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestRunInput, DescribeTestRunOutput> = {
  action: 'DescribeTestRun',
  method: 'POST',
  inputSchema: DescribeTestRunInputSchema,
  outputSchema: DescribeTestRunOutputSchema,
};

// --------------- Action ---------------

/** 测试计划详情 */
export const DescribeTestRun = (
  client: CodingClient,
  params: DescribeTestRunInput,
): Promise<Either<SdkError, DescribeTestRunOutput>> => executeAction(client.config, spec, params);
