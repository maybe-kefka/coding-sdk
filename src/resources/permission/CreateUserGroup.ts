import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 用户组创建 - 请求参数 */
export const CreateUserGroupInputSchema = z.object({
  /** 用户组描述 */
  Description: z.string().describe('用户组描述'),
  /** 用户组名称 */
  Name: z.string().describe('用户组名称'),
});

/** 用户组创建 - 响应数据 */
export const CreateUserGroupOutputSchema = z.object({
  /** id */
  Id: z.number().int().describe('id'),
});

// --------------- Types ---------------

export type CreateUserGroupInput = z.infer<typeof CreateUserGroupInputSchema>;
export type CreateUserGroupOutput = z.infer<typeof CreateUserGroupOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateUserGroupInput, CreateUserGroupOutput> = {
  action: 'CreateUserGroup',
  method: 'POST',
  inputSchema: CreateUserGroupInputSchema,
  outputSchema: CreateUserGroupOutputSchema,
};

// --------------- Action ---------------

/** 用户组创建 */
export const CreateUserGroup = (
  client: CodingClient,
  params: CreateUserGroupInput,
): Promise<Either<SdkError, CreateUserGroupOutput>> => executeAction(client.config, spec, params);
