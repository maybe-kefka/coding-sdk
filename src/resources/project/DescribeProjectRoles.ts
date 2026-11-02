import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RoleSchema } from './schemas';

// --------------- Schema ---------------

/** 项目用户组查询 - 请求参数 */
export const DescribeProjectRolesInputSchema = z.object({
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

/** 项目用户组查询 - 响应数据 */
export const DescribeProjectRolesOutputSchema = z.object({
  /** 用户组 */
  Roles: z.array(RoleSchema).describe('用户组'),
});

// --------------- Types ---------------

export type DescribeProjectRolesInput = z.infer<typeof DescribeProjectRolesInputSchema>;
export type DescribeProjectRolesOutput = z.infer<typeof DescribeProjectRolesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectRolesInput, DescribeProjectRolesOutput> = {
  action: 'DescribeProjectRoles',
  method: 'POST',
  inputSchema: DescribeProjectRolesInputSchema,
  outputSchema: DescribeProjectRolesOutputSchema,
};

// --------------- Action ---------------

/** 项目用户组查询 */
export const DescribeProjectRoles = (
  client: CodingClient,
  params: DescribeProjectRolesInput,
): Promise<Either<SdkError, DescribeProjectRolesOutput>> =>
  executeAction(client.config, spec, params);
