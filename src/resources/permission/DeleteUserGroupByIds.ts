import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 用户组删除 - 请求参数 */
export const DeleteUserGroupByIdsInputSchema = z.object({
  /** 用户组id列表 */
  GroupIds: z.array(z.number().int()).describe('用户组id列表'),
});

/** 用户组删除 - 响应数据 */
export const DeleteUserGroupByIdsOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteUserGroupByIdsInput = z.infer<typeof DeleteUserGroupByIdsInputSchema>;
export type DeleteUserGroupByIdsOutput = z.infer<typeof DeleteUserGroupByIdsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteUserGroupByIdsInput, DeleteUserGroupByIdsOutput> = {
  action: 'DeleteUserGroupByIds',
  method: 'POST',
  inputSchema: DeleteUserGroupByIdsInputSchema,
  outputSchema: DeleteUserGroupByIdsOutputSchema,
};

// --------------- Action ---------------

/** 用户组删除 */
export const DeleteUserGroupByIds = (
  client: CodingClient,
  params: DeleteUserGroupByIdsInput,
): Promise<Either<SdkError, DeleteUserGroupByIdsOutput>> =>
  executeAction(client.config, spec, params);
