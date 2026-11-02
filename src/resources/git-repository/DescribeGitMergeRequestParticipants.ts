import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotUserSchema } from './schemas';

// --------------- Schema ---------------

/** 获取合并请求的参与者 - 请求参数 */
export const DescribeGitMergeRequestParticipantsInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 合并请求 IId */
  MergeId: z.number().int().describe('合并请求 IId'),
});

/** 获取合并请求的参与者 - 响应数据 */
export const DescribeGitMergeRequestParticipantsOutputSchema = z.object({
  /** 参与者列表 */
  Participants: z.array(DepotUserSchema).describe('参与者列表'),
});

// --------------- Types ---------------

export type DescribeGitMergeRequestParticipantsInput = z.infer<
  typeof DescribeGitMergeRequestParticipantsInputSchema
>;
export type DescribeGitMergeRequestParticipantsOutput = z.infer<
  typeof DescribeGitMergeRequestParticipantsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeGitMergeRequestParticipantsInput,
  DescribeGitMergeRequestParticipantsOutput
> = {
  action: 'DescribeGitMergeRequestParticipants',
  method: 'POST',
  inputSchema: DescribeGitMergeRequestParticipantsInputSchema,
  outputSchema: DescribeGitMergeRequestParticipantsOutputSchema,
};

// --------------- Action ---------------

/** 获取合并请求的参与者 */
export const DescribeGitMergeRequestParticipants = (
  client: CodingClient,
  params: DescribeGitMergeRequestParticipantsInput,
): Promise<Either<SdkError, DescribeGitMergeRequestParticipantsOutput>> =>
  executeAction(client.config, spec, params);
