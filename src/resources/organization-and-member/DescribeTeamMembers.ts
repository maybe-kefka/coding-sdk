import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TeamMemberDataSchema } from './schemas';

// --------------- Schema ---------------

/** 团队成员列表查询 - 请求参数 */
export const DescribeTeamMembersInputSchema = z.object({
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 是否展示部门 */
  ShowDepartment: z.boolean().optional().describe('是否展示部门'),
});

/** 团队成员列表查询 - 响应数据 */
export const DescribeTeamMembersOutputSchema = z.object({
  /** 团队成员分页列表信息 */
  Data: TeamMemberDataSchema.describe('团队成员分页列表信息'),
});

// --------------- Types ---------------

export type DescribeTeamMembersInput = z.infer<typeof DescribeTeamMembersInputSchema>;
export type DescribeTeamMembersOutput = z.infer<typeof DescribeTeamMembersOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamMembersInput, DescribeTeamMembersOutput> = {
  action: 'DescribeTeamMembers',
  method: 'POST',
  inputSchema: DescribeTeamMembersInputSchema,
  outputSchema: DescribeTeamMembersOutputSchema,
};

// --------------- Action ---------------

/** 团队成员列表查询 */
export const DescribeTeamMembers = (
  client: CodingClient,
  params: DescribeTeamMembersInput,
): Promise<Either<SdkError, DescribeTeamMembersOutput>> =>
  executeAction(client.config, spec, params);
