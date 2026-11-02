import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTagSchema } from './schemas';

// --------------- Schema ---------------

/** 查询受保护的标签列表 - 请求参数 */
export const DescribeGitProtectedTagsInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
});

/** 查询受保护的标签列表 - 响应数据 */
export const DescribeGitProtectedTagsOutputSchema = z.object({
  /** 标签列表 */
  GitTags: z.array(GitTagSchema).describe('标签列表'),
});

// --------------- Types ---------------

export type DescribeGitProtectedTagsInput = z.infer<typeof DescribeGitProtectedTagsInputSchema>;
export type DescribeGitProtectedTagsOutput = z.infer<typeof DescribeGitProtectedTagsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitProtectedTagsInput, DescribeGitProtectedTagsOutput> = {
  action: 'DescribeGitProtectedTags',
  method: 'POST',
  inputSchema: DescribeGitProtectedTagsInputSchema,
  outputSchema: DescribeGitProtectedTagsOutputSchema,
};

// --------------- Action ---------------

/** 查询受保护的标签列表 */
export const DescribeGitProtectedTags = (
  client: CodingClient,
  params: DescribeGitProtectedTagsInput,
): Promise<Either<SdkError, DescribeGitProtectedTagsOutput>> =>
  executeAction(client.config, spec, params);
