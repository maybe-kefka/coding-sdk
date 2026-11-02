import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 新建 git 版本 - 请求参数 */
export const CreateGitReleaseInputSchema = z.object({
  /** 提交 Sha 值 */
  CommitSha: z.string().describe('提交 Sha 值'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 版本描述信息 */
  Description: z.string().describe('版本描述信息'),
  /** 是否为预发布版本 */
  Pre: z.boolean().describe('是否为预发布版本'),
  /** 创建来源的分支名称或者commitId */
  TagName: z.string().describe('创建来源的分支名称或者commitId'),
  /** 目标提交 Sha 值 */
  TargetCommitBranch: z.string().describe('目标提交 Sha 值'),
  /** 版本标题 */
  Title: z.string().describe('版本标题'),
});

/** 新建 git 版本 - 响应数据 */
export const CreateGitReleaseOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateGitReleaseInput = z.infer<typeof CreateGitReleaseInputSchema>;
export type CreateGitReleaseOutput = z.infer<typeof CreateGitReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitReleaseInput, CreateGitReleaseOutput> = {
  action: 'CreateGitRelease',
  method: 'POST',
  inputSchema: CreateGitReleaseInputSchema,
  outputSchema: CreateGitReleaseOutputSchema,
};

// --------------- Action ---------------

/** 新建 git 版本 */
export const CreateGitRelease = (
  client: CodingClient,
  params: CreateGitReleaseInput,
): Promise<Either<SdkError, CreateGitReleaseOutput>> => executeAction(client.config, spec, params);
