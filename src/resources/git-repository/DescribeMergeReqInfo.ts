import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeReqInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 查询合并请求详情 - 请求参数 */
export const DescribeMergeReqInfoInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与DepotId选择其一即可 */
  DepotPath: z.string().optional().describe('仓库路径，与DepotId选择其一即可'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
});

/** 查询合并请求详情 - 响应数据 */
export const DescribeMergeReqInfoOutputSchema = z.object({
  /** 合并请求详情 */
  MergeReqInfo: MergeReqInfoSchema.describe('合并请求详情'),
});

// --------------- Types ---------------

export type DescribeMergeReqInfoInput = z.infer<typeof DescribeMergeReqInfoInputSchema>;
export type DescribeMergeReqInfoOutput = z.infer<typeof DescribeMergeReqInfoOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMergeReqInfoInput, DescribeMergeReqInfoOutput> = {
  action: 'DescribeMergeReqInfo',
  method: 'POST',
  inputSchema: DescribeMergeReqInfoInputSchema,
  outputSchema: DescribeMergeReqInfoOutputSchema,
};

// --------------- Action ---------------

/** 查询合并请求详情 */
export const DescribeMergeReqInfo = (
  client: CodingClient,
  params: DescribeMergeReqInfoInput,
): Promise<Either<SdkError, DescribeMergeReqInfoOutput>> =>
  executeAction(client.config, spec, params);
