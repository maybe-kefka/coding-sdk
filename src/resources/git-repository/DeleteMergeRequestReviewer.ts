import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingUserSchema } from './schemas';

// --------------- Schema ---------------

/** 删除mr评审者 - 请求参数 */
export const DeleteMergeRequestReviewerInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** iid */
  MergeId: z.number().int().describe('iid'),
  /** 评审者的GK */
  ReviewerGlobalKey: z.string().describe('评审者的GK'),
});

/** 删除mr评审者 - 响应数据 */
export const DeleteMergeRequestReviewerOutputSchema = z.object({
  /** 创建合并请求的信息 */
  Reviewers: z.array(CodingUserSchema).describe('创建合并请求的信息'),
});

// --------------- Types ---------------

export type DeleteMergeRequestReviewerInput = z.infer<typeof DeleteMergeRequestReviewerInputSchema>;
export type DeleteMergeRequestReviewerOutput = z.infer<
  typeof DeleteMergeRequestReviewerOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteMergeRequestReviewerInput, DeleteMergeRequestReviewerOutput> = {
  action: 'DeleteMergeRequestReviewer',
  method: 'POST',
  inputSchema: DeleteMergeRequestReviewerInputSchema,
  outputSchema: DeleteMergeRequestReviewerOutputSchema,
};

// --------------- Action ---------------

/** 删除mr评审者 */
export const DeleteMergeRequestReviewer = (
  client: CodingClient,
  params: DeleteMergeRequestReviewerInput,
): Promise<Either<SdkError, DeleteMergeRequestReviewerOutput>> =>
  executeAction(client.config, spec, params);
