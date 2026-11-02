import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GrantInfoSchema, ResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 资源授权列表设置 - 请求参数 */
export const SetGrantToResourceInputSchema = z.object({
  /** 授权信息 */
  Grants: z.array(GrantInfoSchema).describe('授权信息'),
  /** 授权的资源 */
  Resource: ResourceInfoSchema.describe('授权的资源'),
});

/** 资源授权列表设置 - 响应数据 */
export const SetGrantToResourceOutputSchema = z.object({});

// --------------- Types ---------------

export type SetGrantToResourceInput = z.infer<typeof SetGrantToResourceInputSchema>;
export type SetGrantToResourceOutput = z.infer<typeof SetGrantToResourceOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<SetGrantToResourceInput, SetGrantToResourceOutput> = {
  action: 'SetGrantToResource',
  method: 'POST',
  inputSchema: SetGrantToResourceInputSchema,
  outputSchema: SetGrantToResourceOutputSchema,
};

// --------------- Action ---------------

/** 授权设置，收回授权体在资源中的所有授权，重新设置为参数指定的授权 */
export const SetGrantToResource = (
  client: CodingClient,
  params: SetGrantToResourceInput,
): Promise<Either<SdkError, SetGrantToResourceOutput>> =>
  executeAction(client.config, spec, params);
