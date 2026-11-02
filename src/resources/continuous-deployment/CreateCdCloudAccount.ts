import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CloudAccountCredentialSchema, CreateCdCloudAccountResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 云账号添加 - 请求参数 */
export const CreateCdCloudAccountInputSchema = z.object({
  /** 云账号类型（可选值：KUBERNETES、TENCENT） */
  CloudProvider: z.string().describe('云账号类型（可选值：KUBERNETES、TENCENT）'),
  /** 云账号凭据 */
  Credential: CloudAccountCredentialSchema.describe('云账号凭据'),
  /** 云账号名称 */
  Name: z.string().describe('云账号名称'),
});

/** CD 云账号添加 - 响应数据 */
export const CreateCdCloudAccountOutputSchema = z.object({
  /** 云账号数据 */
  Data: CreateCdCloudAccountResponseDataSchema.describe('云账号数据'),
});

// --------------- Types ---------------

export type CreateCdCloudAccountInput = z.infer<typeof CreateCdCloudAccountInputSchema>;
export type CreateCdCloudAccountOutput = z.infer<typeof CreateCdCloudAccountOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCdCloudAccountInput, CreateCdCloudAccountOutput> = {
  action: 'CreateCdCloudAccount',
  method: 'POST',
  inputSchema: CreateCdCloudAccountInputSchema,
  outputSchema: CreateCdCloudAccountOutputSchema,
};

// --------------- Action ---------------

/** CD 云账号添加 */
export const CreateCdCloudAccount = (
  client: CodingClient,
  params: CreateCdCloudAccountInput,
): Promise<Either<SdkError, CreateCdCloudAccountOutput>> =>
  executeAction(client.config, spec, params);
