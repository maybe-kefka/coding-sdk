import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitBranchSchema } from './schemas';

// --------------- Schema ---------------

/** 查询代码仓库单个分支 - 请求参数 */
export const DescribeGitBranchInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与DepotId选其一就可以 */
  DepotPath: z.string().optional().describe('仓库路径，与DepotId选其一就可以'),
});

/** 查询代码仓库单个分支 - 响应数据 */
export const DescribeGitBranchOutputSchema = z.object({
  /** 分支详情 */
  GitBranch: GitBranchSchema.describe('分支详情'),
});

// --------------- Types ---------------

export type DescribeGitBranchInput = z.infer<typeof DescribeGitBranchInputSchema>;
export type DescribeGitBranchOutput = z.infer<typeof DescribeGitBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBranchInput, DescribeGitBranchOutput> = {
  action: 'DescribeGitBranch',
  method: 'POST',
  inputSchema: DescribeGitBranchInputSchema,
  outputSchema: DescribeGitBranchOutputSchema,
};

// --------------- Action ---------------

/** 查询代码仓库单个分支 */
export const DescribeGitBranch = (
  client: CodingClient,
  params: DescribeGitBranchInput,
): Promise<Either<SdkError, DescribeGitBranchOutput>> => executeAction(client.config, spec, params);
