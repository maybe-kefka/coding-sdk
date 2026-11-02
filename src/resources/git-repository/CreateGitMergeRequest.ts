import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitMergeRequestSchema } from './schemas';

// --------------- Schema ---------------

/** 创建 Git 合并请求mr - 请求参数 */
export const CreateGitMergeRequestInputSchema = z.object({
  /** 描述内容 */
  Content: z.string().describe('描述内容'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一   */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一  '),
  /** 目标分支名 */
  DestBranch: z.string().describe('目标分支名'),
  /** 源分支名 */
  SrcBranch: z.string().describe('源分支名'),
  /** 标题 */
  Title: z.string().describe('标题'),
});

/** 创建 Git 合并请求mr - 响应数据 */
export const CreateGitMergeRequestOutputSchema = z.object({
  /** 创建合并请求的信息 */
  Request: GitMergeRequestSchema.describe('创建合并请求的信息'),
});

// --------------- Types ---------------

export type CreateGitMergeRequestInput = z.infer<typeof CreateGitMergeRequestInputSchema>;
export type CreateGitMergeRequestOutput = z.infer<typeof CreateGitMergeRequestOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitMergeRequestInput, CreateGitMergeRequestOutput> = {
  action: 'CreateGitMergeRequest',
  method: 'POST',
  inputSchema: CreateGitMergeRequestInputSchema,
  outputSchema: CreateGitMergeRequestOutputSchema,
};

// --------------- Action ---------------

/** 创建 Git 合并请求mr */
export const CreateGitMergeRequest = (
  client: CodingClient,
  params: CreateGitMergeRequestInput,
): Promise<Either<SdkError, CreateGitMergeRequestOutput>> =>
  executeAction(client.config, spec, params);
