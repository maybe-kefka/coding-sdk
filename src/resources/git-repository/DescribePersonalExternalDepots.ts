import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIPersonalExternalDepotDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取个人外部仓库 - 请求参数 */
export const DescribePersonalExternalDepotsInputSchema = z.object({
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
});

/** 获取个人外部仓库 - 响应数据 */
export const DescribePersonalExternalDepotsOutputSchema = z.object({
  /** 外部仓库列表 */
  Data: CodingCIPersonalExternalDepotDataSchema.describe('外部仓库列表'),
});

// --------------- Types ---------------

export type DescribePersonalExternalDepotsInput = z.infer<
  typeof DescribePersonalExternalDepotsInputSchema
>;
export type DescribePersonalExternalDepotsOutput = z.infer<
  typeof DescribePersonalExternalDepotsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribePersonalExternalDepotsInput, DescribePersonalExternalDepotsOutput> =
  {
    action: 'DescribePersonalExternalDepots',
    method: 'POST',
    inputSchema: DescribePersonalExternalDepotsInputSchema,
    outputSchema: DescribePersonalExternalDepotsOutputSchema,
  };

// --------------- Action ---------------

/** 获取个人外部仓库 */
export const DescribePersonalExternalDepots = (
  client: CodingClient,
  params: DescribePersonalExternalDepotsInput,
): Promise<Either<SdkError, DescribePersonalExternalDepotsOutput>> =>
  executeAction(client.config, spec, params);
