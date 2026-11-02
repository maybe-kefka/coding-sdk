import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CommitRefSchema } from './schemas';

// --------------- Schema ---------------

/** 查询commit的ref信息 - 请求参数 */
export const DescribeCommitRefsInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 提交sha */
  Sha: z.string().describe('提交sha'),
  /** ref类型,all 查询分支和标签，branch查询分支，tag查询标签 */
  Type: z.string().describe('ref类型,all 查询分支和标签，branch查询分支，tag查询标签'),
});

/** 查询commit的ref信息 - 响应数据 */
export const DescribeCommitRefsOutputSchema = z.object({
  /** 仓库信息详情列表 */
  CommitRefs: z.array(CommitRefSchema).nullable().describe('仓库信息详情列表'),
});

// --------------- Types ---------------

export type DescribeCommitRefsInput = z.infer<typeof DescribeCommitRefsInputSchema>;
export type DescribeCommitRefsOutput = z.infer<typeof DescribeCommitRefsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCommitRefsInput, DescribeCommitRefsOutput> = {
  action: 'DescribeCommitRefs',
  method: 'POST',
  inputSchema: DescribeCommitRefsInputSchema,
  outputSchema: DescribeCommitRefsOutputSchema,
};

// --------------- Action ---------------

/** 查询commit的ref信息 */
export const DescribeCommitRefs = (
  client: CodingClient,
  params: DescribeCommitRefsInput,
): Promise<Either<SdkError, DescribeCommitRefsOutput>> =>
  executeAction(client.config, spec, params);
