import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 用户组清理用户 - 请求参数 */
export const DeleteAllUsersOnGroupInputSchema = z.object({
  /** 用户组id */
  GroupId: z.number().int().describe('用户组id'),
});

/** 用户组清理用户 - 响应数据 */
export const DeleteAllUsersOnGroupOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteAllUsersOnGroupInput = z.infer<typeof DeleteAllUsersOnGroupInputSchema>;
export type DeleteAllUsersOnGroupOutput = z.infer<typeof DeleteAllUsersOnGroupOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteAllUsersOnGroupInput, DeleteAllUsersOnGroupOutput> = {
  action: 'DeleteAllUsersOnGroup',
  method: 'POST',
  inputSchema: DeleteAllUsersOnGroupInputSchema,
  outputSchema: DeleteAllUsersOnGroupOutputSchema,
};

// --------------- Action ---------------

/** 用户组清理用户 */
export const DeleteAllUsersOnGroup = (
  client: CodingClient,
  params: DeleteAllUsersOnGroupInput,
): Promise<Either<SdkError, DeleteAllUsersOnGroupOutput>> =>
  executeAction(client.config, spec, params);
