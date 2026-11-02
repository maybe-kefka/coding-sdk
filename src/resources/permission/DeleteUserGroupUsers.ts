import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { UserGroupUserInfosSchema } from './schemas';

// --------------- Schema ---------------

/** 用户组删除用户 - 请求参数 */
export const DeleteUserGroupUsersInputSchema = z.object({
  /** 用户组用户信息 */
  UserGroupUserInfos: z.array(UserGroupUserInfosSchema).describe('用户组用户信息'),
});

/** 用户组删除用户 - 响应数据 */
export const DeleteUserGroupUsersOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteUserGroupUsersInput = z.infer<typeof DeleteUserGroupUsersInputSchema>;
export type DeleteUserGroupUsersOutput = z.infer<typeof DeleteUserGroupUsersOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteUserGroupUsersInput, DeleteUserGroupUsersOutput> = {
  action: 'DeleteUserGroupUsers',
  method: 'POST',
  inputSchema: DeleteUserGroupUsersInputSchema,
  outputSchema: DeleteUserGroupUsersOutputSchema,
};

// --------------- Action ---------------

/** 用户组删除用户 */
export const DeleteUserGroupUsers = (
  client: CodingClient,
  params: DeleteUserGroupUsersInput,
): Promise<Either<SdkError, DeleteUserGroupUsersOutput>> =>
  executeAction(client.config, spec, params);
