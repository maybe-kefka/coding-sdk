import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** CD 主机组删除 - 请求参数 */
export const DeleteCdHostServerGroupInputSchema = z.object({
  /** 主机组 ID */
  Id: z.number().int().describe('主机组 ID'),
});

/** CD 主机组删除 - 响应数据 */
export const DeleteCdHostServerGroupOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteCdHostServerGroupInput = z.infer<typeof DeleteCdHostServerGroupInputSchema>;
export type DeleteCdHostServerGroupOutput = z.infer<typeof DeleteCdHostServerGroupOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteCdHostServerGroupInput, DeleteCdHostServerGroupOutput> = {
  action: 'DeleteCdHostServerGroup',
  method: 'POST',
  inputSchema: DeleteCdHostServerGroupInputSchema,
  outputSchema: DeleteCdHostServerGroupOutputSchema,
};

// --------------- Action ---------------

/** CD 主机组删除 */
export const DeleteCdHostServerGroup = (
  client: CodingClient,
  params: DeleteCdHostServerGroupInput,
): Promise<Either<SdkError, DeleteCdHostServerGroupOutput>> =>
  executeAction(client.config, spec, params);
