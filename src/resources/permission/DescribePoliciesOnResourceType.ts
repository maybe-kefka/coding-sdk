import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  DescribePoliciesOnResourceTypeRequestFilterSchema,
  DescribePoliciesOnResourceTypeResponsePageDataSchema,
} from './schemas';

// --------------- Schema ---------------

/** 权限组列表查询（指定资源类型） - 请求参数 */
export const DescribePoliciesOnResourceTypeInputSchema = z.object({
  /** 查询条件 */
  Filter: DescribePoliciesOnResourceTypeRequestFilterSchema.describe('查询条件'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
});

/** 权限组列表查询（指定资源类型） - 响应数据 */
export const DescribePoliciesOnResourceTypeOutputSchema = z.object({
  /** 分页列表信息 */
  Data: DescribePoliciesOnResourceTypeResponsePageDataSchema.describe('分页列表信息'),
});

// --------------- Types ---------------

export type DescribePoliciesOnResourceTypeInput = z.infer<
  typeof DescribePoliciesOnResourceTypeInputSchema
>;
export type DescribePoliciesOnResourceTypeOutput = z.infer<
  typeof DescribePoliciesOnResourceTypeOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribePoliciesOnResourceTypeInput, DescribePoliciesOnResourceTypeOutput> =
  {
    action: 'DescribePoliciesOnResourceType',
    method: 'POST',
    inputSchema: DescribePoliciesOnResourceTypeInputSchema,
    outputSchema: DescribePoliciesOnResourceTypeOutputSchema,
  };

// --------------- Action ---------------

/** 权限组列表查询（指定资源类型） */
export const DescribePoliciesOnResourceType = (
  client: CodingClient,
  params: DescribePoliciesOnResourceTypeInput,
): Promise<Either<SdkError, DescribePoliciesOnResourceTypeOutput>> =>
  executeAction(client.config, spec, params);
