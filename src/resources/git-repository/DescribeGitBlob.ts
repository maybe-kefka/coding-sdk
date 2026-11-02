import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BlobDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询 Git Blob - 请求参数 */
export const DescribeGitBlobInputSchema = z.object({
  /** Blob ID */
  BlobSha: z.string().describe('Blob ID'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
});

/** 查询 Git Blob - 响应数据 */
export const DescribeGitBlobOutputSchema = z.object({
  /** blob信息 */
  Data: BlobDetailSchema.nullable().describe('blob信息'),
});

// --------------- Types ---------------

export type DescribeGitBlobInput = z.infer<typeof DescribeGitBlobInputSchema>;
export type DescribeGitBlobOutput = z.infer<typeof DescribeGitBlobOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitBlobInput, DescribeGitBlobOutput> = {
  action: 'DescribeGitBlob',
  method: 'POST',
  inputSchema: DescribeGitBlobInputSchema,
  outputSchema: DescribeGitBlobOutputSchema,
};

// --------------- Action ---------------

/** 查询 Git Blob */
export const DescribeGitBlob = (
  client: CodingClient,
  params: DescribeGitBlobInput,
): Promise<Either<SdkError, DescribeGitBlobOutput>> => executeAction(client.config, spec, params);
