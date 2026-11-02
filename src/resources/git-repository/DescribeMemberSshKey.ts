import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SshKeyInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 获取团队成员的 SSH 公钥列表 - 请求参数 */
export const DescribeMemberSshKeyInputSchema = z.object({
  /** 成员 Id */
  MemberUserId: z.number().int().describe('成员 Id'),
  /** SSH 公钥 Id */
  SshKeyId: z.number().int().optional().describe('SSH 公钥 Id'),
});

/** 获取团队成员的 SSH 公钥列表 - 响应数据 */
export const DescribeMemberSshKeyOutputSchema = z.object({
  /** SSH公钥详情列表 */
  SshKeyInfos: z.array(SshKeyInfoSchema).nullable().describe('SSH公钥详情列表'),
});

// --------------- Types ---------------

export type DescribeMemberSshKeyInput = z.infer<typeof DescribeMemberSshKeyInputSchema>;
export type DescribeMemberSshKeyOutput = z.infer<typeof DescribeMemberSshKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMemberSshKeyInput, DescribeMemberSshKeyOutput> = {
  action: 'DescribeMemberSshKey',
  method: 'POST',
  inputSchema: DescribeMemberSshKeyInputSchema,
  outputSchema: DescribeMemberSshKeyOutputSchema,
};

// --------------- Action ---------------

/** 获取团队成员的 SSH 公钥列表 */
export const DescribeMemberSshKey = (
  client: CodingClient,
  params: DescribeMemberSshKeyInput,
): Promise<Either<SdkError, DescribeMemberSshKeyOutput>> =>
  executeAction(client.config, spec, params);
