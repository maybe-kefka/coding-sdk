import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PolicyDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 权限组详情获取 - 请求参数 */
export const DescribePolicyInputSchema = z.object({
  /** 针对模糊配置的 action 定义，是否转换成精确的 action 定义返回 */
  AccurateActions: z
    .boolean()
    .describe('针对模糊配置的 action 定义，是否转换成精确的 action 定义返回'),
  /** 权限组 ID */
  PolicyId: z.number().int().describe('权限组 ID'),
});

/** 权限组详情获取 - 响应数据 */
export const DescribePolicyOutputSchema = z.object({
  /** 权限组详情 */
  PolicyInfo: PolicyDetailSchema.nullable().describe('权限组详情'),
});

// --------------- Types ---------------

export type DescribePolicyInput = z.infer<typeof DescribePolicyInputSchema>;
export type DescribePolicyOutput = z.infer<typeof DescribePolicyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribePolicyInput, DescribePolicyOutput> = {
  action: 'DescribePolicy',
  method: 'POST',
  inputSchema: DescribePolicyInputSchema,
  outputSchema: DescribePolicyOutputSchema,
};

// --------------- Action ---------------

/** 权限组详情获取 */
export const DescribePolicy = (
  client: CodingClient,
  params: DescribePolicyInput,
): Promise<Either<SdkError, DescribePolicyOutput>> => executeAction(client.config, spec, params);
