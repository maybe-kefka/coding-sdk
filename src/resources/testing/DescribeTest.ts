import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TestDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试任务详情 - 请求参数 */
export const DescribeTestInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试任务 ID */
  TestId: z.number().int().optional().describe('测试任务 ID'),
});

/** 测试任务详情 - 响应数据 */
export const DescribeTestOutputSchema = z.object({
  /** 测试任务列表 */
  Data: TestDataSchema.describe('测试任务列表'),
});

// --------------- Types ---------------

export type DescribeTestInput = z.infer<typeof DescribeTestInputSchema>;
export type DescribeTestOutput = z.infer<typeof DescribeTestOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestInput, DescribeTestOutput> = {
  action: 'DescribeTest',
  method: 'POST',
  inputSchema: DescribeTestInputSchema,
  outputSchema: DescribeTestOutputSchema,
};

// --------------- Action ---------------

/** 测试任务详情 */
export const DescribeTest = (
  client: CodingClient,
  params: DescribeTestInput,
): Promise<Either<SdkError, DescribeTestOutput>> => executeAction(client.config, spec, params);
