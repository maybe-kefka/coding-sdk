import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeGitFileStatPayloadSchema } from './schemas';

// --------------- Schema ---------------

/** 检查仓库文件 - 请求参数 */
export const DescribeGitFileStatInputSchema = z.object({
  /** 仓库路径，格式：<team>/<project>/<depot> */
  DepotPath: z.string().describe('仓库路径，格式：<team>/<project>/<depot>'),
  /** 文件路径 */
  Path: z.string().describe('文件路径'),
  /** tag | branch | commit */
  Ref: z.string().describe('tag | branch | commit'),
});

/** 检查仓库文件 - 响应数据 */
export const DescribeGitFileStatOutputSchema = z.object({
  /** 文件信息 */
  Payload: DescribeGitFileStatPayloadSchema.describe('文件信息'),
});

// --------------- Types ---------------

export type DescribeGitFileStatInput = z.infer<typeof DescribeGitFileStatInputSchema>;
export type DescribeGitFileStatOutput = z.infer<typeof DescribeGitFileStatOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitFileStatInput, DescribeGitFileStatOutput> = {
  action: 'DescribeGitFileStat',
  method: 'POST',
  inputSchema: DescribeGitFileStatInputSchema,
  outputSchema: DescribeGitFileStatOutputSchema,
};

// --------------- Action ---------------

/** 检查仓库文件 */
export const DescribeGitFileStat = (
  client: CodingClient,
  params: DescribeGitFileStatInput,
): Promise<Either<SdkError, DescribeGitFileStatOutput>> =>
  executeAction(client.config, spec, params);
