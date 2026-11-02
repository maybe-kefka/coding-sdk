import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeMergeRequestsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询自己的合并请求列表 - 请求参数 */
export const DescribeSelfMergeRequestsInputSchema = z.object({
  /** mr创建结束时间 */
  CreatedAtEndDate: z.string().optional().describe('mr创建结束时间'),
  /** mr创建开始时间 */
  CreatedAtStartDate: z.string().optional().describe('mr创建开始时间'),
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

/** 查询自己的合并请求列表 - 响应数据 */
export const DescribeSelfMergeRequestsOutputSchema = z.object({
  /** 合并请求信息 */
  Data: DescribeMergeRequestsDataSchema.describe('合并请求信息'),
});

// --------------- Types ---------------

export type DescribeSelfMergeRequestsInput = z.infer<typeof DescribeSelfMergeRequestsInputSchema>;
export type DescribeSelfMergeRequestsOutput = z.infer<typeof DescribeSelfMergeRequestsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeSelfMergeRequestsInput, DescribeSelfMergeRequestsOutput> = {
  action: 'DescribeSelfMergeRequests',
  method: 'POST',
  inputSchema: DescribeSelfMergeRequestsInputSchema,
  outputSchema: DescribeSelfMergeRequestsOutputSchema,
};

// --------------- Action ---------------

/** 获取自己的合并请求列表 */
export const DescribeSelfMergeRequests = (
  client: CodingClient,
  params: DescribeSelfMergeRequestsInput,
): Promise<Either<SdkError, DescribeSelfMergeRequestsOutput>> =>
  executeAction(client.config, spec, params);
