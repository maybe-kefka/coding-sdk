import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestNoteListSchema } from './schemas';

// --------------- Schema ---------------

/** 获取所有合并请求评论 - 请求参数 */
export const DescribeAllMergeRequestNotesInputSchema = z.object({
  /** 创建结束时间 */
  CreatedAtEndDate: z.string().optional().describe('创建结束时间'),
  /** 创建开始时间 */
  CreatedAtStartDate: z.string().optional().describe('创建开始时间'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 合并请求的Iid列表 */
  MergeIds: z.array(z.number().int()).optional().describe('合并请求的Iid列表'),
  /** 合并请求的状态列表 */
  MrStatuses: z.array(z.string()).optional().describe('合并请求的状态列表'),
  /** 页码 */
  PageNumber: z.number().int().describe('页码'),
  /** 页数量 */
  PageSize: z.number().int().describe('页数量'),
  /** 合并请求的发起者列表 */
  ReporterIds: z.array(z.number().int()).optional().describe('合并请求的发起者列表'),
});

/** 获取所有合并请求评论 - 响应数据 */
export const DescribeAllMergeRequestNotesOutputSchema = z.object({
  /** 行评论内容 */
  Notes: z.array(MergeRequestNoteListSchema).describe('行评论内容'),
});

// --------------- Types ---------------

export type DescribeAllMergeRequestNotesInput = z.infer<
  typeof DescribeAllMergeRequestNotesInputSchema
>;
export type DescribeAllMergeRequestNotesOutput = z.infer<
  typeof DescribeAllMergeRequestNotesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeAllMergeRequestNotesInput, DescribeAllMergeRequestNotesOutput> = {
  action: 'DescribeAllMergeRequestNotes',
  method: 'POST',
  inputSchema: DescribeAllMergeRequestNotesInputSchema,
  outputSchema: DescribeAllMergeRequestNotesOutputSchema,
};

// --------------- Action ---------------

/** 获取所有合并请求行评论和改动文件diff行评论 */
export const DescribeAllMergeRequestNotes = (
  client: CodingClient,
  params: DescribeAllMergeRequestNotesInput,
): Promise<Either<SdkError, DescribeAllMergeRequestNotesOutput>> =>
  executeAction(client.config, spec, params);
