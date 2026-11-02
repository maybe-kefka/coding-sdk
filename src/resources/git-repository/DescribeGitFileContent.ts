import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFileContentSchema } from './schemas';

// --------------- Schema ---------------

/** 获取文件信息 - 请求参数 */
export const DescribeGitFileContentInputSchema = z.object({
  /** commit的sha值 */
  CommitSha: z.string().describe('commit的sha值'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 文件路径 */
  Path: z.string().describe('文件路径'),
});

/** 获取文件信息 - 响应数据 */
export const DescribeGitFileContentOutputSchema = z.object({
  /** 文件信息 */
  GitFileContent: GitFileContentSchema.describe('文件信息'),
});

// --------------- Types ---------------

export type DescribeGitFileContentInput = z.infer<typeof DescribeGitFileContentInputSchema>;
export type DescribeGitFileContentOutput = z.infer<typeof DescribeGitFileContentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitFileContentInput, DescribeGitFileContentOutput> = {
  action: 'DescribeGitFileContent',
  method: 'POST',
  inputSchema: DescribeGitFileContentInputSchema,
  outputSchema: DescribeGitFileContentOutputSchema,
};

// --------------- Action ---------------

/** 查询某次提交某文件的内容 */
export const DescribeGitFileContent = (
  client: CodingClient,
  params: DescribeGitFileContentInput,
): Promise<Either<SdkError, DescribeGitFileContentOutput>> =>
  executeAction(client.config, spec, params);
