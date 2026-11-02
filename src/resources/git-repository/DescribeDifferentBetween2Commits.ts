import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { QcloudApiGitDepotDiffFileInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 两次提交之间的文件差异 - 请求参数 */
export const DescribeDifferentBetween2CommitsInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，与DepotID二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，与DepotID二选一即可'),
  /** 文件路径 */
  Path: z.string().describe('文件路径'),
  /** 源分支 */
  Source: z.string().describe('源分支'),
  /** commit对比方式,是否直接对比差异 */
  Straight: z.boolean().optional().describe('commit对比方式,是否直接对比差异'),
  /** 目标分支 */
  Target: z.string().describe('目标分支'),
});

/** 两次提交之间的文件差异 - 响应数据 */
export const DescribeDifferentBetween2CommitsOutputSchema = z.object({
  /** 字段描述 */
  DiffFileInfo: QcloudApiGitDepotDiffFileInfoSchema.describe('字段描述'),
});

// --------------- Types ---------------

export type DescribeDifferentBetween2CommitsInput = z.infer<
  typeof DescribeDifferentBetween2CommitsInputSchema
>;
export type DescribeDifferentBetween2CommitsOutput = z.infer<
  typeof DescribeDifferentBetween2CommitsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeDifferentBetween2CommitsInput,
  DescribeDifferentBetween2CommitsOutput
> = {
  action: 'DescribeDifferentBetween2Commits',
  method: 'POST',
  inputSchema: DescribeDifferentBetween2CommitsInputSchema,
  outputSchema: DescribeDifferentBetween2CommitsOutputSchema,
};

// --------------- Action ---------------

/** 两次提交之间的文件差异 */
export const DescribeDifferentBetween2Commits = (
  client: CodingClient,
  params: DescribeDifferentBetween2CommitsInput,
): Promise<Either<SdkError, DescribeDifferentBetween2CommitsOutput>> =>
  executeAction(client.config, spec, params);
