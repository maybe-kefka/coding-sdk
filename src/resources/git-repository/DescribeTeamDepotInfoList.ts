import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取团队下仓库列表 - 请求参数 */
export const DescribeTeamDepotInfoListInputSchema = z.object({
  /** 仓库名 */
  DepotName: z.string().optional().describe('仓库名'),
  /** 页码 */
  PageNumber: z.number().int().describe('页码'),
  /** 页码大小 */
  PageSize: z.number().int().describe('页码大小'),
  /** 项目名 */
  ProjectName: z.string().optional().describe('项目名'),
});

/** 获取团队下仓库列表 - 响应数据 */
export const DescribeTeamDepotInfoListOutputSchema = z.object({
  /** 仓库信息详情列表 */
  DepotData: DepotDataSchema.describe('仓库信息详情列表'),
});

// --------------- Types ---------------

export type DescribeTeamDepotInfoListInput = z.infer<typeof DescribeTeamDepotInfoListInputSchema>;
export type DescribeTeamDepotInfoListOutput = z.infer<typeof DescribeTeamDepotInfoListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamDepotInfoListInput, DescribeTeamDepotInfoListOutput> = {
  action: 'DescribeTeamDepotInfoList',
  method: 'POST',
  inputSchema: DescribeTeamDepotInfoListInputSchema,
  outputSchema: DescribeTeamDepotInfoListOutputSchema,
};

// --------------- Action ---------------

/** 获取团队下仓库列表，仅团队所有者或团队管理员可以调用。 */
export const DescribeTeamDepotInfoList = (
  client: CodingClient,
  params: DescribeTeamDepotInfoListInput,
): Promise<Either<SdkError, DescribeTeamDepotInfoListOutput>> =>
  executeAction(client.config, spec, params);
