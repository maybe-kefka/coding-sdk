import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiUserUserDataSchema } from './schemas';

// --------------- Schema ---------------

/** 团队成员信息查询（通过用户 ID） - 请求参数 */
export const DescribeTeamMemberInputSchema = z.object({
  /** 用户Id */
  UserId: z.number().int().describe('用户Id'),
  /** 是否展示部门 */
  ShowDepartment: z.boolean().optional().describe('是否展示部门'),
});

/** 团队成员信息查询（通过用户 ID） - 响应数据 */
export const DescribeTeamMemberOutputSchema = z.object({
  /** 团队成员数据 */
  TeamMember: ApiUserUserDataSchema.describe('团队成员数据'),
});

// --------------- Types ---------------

export type DescribeTeamMemberInput = z.infer<typeof DescribeTeamMemberInputSchema>;
export type DescribeTeamMemberOutput = z.infer<typeof DescribeTeamMemberOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamMemberInput, DescribeTeamMemberOutput> = {
  action: 'DescribeTeamMember',
  method: 'POST',
  inputSchema: DescribeTeamMemberInputSchema,
  outputSchema: DescribeTeamMemberOutputSchema,
};

// --------------- Action ---------------

/** 通过用户 ID 查询团队成员信息 */
export const DescribeTeamMember = (
  client: CodingClient,
  params: DescribeTeamMemberInput,
): Promise<Either<SdkError, DescribeTeamMemberOutput>> =>
  executeAction(client.config, spec, params);
