import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotDetailDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取分支下的提交列表 - 请求参数 */
export const DescribeProjectDepotCommitsInputSchema = z.object({
  /** 分支名称 */
  Branch: z.string().describe('分支名称'),
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 仓库 Id */
  Id: z.number().int().describe('仓库 Id'),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
});

/** 获取分支下的提交列表 - 响应数据 */
export const DescribeProjectDepotCommitsOutputSchema = z.object({
  /** 返回 Commit 数据结构 */
  Data: DepotDetailDataSchema.describe('返回 Commit 数据结构'),
});

// --------------- Types ---------------

export type DescribeProjectDepotCommitsInput = z.infer<
  typeof DescribeProjectDepotCommitsInputSchema
>;
export type DescribeProjectDepotCommitsOutput = z.infer<
  typeof DescribeProjectDepotCommitsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectDepotCommitsInput, DescribeProjectDepotCommitsOutput> = {
  action: 'DescribeProjectDepotCommits',
  method: 'POST',
  inputSchema: DescribeProjectDepotCommitsInputSchema,
  outputSchema: DescribeProjectDepotCommitsOutputSchema,
};

// --------------- Action ---------------

/** 获取分支下的提交列表 */
export const DescribeProjectDepotCommits = (
  client: CodingClient,
  params: DescribeProjectDepotCommitsInput,
): Promise<Either<SdkError, DescribeProjectDepotCommitsOutput>> =>
  executeAction(client.config, spec, params);
