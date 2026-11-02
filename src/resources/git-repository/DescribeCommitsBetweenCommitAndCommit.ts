import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DifferentOfCommitDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询两个请求之间的请求列表，source,target顺序正常 - 请求参数 */
export const DescribeCommitsBetweenCommitAndCommitInputSchema = z.object({
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
export const DescribeCommitsBetweenCommitAndCommitOutputSchema = z.object({
  /** 请求及文件修改列表 */
  DifferentOfCommitDetail: DifferentOfCommitDetailSchema.describe('请求及文件修改列表'),
});

// --------------- Types ---------------

export type DescribeCommitsBetweenCommitAndCommitInput = z.infer<
  typeof DescribeCommitsBetweenCommitAndCommitInputSchema
>;
export type DescribeCommitsBetweenCommitAndCommitOutput = z.infer<
  typeof DescribeCommitsBetweenCommitAndCommitOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCommitsBetweenCommitAndCommitInput,
  DescribeCommitsBetweenCommitAndCommitOutput
> = {
  action: 'DescribeCommitsBetweenCommitAndCommit',
  method: 'POST',
  inputSchema: DescribeCommitsBetweenCommitAndCommitInputSchema,
  outputSchema: DescribeCommitsBetweenCommitAndCommitOutputSchema,
};

// --------------- Action ---------------

/** 查询两个请求之间的请求列表（source target顺序正常） */
export const DescribeCommitsBetweenCommitAndCommit = (
  client: CodingClient,
  params: DescribeCommitsBetweenCommitAndCommitInput,
): Promise<Either<SdkError, DescribeCommitsBetweenCommitAndCommitOutput>> =>
  executeAction(client.config, spec, params);
