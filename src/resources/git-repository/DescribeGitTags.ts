import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTagSchema } from './schemas';

// --------------- Schema ---------------

/** 查询当前仓库下所有tags - 请求参数 */
export const DescribeGitTagsInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** TagName的模糊查询关键字 */
  KeyWord: z.string().optional().describe('TagName的模糊查询关键字'),
  /** 页码 */
  Page: z.number().int().optional().describe('页码'),
  /** 每页数量 */
  PageSize: z.number().int().optional().describe('每页数量'),
});

/** 查询当前仓库下所有tags - 响应数据 */
export const DescribeGitTagsOutputSchema = z.object({
  /** tag列表信息 */
  GitTags: z.array(GitTagSchema).describe('tag列表信息'),
});

// --------------- Types ---------------

export type DescribeGitTagsInput = z.infer<typeof DescribeGitTagsInputSchema>;
export type DescribeGitTagsOutput = z.infer<typeof DescribeGitTagsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitTagsInput, DescribeGitTagsOutput> = {
  action: 'DescribeGitTags',
  method: 'POST',
  inputSchema: DescribeGitTagsInputSchema,
  outputSchema: DescribeGitTagsOutputSchema,
};

// --------------- Action ---------------

/** 查询当前仓库下所有tags */
export const DescribeGitTags = (
  client: CodingClient,
  params: DescribeGitTagsInput,
): Promise<Either<SdkError, DescribeGitTagsOutput>> => executeAction(client.config, spec, params);
