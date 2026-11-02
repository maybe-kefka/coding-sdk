import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 代码仓库删除tag - 请求参数 */
export const DeleteGitTagInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** tag名称 */
  TagName: z.string().describe('tag名称'),
});

/** 代码仓库删除tag - 响应数据 */
export const DeleteGitTagOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitTagInput = z.infer<typeof DeleteGitTagInputSchema>;
export type DeleteGitTagOutput = z.infer<typeof DeleteGitTagOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitTagInput, DeleteGitTagOutput> = {
  action: 'DeleteGitTag',
  method: 'POST',
  inputSchema: DeleteGitTagInputSchema,
  outputSchema: DeleteGitTagOutputSchema,
};

// --------------- Action ---------------

/** 代码仓库删除tag */
export const DeleteGitTag = (
  client: CodingClient,
  params: DeleteGitTagInput,
): Promise<Either<SdkError, DeleteGitTagOutput>> => executeAction(client.config, spec, params);
