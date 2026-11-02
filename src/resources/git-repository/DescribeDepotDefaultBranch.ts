import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 查询仓库的默认分支 - 请求参数 */
export const DescribeDepotDefaultBranchInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
});

/** 查询仓库的默认分支 - 响应数据 */
export const DescribeDepotDefaultBranchOutputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
});

// --------------- Types ---------------

export type DescribeDepotDefaultBranchInput = z.infer<typeof DescribeDepotDefaultBranchInputSchema>;
export type DescribeDepotDefaultBranchOutput = z.infer<
  typeof DescribeDepotDefaultBranchOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotDefaultBranchInput, DescribeDepotDefaultBranchOutput> = {
  action: 'DescribeDepotDefaultBranch',
  method: 'POST',
  inputSchema: DescribeDepotDefaultBranchInputSchema,
  outputSchema: DescribeDepotDefaultBranchOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库的默认分支 */
export const DescribeDepotDefaultBranch = (
  client: CodingClient,
  params: DescribeDepotDefaultBranchInput,
): Promise<Either<SdkError, DescribeDepotDefaultBranchOutput>> =>
  executeAction(client.config, spec, params);
