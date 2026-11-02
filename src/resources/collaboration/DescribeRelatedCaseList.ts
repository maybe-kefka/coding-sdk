import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RelatedCaseSchema } from './schemas';

// --------------- Schema ---------------

/** 管理测试用例 - 请求参数 */
export const DescribeRelatedCaseListInputSchema = z.object({
  /** 事项ID */
  IssueCode: z.number().int().describe('事项ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 管理测试用例 - 响应数据 */
export const DescribeRelatedCaseListOutputSchema = z.object({
  /** 事项关联的测试用例 */
  Cases: z.array(RelatedCaseSchema).optional().describe('事项关联的测试用例'),
});

// --------------- Types ---------------

export type DescribeRelatedCaseListInput = z.infer<typeof DescribeRelatedCaseListInputSchema>;
export type DescribeRelatedCaseListOutput = z.infer<typeof DescribeRelatedCaseListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeRelatedCaseListInput, DescribeRelatedCaseListOutput> = {
  action: 'DescribeRelatedCaseList',
  method: 'POST',
  inputSchema: DescribeRelatedCaseListInputSchema,
  outputSchema: DescribeRelatedCaseListOutputSchema,
};

// --------------- Action ---------------

/** 管理测试用例 */
export const DescribeRelatedCaseList = (
  client: CodingClient,
  params: DescribeRelatedCaseListInput,
): Promise<Either<SdkError, DescribeRelatedCaseListOutput>> =>
  executeAction(client.config, spec, params);
