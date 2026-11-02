import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitDiffSchema } from './schemas';

// --------------- Schema ---------------

/** 查询合并请求文件的 diff 详情 - 请求参数 */
export const DescribeGitMergeRequestDiffDetailInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
  /** 文件路径 */
  Path: z.string().describe('文件路径'),
});

/** 查询合并请求文件的 diff 详情 - 响应数据 */
export const DescribeGitMergeRequestDiffDetailOutputSchema = z.object({
  /** 对比详细信息 */
  Detail: GitDiffSchema.describe('对比详细信息'),
});

// --------------- Types ---------------

export type DescribeGitMergeRequestDiffDetailInput = z.infer<
  typeof DescribeGitMergeRequestDiffDetailInputSchema
>;
export type DescribeGitMergeRequestDiffDetailOutput = z.infer<
  typeof DescribeGitMergeRequestDiffDetailOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeGitMergeRequestDiffDetailInput,
  DescribeGitMergeRequestDiffDetailOutput
> = {
  action: 'DescribeGitMergeRequestDiffDetail',
  method: 'POST',
  inputSchema: DescribeGitMergeRequestDiffDetailInputSchema,
  outputSchema: DescribeGitMergeRequestDiffDetailOutputSchema,
};

// --------------- Action ---------------

/** 查询合并请求文件的 diff 详情 */
export const DescribeGitMergeRequestDiffDetail = (
  client: CodingClient,
  params: DescribeGitMergeRequestDiffDetailInput,
): Promise<Either<SdkError, DescribeGitMergeRequestDiffDetailOutput>> =>
  executeAction(client.config, spec, params);
