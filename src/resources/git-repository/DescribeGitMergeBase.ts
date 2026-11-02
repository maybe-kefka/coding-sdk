import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema } from './schemas';

// --------------- Schema ---------------

/** 查询两个分支的公共祖先 - 请求参数 */
export const DescribeGitMergeBaseInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可  */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可 '),
  /** 分支2 */
  DestRef: z.string().describe('分支2'),
  /** 分支1 */
  SrcRef: z.string().describe('分支1'),
});

/** 查询两个分支的公共祖先 - 响应数据 */
export const DescribeGitMergeBaseOutputSchema = z.object({
  /** 提交详情 */
  Commit: GitCommitSchema.nullable().describe('提交详情'),
});

// --------------- Types ---------------

export type DescribeGitMergeBaseInput = z.infer<typeof DescribeGitMergeBaseInputSchema>;
export type DescribeGitMergeBaseOutput = z.infer<typeof DescribeGitMergeBaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitMergeBaseInput, DescribeGitMergeBaseOutput> = {
  action: 'DescribeGitMergeBase',
  method: 'POST',
  inputSchema: DescribeGitMergeBaseInputSchema,
  outputSchema: DescribeGitMergeBaseOutputSchema,
};

// --------------- Action ---------------

/** 查询两个分支的公共祖先 */
export const DescribeGitMergeBase = (
  client: CodingClient,
  params: DescribeGitMergeBaseInput,
): Promise<Either<SdkError, DescribeGitMergeBaseOutput>> =>
  executeAction(client.config, spec, params);
