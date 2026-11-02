import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiUserUserDataSchema } from './schemas';

// --------------- Schema ---------------

/** 团队成员信息查询（通过用户 Email） - 请求参数 */
export const DescribeTeamMemberByEmailInputSchema = z.object({
  /** 用户邮箱 */
  Email: z.string().describe('用户邮箱'),
});

/** 团队成员信息查询（通过用户 Email） - 响应数据 */
export const DescribeTeamMemberByEmailOutputSchema = z.object({
  /** 团队成员数据 */
  TeamMember: ApiUserUserDataSchema.describe('团队成员数据'),
});

// --------------- Types ---------------

export type DescribeTeamMemberByEmailInput = z.infer<typeof DescribeTeamMemberByEmailInputSchema>;
export type DescribeTeamMemberByEmailOutput = z.infer<typeof DescribeTeamMemberByEmailOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamMemberByEmailInput, DescribeTeamMemberByEmailOutput> = {
  action: 'DescribeTeamMemberByEmail',
  method: 'POST',
  inputSchema: DescribeTeamMemberByEmailInputSchema,
  outputSchema: DescribeTeamMemberByEmailOutputSchema,
};

// --------------- Action ---------------

/** 通过用户 Email 查询团队成员信息 */
export const DescribeTeamMemberByEmail = (
  client: CodingClient,
  params: DescribeTeamMemberByEmailInput,
): Promise<Either<SdkError, DescribeTeamMemberByEmailOutput>> =>
  executeAction(client.config, spec, params);
