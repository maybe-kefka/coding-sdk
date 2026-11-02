import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueSimpleDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询前置事项 - 请求参数 */
export const DescribeBlockedByIssueListInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询前置事项 - 响应数据 */
export const DescribeBlockedByIssueListOutputSchema = z.object({
  /** 前置事项列表 */
  Issues: z.array(IssueSimpleDataSchema).describe('前置事项列表'),
});

// --------------- Types ---------------

export type DescribeBlockedByIssueListInput = z.infer<typeof DescribeBlockedByIssueListInputSchema>;
export type DescribeBlockedByIssueListOutput = z.infer<
  typeof DescribeBlockedByIssueListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeBlockedByIssueListInput, DescribeBlockedByIssueListOutput> = {
  action: 'DescribeBlockedByIssueList',
  method: 'POST',
  inputSchema: DescribeBlockedByIssueListInputSchema,
  outputSchema: DescribeBlockedByIssueListOutputSchema,
};

// --------------- Action ---------------

/** 查询前置事项 */
export const DescribeBlockedByIssueList = (
  client: CodingClient,
  params: DescribeBlockedByIssueListInput,
): Promise<Either<SdkError, DescribeBlockedByIssueListOutput>> =>
  executeAction(client.config, spec, params);
