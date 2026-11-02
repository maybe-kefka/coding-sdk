import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitDiffSchema } from './schemas';

// --------------- Schema ---------------

/** 查询某次提交的diff信息 - 请求参数 */
export const DescribeGitCommitDiffInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 查询指定文件时填写 */
  Path: z.string().optional().describe('查询指定文件时填写'),
  /** 提交id */
  Sha: z.string().describe('提交id'),
});

/** 查询某次提交的diff信息 - 响应数据 */
export const DescribeGitCommitDiffOutputSchema = z.object({
  /** diff信息详情 */
  Diffs: z.array(GitDiffSchema).nullable().describe('diff信息详情'),
});

// --------------- Types ---------------

export type DescribeGitCommitDiffInput = z.infer<typeof DescribeGitCommitDiffInputSchema>;
export type DescribeGitCommitDiffOutput = z.infer<typeof DescribeGitCommitDiffOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitDiffInput, DescribeGitCommitDiffOutput> = {
  action: 'DescribeGitCommitDiff',
  method: 'POST',
  inputSchema: DescribeGitCommitDiffInputSchema,
  outputSchema: DescribeGitCommitDiffOutputSchema,
};

// --------------- Action ---------------

/** 查询某次提交的diff信息 */
export const DescribeGitCommitDiff = (
  client: CodingClient,
  params: DescribeGitCommitDiffInput,
): Promise<Either<SdkError, DescribeGitCommitDiffOutput>> =>
  executeAction(client.config, spec, params);
