import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueTypeDetailWithSplitSchema } from './schemas';

// --------------- Schema ---------------

/** 查询项目事项类型列表 - 请求参数 */
export const DescribeProjectIssueTypeListInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询项目事项类型列表 - 响应数据 */
export const DescribeProjectIssueTypeListOutputSchema = z.object({
  /** 事项类型列表 */
  IssueTypes: z.array(IssueTypeDetailWithSplitSchema).describe('事项类型列表'),
});

// --------------- Types ---------------

export type DescribeProjectIssueTypeListInput = z.infer<
  typeof DescribeProjectIssueTypeListInputSchema
>;
export type DescribeProjectIssueTypeListOutput = z.infer<
  typeof DescribeProjectIssueTypeListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectIssueTypeListInput, DescribeProjectIssueTypeListOutput> = {
  action: 'DescribeProjectIssueTypeList',
  method: 'POST',
  inputSchema: DescribeProjectIssueTypeListInputSchema,
  outputSchema: DescribeProjectIssueTypeListOutputSchema,
};

// --------------- Action ---------------

/** 查询项目事项类型列表 */
export const DescribeProjectIssueTypeList = (
  client: CodingClient,
  params: DescribeProjectIssueTypeListInput,
): Promise<Either<SdkError, DescribeProjectIssueTypeListOutput>> =>
  executeAction(client.config, spec, params);
