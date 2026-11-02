import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeMergeRequestsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库合并请求列表 - 请求参数 */
export const DescribeDepotMergeRequestsInputSchema = z.object({
  /** mr创建结束时间 */
  CreatedAtEndDate: z.string().optional().describe('mr创建结束时间'),
  /** mr创建开始时间 */
  CreatedAtStartDate: z.string().optional().describe('mr创建开始时间'),
  /** 合并请求创建者邮箱列表 */
  CreatorEmails: z.array(z.string()).optional().describe('合并请求创建者邮箱列表'),
  /** 合并请求创建者 Global Key 列表 */
  CreatorGlobalKeys: z.array(z.string()).optional().describe('合并请求创建者 Global Key 列表'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 是否升序 */
  IsSortDirectionAsc: z.boolean().optional().describe('是否升序'),
  /** 关键词 */
  KeyWord: z.string().optional().describe('关键词'),
  /** 关联标签 */
  Labels: z.array(z.string()).optional().describe('关联标签'),
  /** 合并请求合并者邮箱列表 */
  MergerEmails: z.array(z.string()).optional().describe('合并请求合并者邮箱列表'),
  /** 合并请求合并者 Global Key 列表 */
  MergerGlobalKeys: z.array(z.string()).optional().describe('合并请求合并者 Global Key 列表'),
  /** 页数 默认为1 */
  PageNumber: z.number().int().optional().describe('页数 默认为1'),
  /** 每页数量 默认为10 */
  PageSize: z.number().int().optional().describe('每页数量 默认为10'),
  /** 合并请求评审者邮箱列表 */
  ReviewerEmails: z.array(z.string()).optional().describe('合并请求评审者邮箱列表'),
  /** 评审者 Global Key 列表 */
  ReviewerGlobalKeys: z.array(z.string()).optional().describe('评审者 Global Key 列表'),
  /** 排序 created_at merged_at action_at */
  Sort: z.string().optional().describe('排序 created_at merged_at action_at'),
  /** 源分支 */
  SourceBranches: z.array(z.string()).optional().describe('源分支'),
  /** 合并请求状态 OPEN CLOSE ALL ACCEPTED */
  Status: z.string().optional().describe('合并请求状态 OPEN CLOSE ALL ACCEPTED'),
  /** 目标分支 */
  TargetBranches: z.array(z.string()).optional().describe('目标分支'),
  /** mr更新结束时间 */
  UpdatedAtEndDate: z.string().optional().describe('mr更新结束时间'),
  /** mr更新开始时间 */
  UpdatedAtStartDate: z.string().optional().describe('mr更新开始时间'),
});

/** 查询仓库合并请求列表 - 响应数据 */
export const DescribeDepotMergeRequestsOutputSchema = z.object({
  /** 合并请求列表 */
  Data: DescribeMergeRequestsDataSchema.describe('合并请求列表'),
});

// --------------- Types ---------------

export type DescribeDepotMergeRequestsInput = z.infer<typeof DescribeDepotMergeRequestsInputSchema>;
export type DescribeDepotMergeRequestsOutput = z.infer<
  typeof DescribeDepotMergeRequestsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotMergeRequestsInput, DescribeDepotMergeRequestsOutput> = {
  action: 'DescribeDepotMergeRequests',
  method: 'POST',
  inputSchema: DescribeDepotMergeRequestsInputSchema,
  outputSchema: DescribeDepotMergeRequestsOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库合并请求列表 */
export const DescribeDepotMergeRequests = (
  client: CodingClient,
  params: DescribeDepotMergeRequestsInput,
): Promise<Either<SdkError, DescribeDepotMergeRequestsOutput>> =>
  executeAction(client.config, spec, params);
