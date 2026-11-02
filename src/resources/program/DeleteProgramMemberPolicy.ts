import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProgramProgramMemberPolicySchema } from './schemas';

// --------------- Schema ---------------

/** 项目集成员权限组删除 - 请求参数 */
export const DeleteProgramMemberPolicyInputSchema = z.object({
  /** 权限策略，默认策略名或者策略 ID */
  Policies: z.array(z.string()).describe('权限策略，默认策略名或者策略 ID'),
  /** 身份 ID */
  PrincipalId: z.string().describe('身份 ID'),
  /** 身份类型 */
  PrincipalType: z.string().describe('身份类型'),
  /** 项目集 ID */
  ProgramId: z.number().int().describe('项目集 ID'),
});

/** 项目集成员权限组删除 - 响应数据 */
export const DeleteProgramMemberPolicyOutputSchema = z.object({
  Data: z.array(ProgramProgramMemberPolicySchema),
});

// --------------- Types ---------------

export type DeleteProgramMemberPolicyInput = z.infer<typeof DeleteProgramMemberPolicyInputSchema>;
export type DeleteProgramMemberPolicyOutput = z.infer<typeof DeleteProgramMemberPolicyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteProgramMemberPolicyInput, DeleteProgramMemberPolicyOutput> = {
  action: 'DeleteProgramMemberPolicy',
  method: 'POST',
  inputSchema: DeleteProgramMemberPolicyInputSchema,
  outputSchema: DeleteProgramMemberPolicyOutputSchema,
};

// --------------- Action ---------------

/** 项目集成员权限组删除 */
export const DeleteProgramMemberPolicy = (
  client: CodingClient,
  params: DeleteProgramMemberPolicyInput,
): Promise<Either<SdkError, DeleteProgramMemberPolicyOutput>> =>
  executeAction(client.config, spec, params);
