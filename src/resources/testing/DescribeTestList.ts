import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TestsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试任务列表 - 请求参数 */
export const DescribeTestListInputSchema = z.object({
  /** 优先级 */
  Priority: z.number().int().optional().describe('优先级'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试计划 ID */
  RunId: z.number().int().optional().describe('测试计划 ID'),
  /** 测试状态,UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败 */
  Status: z
    .string()
    .optional()
    .describe('测试状态,UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败'),
});

/** 测试任务列表 - 响应数据 */
export const DescribeTestListOutputSchema = z.object({
  /** 测试任务列表 */
  Data: TestsDataSchema.describe('测试任务列表'),
});

// --------------- Types ---------------

export type DescribeTestListInput = z.infer<typeof DescribeTestListInputSchema>;
export type DescribeTestListOutput = z.infer<typeof DescribeTestListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestListInput, DescribeTestListOutput> = {
  action: 'DescribeTestList',
  method: 'POST',
  inputSchema: DescribeTestListInputSchema,
  outputSchema: DescribeTestListOutputSchema,
};

// --------------- Action ---------------

/** 测试任务列表 */
export const DescribeTestList = (
  client: CodingClient,
  params: DescribeTestListInput,
): Promise<Either<SdkError, DescribeTestListOutput>> => executeAction(client.config, spec, params);
