import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdCloudAccountsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取 CD 云账号列表 - 请求参数 */
export const DescribeCdCloudAccountsInputSchema = z.object({
  /** 检索关键字 */
  Keyword: z.string().optional().describe('检索关键字'),
  /** 页码（默认为 1） */
  PageNumber: z.number().int().optional().describe('页码（默认为 1）'),
  /** 每页条数（默认为 10，最大值为 500） */
  PageSize: z.number().int().optional().describe('每页条数（默认为 10，最大值为 500）'),
});

/** 获取 CD 云账号列表 - 响应数据 */
export const DescribeCdCloudAccountsOutputSchema = z.object({
  /** 云账号列表数据 */
  Data: DescribeCdCloudAccountsResponseDataSchema.describe('云账号列表数据'),
});

// --------------- Types ---------------

export type DescribeCdCloudAccountsInput = z.infer<typeof DescribeCdCloudAccountsInputSchema>;
export type DescribeCdCloudAccountsOutput = z.infer<typeof DescribeCdCloudAccountsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdCloudAccountsInput, DescribeCdCloudAccountsOutput> = {
  action: 'DescribeCdCloudAccounts',
  method: 'POST',
  inputSchema: DescribeCdCloudAccountsInputSchema,
  outputSchema: DescribeCdCloudAccountsOutputSchema,
};

// --------------- Action ---------------

/** CD 云账号列表获取 */
export const DescribeCdCloudAccounts = (
  client: CodingClient,
  params: DescribeCdCloudAccountsInput,
): Promise<Either<SdkError, DescribeCdCloudAccountsOutput>> =>
  executeAction(client.config, spec, params);
