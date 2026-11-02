import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 用户组更新 - 请求参数 */
export const UpdateUserGroupByIdInputSchema = z.object({
  /** 用户组描述 */
  Description: z.string().describe('用户组描述'),
  /** 用户组ID */
  GroupId: z.number().int().describe('用户组ID'),
  /** 用户组名称 */
  Name: z.string().describe('用户组名称'),
});

/** 用户组更新 - 响应数据 */
export const UpdateUserGroupByIdOutputSchema = z.object({});

// --------------- Types ---------------

export type UpdateUserGroupByIdInput = z.infer<typeof UpdateUserGroupByIdInputSchema>;
export type UpdateUserGroupByIdOutput = z.infer<typeof UpdateUserGroupByIdOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<UpdateUserGroupByIdInput, UpdateUserGroupByIdOutput> = {
  action: 'UpdateUserGroupById',
  method: 'POST',
  inputSchema: UpdateUserGroupByIdInputSchema,
  outputSchema: UpdateUserGroupByIdOutputSchema,
};

// --------------- Action ---------------

/** 用户组更新 */
export const UpdateUserGroupById = (
  client: CodingClient,
  params: UpdateUserGroupByIdInput,
): Promise<Either<SdkError, UpdateUserGroupByIdOutput>> =>
  executeAction(client.config, spec, params);
