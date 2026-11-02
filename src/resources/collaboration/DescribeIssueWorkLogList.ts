import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueWorkLogSchema } from './schemas';

// --------------- Schema ---------------

/** 查询工时日志列表 - 请求参数 */
export const DescribeIssueWorkLogListInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询工时日志列表 - 响应数据 */
export const DescribeIssueWorkLogListOutputSchema = z.object({
  /** 工时日志列表 */
  WorkLogs: z.array(IssueWorkLogSchema).describe('工时日志列表'),
});

// --------------- Types ---------------

export type DescribeIssueWorkLogListInput = z.infer<typeof DescribeIssueWorkLogListInputSchema>;
export type DescribeIssueWorkLogListOutput = z.infer<typeof DescribeIssueWorkLogListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueWorkLogListInput, DescribeIssueWorkLogListOutput> = {
  action: 'DescribeIssueWorkLogList',
  method: 'POST',
  inputSchema: DescribeIssueWorkLogListInputSchema,
  outputSchema: DescribeIssueWorkLogListOutputSchema,
};

// --------------- Action ---------------

/** 查询工时日志列表 */
export const DescribeIssueWorkLogList = (
  client: CodingClient,
  params: DescribeIssueWorkLogListInput,
): Promise<Either<SdkError, DescribeIssueWorkLogListOutput>> =>
  executeAction(client.config, spec, params);
