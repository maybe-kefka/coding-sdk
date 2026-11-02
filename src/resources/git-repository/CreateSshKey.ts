import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SshKeyInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 导入用户SSH公钥 - 请求参数 */
export const CreateSshKeyInputSchema = z.object({
  /** 公钥内容 */
  Content: z.string().describe('公钥内容'),
  /** 过期时间，不填为永不过期 9999-12-31 */
  ExpirationDate: z.string().optional().describe('过期时间，不填为永不过期 9999-12-31'),
  /** 导入的 ssh key 标识名 */
  Title: z.string().describe('导入的 ssh key 标识名'),
});

/** 导入用户SSH公钥 - 响应数据 */
export const CreateSshKeyOutputSchema = z.object({
  /** SSH公钥详细信息 */
  SshKeyInfo: SshKeyInfoSchema.describe('SSH公钥详细信息'),
});

// --------------- Types ---------------

export type CreateSshKeyInput = z.infer<typeof CreateSshKeyInputSchema>;
export type CreateSshKeyOutput = z.infer<typeof CreateSshKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateSshKeyInput, CreateSshKeyOutput> = {
  action: 'CreateSshKey',
  method: 'POST',
  inputSchema: CreateSshKeyInputSchema,
  outputSchema: CreateSshKeyOutputSchema,
};

// --------------- Action ---------------

/** 导入用户SSH公钥 */
export const CreateSshKey = (
  client: CodingClient,
  params: CreateSshKeyInput,
): Promise<Either<SdkError, CreateSshKeyOutput>> => executeAction(client.config, spec, params);
