import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 部门负责人管理 - 请求参数 */
export const ModifyDepartmentAssigneeInputSchema = z.object({
  /** 部门ID */
  DepartmentId: z.number().int().describe('部门ID'),
  /** 用户refIds 必填 */
  RefIds: z.array(z.number().int()).describe('用户refIds 必填'),
});

/** 部门负责人管理 - 响应数据 */
export const ModifyDepartmentAssigneeOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDepartmentAssigneeInput = z.infer<typeof ModifyDepartmentAssigneeInputSchema>;
export type ModifyDepartmentAssigneeOutput = z.infer<typeof ModifyDepartmentAssigneeOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepartmentAssigneeInput, ModifyDepartmentAssigneeOutput> = {
  action: 'ModifyDepartmentAssignee',
  method: 'POST',
  inputSchema: ModifyDepartmentAssigneeInputSchema,
  outputSchema: ModifyDepartmentAssigneeOutputSchema,
};

// --------------- Action ---------------

/** 部门负责人管理 */
export const ModifyDepartmentAssignee = (
  client: CodingClient,
  params: ModifyDepartmentAssigneeInput,
): Promise<Either<SdkError, ModifyDepartmentAssigneeOutput>> =>
  executeAction(client.config, spec, params);
