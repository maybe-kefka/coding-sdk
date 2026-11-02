import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 通过名字查询的仓库信息 - 请求参数 */
export const DescribeDepotByNameInfoInputSchema = z.object({
  /** 仓库名 */
  DepotName: z.string().describe('仓库名'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 团队GK */
  TeamGk: z.string().describe('团队GK'),
});

/** 通过名字查询的仓库信息 - 响应数据 */
export const DescribeDepotByNameInfoOutputSchema = z.object({
  /** 仓库信息详情列表 */
  Depot: DepotInfoSchema.describe('仓库信息详情列表'),
});

// --------------- Types ---------------

export type DescribeDepotByNameInfoInput = z.infer<typeof DescribeDepotByNameInfoInputSchema>;
export type DescribeDepotByNameInfoOutput = z.infer<typeof DescribeDepotByNameInfoOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotByNameInfoInput, DescribeDepotByNameInfoOutput> = {
  action: 'DescribeDepotByNameInfo',
  method: 'POST',
  inputSchema: DescribeDepotByNameInfoInputSchema,
  outputSchema: DescribeDepotByNameInfoOutputSchema,
};

// --------------- Action ---------------

/** 查询项目下所有的仓库信息列表 */
export const DescribeDepotByNameInfo = (
  client: CodingClient,
  params: DescribeDepotByNameInfoInput,
): Promise<Either<SdkError, DescribeDepotByNameInfoOutput>> =>
  executeAction(client.config, spec, params);
