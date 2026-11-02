import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CasesDataSchema } from './schemas';

// --------------- Schema ---------------

/** 需求关联的测试用例列表 - 请求参数 */
export const DescribeRequirementTestCaseListInputSchema = z.object({
  /** 需求 ID */
  IssueId: z.number().int().describe('需求 ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 需求关联的测试用例列表 - 响应数据 */
export const DescribeRequirementTestCaseListOutputSchema = z.object({
  /** 测试用例列表 */
  Data: CasesDataSchema.nullable().describe('测试用例列表'),
});

// --------------- Types ---------------

export type DescribeRequirementTestCaseListInput = z.infer<
  typeof DescribeRequirementTestCaseListInputSchema
>;
export type DescribeRequirementTestCaseListOutput = z.infer<
  typeof DescribeRequirementTestCaseListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeRequirementTestCaseListInput,
  DescribeRequirementTestCaseListOutput
> = {
  action: 'DescribeRequirementTestCaseList',
  method: 'POST',
  inputSchema: DescribeRequirementTestCaseListInputSchema,
  outputSchema: DescribeRequirementTestCaseListOutputSchema,
};

// --------------- Action ---------------

/** 需求关联的测试用例列表 */
export const DescribeRequirementTestCaseList = (
  client: CodingClient,
  params: DescribeRequirementTestCaseListInput,
): Promise<Either<SdkError, DescribeRequirementTestCaseListOutput>> =>
  executeAction(client.config, spec, params);
