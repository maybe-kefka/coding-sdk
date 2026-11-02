import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ContributorSchema } from './schemas';

// --------------- Schema ---------------

/** 查询 git 仓库的贡献者 - 请求参数 */
export const DescribeGitContributorsInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 分支或标签名，默认 HEAD */
  Ref: z.string().describe('分支或标签名，默认 HEAD'),
});

/** 查询 git 仓库的贡献者 - 响应数据 */
export const DescribeGitContributorsOutputSchema = z.object({
  /** 贡献者列表 */
  Contributors: z.array(ContributorSchema).describe('贡献者列表'),
});

// --------------- Types ---------------

export type DescribeGitContributorsInput = z.infer<typeof DescribeGitContributorsInputSchema>;
export type DescribeGitContributorsOutput = z.infer<typeof DescribeGitContributorsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitContributorsInput, DescribeGitContributorsOutput> = {
  action: 'DescribeGitContributors',
  method: 'POST',
  inputSchema: DescribeGitContributorsInputSchema,
  outputSchema: DescribeGitContributorsOutputSchema,
};

// --------------- Action ---------------

/** 查询 git 仓库的贡献者 */
export const DescribeGitContributors = (
  client: CodingClient,
  params: DescribeGitContributorsInput,
): Promise<Either<SdkError, DescribeGitContributorsOutput>> =>
  executeAction(client.config, spec, params);
