import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeProjectDepotsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取项目仓库列表 - 请求参数 */
export const DescribeProjectDepotsInputSchema = z.object({
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
});

/** 获取项目仓库列表 - 响应数据 */
export const DescribeProjectDepotsOutputSchema = z.object({
  /** 获取仓库列表 */
  Data: DescribeProjectDepotsDataSchema.describe('获取仓库列表'),
});

// --------------- Types ---------------

export type DescribeProjectDepotsInput = z.infer<typeof DescribeProjectDepotsInputSchema>;
export type DescribeProjectDepotsOutput = z.infer<typeof DescribeProjectDepotsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectDepotsInput, DescribeProjectDepotsOutput> = {
  action: 'DescribeProjectDepots',
  method: 'POST',
  inputSchema: DescribeProjectDepotsInputSchema,
  outputSchema: DescribeProjectDepotsOutputSchema,
};

// --------------- Action ---------------

/** 获取项目仓库列表 */
export const DescribeProjectDepots = (
  client: CodingClient,
  params: DescribeProjectDepotsInput,
): Promise<Either<SdkError, DescribeProjectDepotsOutput>> =>
  executeAction(client.config, spec, params);
