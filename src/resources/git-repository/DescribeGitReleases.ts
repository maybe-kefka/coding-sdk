import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ReleaseListPageSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库的版本列表 - 请求参数 */
export const DescribeGitReleasesInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 搜索条件:起始日期 */
  FromDate: z.string().optional().describe('搜索条件:起始日期'),
  /** 页数 */
  PageNumber: z.number().int().optional().describe('页数'),
  /** 每页条数 */
  PageSize: z.number().int().optional().describe('每页条数'),
  /** 搜索条件:版本状态(0:全部 1:已发布 2:预发布) */
  Status: z.number().int().optional().describe('搜索条件:版本状态(0:全部 1:已发布 2:预发布)'),
  /** 搜索条件:标签名字 */
  TagName: z.string().optional().describe('搜索条件:标签名字'),
  /** 搜索条件:终止日期 */
  ToDate: z.string().optional().describe('搜索条件:终止日期'),
  /** 是否展示资源地址 */
  ShowResourceUrl: z.boolean().optional().describe('是否展示资源地址'),
});

/** 查询仓库的版本列表 - 响应数据 */
export const DescribeGitReleasesOutputSchema = z.object({
  /** 版本分页列表 */
  ReleasePageList: ReleaseListPageSchema.nullable().describe('版本分页列表'),
});

// --------------- Types ---------------

export type DescribeGitReleasesInput = z.infer<typeof DescribeGitReleasesInputSchema>;
export type DescribeGitReleasesOutput = z.infer<typeof DescribeGitReleasesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitReleasesInput, DescribeGitReleasesOutput> = {
  action: 'DescribeGitReleases',
  method: 'POST',
  inputSchema: DescribeGitReleasesInputSchema,
  outputSchema: DescribeGitReleasesOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库的版本列表 */
export const DescribeGitReleases = (
  client: CodingClient,
  params: DescribeGitReleasesInput,
): Promise<Either<SdkError, DescribeGitReleasesOutput>> =>
  executeAction(client.config, spec, params);
