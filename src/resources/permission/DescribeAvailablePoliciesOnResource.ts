import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  DescribeAvailablePoliciesOnResourceRequestFilterSchema,
  DescribeAvailablePoliciesOnResponsePageDataSchema,
  ResourceInfoOfPolicyScopeSchema,
} from './schemas';

// --------------- Schema ---------------

/** 权限组列表查询（指定资源） - 请求参数 */
export const DescribeAvailablePoliciesOnResourceInputSchema = z.object({
  /** 查询条件 */
  Filter: DescribeAvailablePoliciesOnResourceRequestFilterSchema.describe('查询条件'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 资源信息 */
  Resource: ResourceInfoOfPolicyScopeSchema.describe('资源信息'),
});

/** 权限组列表查询（指定资源） - 响应数据 */
export const DescribeAvailablePoliciesOnResourceOutputSchema = z.object({
  /** 分页列表数据 */
  Data: DescribeAvailablePoliciesOnResponsePageDataSchema.describe('分页列表数据'),
});

// --------------- Types ---------------

export type DescribeAvailablePoliciesOnResourceInput = z.infer<
  typeof DescribeAvailablePoliciesOnResourceInputSchema
>;
export type DescribeAvailablePoliciesOnResourceOutput = z.infer<
  typeof DescribeAvailablePoliciesOnResourceOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeAvailablePoliciesOnResourceInput,
  DescribeAvailablePoliciesOnResourceOutput
> = {
  action: 'DescribeAvailablePoliciesOnResource',
  method: 'POST',
  inputSchema: DescribeAvailablePoliciesOnResourceInputSchema,
  outputSchema: DescribeAvailablePoliciesOnResourceOutputSchema,
};

// --------------- Action ---------------

/** 权限组列表查询（指定资源） */
export const DescribeAvailablePoliciesOnResource = (
  client: CodingClient,
  params: DescribeAvailablePoliciesOnResourceInput,
): Promise<Either<SdkError, DescribeAvailablePoliciesOnResourceOutput>> =>
  executeAction(client.config, spec, params);
