import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询项目下所有的仓库信息列表 - 请求参数 */
export const DescribeProjectDepotInfoListInputSchema = z.object({
  /** 页号 */
  PageNumber: z.string().optional().describe('页号'),
  /** 每页的个数 */
  PageSize: z.string().optional().describe('每页的个数'),
  /** 项目id */
  ProjectId: z.number().int().describe('项目id'),
});

/** 查询项目下所有的仓库信息列表 - 响应数据 */
export const DescribeProjectDepotInfoListOutputSchema = z.object({
  /** 仓库信息详情列表 */
  DepotData: DepotDataSchema.describe('仓库信息详情列表'),
});

// --------------- Types ---------------

export type DescribeProjectDepotInfoListInput = z.infer<
  typeof DescribeProjectDepotInfoListInputSchema
>;
export type DescribeProjectDepotInfoListOutput = z.infer<
  typeof DescribeProjectDepotInfoListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectDepotInfoListInput, DescribeProjectDepotInfoListOutput> = {
  action: 'DescribeProjectDepotInfoList',
  method: 'POST',
  inputSchema: DescribeProjectDepotInfoListInputSchema,
  outputSchema: DescribeProjectDepotInfoListOutputSchema,
};

// --------------- Action ---------------

/** 查询项目下所有的仓库信息列表 */
export const DescribeProjectDepotInfoList = (
  client: CodingClient,
  params: DescribeProjectDepotInfoListInput,
): Promise<Either<SdkError, DescribeProjectDepotInfoListOutput>> =>
  executeAction(client.config, spec, params);
