import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DiffFileInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 获取两次 commit 之间的文件差异详情 - 请求参数 */
export const DescribeDifferentBetweenTwoCommitsInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 文件位置 */
  Path: z.string().describe('文件位置'),
  /** 源请求 Sha 值,分支名称 */
  Source: z.string().describe('源请求 Sha 值,分支名称'),
  /** 目标请求 Sha 值,分支名称 */
  Target: z.string().describe('目标请求 Sha 值,分支名称'),
});

/** 获取两次 commit 之间的文件差异详情 - 响应数据 */
export const DescribeDifferentBetweenTwoCommitsOutputSchema = z.object({
  /** 文件差异详情 */
  DiffFileInfo: DiffFileInfoSchema.describe('文件差异详情'),
});

// --------------- Types ---------------

export type DescribeDifferentBetweenTwoCommitsInput = z.infer<
  typeof DescribeDifferentBetweenTwoCommitsInputSchema
>;
export type DescribeDifferentBetweenTwoCommitsOutput = z.infer<
  typeof DescribeDifferentBetweenTwoCommitsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeDifferentBetweenTwoCommitsInput,
  DescribeDifferentBetweenTwoCommitsOutput
> = {
  action: 'DescribeDifferentBetweenTwoCommits',
  method: 'POST',
  inputSchema: DescribeDifferentBetweenTwoCommitsInputSchema,
  outputSchema: DescribeDifferentBetweenTwoCommitsOutputSchema,
};

// --------------- Action ---------------

/** 获取两次 commit 之间的文件 差异详情 */
export const DescribeDifferentBetweenTwoCommits = (
  client: CodingClient,
  params: DescribeDifferentBetweenTwoCommitsInput,
): Promise<Either<SdkError, DescribeDifferentBetweenTwoCommitsOutput>> =>
  executeAction(client.config, spec, params);
