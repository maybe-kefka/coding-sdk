import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestLogSchema } from './schemas';

// --------------- Schema ---------------

/** 查询合并请求操作记录 - 请求参数 */
export const DescribeMergeRequestLogInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
});

/** 查询合并请求操作记录 - 响应数据 */
export const DescribeMergeRequestLogOutputSchema = z.object({
  /** 操作记录列表 */
  Logs: z.array(MergeRequestLogSchema).describe('操作记录列表'),
});

// --------------- Types ---------------

export type DescribeMergeRequestLogInput = z.infer<typeof DescribeMergeRequestLogInputSchema>;
export type DescribeMergeRequestLogOutput = z.infer<typeof DescribeMergeRequestLogOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMergeRequestLogInput, DescribeMergeRequestLogOutput> = {
  action: 'DescribeMergeRequestLog',
  method: 'POST',
  inputSchema: DescribeMergeRequestLogInputSchema,
  outputSchema: DescribeMergeRequestLogOutputSchema,
};

// --------------- Action ---------------

/** 查询合并请求操作记录 */
export const DescribeMergeRequestLog = (
  client: CodingClient,
  params: DescribeMergeRequestLogInput,
): Promise<Either<SdkError, DescribeMergeRequestLogOutput>> =>
  executeAction(client.config, spec, params);
