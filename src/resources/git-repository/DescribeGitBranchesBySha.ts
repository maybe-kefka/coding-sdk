import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RefInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 根据sha值查询所在分支 - 请求参数 */
export const DescribeGitBranchesByShaInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** sha值 */
  Sha: z.string().describe('sha值'),
});

/** 根据sha值查询所在分支 - 响应数据 */
export const DescribeGitBranchesByShaOutputSchema = z.object({
  /** ref信息列表 */
  Refs: z.array(RefInfoSchema).describe('ref信息列表'),
});

// --------------- Types ---------------

export type DescribeGitBranchesByShaInput = z.infer<typeof DescribeGitBranchesByShaInputSchema>;
export type DescribeGitBranchesByShaOutput = z.infer<typeof DescribeGitBranchesByShaOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBranchesByShaInput, DescribeGitBranchesByShaOutput> = {
  action: 'DescribeGitBranchesBySha',
  method: 'POST',
  inputSchema: DescribeGitBranchesByShaInputSchema,
  outputSchema: DescribeGitBranchesByShaOutputSchema,
};

// --------------- Action ---------------

/** 根据sha值查询所在分支 */
export const DescribeGitBranchesBySha = (
  client: CodingClient,
  params: DescribeGitBranchesByShaInput,
): Promise<Either<SdkError, DescribeGitBranchesByShaOutput>> =>
  executeAction(client.config, spec, params);
