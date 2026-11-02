import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PrincipalAddSchema } from './schemas';

// --------------- Schema ---------------

/** 项目成员主体新增(包含用户组、部门、成员) - 请求参数 */
export const CreateProjectMemberPrincipalInputSchema = z.object({
  /** 成员主体信息 */
  Principals: z.array(PrincipalAddSchema).describe('成员主体信息'),
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

/** 项目成员主体新增(包含用户组、部门、成员) - 响应数据 */
export const CreateProjectMemberPrincipalOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateProjectMemberPrincipalInput = z.infer<
  typeof CreateProjectMemberPrincipalInputSchema
>;
export type CreateProjectMemberPrincipalOutput = z.infer<
  typeof CreateProjectMemberPrincipalOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProjectMemberPrincipalInput, CreateProjectMemberPrincipalOutput> = {
  action: 'CreateProjectMemberPrincipal',
  method: 'POST',
  inputSchema: CreateProjectMemberPrincipalInputSchema,
  outputSchema: CreateProjectMemberPrincipalOutputSchema,
};

// --------------- Action ---------------

/** 项目成员主体新增(包含用户组、部门、成员) */
export const CreateProjectMemberPrincipal = (
  client: CodingClient,
  params: CreateProjectMemberPrincipalInput,
): Promise<Either<SdkError, CreateProjectMemberPrincipalOutput>> =>
  executeAction(client.config, spec, params);
