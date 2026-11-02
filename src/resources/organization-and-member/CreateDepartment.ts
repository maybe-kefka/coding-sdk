import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepartmentDepartmentDataSchema } from './schemas';

// --------------- Schema ---------------

/** 部门创建 - 请求参数 */
export const CreateDepartmentInputSchema = z.object({
  /** 部门名 */
  Name: z.string().describe('部门名'),
  /** 父部门ID */
  ParentId: z.number().int().describe('父部门ID'),
});

/** 部门创建 - 响应数据 */
export const CreateDepartmentOutputSchema = z.object({
  /** 所创建的部门信息 */
  Department: DepartmentDepartmentDataSchema.describe('所创建的部门信息'),
});

// --------------- Types ---------------

export type CreateDepartmentInput = z.infer<typeof CreateDepartmentInputSchema>;
export type CreateDepartmentOutput = z.infer<typeof CreateDepartmentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateDepartmentInput, CreateDepartmentOutput> = {
  action: 'CreateDepartment',
  method: 'POST',
  inputSchema: CreateDepartmentInputSchema,
  outputSchema: CreateDepartmentOutputSchema,
};

// --------------- Action ---------------

/** 部门创建 */
export const CreateDepartment = (
  client: CodingClient,
  params: CreateDepartmentInput,
): Promise<Either<SdkError, CreateDepartmentOutput>> => executeAction(client.config, spec, params);
