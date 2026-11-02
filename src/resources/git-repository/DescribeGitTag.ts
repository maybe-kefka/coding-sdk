import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTagSchema } from './schemas';

// --------------- Schema ---------------

/** 查询单个tag - 请求参数 */
export const DescribeGitTagInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** tag名称 */
  TagName: z.string().describe('tag名称'),
});

/** 查询单个tag - 响应数据 */
export const DescribeGitTagOutputSchema = z.object({
  /** tag信息 */
  GitTag: GitTagSchema.describe('tag信息'),
});

// --------------- Types ---------------

export type DescribeGitTagInput = z.infer<typeof DescribeGitTagInputSchema>;
export type DescribeGitTagOutput = z.infer<typeof DescribeGitTagOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitTagInput, DescribeGitTagOutput> = {
  action: 'DescribeGitTag',
  method: 'POST',
  inputSchema: DescribeGitTagInputSchema,
  outputSchema: DescribeGitTagOutputSchema,
};

// --------------- Action ---------------

/** 查询单个tag */
export const DescribeGitTag = (
  client: CodingClient,
  params: DescribeGitTagInput,
): Promise<Either<SdkError, DescribeGitTagOutput>> => executeAction(client.config, spec, params);
