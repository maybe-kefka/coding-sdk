import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeGrantObjectsOnResourcePageDataSchema, ResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 授权对象列表分页查询 - 请求参数 */
export const DescribeGrantObjectsOnResourceInputSchema = z.object({
  /** 页码 */
  PageNumber: z.number().int().describe('页码'),
  /** 每页条数	 */
  PageSize: z.number().int().describe('每页条数	'),
  /** 资源信息 */
  Resource: ResourceInfoSchema.describe('资源信息'),
});

/** 授权对象列表分页查询 - 响应数据 */
export const DescribeGrantObjectsOnResourceOutputSchema = z.object({
  /** 授权资源列表分页数据 */
  Data: DescribeGrantObjectsOnResourcePageDataSchema.describe('授权资源列表分页数据'),
});

// --------------- Types ---------------

export type DescribeGrantObjectsOnResourceInput = z.infer<
  typeof DescribeGrantObjectsOnResourceInputSchema
>;
export type DescribeGrantObjectsOnResourceOutput = z.infer<
  typeof DescribeGrantObjectsOnResourceOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGrantObjectsOnResourceInput, DescribeGrantObjectsOnResourceOutput> =
  {
    action: 'DescribeGrantObjectsOnResource',
    method: 'POST',
    inputSchema: DescribeGrantObjectsOnResourceInputSchema,
    outputSchema: DescribeGrantObjectsOnResourceOutputSchema,
  };

// --------------- Action ---------------

/** 授权对象列表分页查询 */
export const DescribeGrantObjectsOnResource = (
  client: CodingClient,
  params: DescribeGrantObjectsOnResourceInput,
): Promise<Either<SdkError, DescribeGrantObjectsOnResourceOutput>> =>
  executeAction(client.config, spec, params);
