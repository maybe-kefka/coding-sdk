import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除仓库版本 - 请求参数 */
export const DeleteGitReleaseInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 描述 */
  TagName: z.string().describe('描述'),
});

/** 删除仓库版本 - 响应数据 */
export const DeleteGitReleaseOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitReleaseInput = z.infer<typeof DeleteGitReleaseInputSchema>;
export type DeleteGitReleaseOutput = z.infer<typeof DeleteGitReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitReleaseInput, DeleteGitReleaseOutput> = {
  action: 'DeleteGitRelease',
  method: 'POST',
  inputSchema: DeleteGitReleaseInputSchema,
  outputSchema: DeleteGitReleaseOutputSchema,
};

// --------------- Action ---------------

/** 删除仓库版本 */
export const DeleteGitRelease = (
  client: CodingClient,
  params: DeleteGitReleaseInput,
): Promise<Either<SdkError, DeleteGitReleaseOutput>> => executeAction(client.config, spec, params);
