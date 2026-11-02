import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取当前用户拥有读权限的仓库列表 - 请求参数 */
export const DescribeMyDepotsInputSchema = z.object({
  /** 页数 */
  PageNumber: z.number().int().describe('页数'),
  /** 页码 */
  PageSize: z.number().int().describe('页码'),
});

/** 获取当前用户拥有读权限的仓库列表 - 响应数据 */
export const DescribeMyDepotsOutputSchema = z.object({
  /** 仓库信息详情列表 */
  Payload: DepotDataSchema.describe('仓库信息详情列表'),
});

// --------------- Types ---------------

export type DescribeMyDepotsInput = z.infer<typeof DescribeMyDepotsInputSchema>;
export type DescribeMyDepotsOutput = z.infer<typeof DescribeMyDepotsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMyDepotsInput, DescribeMyDepotsOutput> = {
  action: 'DescribeMyDepots',
  method: 'POST',
  inputSchema: DescribeMyDepotsInputSchema,
  outputSchema: DescribeMyDepotsOutputSchema,
};

// --------------- Action ---------------

/** 获取当前用户拥有读权限的仓库列表 */
export const DescribeMyDepots = (
  client: CodingClient,
  params: DescribeMyDepotsInput,
): Promise<Either<SdkError, DescribeMyDepotsOutput>> => executeAction(client.config, spec, params);
