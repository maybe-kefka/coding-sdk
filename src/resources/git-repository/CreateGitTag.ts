import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTagSchema } from './schemas';

// --------------- Schema ---------------

/** 创建标签 - 请求参数 */
export const CreateGitTagInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** tag创建信息 */
  Message: z.string().describe('tag创建信息'),
  /** 创建来源的分支或commitId */
  StartPoint: z.string().describe('创建来源的分支或commitId'),
  /** tag名称 */
  TagName: z.string().describe('tag名称'),
});

/** 创建标签 - 响应数据 */
export const CreateGitTagOutputSchema = z.object({
  /** tag的详细信息 */
  GitTag: GitTagSchema.optional().describe('tag的详细信息'),
});

// --------------- Types ---------------

export type CreateGitTagInput = z.infer<typeof CreateGitTagInputSchema>;
export type CreateGitTagOutput = z.infer<typeof CreateGitTagOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitTagInput, CreateGitTagOutput> = {
  action: 'CreateGitTag',
  method: 'POST',
  inputSchema: CreateGitTagInputSchema,
  outputSchema: CreateGitTagOutputSchema,
};

// --------------- Action ---------------

/** 创建标签 */
export const CreateGitTag = (
  client: CodingClient,
  params: CreateGitTagInput,
): Promise<Either<SdkError, CreateGitTagOutput>> => executeAction(client.config, spec, params);
