import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 查询 Git Blob raw 信息 - 请求参数 */
export const DescribeGitBlobRawInputSchema = z.object({
  /** Blob ID */
  BlobSha: z.string().describe('Blob ID'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 查询 Git Blob raw 信息 - 响应数据 */
export const DescribeGitBlobRawOutputSchema = z.object({
  /** blob 文本内容 */
  Content: z.string().nullable().describe('blob 文本内容'),
});

// --------------- Types ---------------

export type DescribeGitBlobRawInput = z.infer<typeof DescribeGitBlobRawInputSchema>;
export type DescribeGitBlobRawOutput = z.infer<typeof DescribeGitBlobRawOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBlobRawInput, DescribeGitBlobRawOutput> = {
  action: 'DescribeGitBlobRaw',
  method: 'POST',
  inputSchema: DescribeGitBlobRawInputSchema,
  outputSchema: DescribeGitBlobRawOutputSchema,
};

// --------------- Action ---------------

/** 查询 Git Blob raw 信息 */
export const DescribeGitBlobRaw = (
  client: CodingClient,
  params: DescribeGitBlobRawInput,
): Promise<Either<SdkError, DescribeGitBlobRawOutput>> =>
  executeAction(client.config, spec, params);
