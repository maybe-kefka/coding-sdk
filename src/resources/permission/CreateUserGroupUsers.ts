import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { UserGroupUserInfosSchema } from './schemas';

// --------------- Schema ---------------

/** 用户组添加用户 - 请求参数 */
export const CreateUserGroupUsersInputSchema = z.object({
  /** 用户用户组id列表 */
  UserGroupUserInfos: z.array(UserGroupUserInfosSchema).describe('用户用户组id列表'),
});

/** 用户组添加用户 - 响应数据 */
export const CreateUserGroupUsersOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateUserGroupUsersInput = z.infer<typeof CreateUserGroupUsersInputSchema>;
export type CreateUserGroupUsersOutput = z.infer<typeof CreateUserGroupUsersOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateUserGroupUsersInput, CreateUserGroupUsersOutput> = {
  action: 'CreateUserGroupUsers',
  method: 'POST',
  inputSchema: CreateUserGroupUsersInputSchema,
  outputSchema: CreateUserGroupUsersOutputSchema,
};

// --------------- Action ---------------

/** 用户组添加用户 */
export const CreateUserGroupUsers = (
  client: CodingClient,
  params: CreateUserGroupUsersInput,
): Promise<Either<SdkError, CreateUserGroupUsersOutput>> =>
  executeAction(client.config, spec, params);
