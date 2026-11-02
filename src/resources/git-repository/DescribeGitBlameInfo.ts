import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CommitInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 获取指定 commit 下某文件指定代码行的最后一次提交 - 请求参数 */
export const DescribeGitBlameInfoInputSchema = z.object({
  /** 提交sha */
  CommitSha: z.string().describe('提交sha'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 文件路径 */
  FilePath: z.string().describe('文件路径'),
  /** 结束行 */
  LineEnd: z.number().int().optional().describe('结束行'),
  /** 开始行 */
  LineSnat: z.number().int().optional().describe('开始行'),
});

/** 获取指定 commit 下某文件指定代码行的最后一次提交 - 响应数据 */
export const DescribeGitBlameInfoOutputSchema = z.object({
  /** 提交信息 */
  Info: z.array(CommitInfoSchema).nullable().describe('提交信息'),
});

// --------------- Types ---------------

export type DescribeGitBlameInfoInput = z.infer<typeof DescribeGitBlameInfoInputSchema>;
export type DescribeGitBlameInfoOutput = z.infer<typeof DescribeGitBlameInfoOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBlameInfoInput, DescribeGitBlameInfoOutput> = {
  action: 'DescribeGitBlameInfo',
  method: 'POST',
  inputSchema: DescribeGitBlameInfoInputSchema,
  outputSchema: DescribeGitBlameInfoOutputSchema,
};

// --------------- Action ---------------

/** 获取指定 commit 下某文件指定代码行的最后一次提交 */
export const DescribeGitBlameInfo = (
  client: CodingClient,
  params: DescribeGitBlameInfoInput,
): Promise<Either<SdkError, DescribeGitBlameInfoOutput>> =>
  executeAction(client.config, spec, params);
