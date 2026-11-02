import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTreeItemSchema } from './schemas';

// --------------- Schema ---------------

/** 获取分支目录结构 - 请求参数 */
export const DescribeGitFilesInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 路径，不传即为根目录 */
  Path: z.string().optional().describe('路径，不传即为根目录'),
  /** 分支名 */
  Ref: z.string().describe('分支名'),
});

/** 获取分支目录结构 - 响应数据 */
export const DescribeGitFilesOutputSchema = z.object({
  /** 获取分支目录结构 */
  Items: z.array(GitTreeItemSchema).describe('获取分支目录结构'),
});

// --------------- Types ---------------

export type DescribeGitFilesInput = z.infer<typeof DescribeGitFilesInputSchema>;
export type DescribeGitFilesOutput = z.infer<typeof DescribeGitFilesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitFilesInput, DescribeGitFilesOutput> = {
  action: 'DescribeGitFiles',
  method: 'POST',
  inputSchema: DescribeGitFilesInputSchema,
  outputSchema: DescribeGitFilesOutputSchema,
};

// --------------- Action ---------------

/** 获取分支目录结构 */
export const DescribeGitFiles = (
  client: CodingClient,
  params: DescribeGitFilesInput,
): Promise<Either<SdkError, DescribeGitFilesOutput>> => executeAction(client.config, spec, params);
