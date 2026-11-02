import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SshKeyInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 获取当前用户所有SSH公钥 - 请求参数 */
export const DescribeSshKeyInputSchema = z.object({});

/** 获取当前用户所有SSH公钥 - 响应数据 */
export const DescribeSshKeyOutputSchema = z.object({
  /** SSH公钥详情列表 */
  SshKeyInfos: z.array(SshKeyInfoSchema).nullable().describe('SSH公钥详情列表'),
});

// --------------- Types ---------------

export type DescribeSshKeyInput = z.infer<typeof DescribeSshKeyInputSchema>;
export type DescribeSshKeyOutput = z.infer<typeof DescribeSshKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeSshKeyInput, DescribeSshKeyOutput> = {
  action: 'DescribeSshKey',
  method: 'POST',
  inputSchema: DescribeSshKeyInputSchema,
  outputSchema: DescribeSshKeyOutputSchema,
};

// --------------- Action ---------------

/** 获取当前用户所有SSH公钥 */
export const DescribeSshKey = (
  client: CodingClient,
  params: DescribeSshKeyInput,
): Promise<Either<SdkError, DescribeSshKeyOutput>> => executeAction(client.config, spec, params);
