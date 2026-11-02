import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitReferenceSchema } from './schemas';

// --------------- Schema ---------------

/** 查询含有某次提交的标签或分支列表 - 请求参数 */
export const DescribeGitRefsByShaInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 提交id */
  Sha: z.string().describe('提交id'),
  /** all：列表中既包含分支也包含标签，tag：列表中只包含标签，branch：列表中只包含分支 */
  Type: z
    .string()
    .describe('all：列表中既包含分支也包含标签，tag：列表中只包含标签，branch：列表中只包含分支'),
});

/** 查询含有某次提交的标签或分支列表 - 响应数据 */
export const DescribeGitRefsByShaOutputSchema = z.object({
  /** ref集合 */
  Refs: z.array(GitReferenceSchema).nullable().describe('ref集合'),
});

// --------------- Types ---------------

export type DescribeGitRefsByShaInput = z.infer<typeof DescribeGitRefsByShaInputSchema>;
export type DescribeGitRefsByShaOutput = z.infer<typeof DescribeGitRefsByShaOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitRefsByShaInput, DescribeGitRefsByShaOutput> = {
  action: 'DescribeGitRefsBySha',
  method: 'POST',
  inputSchema: DescribeGitRefsByShaInputSchema,
  outputSchema: DescribeGitRefsByShaOutputSchema,
};

// --------------- Action ---------------

/** 查询含有某次提交的标签或分支列表 */
export const DescribeGitRefsBySha = (
  client: CodingClient,
  params: DescribeGitRefsByShaInput,
): Promise<Either<SdkError, DescribeGitRefsByShaOutput>> =>
  executeAction(client.config, spec, params);
