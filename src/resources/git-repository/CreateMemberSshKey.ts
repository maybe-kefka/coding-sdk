import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SshKeyInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 导入团队成员SSH公钥 - 请求参数 */
export const CreateMemberSshKeyInputSchema = z.object({
  /** 公钥内容 */
  Content: z.string().describe('公钥内容'),
  /** 过期时间，不填为永不过期 9999-12-31 */
  ExpirationDate: z.string().optional().describe('过期时间，不填为永不过期 9999-12-31'),
  /** 成员 Id */
  MemberUserId: z.number().int().describe('成员 Id'),
  /** 导入的 ssh key 标识名 */
  Title: z.string().describe('导入的 ssh key 标识名'),
});

/** 导入团队成员SSH公钥 - 响应数据 */
export const CreateMemberSshKeyOutputSchema = z.object({
  /** SSH公钥详细信息 */
  SshKeyInfo: SshKeyInfoSchema.describe('SSH公钥详细信息'),
});

// --------------- Types ---------------

export type CreateMemberSshKeyInput = z.infer<typeof CreateMemberSshKeyInputSchema>;
export type CreateMemberSshKeyOutput = z.infer<typeof CreateMemberSshKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateMemberSshKeyInput, CreateMemberSshKeyOutput> = {
  action: 'CreateMemberSshKey',
  method: 'POST',
  inputSchema: CreateMemberSshKeyInputSchema,
  outputSchema: CreateMemberSshKeyOutputSchema,
};

// --------------- Action ---------------

/** 导入团队成员SSH公钥 */
export const CreateMemberSshKey = (
  client: CodingClient,
  params: CreateMemberSshKeyInput,
): Promise<Either<SdkError, CreateMemberSshKeyOutput>> =>
  executeAction(client.config, spec, params);
