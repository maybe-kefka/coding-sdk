import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectMemberDataSchema } from './schemas';

// --------------- Schema ---------------

/** 项目成员列表查询 - 请求参数 */
export const DescribeProjectMembersInputSchema = z.object({
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
  /** 用户组Id */
  RoleId: z.number().int().optional().describe('用户组Id'),
});

/** 项目成员列表查询 - 响应数据 */
export const DescribeProjectMembersOutputSchema = z.object({
  /** 项目成员分页列表信息 */
  Data: ProjectMemberDataSchema.describe('项目成员分页列表信息'),
});

// --------------- Types ---------------

export type DescribeProjectMembersInput = z.infer<typeof DescribeProjectMembersInputSchema>;
export type DescribeProjectMembersOutput = z.infer<typeof DescribeProjectMembersOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectMembersInput, DescribeProjectMembersOutput> = {
  action: 'DescribeProjectMembers',
  method: 'POST',
  inputSchema: DescribeProjectMembersInputSchema,
  outputSchema: DescribeProjectMembersOutputSchema,
};

// --------------- Action ---------------

/** 项目成员列表查询 */
export const DescribeProjectMembers = (
  client: CodingClient,
  params: DescribeProjectMembersInput,
): Promise<Either<SdkError, DescribeProjectMembersOutput>> =>
  executeAction(client.config, spec, params);
