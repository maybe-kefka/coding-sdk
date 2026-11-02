import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueWorkLogSchema } from './schemas';

// --------------- Schema ---------------

/** 查询全部有权限的项目工时日志列表 - 请求参数 */
export const DescribeAllProjectsIssueWorkLogListInputSchema = z.object({
  /** 结束时间 */
  EndAt: z.number().int().optional().describe('结束时间'),
  /** 每页数量，默认 20，最大1000 */
  Limit: z.number().int().optional().describe('每页数量，默认 20，最大1000'),
  /** 偏移量，默认 0 */
  Offset: z.number().int().optional().describe('偏移量，默认 0'),
  /** 项目名称 */
  ProjectName: z.string().optional().describe('项目名称'),
  /** 开始时间 */
  StartAt: z.number().int().optional().describe('开始时间'),
  /** 用户 ID */
  UserId: z.number().int().optional().describe('用户 ID'),
});

/** 查询全部有权限的项目工时日志列表 - 响应数据 */
export const DescribeAllProjectsIssueWorkLogListOutputSchema = z.object({
  /** 工时日志列表 */
  WorkLogs: z.array(IssueWorkLogSchema).describe('工时日志列表'),
});

// --------------- Types ---------------

export type DescribeAllProjectsIssueWorkLogListInput = z.infer<
  typeof DescribeAllProjectsIssueWorkLogListInputSchema
>;
export type DescribeAllProjectsIssueWorkLogListOutput = z.infer<
  typeof DescribeAllProjectsIssueWorkLogListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeAllProjectsIssueWorkLogListInput,
  DescribeAllProjectsIssueWorkLogListOutput
> = {
  action: 'DescribeAllProjectsIssueWorkLogList',
  method: 'POST',
  inputSchema: DescribeAllProjectsIssueWorkLogListInputSchema,
  outputSchema: DescribeAllProjectsIssueWorkLogListOutputSchema,
};

// --------------- Action ---------------

/** 查询全部有权限的项目工时日志列表 */
export const DescribeAllProjectsIssueWorkLogList = (
  client: CodingClient,
  params: DescribeAllProjectsIssueWorkLogListInput,
): Promise<Either<SdkError, DescribeAllProjectsIssueWorkLogListOutput>> =>
  executeAction(client.config, spec, params);
