import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueDetailListDataWithPageSchema } from './schemas';

// --------------- Schema ---------------

/** 版本发布范围 - 请求参数 */
export const DescribeReleaseIssueListInputSchema = z.object({
  /** 处理人ID数组 */
  Assignees: z.array(z.number().int()).optional().describe('处理人ID数组'),
  /** 事项类型ID数组  */
  IssueTypeIds: z.array(z.number().int()).optional().describe('事项类型ID数组 '),
  /** 事项类型数组 */
  IssueTypes: z.array(z.string()).optional().describe('事项类型数组'),
  /** 关键字 */
  Keywords: z.string().optional().describe('关键字'),
  /** 分页查询中的页数,page从1开始计数  */
  Page: z.number().int().optional().describe('分页查询中的页数,page从1开始计数 '),
  /** 分页查询中每页的大小  */
  PageSize: z.number().int().optional().describe('分页查询中每页的大小 '),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 页面上版本ID */
  ReleaseCode: z.number().int().describe('页面上版本ID'),
  /** 是否展示描述中外部可访问的地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否展示描述中外部可访问的地址'),
  /** 是否显示字事项，和页面开关对应  */
  ShowSubIssues: z.boolean().optional().describe('是否显示字事项，和页面开关对应 '),
  /** 排序，取值如"ID:ASC"  */
  SortBy: z.string().optional().describe('排序，取值如"ID:ASC" '),
  /** 事项状态类型数组  */
  StatusTypes: z.array(z.number().int()).optional().describe('事项状态类型数组 '),
  /** 关注人ID数组  */
  Watchers: z.array(z.number().int()).optional().describe('关注人ID数组 '),
});

/** 版本发布范围 - 响应数据 */
export const DescribeReleaseIssueListOutputSchema = z.object({
  /** 版本发布范围 */
  Data: IssueDetailListDataWithPageSchema.optional().describe('版本发布范围'),
});

// --------------- Types ---------------

export type DescribeReleaseIssueListInput = z.infer<typeof DescribeReleaseIssueListInputSchema>;
export type DescribeReleaseIssueListOutput = z.infer<typeof DescribeReleaseIssueListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeReleaseIssueListInput, DescribeReleaseIssueListOutput> = {
  action: 'DescribeReleaseIssueList',
  method: 'POST',
  inputSchema: DescribeReleaseIssueListInputSchema,
  outputSchema: DescribeReleaseIssueListOutputSchema,
};

// --------------- Action ---------------

/** 版本发布范围 */
export const DescribeReleaseIssueList = (
  client: CodingClient,
  params: DescribeReleaseIssueListInput,
): Promise<Either<SdkError, DescribeReleaseIssueListOutput>> =>
  executeAction(client.config, spec, params);
