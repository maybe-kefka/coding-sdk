import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CommitDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库分支下提交列表-加分页信息 - 请求参数 */
export const DescribeGitCommitsInPageInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 查询截止日志 */
  EndDate: z.string().optional().describe('查询截止日志'),
  /** 提交信息中的关键词 */
  KeyWord: z.array(z.string()).optional().describe('提交信息中的关键词'),
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

/** 查询仓库分支下提交列表-加分页信息 - 响应数据 */
export const DescribeGitCommitsInPageOutputSchema = z.object({
  /** 请求集合 */
  Data: CommitDataSchema.describe('请求集合'),
});

// --------------- Types ---------------

export type DescribeGitCommitsInPageInput = z.infer<typeof DescribeGitCommitsInPageInputSchema>;
export type DescribeGitCommitsInPageOutput = z.infer<typeof DescribeGitCommitsInPageOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitsInPageInput, DescribeGitCommitsInPageOutput> = {
  action: 'DescribeGitCommitsInPage',
  method: 'POST',
  inputSchema: DescribeGitCommitsInPageInputSchema,
  outputSchema: DescribeGitCommitsInPageOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库分支下提交列表 */
export const DescribeGitCommitsInPage = (
  client: CodingClient,
  params: DescribeGitCommitsInPageInput,
): Promise<Either<SdkError, DescribeGitCommitsInPageOutput>> =>
  executeAction(client.config, spec, params);
