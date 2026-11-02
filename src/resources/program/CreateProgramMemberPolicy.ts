import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProgramProgramMemberPolicySchema } from './schemas';

// --------------- Schema ---------------

/** 项目集成员权限组添加 - 请求参数 */
export const CreateProgramMemberPolicyInputSchema = z.object({
  /** 权限策略，默认策略名或者策略 ID */
  Policies: z.array(z.string()).describe('权限策略，默认策略名或者策略 ID'),
  /** 身份 ID */
  PrincipalId: z.string().describe('身份 ID'),
  /** 身份类型 */
  PrincipalType: z.string().describe('身份类型'),
  /** 项目集 ID */
  ProgramId: z.number().int().describe('项目集 ID'),
});

/** 项目集成员权限组添加 - 响应数据 */
export const CreateProgramMemberPolicyOutputSchema = z.object({
  Data: z.array(ProgramProgramMemberPolicySchema),
});

// --------------- Types ---------------

export type CreateProgramMemberPolicyInput = z.infer<typeof CreateProgramMemberPolicyInputSchema>;
export type CreateProgramMemberPolicyOutput = z.infer<typeof CreateProgramMemberPolicyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProgramMemberPolicyInput, CreateProgramMemberPolicyOutput> = {
  action: 'CreateProgramMemberPolicy',
  method: 'POST',
  inputSchema: CreateProgramMemberPolicyInputSchema,
  outputSchema: CreateProgramMemberPolicyOutputSchema,
};

// --------------- Action ---------------

/** 项目集成员权限组添加 */
export const CreateProgramMemberPolicy = (
  client: CodingClient,
  params: CreateProgramMemberPolicyInput,
): Promise<Either<SdkError, CreateProgramMemberPolicyOutput>> =>
  executeAction(client.config, spec, params);
