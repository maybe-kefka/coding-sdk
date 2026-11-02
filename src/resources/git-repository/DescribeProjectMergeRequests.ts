import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeMergeRequestsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取项目下的合并请求列表 - 请求参数 */
export const DescribeProjectMergeRequestsInputSchema = z.object({
  /** mr创建结束时间 */
  CreatedAtEndDate: z.string().optional().describe('mr创建结束时间'),
  /** mr创建开始时间 */
  CreatedAtStartDate: z.string().optional().describe('mr创建开始时间'),
  /** 合并请求创建者邮箱 */
  CreatorEmail: z.string().optional().describe('合并请求创建者邮箱'),
  /** 合并请求创建者全局 key */
  CreatorGlobalKey: z.string().optional().describe('合并请求创建者全局 key'),
  /** 是否正序排序 默认 false */
  IsSortDirectionAsc: z.boolean().optional().describe('是否正序排序 默认 false'),
  /** 关键词 */
  KeyWord: z.string().optional().describe('关键词'),
  /** 标签 */
  Label: z.string().optional().describe('标签'),
  /** 合并请求合并者邮箱 */
  MergerEmail: z.string().optional().describe('合并请求合并者邮箱'),
  /** 合并请求合并者全局 key */
  MergerGlobalKey: z.string().optional().describe('合并请求合并者全局 key'),
  /** 页数 默认 1 */
  PageNumber: z.number().int().optional().describe('页数 默认 1'),
  /** 每页条数 默认 10 */
  PageSize: z.number().int().optional().describe('每页条数 默认 10'),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
  /** 合并请求评审者邮箱 */
  ReviewerEmail: z.string().optional().describe('合并请求评审者邮箱'),
  /** 合并请求评审者全局 key */
  ReviewerGlobalKey: z.string().optional().describe('合并请求评审者全局 key'),
  /** 排序 action_at：以更新时间排序  created_at：以创建时间排序 */
  Sort: z
    .string()
    .optional()
    .describe('排序 action_at：以更新时间排序  created_at：以创建时间排序'),
  /** 源分支 */
  SourceBranch: z.string().optional().describe('源分支'),
  /** 合并请求状态 open/close/all */
  Status: z.string().optional().describe('合并请求状态 open/close/all'),
  /** 欲合入分支 */
  TargetBranch: z.string().optional().describe('欲合入分支'),
  /** mr更新结束时间 */
  UpdatedAtEndDate: z.string().optional().describe('mr更新结束时间'),
  /** mr更新开始时间 */
  UpdatedAtStartDate: z.string().optional().describe('mr更新开始时间'),
});

/** 获取项目下的合并请求列表 - 响应数据 */
export const DescribeProjectMergeRequestsOutputSchema = z.object({
  /** 合并请求信息 */
  Data: DescribeMergeRequestsDataSchema.describe('合并请求信息'),
});

// --------------- Types ---------------

export type DescribeProjectMergeRequestsInput = z.infer<
  typeof DescribeProjectMergeRequestsInputSchema
>;
export type DescribeProjectMergeRequestsOutput = z.infer<
  typeof DescribeProjectMergeRequestsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectMergeRequestsInput, DescribeProjectMergeRequestsOutput> = {
  action: 'DescribeProjectMergeRequests',
  method: 'POST',
  inputSchema: DescribeProjectMergeRequestsInputSchema,
  outputSchema: DescribeProjectMergeRequestsOutputSchema,
};

// --------------- Action ---------------

/** 获取项目下的合并请求列表 */
export const DescribeProjectMergeRequests = (
  client: CodingClient,
  params: DescribeProjectMergeRequestsInput,
): Promise<Either<SdkError, DescribeProjectMergeRequestsOutput>> =>
  executeAction(client.config, spec, params);
