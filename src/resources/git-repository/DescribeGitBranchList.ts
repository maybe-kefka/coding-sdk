import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitBranchesDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库分支列表 - 请求参数 */
export const DescribeGitBranchListInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 查询的关键词 */
  KeyWord: z.string().optional().describe('查询的关键词'),
  /** 分页页码 */
  PageNumber: z.number().int().describe('分页页码'),
  /** 分页页距,默认为10 */
  PageSize: z.number().int().describe('分页页距,默认为10'),
});

/** 查询仓库分支列表 - 响应数据 */
export const DescribeGitBranchListOutputSchema = z.object({
  /** 分支集合 */
  GitBranchesData: GitBranchesDataSchema.describe('分支集合'),
});

// --------------- Types ---------------

export type DescribeGitBranchListInput = z.infer<typeof DescribeGitBranchListInputSchema>;
export type DescribeGitBranchListOutput = z.infer<typeof DescribeGitBranchListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBranchListInput, DescribeGitBranchListOutput> = {
  action: 'DescribeGitBranchList',
  method: 'POST',
  inputSchema: DescribeGitBranchListInputSchema,
  outputSchema: DescribeGitBranchListOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库分支列表 */
export const DescribeGitBranchList = (
  client: CodingClient,
  params: DescribeGitBranchListInput,
): Promise<Either<SdkError, DescribeGitBranchListOutput>> =>
  executeAction(client.config, spec, params);
