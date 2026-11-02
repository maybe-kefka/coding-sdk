import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { StatusCheckResultSchema } from './schemas';

// --------------- Schema ---------------

/** 查询提交对应的流水线状态 - 请求参数 */
export const DescribeGitCommitStatusInputSchema = z.object({
  /** 提交id */
  CommitSha: z.string().describe('提交id'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 查询提交对应的流水线状态 - 响应数据 */
export const DescribeGitCommitStatusOutputSchema = z.object({
  /** 	提交流水线状态列表 */
  StatusCheckResults: z.array(StatusCheckResultSchema).nullable().describe('	提交流水线状态列表'),
});

// --------------- Types ---------------

export type DescribeGitCommitStatusInput = z.infer<typeof DescribeGitCommitStatusInputSchema>;
export type DescribeGitCommitStatusOutput = z.infer<typeof DescribeGitCommitStatusOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitStatusInput, DescribeGitCommitStatusOutput> = {
  action: 'DescribeGitCommitStatus',
  method: 'POST',
  inputSchema: DescribeGitCommitStatusInputSchema,
  outputSchema: DescribeGitCommitStatusOutputSchema,
};

// --------------- Action ---------------

/** 查询提交对应的流水线状态 */
export const DescribeGitCommitStatus = (
  client: CodingClient,
  params: DescribeGitCommitStatusInput,
): Promise<Either<SdkError, DescribeGitCommitStatusOutput>> =>
  executeAction(client.config, spec, params);
