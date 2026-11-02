import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  DescribeGrantUsersOnResourcePageDataSchema,
  RamGrantResourceInfoRequestSchema,
} from './schemas';

// --------------- Schema ---------------

/** 授权用户列表分页查询 - 请求参数 */
export const DescribeGrantUsersOnResourceInputSchema = z.object({
  UserIdScope: z.array(z.number().int()).optional(),
  PolicyIdScope: z.array(z.number().int()).optional(),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 资源信息 */
  Resource: RamGrantResourceInfoRequestSchema.describe('资源信息'),
});

/** 授权用户列表分页查询 - 响应数据 */
export const DescribeGrantUsersOnResourceOutputSchema = z.object({
  /** 指定资源下授权的用户列表 */
  Data: DescribeGrantUsersOnResourcePageDataSchema.describe('指定资源下授权的用户列表'),
});

// --------------- Types ---------------

export type DescribeGrantUsersOnResourceInput = z.infer<
  typeof DescribeGrantUsersOnResourceInputSchema
>;
export type DescribeGrantUsersOnResourceOutput = z.infer<
  typeof DescribeGrantUsersOnResourceOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGrantUsersOnResourceInput, DescribeGrantUsersOnResourceOutput> = {
  action: 'DescribeGrantUsersOnResource',
  method: 'POST',
  inputSchema: DescribeGrantUsersOnResourceInputSchema,
  outputSchema: DescribeGrantUsersOnResourceOutputSchema,
};

// --------------- Action ---------------

/** 查询指定资源下授权的用户列表，包括容器内的用户 */
export const DescribeGrantUsersOnResource = (
  client: CodingClient,
  params: DescribeGrantUsersOnResourceInput,
): Promise<Either<SdkError, DescribeGrantUsersOnResourceOutput>> =>
  executeAction(client.config, spec, params);
