import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestNoteListSchema } from './schemas';

// --------------- Schema ---------------

/** 获取单个合并请求评论 - 请求参数 */
export const DescribeSingeMergeRequestNotesInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 合并请求的Iid */
  MergeId: z.number().int().describe('合并请求的Iid'),
});

/** 获取单个合并请求评论 - 响应数据 */
export const DescribeSingeMergeRequestNotesOutputSchema = z.object({
  /** 单个合并请求行评论内容 */
  Notes: z.array(MergeRequestNoteListSchema).describe('单个合并请求行评论内容'),
});

// --------------- Types ---------------

export type DescribeSingeMergeRequestNotesInput = z.infer<
  typeof DescribeSingeMergeRequestNotesInputSchema
>;
export type DescribeSingeMergeRequestNotesOutput = z.infer<
  typeof DescribeSingeMergeRequestNotesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeSingeMergeRequestNotesInput, DescribeSingeMergeRequestNotesOutput> =
  {
    action: 'DescribeSingeMergeRequestNotes',
    method: 'POST',
    inputSchema: DescribeSingeMergeRequestNotesInputSchema,
    outputSchema: DescribeSingeMergeRequestNotesOutputSchema,
  };

// --------------- Action ---------------

/** 获取单个合并请求行评论和改动文件diff行评论 */
export const DescribeSingeMergeRequestNotes = (
  client: CodingClient,
  params: DescribeSingeMergeRequestNotesInput,
): Promise<Either<SdkError, DescribeSingeMergeRequestNotesOutput>> =>
  executeAction(client.config, spec, params);
