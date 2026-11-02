import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema } from './schemas';

// --------------- Schema ---------------

/** 查询合并请求列表 - 请求参数 */
export const DescribeMergeReqCommitsInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 与仓库路径二选一即可 */
  DepotPath: z.string().optional().describe('与仓库路径二选一即可'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
});

/** 查询合并请求列表 - 响应数据 */
export const DescribeMergeReqCommitsOutputSchema = z.object({
  /** commit集合 */
  Commits: z.array(GitCommitSchema).describe('commit集合'),
});

// --------------- Types ---------------

export type DescribeMergeReqCommitsInput = z.infer<typeof DescribeMergeReqCommitsInputSchema>;
export type DescribeMergeReqCommitsOutput = z.infer<typeof DescribeMergeReqCommitsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMergeReqCommitsInput, DescribeMergeReqCommitsOutput> = {
  action: 'DescribeMergeReqCommits',
  method: 'POST',
  inputSchema: DescribeMergeReqCommitsInputSchema,
  outputSchema: DescribeMergeReqCommitsOutputSchema,
};

// --------------- Action ---------------

/** 查询合并请求列表 */
export const DescribeMergeReqCommits = (
  client: CodingClient,
  params: DescribeMergeReqCommitsInput,
): Promise<Either<SdkError, DescribeMergeReqCommitsOutput>> =>
  executeAction(client.config, spec, params);
