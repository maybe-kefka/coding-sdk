import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueListDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询子事项列表 - 请求参数 */
export const DescribeSubIssueListInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询子事项列表 - 响应数据 */
export const DescribeSubIssueListOutputSchema = z.object({
  /** 子事项列表 */
  SubIssueList: z.array(IssueListDataSchema).describe('子事项列表'),
});

// --------------- Types ---------------

export type DescribeSubIssueListInput = z.infer<typeof DescribeSubIssueListInputSchema>;
export type DescribeSubIssueListOutput = z.infer<typeof DescribeSubIssueListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeSubIssueListInput, DescribeSubIssueListOutput> = {
  action: 'DescribeSubIssueList',
  method: 'POST',
  inputSchema: DescribeSubIssueListInputSchema,
  outputSchema: DescribeSubIssueListOutputSchema,
};

// --------------- Action ---------------

/** 查询子事项列表 */
export const DescribeSubIssueList = (
  client: CodingClient,
  params: DescribeSubIssueListInput,
): Promise<Either<SdkError, DescribeSubIssueListOutput>> =>
  executeAction(client.config, spec, params);
