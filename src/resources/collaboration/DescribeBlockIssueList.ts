import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueSimpleDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询后置事项 - 请求参数 */
export const DescribeBlockIssueListInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询后置事项 - 响应数据 */
export const DescribeBlockIssueListOutputSchema = z.object({
  /** 后置事项列表 */
  Issues: z.array(IssueSimpleDataSchema).describe('后置事项列表'),
});

// --------------- Types ---------------

export type DescribeBlockIssueListInput = z.infer<typeof DescribeBlockIssueListInputSchema>;
export type DescribeBlockIssueListOutput = z.infer<typeof DescribeBlockIssueListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeBlockIssueListInput, DescribeBlockIssueListOutput> = {
  action: 'DescribeBlockIssueList',
  method: 'POST',
  inputSchema: DescribeBlockIssueListInputSchema,
  outputSchema: DescribeBlockIssueListOutputSchema,
};

// --------------- Action ---------------

/** 查询后置事项 */
export const DescribeBlockIssueList = (
  client: CodingClient,
  params: DescribeBlockIssueListInput,
): Promise<Either<SdkError, DescribeBlockIssueListOutput>> =>
  executeAction(client.config, spec, params);
