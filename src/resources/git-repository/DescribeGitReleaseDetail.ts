import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ReleaseSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库的版本详情 - 请求参数 */
export const DescribeGitReleaseDetailInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 版本序号Id */
  ReleaseId: z.number().int().describe('版本序号Id'),
  /** 标签名称 */
  TagName: z.string().describe('标签名称'),
  /** 是否展示资源地址 */
  ShowResourceUrl: z.boolean().optional().describe('是否展示资源地址'),
});

/** 查询仓库的版本详情 - 响应数据 */
export const DescribeGitReleaseDetailOutputSchema = z.object({
  /** 版本详情信息 */
  Release: ReleaseSchema.nullable().describe('版本详情信息'),
});

// --------------- Types ---------------

export type DescribeGitReleaseDetailInput = z.infer<typeof DescribeGitReleaseDetailInputSchema>;
export type DescribeGitReleaseDetailOutput = z.infer<typeof DescribeGitReleaseDetailOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitReleaseDetailInput, DescribeGitReleaseDetailOutput> = {
  action: 'DescribeGitReleaseDetail',
  method: 'POST',
  inputSchema: DescribeGitReleaseDetailInputSchema,
  outputSchema: DescribeGitReleaseDetailOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库的版本详情 */
export const DescribeGitReleaseDetail = (
  client: CodingClient,
  params: DescribeGitReleaseDetailInput,
): Promise<Either<SdkError, DescribeGitReleaseDetailOutput>> =>
  executeAction(client.config, spec, params);
