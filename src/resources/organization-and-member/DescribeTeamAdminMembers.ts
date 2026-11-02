import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TeamAdminMemberDataSchema } from './schemas';

// --------------- Schema ---------------

/** 团队管理员查询 - 请求参数 */
export const DescribeTeamAdminMembersInputSchema = z.object({
  /** 第几页 */
  PageNumber: z.number().int().describe('第几页'),
  /** 每页条数 */
  PageSize: z.number().int().describe('每页条数'),
});

/** 团队管理员查询 - 响应数据 */
export const DescribeTeamAdminMembersOutputSchema = z.object({
  /** 团队管理员列表信息 */
  Data: TeamAdminMemberDataSchema.describe('团队管理员列表信息'),
});

// --------------- Types ---------------

export type DescribeTeamAdminMembersInput = z.infer<typeof DescribeTeamAdminMembersInputSchema>;
export type DescribeTeamAdminMembersOutput = z.infer<typeof DescribeTeamAdminMembersOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamAdminMembersInput, DescribeTeamAdminMembersOutput> = {
  action: 'DescribeTeamAdminMembers',
  method: 'POST',
  inputSchema: DescribeTeamAdminMembersInputSchema,
  outputSchema: DescribeTeamAdminMembersOutputSchema,
};

// --------------- Action ---------------

/** 查询团队管理员 */
export const DescribeTeamAdminMembers = (
  client: CodingClient,
  params: DescribeTeamAdminMembersInput,
): Promise<Either<SdkError, DescribeTeamAdminMembersOutput>> =>
  executeAction(client.config, spec, params);
