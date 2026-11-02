import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeUsersByGroupIdResponsePageDataSchema } from './schemas';

// --------------- Schema ---------------

/** 用户列表查询（根据用户组id分页查询） - 请求参数 */
export const DescribeUsersByGroupIdInputSchema = z.object({
  /** 查询条件：GroupId */
  GroupId: z.number().int().describe('查询条件：GroupId'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
});

/** 用户列表查询（根据用户组id分页查询） - 响应数据 */
export const DescribeUsersByGroupIdOutputSchema = z.object({
  /** 用户列表分页数据 */
  Data: DescribeUsersByGroupIdResponsePageDataSchema.describe('用户列表分页数据'),
});

// --------------- Types ---------------

export type DescribeUsersByGroupIdInput = z.infer<typeof DescribeUsersByGroupIdInputSchema>;
export type DescribeUsersByGroupIdOutput = z.infer<typeof DescribeUsersByGroupIdOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeUsersByGroupIdInput, DescribeUsersByGroupIdOutput> = {
  action: 'DescribeUsersByGroupId',
  method: 'POST',
  inputSchema: DescribeUsersByGroupIdInputSchema,
  outputSchema: DescribeUsersByGroupIdOutputSchema,
};

// --------------- Action ---------------

/** 用户列表查询（根据用户组id分页查询） */
export const DescribeUsersByGroupId = (
  client: CodingClient,
  params: DescribeUsersByGroupIdInput,
): Promise<Either<SdkError, DescribeUsersByGroupIdOutput>> =>
  executeAction(client.config, spec, params);
