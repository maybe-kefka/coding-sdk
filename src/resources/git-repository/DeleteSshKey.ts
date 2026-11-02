import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除当前用户的SSH公钥 - 请求参数 */
export const DeleteSshKeyInputSchema = z.object({
  /** ssh id */
  SshKeyId: z.number().int().describe('ssh id'),
});

/** 删除当前用户的SSH公钥 - 响应数据 */
export const DeleteSshKeyOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteSshKeyInput = z.infer<typeof DeleteSshKeyInputSchema>;
export type DeleteSshKeyOutput = z.infer<typeof DeleteSshKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteSshKeyInput, DeleteSshKeyOutput> = {
  action: 'DeleteSshKey',
  method: 'POST',
  inputSchema: DeleteSshKeyInputSchema,
  outputSchema: DeleteSshKeyOutputSchema,
};

// --------------- Action ---------------

/** 删除当前用户的SSH公钥 */
export const DeleteSshKey = (
  client: CodingClient,
  params: DeleteSshKeyInput,
): Promise<Either<SdkError, DeleteSshKeyOutput>> => executeAction(client.config, spec, params);
