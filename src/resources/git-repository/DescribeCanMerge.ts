import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 查看两个分支是否可以合并 - 请求参数 */
export const DescribeCanMergeInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 源分支 */
  Source: z.string().describe('源分支'),
  /** 目标分支 */
  Target: z.string().describe('目标分支'),
  /** 仓库路径,与仓库Id二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径,与仓库Id二选一即可'),
});

/** 查看两个分支是否可以合并 - 响应数据 */
export const DescribeCanMergeOutputSchema = z.object({
  /** NOT_MERGEABLE(不允许合并),ALREADY_MERGED(完全一样的两个分支),MERGEABLE(可合并),FAILED(比较失败) */
  MergeStatus: z
    .string()
    .describe(
      'NOT_MERGEABLE(不允许合并),ALREADY_MERGED(完全一样的两个分支),MERGEABLE(可合并),FAILED(比较失败)',
    ),
});

// --------------- Types ---------------

export type DescribeCanMergeInput = z.infer<typeof DescribeCanMergeInputSchema>;
export type DescribeCanMergeOutput = z.infer<typeof DescribeCanMergeOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCanMergeInput, DescribeCanMergeOutput> = {
  action: 'DescribeCanMerge',
  method: 'POST',
  inputSchema: DescribeCanMergeInputSchema,
  outputSchema: DescribeCanMergeOutputSchema,
};

// --------------- Action ---------------

/** 查看两个分支是否可以合并 */
export const DescribeCanMerge = (
  client: CodingClient,
  params: DescribeCanMergeInput,
): Promise<Either<SdkError, DescribeCanMergeOutput>> => executeAction(client.config, spec, params);
