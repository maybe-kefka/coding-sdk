import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitBranchInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库下所有分支列表 - 请求参数 */
export const DescribeGitBranchesInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与DepotId二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，与DepotId二选一即可'),
  /** 查询的关键词 */
  KeyWord: z.string().optional().describe('查询的关键词'),
  /** 分页页码 */
  PageNumber: z.number().int().optional().describe('分页页码'),
  /** 分页页距,默认为10 */
  PageSize: z.number().int().optional().describe('分页页距,默认为10'),
});

/** 查询仓库下所有分支列表 - 响应数据 */
export const DescribeGitBranchesOutputSchema = z.object({
  /** 分支详细信息 */
  Branches: z.array(GitBranchInfoSchema).nullable().describe('分支详细信息'),
  /** 分支数量 */
  TotalCount: z.number().int().nullable().describe('分支数量'),
});

// --------------- Types ---------------

export type DescribeGitBranchesInput = z.infer<typeof DescribeGitBranchesInputSchema>;
export type DescribeGitBranchesOutput = z.infer<typeof DescribeGitBranchesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBranchesInput, DescribeGitBranchesOutput> = {
  action: 'DescribeGitBranches',
  method: 'POST',
  inputSchema: DescribeGitBranchesInputSchema,
  outputSchema: DescribeGitBranchesOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库下所有分支列表 */
export const DescribeGitBranches = (
  client: CodingClient,
  params: DescribeGitBranchesInput,
): Promise<Either<SdkError, DescribeGitBranchesOutput>> =>
  executeAction(client.config, spec, params);
