import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestFileDiffSchema } from './schemas';

// --------------- Schema ---------------

/** 获取合并请求文件修改记录 - 请求参数 */
export const DescribeMergeRequestFileDiffInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与仓库Id选其一就可以 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库Id选其一就可以'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
});

/** 获取合并请求文件修改记录 - 响应数据 */
export const DescribeMergeRequestFileDiffOutputSchema = z.object({
  /** 修改记录详情 */
  MergeRequestFileDiff: MergeRequestFileDiffSchema.describe('修改记录详情'),
});

// --------------- Types ---------------

export type DescribeMergeRequestFileDiffInput = z.infer<
  typeof DescribeMergeRequestFileDiffInputSchema
>;
export type DescribeMergeRequestFileDiffOutput = z.infer<
  typeof DescribeMergeRequestFileDiffOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeMergeRequestFileDiffInput, DescribeMergeRequestFileDiffOutput> = {
  action: 'DescribeMergeRequestFileDiff',
  method: 'POST',
  inputSchema: DescribeMergeRequestFileDiffInputSchema,
  outputSchema: DescribeMergeRequestFileDiffOutputSchema,
};

// --------------- Action ---------------

/** 获取合并请求文件修改记录 */
export const DescribeMergeRequestFileDiff = (
  client: CodingClient,
  params: DescribeMergeRequestFileDiffInput,
): Promise<Either<SdkError, DescribeMergeRequestFileDiffOutput>> =>
  executeAction(client.config, spec, params);
