import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 部门删除 - 请求参数 */
export const DeleteDepartmentInputSchema = z.object({
  /** 部门ID */
  DepartmentId: z.number().int().describe('部门ID'),
});

/** 部门删除 - 响应数据 */
export const DeleteDepartmentOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteDepartmentInput = z.infer<typeof DeleteDepartmentInputSchema>;
export type DeleteDepartmentOutput = z.infer<typeof DeleteDepartmentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteDepartmentInput, DeleteDepartmentOutput> = {
  action: 'DeleteDepartment',
  method: 'POST',
  inputSchema: DeleteDepartmentInputSchema,
  outputSchema: DeleteDepartmentOutputSchema,
};

// --------------- Action ---------------

/** 部门删除 */
export const DeleteDepartment = (
  client: CodingClient,
  params: DeleteDepartmentInput,
): Promise<Either<SdkError, DeleteDepartmentOutput>> => executeAction(client.config, spec, params);
