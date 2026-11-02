import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueConditionSchema, OpenApiIssueListDataWithPageSchema } from './schemas';

// --------------- Schema ---------------

/** 事项列表（新），返回分页信息 - 请求参数 */
export const DescribeIssueListWithPageInputSchema = z.object({
  /** 筛选条件 */
  Conditions: IssueConditionSchema.optional().describe('筛选条件'),
  /** 是否展示子工作项 */
  ExcludeSubTask: z.boolean().optional().describe('是否展示子工作项'),
  /** ALL - 全部事项 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 */
  IssueType: z
    .string()
    .describe('ALL - 全部事项 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗'),
  /** 页码 */
  PageNumber: z.number().int().describe('页码'),
  /** 每页展示数，默认 20 ，最大值 500 */
  PageSize: z.number().int().describe('每页展示数，默认 20 ，最大值 500'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 是否展示子事项 */
  ShowSubIssues: z.boolean().optional().describe('是否展示子事项'),
  /** 排序字段，默认：CODE 可选值：STATUS, CREATED_AT, PRIORITY, UPDATED_AT, DUE_DATE, CODE, JOIN_ITERATION_AT, STATUS_TYPE, ASSIGNEE, PROJECT_ID, ISSUE_STATUS_ID, ISSUE_ITERATION_SORT, ISSUE_ROADMAP_SORT, PARENT_ID, COMPLETED_AT */
  SortKey: z
    .string()
    .optional()
    .describe(
      '排序字段，默认：CODE 可选值：STATUS, CREATED_AT, PRIORITY, UPDATED_AT, DUE_DATE, CODE, JOIN_ITERATION_AT, STATUS_TYPE, ASSIGNEE, PROJECT_ID, ISSUE_STATUS_ID, ISSUE_ITERATION_SORT, ISSUE_ROADMAP_SORT, PARENT_ID, COMPLETED_AT',
    ),
  /** 	排序方式 DESC - 倒序（默认值） ASC - 正序 */
  SortValue: z.string().optional().describe('	排序方式 DESC - 倒序（默认值） ASC - 正序'),
  /** 是否查询描述中图片的下载地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否查询描述中图片的下载地址'),
});

/** 事项列表（新），返回分页信息 - 响应数据 */
export const DescribeIssueListWithPageOutputSchema = z.object({
  /** 数据 */
  Data: OpenApiIssueListDataWithPageSchema.optional().describe('数据'),
});

// --------------- Types ---------------

export type DescribeIssueListWithPageInput = z.infer<typeof DescribeIssueListWithPageInputSchema>;
export type DescribeIssueListWithPageOutput = z.infer<typeof DescribeIssueListWithPageOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueListWithPageInput, DescribeIssueListWithPageOutput> = {
  action: 'DescribeIssueListWithPage',
  method: 'POST',
  inputSchema: DescribeIssueListWithPageInputSchema,
  outputSchema: DescribeIssueListWithPageOutputSchema,
};

// --------------- Action ---------------

/** 事项列表（新），返回分页信息 */
export const DescribeIssueListWithPage = (
  client: CodingClient,
  params: DescribeIssueListWithPageInput,
): Promise<Either<SdkError, DescribeIssueListWithPageOutput>> =>
  executeAction(client.config, spec, params);
