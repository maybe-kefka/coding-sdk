import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 根据分支获取标签列表 - 请求参数 */
export const DescribeGitTagsByBranchInputSchema = z.object({
  /** 分支名称 */
  Branch: z.string().describe('分支名称'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
});

/** 根据分支获取标签列表 - 响应数据 */
export const DescribeGitTagsByBranchOutputSchema = z.object({
  /** tag列表 */
  Tags: z.array(z.string()).describe('tag列表'),
});

// --------------- Types ---------------

export type DescribeGitTagsByBranchInput = z.infer<typeof DescribeGitTagsByBranchInputSchema>;
export type DescribeGitTagsByBranchOutput = z.infer<typeof DescribeGitTagsByBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitTagsByBranchInput, DescribeGitTagsByBranchOutput> = {
  action: 'DescribeGitTagsByBranch',
  method: 'POST',
  inputSchema: DescribeGitTagsByBranchInputSchema,
  outputSchema: DescribeGitTagsByBranchOutputSchema,
};

// --------------- Action ---------------

/** 根据分支获取标签列表 */
export const DescribeGitTagsByBranch = (
  client: CodingClient,
  params: DescribeGitTagsByBranchInput,
): Promise<Either<SdkError, DescribeGitTagsByBranchOutput>> =>
  executeAction(client.config, spec, params);
