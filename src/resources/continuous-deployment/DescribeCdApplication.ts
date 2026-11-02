import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdApplicationResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 应用详情获取 - 请求参数 */
export const DescribeCdApplicationInputSchema = z.object({
  /** 应用名称 */
  Application: z.string().describe('应用名称'),
});

/** CD 应用详情获取 - 响应数据 */
export const DescribeCdApplicationOutputSchema = z.object({
  /** CD 应用详情数据 */
  Data: DescribeCdApplicationResponseDataSchema.describe('CD 应用详情数据'),
});

// --------------- Types ---------------

export type DescribeCdApplicationInput = z.infer<typeof DescribeCdApplicationInputSchema>;
export type DescribeCdApplicationOutput = z.infer<typeof DescribeCdApplicationOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdApplicationInput, DescribeCdApplicationOutput> = {
  action: 'DescribeCdApplication',
  method: 'POST',
  inputSchema: DescribeCdApplicationInputSchema,
  outputSchema: DescribeCdApplicationOutputSchema,
};

// --------------- Action ---------------

/** CD 应用详情获取 */
export const DescribeCdApplication = (
  client: CodingClient,
  params: DescribeCdApplicationInput,
): Promise<Either<SdkError, DescribeCdApplicationOutput>> =>
  executeAction(client.config, spec, params);
