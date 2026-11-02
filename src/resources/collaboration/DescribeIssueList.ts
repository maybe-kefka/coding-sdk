import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueConditionSchema, IssueListDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项列表 - 请求参数 */
export const DescribeIssueListInputSchema = z.object({
  /** 筛选条件列表 */
  Conditions: z.array(IssueConditionSchema).optional().describe('筛选条件列表'),
  /** 事项类型 ALL - 全部事项 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 */
  IssueType: z
    .string()
    .describe(
      '事项类型 ALL - 全部事项 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗',
    ),
  /** 限制数目，默认 20 */
  Limit: z.number().int().optional().describe('限制数目，默认 20'),
  /** 偏移量，默认 0 */
  Offset: z.number().int().optional().describe('偏移量，默认 0'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 排序字段，默认：CODE 可选值：STATUS, CREATED_AT, PRIORITY, UPDATED_AT, DUE_DATE, CODE, JOIN_ITERATION_AT, STATUS_TYPE, ASSIGNEE, PROJECT_ID, ISSUE_STATUS_ID, ISSUE_ITERATION_SORT, ISSUE_ROADMAP_SORT, PARENT_ID, COMPLETED_AT */
  SortKey: z
    .string()
    .optional()
    .describe(
      '排序字段，默认：CODE 可选值：STATUS, CREATED_AT, PRIORITY, UPDATED_AT, DUE_DATE, CODE, JOIN_ITERATION_AT, STATUS_TYPE, ASSIGNEE, PROJECT_ID, ISSUE_STATUS_ID, ISSUE_ITERATION_SORT, ISSUE_ROADMAP_SORT, PARENT_ID, COMPLETED_AT',
    ),
  /** 排序方式 DESC - 倒序（默认值） ASC - 正序 */
  SortValue: z.string().optional().describe('排序方式 DESC - 倒序（默认值） ASC - 正序'),
  /** 是否查询描述中图片的下载地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否查询描述中图片的下载地址'),
});

/** 查询事项列表 - 响应数据 */
export const DescribeIssueListOutputSchema = z.object({
  /** 事项列表 */
  IssueList: z.array(IssueListDataSchema).describe('事项列表'),
});

// --------------- Types ---------------

export type DescribeIssueListInput = z.infer<typeof DescribeIssueListInputSchema>;
export type DescribeIssueListOutput = z.infer<typeof DescribeIssueListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueListInput, DescribeIssueListOutput> = {
  action: 'DescribeIssueList',
  method: 'POST',
  inputSchema: DescribeIssueListInputSchema,
  outputSchema: DescribeIssueListOutputSchema,
};

// --------------- Action ---------------

/** 查询事项列表 */
export const DescribeIssueList = (
  client: CodingClient,
  params: DescribeIssueListInput,
): Promise<Either<SdkError, DescribeIssueListOutput>> => executeAction(client.config, spec, params);
