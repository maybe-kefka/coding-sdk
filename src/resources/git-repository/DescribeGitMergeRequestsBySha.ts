import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询含有某次提交的合并请求 - 请求参数 */
export const DescribeGitMergeRequestsByShaInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 与DepotId选择其一即可 */
  DepotPath: z.string().optional().describe('与DepotId选择其一即可'),
  /** 提交 Id */
  Sha: z.string().describe('提交 Id'),
});

/** 查询含有某次提交的合并请求 - 响应数据 */
export const DescribeGitMergeRequestsByShaOutputSchema = z.object({
  /** 合并请求详情 */
  Details: z.array(MergeRequestDetailSchema).describe('合并请求详情'),
});

// --------------- Types ---------------

export type DescribeGitMergeRequestsByShaInput = z.infer<
  typeof DescribeGitMergeRequestsByShaInputSchema
>;
export type DescribeGitMergeRequestsByShaOutput = z.infer<
  typeof DescribeGitMergeRequestsByShaOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitMergeRequestsByShaInput, DescribeGitMergeRequestsByShaOutput> = {
  action: 'DescribeGitMergeRequestsBySha',
  method: 'POST',
  inputSchema: DescribeGitMergeRequestsByShaInputSchema,
  outputSchema: DescribeGitMergeRequestsByShaOutputSchema,
};

// --------------- Action ---------------

/** 查询含有某次提交的合并请求 */
export const DescribeGitMergeRequestsBySha = (
  client: CodingClient,
  params: DescribeGitMergeRequestsByShaInput,
): Promise<Either<SdkError, DescribeGitMergeRequestsByShaOutput>> =>
  executeAction(client.config, spec, params);
