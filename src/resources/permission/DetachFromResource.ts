import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GrantInfoSchema, ResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 授权收回 - 请求参数 */
export const DetachFromResourceInputSchema = z.object({
  /** 授权信息 */
  Grants: z.array(GrantInfoSchema).describe('授权信息'),
  /** 授权的资源 */
  Resource: ResourceInfoSchema.describe('授权的资源'),
});

/** 授权收回 - 响应数据 */
export const DetachFromResourceOutputSchema = z.object({});

// --------------- Types ---------------

export type DetachFromResourceInput = z.infer<typeof DetachFromResourceInputSchema>;
export type DetachFromResourceOutput = z.infer<typeof DetachFromResourceOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DetachFromResourceInput, DetachFromResourceOutput> = {
  action: 'DetachFromResource',
  method: 'POST',
  inputSchema: DetachFromResourceInputSchema,
  outputSchema: DetachFromResourceOutputSchema,
};

// --------------- Action ---------------

/** 授权收回，只收回参数指定的授权，已有其它授权不受影响 */
export const DetachFromResource = (
  client: CodingClient,
  params: DetachFromResourceInput,
): Promise<Either<SdkError, DetachFromResourceOutput>> =>
  executeAction(client.config, spec, params);
