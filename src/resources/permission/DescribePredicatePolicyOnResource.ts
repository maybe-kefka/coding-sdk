import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PredicatePolicySchema, ResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 资源权限判定模式获取 - 请求参数 */
export const DescribePredicatePolicyOnResourceInputSchema = z.object({
  /** 资源信息 */
  Resource: ResourceInfoSchema.describe('资源信息'),
});

/** 资源权限判定模式获取 - 响应数据 */
export const DescribePredicatePolicyOnResourceOutputSchema = z.object({
  /** 资源权限判定策略 */
  PredicatePolicyOnResourceInfo: PredicatePolicySchema.describe('资源权限判定策略'),
});

// --------------- Types ---------------

export type DescribePredicatePolicyOnResourceInput = z.infer<
  typeof DescribePredicatePolicyOnResourceInputSchema
>;
export type DescribePredicatePolicyOnResourceOutput = z.infer<
  typeof DescribePredicatePolicyOnResourceOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribePredicatePolicyOnResourceInput,
  DescribePredicatePolicyOnResourceOutput
> = {
  action: 'DescribePredicatePolicyOnResource',
  method: 'POST',
  inputSchema: DescribePredicatePolicyOnResourceInputSchema,
  outputSchema: DescribePredicatePolicyOnResourceOutputSchema,
};

// --------------- Action ---------------

/** 资源权限判定模式获取 */
export const DescribePredicatePolicyOnResource = (
  client: CodingClient,
  params: DescribePredicatePolicyOnResourceInput,
): Promise<Either<SdkError, DescribePredicatePolicyOnResourceOutput>> =>
  executeAction(client.config, spec, params);
