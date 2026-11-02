import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  DescribeResourceScopeListOnPolicyRequestFilterSchema,
  DescribeResourceScopeListOnPolicyResponseDataSchema,
} from './schemas';

// --------------- Schema ---------------

/** 权限组可用资源范围分页查询 - 请求参数 */
export const DescribeResourceScopeListOnPolicyInputSchema = z.object({
  /** 查询条件 */
  Filter: DescribeResourceScopeListOnPolicyRequestFilterSchema.optional().describe('查询条件'),
  /** 请求页码 */
  PageNumber: z.number().int().describe('请求页码'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 权限组 ID */
  PolicyId: z.number().int().describe('权限组 ID'),
});

/** 权限组可用资源范围分页查询 - 响应数据 */
export const DescribeResourceScopeListOnPolicyOutputSchema = z.object({
  /** 分页列表数据 */
  Data: DescribeResourceScopeListOnPolicyResponseDataSchema.describe('分页列表数据'),
});

// --------------- Types ---------------

export type DescribeResourceScopeListOnPolicyInput = z.infer<
  typeof DescribeResourceScopeListOnPolicyInputSchema
>;
export type DescribeResourceScopeListOnPolicyOutput = z.infer<
  typeof DescribeResourceScopeListOnPolicyOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeResourceScopeListOnPolicyInput,
  DescribeResourceScopeListOnPolicyOutput
> = {
  action: 'DescribeResourceScopeListOnPolicy',
  method: 'POST',
  inputSchema: DescribeResourceScopeListOnPolicyInputSchema,
  outputSchema: DescribeResourceScopeListOnPolicyOutputSchema,
};

// --------------- Action ---------------

/** 权限组可用资源范围分页查询 */
export const DescribeResourceScopeListOnPolicy = (
  client: CodingClient,
  params: DescribeResourceScopeListOnPolicyInput,
): Promise<Either<SdkError, DescribeResourceScopeListOnPolicyOutput>> =>
  executeAction(client.config, spec, params);
