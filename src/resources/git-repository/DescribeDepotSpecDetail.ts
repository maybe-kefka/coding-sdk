import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotSpecDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库规范详情 - 请求参数 */
export const DescribeDepotSpecDetailInputSchema = z.object({
  /** 仓库路径（和仓库规范名字二选一选填） */
  DepotPath: z.string().optional().describe('仓库路径（和仓库规范名字二选一选填）'),
  /** 仓库规范名字（和仓库路径二选一选填） */
  DepotSpecName: z.string().optional().describe('仓库规范名字（和仓库路径二选一选填）'),
});

/** 查询仓库规范详情 - 响应数据 */
export const DescribeDepotSpecDetailOutputSchema = z.object({
  /** 仓库规范详细信息 */
  Detail: DepotSpecDetailSchema.nullable().describe('仓库规范详细信息'),
});

// --------------- Types ---------------

export type DescribeDepotSpecDetailInput = z.infer<typeof DescribeDepotSpecDetailInputSchema>;
export type DescribeDepotSpecDetailOutput = z.infer<typeof DescribeDepotSpecDetailOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotSpecDetailInput, DescribeDepotSpecDetailOutput> = {
  action: 'DescribeDepotSpecDetail',
  method: 'POST',
  inputSchema: DescribeDepotSpecDetailInputSchema,
  outputSchema: DescribeDepotSpecDetailOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库规范详情 */
export const DescribeDepotSpecDetail = (
  client: CodingClient,
  params: DescribeDepotSpecDetailInput,
): Promise<Either<SdkError, DescribeDepotSpecDetailOutput>> =>
  executeAction(client.config, spec, params);
