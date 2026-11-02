import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitFilePathSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库某次提交改动的文件路径列表 - 请求参数 */
export const DescribeGitCommitFilePathListInputSchema = z.object({
  /** 提交的ID */
  CommitSha: z.string().describe('提交的ID'),
  /** 仓库路径，也可填写仓库ID的字符串形式 */
  DepotPath: z.string().describe('仓库路径，也可填写仓库ID的字符串形式'),
});

/** 查询仓库某次提交改动的文件路径列表 - 响应数据 */
export const DescribeGitCommitFilePathListOutputSchema = z.object({
  /** 文件路径列表 */
  FilePaths: z.array(GitCommitFilePathSchema).nullable().describe('文件路径列表'),
});

// --------------- Types ---------------

export type DescribeGitCommitFilePathListInput = z.infer<
  typeof DescribeGitCommitFilePathListInputSchema
>;
export type DescribeGitCommitFilePathListOutput = z.infer<
  typeof DescribeGitCommitFilePathListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitCommitFilePathListInput, DescribeGitCommitFilePathListOutput> = {
  action: 'DescribeGitCommitFilePathList',
  method: 'POST',
  inputSchema: DescribeGitCommitFilePathListInputSchema,
  outputSchema: DescribeGitCommitFilePathListOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库某次提交改动的文件路径列表 */
export const DescribeGitCommitFilePathList = (
  client: CodingClient,
  params: DescribeGitCommitFilePathListInput,
): Promise<Either<SdkError, DescribeGitCommitFilePathListOutput>> =>
  executeAction(client.config, spec, params);
