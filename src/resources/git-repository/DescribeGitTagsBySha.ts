import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTagSchema } from './schemas';

// --------------- Schema ---------------

/** 查询含有某次提交的标签列表 - 请求参数 */
export const DescribeGitTagsByShaInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 提交id */
  Sha: z.string().describe('提交id'),
});

/** 查询含有某次提交的标签列表 - 响应数据 */
export const DescribeGitTagsByShaOutputSchema = z.object({
  /** tag集合 */
  GitTags: z.array(GitTagSchema).nullable().describe('tag集合'),
});

// --------------- Types ---------------

export type DescribeGitTagsByShaInput = z.infer<typeof DescribeGitTagsByShaInputSchema>;
export type DescribeGitTagsByShaOutput = z.infer<typeof DescribeGitTagsByShaOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitTagsByShaInput, DescribeGitTagsByShaOutput> = {
  action: 'DescribeGitTagsBySha',
  method: 'POST',
  inputSchema: DescribeGitTagsByShaInputSchema,
  outputSchema: DescribeGitTagsByShaOutputSchema,
};

// --------------- Action ---------------

/** 查询含有某次提交的标签列表 */
export const DescribeGitTagsBySha = (
  client: CodingClient,
  params: DescribeGitTagsByShaInput,
): Promise<Either<SdkError, DescribeGitTagsByShaOutput>> =>
  executeAction(client.config, spec, params);
