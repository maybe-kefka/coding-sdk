import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitRefSchema } from './schemas';

// --------------- Schema ---------------

/** 获取分支信息 - 请求参数 */
export const DescribeGitRefInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 分支名 */
  Revision: z.string().describe('分支名'),
});

/** 获取分支信息 - 响应数据 */
export const DescribeGitRefOutputSchema = z.object({
  /** git分支 */
  GitRef: GitRefSchema.describe('git分支'),
});

// --------------- Types ---------------

export type DescribeGitRefInput = z.infer<typeof DescribeGitRefInputSchema>;
export type DescribeGitRefOutput = z.infer<typeof DescribeGitRefOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitRefInput, DescribeGitRefOutput> = {
  action: 'DescribeGitRef',
  method: 'POST',
  inputSchema: DescribeGitRefInputSchema,
  outputSchema: DescribeGitRefOutputSchema,
};

// --------------- Action ---------------

/** 获取分支或标签信息 */
export const DescribeGitRef = (
  client: CodingClient,
  params: DescribeGitRefInput,
): Promise<Either<SdkError, DescribeGitRefOutput>> => executeAction(client.config, spec, params);
