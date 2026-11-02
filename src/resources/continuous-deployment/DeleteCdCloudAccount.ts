import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** CD 云账号删除 - 请求参数 */
export const DeleteCdCloudAccountInputSchema = z.object({
  /** 云账号 ID */
  Id: z.number().int().describe('云账号 ID'),
});

/** CD 云账号删除 - 响应数据 */
export const DeleteCdCloudAccountOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteCdCloudAccountInput = z.infer<typeof DeleteCdCloudAccountInputSchema>;
export type DeleteCdCloudAccountOutput = z.infer<typeof DeleteCdCloudAccountOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteCdCloudAccountInput, DeleteCdCloudAccountOutput> = {
  action: 'DeleteCdCloudAccount',
  method: 'POST',
  inputSchema: DeleteCdCloudAccountInputSchema,
  outputSchema: DeleteCdCloudAccountOutputSchema,
};

// --------------- Action ---------------

/** CD 云账号删除 */
export const DeleteCdCloudAccount = (
  client: CodingClient,
  params: DeleteCdCloudAccountInput,
): Promise<Either<SdkError, DeleteCdCloudAccountOutput>> =>
  executeAction(client.config, spec, params);
