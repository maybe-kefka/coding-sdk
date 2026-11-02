import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 权限组批量删除 - 请求参数 */
export const DeletePoliciesByIdInputSchema = z.object({
  /** 权限组 ID */
  Id: z.array(z.number().int()).describe('权限组 ID'),
});

/** 权限组批量删除 - 响应数据 */
export const DeletePoliciesByIdOutputSchema = z.object({
  /** 成功删除的权限组 ID */
  DeletedPolicyId: z.array(z.number().int()).nullable().describe('成功删除的权限组 ID'),
});

// --------------- Types ---------------

export type DeletePoliciesByIdInput = z.infer<typeof DeletePoliciesByIdInputSchema>;
export type DeletePoliciesByIdOutput = z.infer<typeof DeletePoliciesByIdOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeletePoliciesByIdInput, DeletePoliciesByIdOutput> = {
  action: 'DeletePoliciesById',
  method: 'POST',
  inputSchema: DeletePoliciesByIdInputSchema,
  outputSchema: DeletePoliciesByIdOutputSchema,
};

// --------------- Action ---------------

/** 权限组批量删除 */
export const DeletePoliciesById = (
  client: CodingClient,
  params: DeletePoliciesByIdInput,
): Promise<Either<SdkError, DeletePoliciesByIdOutput>> =>
  executeAction(client.config, spec, params);
