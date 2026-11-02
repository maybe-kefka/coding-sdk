import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestDiffSchema } from './schemas';

// --------------- Schema ---------------

/** 查询合并请求 diff 信息的文件列表 - 请求参数 */
export const DescribeGitMergeRequestDiffsInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 合并请求 ID */
  MergeId: z.number().int().describe('合并请求 ID'),
});

/** 查询合并请求 diff 信息的文件列表 - 响应数据 */
export const DescribeGitMergeRequestDiffsOutputSchema = z.object({
  /** diff 信息概览 */
  Diff: MergeRequestDiffSchema.nullable().describe('diff 信息概览'),
});

// --------------- Types ---------------

export type DescribeGitMergeRequestDiffsInput = z.infer<
  typeof DescribeGitMergeRequestDiffsInputSchema
>;
export type DescribeGitMergeRequestDiffsOutput = z.infer<
  typeof DescribeGitMergeRequestDiffsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitMergeRequestDiffsInput, DescribeGitMergeRequestDiffsOutput> = {
  action: 'DescribeGitMergeRequestDiffs',
  method: 'POST',
  inputSchema: DescribeGitMergeRequestDiffsInputSchema,
  outputSchema: DescribeGitMergeRequestDiffsOutputSchema,
};

// --------------- Action ---------------

/** 查询合并请求 diff 信息的文件列表 */
export const DescribeGitMergeRequestDiffs = (
  client: CodingClient,
  params: DescribeGitMergeRequestDiffsInput,
): Promise<Either<SdkError, DescribeGitMergeRequestDiffsOutput>> =>
  executeAction(client.config, spec, params);
