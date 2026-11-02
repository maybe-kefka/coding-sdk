import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingUserSchema } from './schemas';

// --------------- Schema ---------------

/** 新增合并请求评审者 - 请求参数 */
export const CreateMergeRequestReviewerInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
  /** 评审者 */
  ReviewerGlobalKey: z.string().describe('评审者'),
});

/** 新增合并请求评审者 - 响应数据 */
export const CreateMergeRequestReviewerOutputSchema = z.object({
  /** 评审者信息 */
  Reviewers: z.array(CodingUserSchema).describe('评审者信息'),
});

// --------------- Types ---------------

export type CreateMergeRequestReviewerInput = z.infer<typeof CreateMergeRequestReviewerInputSchema>;
export type CreateMergeRequestReviewerOutput = z.infer<
  typeof CreateMergeRequestReviewerOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateMergeRequestReviewerInput, CreateMergeRequestReviewerOutput> = {
  action: 'CreateMergeRequestReviewer',
  method: 'POST',
  inputSchema: CreateMergeRequestReviewerInputSchema,
  outputSchema: CreateMergeRequestReviewerOutputSchema,
};

// --------------- Action ---------------

/** 新增合并请求评审者 */
export const CreateMergeRequestReviewer = (
  client: CodingClient,
  params: CreateMergeRequestReviewerInput,
): Promise<Either<SdkError, CreateMergeRequestReviewerOutput>> =>
  executeAction(client.config, spec, params);
