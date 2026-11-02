import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库分支下提交列表 - 请求参数 */
export const DescribeGitCommitInfosInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 查询截止日志 */
  EndDate: z.string().optional().describe('查询截止日志'),
  /** 提交信息中的关键词 */
  KeyWord: z.string().optional().describe('提交信息中的关键词'),
  /** 分页页码 */
  PageNumber: z.number().int().optional().describe('分页页码'),
  /** 分页页距 */
  PageSize: z.number().int().optional().describe('分页页距'),
  /** 文件路径 */
  Path: z.string().optional().describe('文件路径'),
  /** 分支名称 */
  Ref: z.string().describe('分支名称'),
  /** 查询起始日期 */
  StartDate: z.string().optional().describe('查询起始日期'),
});

/** 查询仓库分支下提交列表 - 响应数据 */
export const DescribeGitCommitInfosOutputSchema = z.object({
  /** 请求集合 */
  Commits: z.array(GitCommitSchema).describe('请求集合'),
});

// --------------- Types ---------------

export type DescribeGitCommitInfosInput = z.infer<typeof DescribeGitCommitInfosInputSchema>;
export type DescribeGitCommitInfosOutput = z.infer<typeof DescribeGitCommitInfosOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitInfosInput, DescribeGitCommitInfosOutput> = {
  action: 'DescribeGitCommitInfos',
  method: 'POST',
  inputSchema: DescribeGitCommitInfosInputSchema,
  outputSchema: DescribeGitCommitInfosOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库分支下提交列表 */
export const DescribeGitCommitInfos = (
  client: CodingClient,
  params: DescribeGitCommitInfosInput,
): Promise<Either<SdkError, DescribeGitCommitInfosOutput>> =>
  executeAction(client.config, spec, params);
