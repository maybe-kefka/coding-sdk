import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CaseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例详情 - 请求参数 */
export const DescribeTestCaseInputSchema = z.object({
  /** 用例 ID */
  CaseId: z.number().int().describe('用例 ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 测试用例详情 - 响应数据 */
export const DescribeTestCaseOutputSchema = z.object({
  /** 测试用例信息 */
  Data: CaseDataSchema.nullable().describe('测试用例信息'),
});

// --------------- Types ---------------

export type DescribeTestCaseInput = z.infer<typeof DescribeTestCaseInputSchema>;
export type DescribeTestCaseOutput = z.infer<typeof DescribeTestCaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestCaseInput, DescribeTestCaseOutput> = {
  action: 'DescribeTestCase',
  method: 'POST',
  inputSchema: DescribeTestCaseInputSchema,
  outputSchema: DescribeTestCaseOutputSchema,
};

// --------------- Action ---------------

/** 测试用例详情 */
export const DescribeTestCase = (
  client: CodingClient,
  params: DescribeTestCaseInput,
): Promise<Either<SdkError, DescribeTestCaseOutput>> => executeAction(client.config, spec, params);
