import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BranchProtectionMemberSchema } from './schemas';

// --------------- Schema ---------------

/** 查询保护分支规则下所有管理员信息 - 请求参数 */
export const DescribeBranchProtectionMembersInputSchema = z.object({
  /** 保护分支规则id */
  BranchProtectionId: z.number().int().describe('保护分支规则id'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepptPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepptPath二选一即可'),
});

/** 查询保护分支规则下所有管理员信息 - 响应数据 */
export const DescribeBranchProtectionMembersOutputSchema = z.object({
  /** 保护分支规则管理员列表 */
  Members: z.array(BranchProtectionMemberSchema).describe('保护分支规则管理员列表'),
});

// --------------- Types ---------------

export type DescribeBranchProtectionMembersInput = z.infer<
  typeof DescribeBranchProtectionMembersInputSchema
>;
export type DescribeBranchProtectionMembersOutput = z.infer<
  typeof DescribeBranchProtectionMembersOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeBranchProtectionMembersInput,
  DescribeBranchProtectionMembersOutput
> = {
  action: 'DescribeBranchProtectionMembers',
  method: 'POST',
  inputSchema: DescribeBranchProtectionMembersInputSchema,
  outputSchema: DescribeBranchProtectionMembersOutputSchema,
};

// --------------- Action ---------------

/** 查询保护分支规则下所有管理员信息 */
export const DescribeBranchProtectionMembers = (
  client: CodingClient,
  params: DescribeBranchProtectionMembersInput,
): Promise<Either<SdkError, DescribeBranchProtectionMembersOutput>> =>
  executeAction(client.config, spec, params);
