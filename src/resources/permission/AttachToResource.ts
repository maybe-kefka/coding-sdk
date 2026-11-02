import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GrantInfoSchema, ResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 授权追加 - 请求参数 */
export const AttachToResourceInputSchema = z.object({
  /** 授权信息 */
  Grants: z.array(GrantInfoSchema).describe('授权信息'),
  /** 授权的资源 */
  Resource: ResourceInfoSchema.describe('授权的资源'),
});

/** 授权追加 - 响应数据 */
export const AttachToResourceOutputSchema = z.object({});

// --------------- Types ---------------

export type AttachToResourceInput = z.infer<typeof AttachToResourceInputSchema>;
export type AttachToResourceOutput = z.infer<typeof AttachToResourceOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<AttachToResourceInput, AttachToResourceOutput> = {
  action: 'AttachToResource',
  method: 'POST',
  inputSchema: AttachToResourceInputSchema,
  outputSchema: AttachToResourceOutputSchema,
};

// --------------- Action ---------------

/** 授权追加，原有其它授权不受影响，若授权已存在不再进行追加 */
export const AttachToResource = (
  client: CodingClient,
  params: AttachToResourceInput,
): Promise<Either<SdkError, AttachToResourceOutput>> => executeAction(client.config, spec, params);
