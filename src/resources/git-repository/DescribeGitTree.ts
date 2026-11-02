import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTreeSchema } from './schemas';

// --------------- Schema ---------------

/** 查询 git 仓库的树 - 请求参数 */
export const DescribeGitTreeInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 是否递归 */
  IsRecursive: z.boolean().describe('是否递归'),
  /** 文件路径 */
  Path: z.string().optional().describe('文件路径'),
  /** 分支或标签名，默认 HEAD */
  Ref: z.string().describe('分支或标签名，默认 HEAD'),
});

/** 查询 git 仓库的树 - 响应数据 */
export const DescribeGitTreeOutputSchema = z.object({
  /** 1 */
  Trees: z.array(GitTreeSchema).describe('1'),
});

// --------------- Types ---------------

export type DescribeGitTreeInput = z.infer<typeof DescribeGitTreeInputSchema>;
export type DescribeGitTreeOutput = z.infer<typeof DescribeGitTreeOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitTreeInput, DescribeGitTreeOutput> = {
  action: 'DescribeGitTree',
  method: 'POST',
  inputSchema: DescribeGitTreeInputSchema,
  outputSchema: DescribeGitTreeOutputSchema,
};

// --------------- Action ---------------

/** 查询 git 仓库的树 */
export const DescribeGitTree = (
  client: CodingClient,
  params: DescribeGitTreeInput,
): Promise<Either<SdkError, DescribeGitTreeOutput>> => executeAction(client.config, spec, params);
