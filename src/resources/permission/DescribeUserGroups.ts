import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  DescribeUserGroupsRequestFilterSchema,
  DescribeUserGroupsResponsePageDataSchema,
} from './schemas';

// --------------- Schema ---------------

/** 用户组列表分页查询 - 请求参数 */
export const DescribeUserGroupsInputSchema = z.object({
  /** 查询条件 */
  Filter: DescribeUserGroupsRequestFilterSchema.describe('查询条件'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
});

/** 用户组列表分页查询 - 响应数据 */
export const DescribeUserGroupsOutputSchema = z.object({
  /** 用户组分页列表信息 */
  Data: DescribeUserGroupsResponsePageDataSchema.describe('用户组分页列表信息'),
});

// --------------- Types ---------------

export type DescribeUserGroupsInput = z.infer<typeof DescribeUserGroupsInputSchema>;
export type DescribeUserGroupsOutput = z.infer<typeof DescribeUserGroupsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeUserGroupsInput, DescribeUserGroupsOutput> = {
  action: 'DescribeUserGroups',
  method: 'POST',
  inputSchema: DescribeUserGroupsInputSchema,
  outputSchema: DescribeUserGroupsOutputSchema,
};

// --------------- Action ---------------

/** 用户组列表分页查询 */
export const DescribeUserGroups = (
  client: CodingClient,
  params: DescribeUserGroupsInput,
): Promise<Either<SdkError, DescribeUserGroupsOutput>> =>
  executeAction(client.config, spec, params);
