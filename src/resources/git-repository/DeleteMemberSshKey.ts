import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除团队成员的SSH公钥 - 请求参数 */
export const DeleteMemberSshKeyInputSchema = z.object({
  /** 成员 Id */
  MemberUserId: z.number().int().describe('成员 Id'),
  /** ssh id */
  SshKeyId: z.number().int().describe('ssh id'),
});

/** 删除团队成员的SSH公钥 - 响应数据 */
export const DeleteMemberSshKeyOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteMemberSshKeyInput = z.infer<typeof DeleteMemberSshKeyInputSchema>;
export type DeleteMemberSshKeyOutput = z.infer<typeof DeleteMemberSshKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteMemberSshKeyInput, DeleteMemberSshKeyOutput> = {
  action: 'DeleteMemberSshKey',
  method: 'POST',
  inputSchema: DeleteMemberSshKeyInputSchema,
  outputSchema: DeleteMemberSshKeyOutputSchema,
};

// --------------- Action ---------------

/** 删除团队成员的SSH公钥 */
export const DeleteMemberSshKey = (
  client: CodingClient,
  params: DeleteMemberSshKeyInput,
): Promise<Either<SdkError, DeleteMemberSshKeyOutput>> =>
  executeAction(client.config, spec, params);
