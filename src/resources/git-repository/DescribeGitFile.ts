import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFileItemSchema } from './schemas';

// --------------- Schema ---------------

/** 获取文件详情 - 请求参数 */
export const DescribeGitFileInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 文件路径 */
  Path: z.string().optional().describe('文件路径'),
  /** 分支名 */
  Ref: z.string().describe('分支名'),
});

/** 获取文件详情 - 响应数据 */
export const DescribeGitFileOutputSchema = z.object({
  /** 文件详情 */
  GitFile: GitFileItemSchema.nullable().describe('文件详情'),
});

// --------------- Types ---------------

export type DescribeGitFileInput = z.infer<typeof DescribeGitFileInputSchema>;
export type DescribeGitFileOutput = z.infer<typeof DescribeGitFileOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitFileInput, DescribeGitFileOutput> = {
  action: 'DescribeGitFile',
  method: 'POST',
  inputSchema: DescribeGitFileInputSchema,
  outputSchema: DescribeGitFileOutputSchema,
};

// --------------- Action ---------------

/** 获取文件详情 */
export const DescribeGitFile = (
  client: CodingClient,
  params: DescribeGitFileInput,
): Promise<Either<SdkError, DescribeGitFileOutput>> => executeAction(client.config, spec, params);
