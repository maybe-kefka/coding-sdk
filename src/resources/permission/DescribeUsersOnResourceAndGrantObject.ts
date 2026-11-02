import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  DescribeUsersOnResourceAndGrantObjectGrantInfoSchema,
  DescribeUsersOnResourceAndGrantObjectPageDataSchema,
  ResourceInfoSchema,
} from './schemas';

// --------------- Schema ---------------

/** 授权用户列表分页查询（指定资源） - 请求参数 */
export const DescribeUsersOnResourceAndGrantObjectInputSchema = z.object({
  /** 授权对象信息 */
  Grant: DescribeUsersOnResourceAndGrantObjectGrantInfoSchema.describe('授权对象信息'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 资源信息 */
  Resource: ResourceInfoSchema.describe('资源信息'),
});

/** 授权用户列表分页查询（指定资源） - 响应数据 */
export const DescribeUsersOnResourceAndGrantObjectOutputSchema = z.object({
  /** 指定资源下的授权体用户列表 */
  Data: DescribeUsersOnResourceAndGrantObjectPageDataSchema.describe('指定资源下的授权体用户列表'),
});

// --------------- Types ---------------

export type DescribeUsersOnResourceAndGrantObjectInput = z.infer<
  typeof DescribeUsersOnResourceAndGrantObjectInputSchema
>;
export type DescribeUsersOnResourceAndGrantObjectOutput = z.infer<
  typeof DescribeUsersOnResourceAndGrantObjectOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeUsersOnResourceAndGrantObjectInput,
  DescribeUsersOnResourceAndGrantObjectOutput
> = {
  action: 'DescribeUsersOnResourceAndGrantObject',
  method: 'POST',
  inputSchema: DescribeUsersOnResourceAndGrantObjectInputSchema,
  outputSchema: DescribeUsersOnResourceAndGrantObjectOutputSchema,
};

// --------------- Action ---------------

/** 授权用户列表分页查询（指定资源） */
export const DescribeUsersOnResourceAndGrantObject = (
  client: CodingClient,
  params: DescribeUsersOnResourceAndGrantObjectInput,
): Promise<Either<SdkError, DescribeUsersOnResourceAndGrantObjectOutput>> =>
  executeAction(client.config, spec, params);
