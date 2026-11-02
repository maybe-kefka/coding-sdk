import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  IssueListDataSchema,
  TeamIssueConditionSchema,
  TeamIssueSortConditionSchema,
} from './schemas';

// --------------- Schema ---------------

/** 查询团队事项列表 - 请求参数 */
export const DescribeTeamIssuesInputSchema = z.object({
  /** 筛选条件列表 */
  Conditions: z.array(TeamIssueConditionSchema).optional().describe('筛选条件列表'),
  /** 排序条件列表 */
  Sorts: z.array(TeamIssueSortConditionSchema).optional().describe('排序条件列表'),
  /** 分页大小， 最大500 */
  PageSize: z.number().int().optional().describe('分页大小， 最大500'),
  /** 页码, 从1开始 */
  PageNumber: z.number().int().optional().describe('页码, 从1开始'),
  /** 是否展示子事项 */
  ShowSubIssues: z.boolean().optional().describe('是否展示子事项'),
  /** 是否显示描述中真实的图片路径(cos/minio) */
  ShowImageOutUrl: z.boolean().optional().describe('是否显示描述中真实的图片路径(cos/minio)'),
});

/** 查询团队事项列表 - 响应数据 */
export const DescribeTeamIssuesOutputSchema = z.object({
  /** 事项列表 */
  Issues: z.array(IssueListDataSchema).describe('事项列表'),
  /** 页码 */
  PageNumber: z.number().int().optional().describe('页码'),
  /** 分页的大小 */
  PageSize: z.number().int().optional().describe('分页的大小'),
  /** 所有行数 */
  TotalCount: z.number().int().optional().describe('所有行数'),
  /** 全部页 */
  TotalPage: z.number().int().optional().describe('全部页'),
});

// --------------- Types ---------------

export type DescribeTeamIssuesInput = z.infer<typeof DescribeTeamIssuesInputSchema>;
export type DescribeTeamIssuesOutput = z.infer<typeof DescribeTeamIssuesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamIssuesInput, DescribeTeamIssuesOutput> = {
  action: 'DescribeTeamIssues',
  method: 'POST',
  inputSchema: DescribeTeamIssuesInputSchema,
  outputSchema: DescribeTeamIssuesOutputSchema,
};

// --------------- Action ---------------

/** 查询团队事项列表 */
export const DescribeTeamIssues = (
  client: CodingClient,
  params: DescribeTeamIssuesInput,
): Promise<Either<SdkError, DescribeTeamIssuesOutput>> =>
  executeAction(client.config, spec, params);
