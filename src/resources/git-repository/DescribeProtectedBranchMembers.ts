import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProtectedBranchMemberSchema } from './schemas';

// --------------- Schema ---------------

/** 查询保护分支成员 - 请求参数 */
export const DescribeProtectedBranchMembersInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 查询保护分支成员 - 响应数据 */
export const DescribeProtectedBranchMembersOutputSchema = z.object({
  /** 保护分支成员列表 */
  Members: z.array(ProtectedBranchMemberSchema).describe('保护分支成员列表'),
});

// --------------- Types ---------------

export type DescribeProtectedBranchMembersInput = z.infer<
  typeof DescribeProtectedBranchMembersInputSchema
>;
export type DescribeProtectedBranchMembersOutput = z.infer<
  typeof DescribeProtectedBranchMembersOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProtectedBranchMembersInput, DescribeProtectedBranchMembersOutput> =
  {
    action: 'DescribeProtectedBranchMembers',
    method: 'POST',
    inputSchema: DescribeProtectedBranchMembersInputSchema,
    outputSchema: DescribeProtectedBranchMembersOutputSchema,
  };

// --------------- Action ---------------

/** 查询保护分支成员 */
export const DescribeProtectedBranchMembers = (
  client: CodingClient,
  params: DescribeProtectedBranchMembersInput,
): Promise<Either<SdkError, DescribeProtectedBranchMembersOutput>> =>
  executeAction(client.config, spec, params);
