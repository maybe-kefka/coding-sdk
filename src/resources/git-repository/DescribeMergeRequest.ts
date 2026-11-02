import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 查询合并请求详情信息 - 请求参数 */
export const DescribeMergeRequestInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与DepotId选择其一即可 */
  DepotPath: z.string().optional().describe('仓库路径，与DepotId选择其一即可'),
  /** 合并请求iid */
  MergeId: z.number().int().describe('合并请求iid'),
});

/** 查询合并请求详情信息 - 响应数据 */
export const DescribeMergeRequestOutputSchema = z.object({
  /** 合并请求信息 */
  MergeRequestInfo: MergeRequestInfoSchema.describe('合并请求信息'),
});

// --------------- Types ---------------

export type DescribeMergeRequestInput = z.infer<typeof DescribeMergeRequestInputSchema>;
export type DescribeMergeRequestOutput = z.infer<typeof DescribeMergeRequestOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMergeRequestInput, DescribeMergeRequestOutput> = {
  action: 'DescribeMergeRequest',
  method: 'POST',
  inputSchema: DescribeMergeRequestInputSchema,
  outputSchema: DescribeMergeRequestOutputSchema,
};

// --------------- Action ---------------

/** 查询合并请求详情信息 */
export const DescribeMergeRequest = (
  client: CodingClient,
  params: DescribeMergeRequestInput,
): Promise<Either<SdkError, DescribeMergeRequestOutput>> =>
  executeAction(client.config, spec, params);
