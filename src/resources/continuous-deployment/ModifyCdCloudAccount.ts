import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CloudAccountCredentialSchema, ModifyCdCloudAccountResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 云账号更新 - 请求参数 */
export const ModifyCdCloudAccountInputSchema = z.object({
  /** 云账号凭据 */
  Credential: CloudAccountCredentialSchema.describe('云账号凭据'),
  /** 云账号 ID */
  Id: z.number().int().describe('云账号 ID'),
  /** 云账号名称 */
  Name: z.string().describe('云账号名称'),
});

/** CD 云账号更新 - 响应数据 */
export const ModifyCdCloudAccountOutputSchema = z.object({
  /** 云账号数据 */
  Data: ModifyCdCloudAccountResponseDataSchema.describe('云账号数据'),
});

// --------------- Types ---------------

export type ModifyCdCloudAccountInput = z.infer<typeof ModifyCdCloudAccountInputSchema>;
export type ModifyCdCloudAccountOutput = z.infer<typeof ModifyCdCloudAccountOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyCdCloudAccountInput, ModifyCdCloudAccountOutput> = {
  action: 'ModifyCdCloudAccount',
  method: 'POST',
  inputSchema: ModifyCdCloudAccountInputSchema,
  outputSchema: ModifyCdCloudAccountOutputSchema,
};

// --------------- Action ---------------

/** CD 云账号更新 */
export const ModifyCdCloudAccount = (
  client: CodingClient,
  params: ModifyCdCloudAccountInput,
): Promise<Either<SdkError, ModifyCdCloudAccountOutput>> =>
  executeAction(client.config, spec, params);
