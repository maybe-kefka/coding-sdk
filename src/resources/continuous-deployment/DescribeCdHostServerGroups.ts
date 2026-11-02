import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdHostServerGroupsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 主机组列表获取 - 请求参数 */
export const DescribeCdHostServerGroupsInputSchema = z.object({
  /** 检索关键字 */
  Keyword: z.string().optional().describe('检索关键字'),
  /** 页码（默认为 1） */
  PageNumber: z.number().int().optional().describe('页码（默认为 1）'),
  /** 每页条数（默认为 10，最大值为 500） */
  PageSize: z.number().int().optional().describe('每页条数（默认为 10，最大值为 500）'),
});

/** CD 主机组列表获取 - 响应数据 */
export const DescribeCdHostServerGroupsOutputSchema = z.object({
  /** 主机组列表数据 */
  Data: DescribeCdHostServerGroupsResponseDataSchema.describe('主机组列表数据'),
});

// --------------- Types ---------------

export type DescribeCdHostServerGroupsInput = z.infer<typeof DescribeCdHostServerGroupsInputSchema>;
export type DescribeCdHostServerGroupsOutput = z.infer<
  typeof DescribeCdHostServerGroupsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdHostServerGroupsInput, DescribeCdHostServerGroupsOutput> = {
  action: 'DescribeCdHostServerGroups',
  method: 'POST',
  inputSchema: DescribeCdHostServerGroupsInputSchema,
  outputSchema: DescribeCdHostServerGroupsOutputSchema,
};

// --------------- Action ---------------

/** CD 主机组列表获取 */
export const DescribeCdHostServerGroups = (
  client: CodingClient,
  params: DescribeCdHostServerGroupsInput,
): Promise<Either<SdkError, DescribeCdHostServerGroupsOutput>> =>
  executeAction(client.config, spec, params);
