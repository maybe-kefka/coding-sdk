import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueStatusChangeLogListSchema } from './schemas';

// --------------- Schema ---------------

/** 状态变更记录 - 请求参数 */
export const DescribeIssueStatusChangeLogListInputSchema = z.object({
  /** 事项code列表 */
  IssueCode: z.array(z.number().int()).describe('事项code列表'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 状态变更记录 - 响应数据 */
export const DescribeIssueStatusChangeLogListOutputSchema = z.object({
  /** 状态修改日志 */
  Logs: IssueStatusChangeLogListSchema.optional().describe('状态修改日志'),
});

// --------------- Types ---------------

export type DescribeIssueStatusChangeLogListInput = z.infer<
  typeof DescribeIssueStatusChangeLogListInputSchema
>;
export type DescribeIssueStatusChangeLogListOutput = z.infer<
  typeof DescribeIssueStatusChangeLogListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeIssueStatusChangeLogListInput,
  DescribeIssueStatusChangeLogListOutput
> = {
  action: 'DescribeIssueStatusChangeLogList',
  method: 'POST',
  inputSchema: DescribeIssueStatusChangeLogListInputSchema,
  outputSchema: DescribeIssueStatusChangeLogListOutputSchema,
};

// --------------- Action ---------------

/** 状态变更记录 */
export const DescribeIssueStatusChangeLogList = (
  client: CodingClient,
  params: DescribeIssueStatusChangeLogListInput,
): Promise<Either<SdkError, DescribeIssueStatusChangeLogListOutput>> =>
  executeAction(client.config, spec, params);
