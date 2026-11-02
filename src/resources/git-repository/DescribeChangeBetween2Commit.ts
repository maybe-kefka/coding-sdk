import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ChangeSchema } from './schemas';

// --------------- Schema ---------------

/** 查询两个请求之间的请求列表，source,target顺序正常 - 请求参数 */
export const DescribeChangeBetween2CommitInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，选择其一即可 */
  DepotPath: z.string().optional().describe('仓库路径，选择其一即可'),
  /** 查询起点sha值 */
  Source: z.string().describe('查询起点sha值'),
  /** 查询目标sha值 */
  Target: z.string().describe('查询目标sha值'),
});

/** 查询两个请求之间的请求列表，source,target顺序正常 - 响应数据 */
export const DescribeChangeBetween2CommitOutputSchema = z.object({
  /** 文件修改具体信息 */
  Change: ChangeSchema.optional().describe('文件修改具体信息'),
});

// --------------- Types ---------------

export type DescribeChangeBetween2CommitInput = z.infer<
  typeof DescribeChangeBetween2CommitInputSchema
>;
export type DescribeChangeBetween2CommitOutput = z.infer<
  typeof DescribeChangeBetween2CommitOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeChangeBetween2CommitInput, DescribeChangeBetween2CommitOutput> = {
  action: 'DescribeChangeBetween2Commit',
  method: 'POST',
  inputSchema: DescribeChangeBetween2CommitInputSchema,
  outputSchema: DescribeChangeBetween2CommitOutputSchema,
};

// --------------- Action ---------------

/** 查询两个提交之间的请求列表（source target顺序正常） */
export const DescribeChangeBetween2Commit = (
  client: CodingClient,
  params: DescribeChangeBetween2CommitInput,
): Promise<Either<SdkError, DescribeChangeBetween2CommitOutput>> =>
  executeAction(client.config, spec, params);
