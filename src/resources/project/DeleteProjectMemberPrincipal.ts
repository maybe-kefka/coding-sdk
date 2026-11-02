import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PrincipalDelSchema } from './schemas';

// --------------- Schema ---------------

/** 项目成员主体删除(包含用户组、部门、成员) - 请求参数 */
export const DeleteProjectMemberPrincipalInputSchema = z.object({
  /** 成员主体信息 */
  Principals: z.array(PrincipalDelSchema).describe('成员主体信息'),
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

/** 项目成员主体删除(包含用户组、部门、成员) - 响应数据 */
export const DeleteProjectMemberPrincipalOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteProjectMemberPrincipalInput = z.infer<
  typeof DeleteProjectMemberPrincipalInputSchema
>;
export type DeleteProjectMemberPrincipalOutput = z.infer<
  typeof DeleteProjectMemberPrincipalOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteProjectMemberPrincipalInput, DeleteProjectMemberPrincipalOutput> = {
  action: 'DeleteProjectMemberPrincipal',
  method: 'POST',
  inputSchema: DeleteProjectMemberPrincipalInputSchema,
  outputSchema: DeleteProjectMemberPrincipalOutputSchema,
};

// --------------- Action ---------------

/** 项目成员主体删除(包含用户组、部门、成员) */
export const DeleteProjectMemberPrincipal = (
  client: CodingClient,
  params: DeleteProjectMemberPrincipalInput,
): Promise<Either<SdkError, DeleteProjectMemberPrincipalOutput>> =>
  executeAction(client.config, spec, params);
