import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotDetailDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取仓库的标签列表 - 请求参数 */
export const DescribeProjectDepotTagsInputSchema = z.object({
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 仓库 Id */
  Id: z.number().int().describe('仓库 Id'),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
});

/** 获取仓库的标签列表 - 响应数据 */
export const DescribeProjectDepotTagsOutputSchema = z.object({
  /** 返回标签列表的数据结构 */
  Data: DepotDetailDataSchema.describe('返回标签列表的数据结构'),
});

// --------------- Types ---------------

export type DescribeProjectDepotTagsInput = z.infer<typeof DescribeProjectDepotTagsInputSchema>;
export type DescribeProjectDepotTagsOutput = z.infer<typeof DescribeProjectDepotTagsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectDepotTagsInput, DescribeProjectDepotTagsOutput> = {
  action: 'DescribeProjectDepotTags',
  method: 'POST',
  inputSchema: DescribeProjectDepotTagsInputSchema,
  outputSchema: DescribeProjectDepotTagsOutputSchema,
};

// --------------- Action ---------------

/** 获取仓库的标签列表 */
export const DescribeProjectDepotTags = (
  client: CodingClient,
  params: DescribeProjectDepotTagsInput,
): Promise<Either<SdkError, DescribeProjectDepotTagsOutput>> =>
  executeAction(client.config, spec, params);
