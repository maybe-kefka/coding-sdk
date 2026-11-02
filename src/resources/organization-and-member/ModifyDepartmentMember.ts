import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 部门成员管理 - 请求参数 */
export const ModifyDepartmentMemberInputSchema = z.object({
  /** 部门ID信息 */
  DepartmentIds: z.array(z.number().int()).describe('部门ID信息'),
  /** 用户refIds */
  RefIds: z.array(z.number().int()).describe('用户refIds'),
});

/** 部门成员管理 - 响应数据 */
export const ModifyDepartmentMemberOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDepartmentMemberInput = z.infer<typeof ModifyDepartmentMemberInputSchema>;
export type ModifyDepartmentMemberOutput = z.infer<typeof ModifyDepartmentMemberOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepartmentMemberInput, ModifyDepartmentMemberOutput> = {
  action: 'ModifyDepartmentMember',
  method: 'POST',
  inputSchema: ModifyDepartmentMemberInputSchema,
  outputSchema: ModifyDepartmentMemberOutputSchema,
};

// --------------- Action ---------------

/** 部门成员管理 */
export const ModifyDepartmentMember = (
  client: CodingClient,
  params: ModifyDepartmentMemberInput,
): Promise<Either<SdkError, ModifyDepartmentMemberOutput>> =>
  executeAction(client.config, spec, params);
