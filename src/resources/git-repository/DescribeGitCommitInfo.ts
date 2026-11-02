import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema } from './schemas';

// --------------- Schema ---------------

/** 查询单个请求详情信息 - 请求参数 */
export const DescribeGitCommitInfoInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 与DepotId二选一即可 */
  DepotPath: z.string().optional().describe('与DepotId二选一即可'),
  /** 请求的sha值 */
  Sha: z.string().describe('请求的sha值'),
});

/** 查询单个请求详情信息 - 响应数据 */
export const DescribeGitCommitInfoOutputSchema = z.object({
  /** 请求详情信息 */
  GitCommit: GitCommitSchema.describe('请求详情信息'),
});

// --------------- Types ---------------

export type DescribeGitCommitInfoInput = z.infer<typeof DescribeGitCommitInfoInputSchema>;
export type DescribeGitCommitInfoOutput = z.infer<typeof DescribeGitCommitInfoOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitInfoInput, DescribeGitCommitInfoOutput> = {
  action: 'DescribeGitCommitInfo',
  method: 'POST',
  inputSchema: DescribeGitCommitInfoInputSchema,
  outputSchema: DescribeGitCommitInfoOutputSchema,
};

// --------------- Action ---------------

/** 查询单个请求详情信息 */
export const DescribeGitCommitInfo = (
  client: CodingClient,
  params: DescribeGitCommitInfoInput,
): Promise<Either<SdkError, DescribeGitCommitInfoOutput>> =>
  executeAction(client.config, spec, params);
