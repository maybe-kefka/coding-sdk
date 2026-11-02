import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepartmentDepartmentDataSchema } from './schemas';

// --------------- Schema ---------------

/** 部门信息修改 - 请求参数 */
export const ModifyDepartmentInputSchema = z.object({
  /** 部门ID */
  Id: z.number().int().describe('部门ID'),
  /** 部门名 */
  Name: z.string().describe('部门名'),
  /** 父级部门ID */
  ParentId: z.number().int().describe('父级部门ID'),
});

/** 部门信息修改 - 响应数据 */
export const ModifyDepartmentOutputSchema = z.object({
  /** 修改后的部门信息 */
  Department: DepartmentDepartmentDataSchema.describe('修改后的部门信息'),
});

// --------------- Types ---------------

export type ModifyDepartmentInput = z.infer<typeof ModifyDepartmentInputSchema>;
export type ModifyDepartmentOutput = z.infer<typeof ModifyDepartmentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepartmentInput, ModifyDepartmentOutput> = {
  action: 'ModifyDepartment',
  method: 'POST',
  inputSchema: ModifyDepartmentInputSchema,
  outputSchema: ModifyDepartmentOutputSchema,
};

// --------------- Action ---------------

/** 修改部门信息(部门名，移动位置) */
export const ModifyDepartment = (
  client: CodingClient,
  params: ModifyDepartmentInput,
): Promise<Either<SdkError, ModifyDepartmentOutput>> => executeAction(client.config, spec, params);
