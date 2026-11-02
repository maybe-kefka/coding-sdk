import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotUserSchema } from './schemas';

// --------------- Schema ---------------

/** 获取合并请求的评审者 - 请求参数 */
export const DescribeMergeRequestReviewersInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 合并请求 IId */
  MergeId: z.number().int().describe('合并请求 IId'),
});

/** 获取合并请求的评审者 - 响应数据 */
export const DescribeMergeRequestReviewersOutputSchema = z.object({
  /** 参与者列表 */
  Reviewers: z.array(DepotUserSchema).describe('参与者列表'),
});

// --------------- Types ---------------

export type DescribeMergeRequestReviewersInput = z.infer<
  typeof DescribeMergeRequestReviewersInputSchema
>;
export type DescribeMergeRequestReviewersOutput = z.infer<
  typeof DescribeMergeRequestReviewersOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMergeRequestReviewersInput, DescribeMergeRequestReviewersOutput> = {
  action: 'DescribeMergeRequestReviewers',
  method: 'POST',
  inputSchema: DescribeMergeRequestReviewersInputSchema,
  outputSchema: DescribeMergeRequestReviewersOutputSchema,
};

// --------------- Action ---------------

/** 获取合并请求的参与者 */
export const DescribeMergeRequestReviewers = (
  client: CodingClient,
  params: DescribeMergeRequestReviewersInput,
): Promise<Either<SdkError, DescribeMergeRequestReviewersOutput>> =>
  executeAction(client.config, spec, params);
