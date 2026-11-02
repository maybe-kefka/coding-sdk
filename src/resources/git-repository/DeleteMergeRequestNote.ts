import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestNoteSchema } from './schemas';

// --------------- Schema ---------------

/** 删除合并请求评论 - 请求参数 */
export const DeleteMergeRequestNoteInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 行评论Id */
  LineNoteId: z.number().int().describe('行评论Id'),
  /** 合并请求的Iid */
  MergeId: z.number().int().describe('合并请求的Iid'),
});

/** 删除合并请求评论 - 响应数据 */
export const DeleteMergeRequestNoteOutputSchema = z.object({
  /** 删除的行评论内容 */
  Note: MergeRequestNoteSchema.describe('删除的行评论内容'),
});

// --------------- Types ---------------

export type DeleteMergeRequestNoteInput = z.infer<typeof DeleteMergeRequestNoteInputSchema>;
export type DeleteMergeRequestNoteOutput = z.infer<typeof DeleteMergeRequestNoteOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteMergeRequestNoteInput, DeleteMergeRequestNoteOutput> = {
  action: 'DeleteMergeRequestNote',
  method: 'POST',
  inputSchema: DeleteMergeRequestNoteInputSchema,
  outputSchema: DeleteMergeRequestNoteOutputSchema,
};

// --------------- Action ---------------

/** 删除合并请求行评论和改动文件diff行评论 */
export const DeleteMergeRequestNote = (
  client: CodingClient,
  params: DeleteMergeRequestNoteInput,
): Promise<Either<SdkError, DeleteMergeRequestNoteOutput>> =>
  executeAction(client.config, spec, params);
