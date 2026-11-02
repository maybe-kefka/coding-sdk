import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ModifyGitMergeBranchDataSchema } from './schemas';

// --------------- Schema ---------------

/** 合并分支 - 请求参数 */
export const ModifyGitMergeBranchInputSchema = z.object({
  /** 提交信息 */
  CommitMessage: z.string().describe('提交信息'),
  /** 仓库路径或仓库ID */
  DepotPath: z.string().describe('仓库路径或仓库ID'),
  /** 源分支 */
  FromBranch: z.string().describe('源分支'),
  /** 目标分支 */
  ToBranch: z.string().describe('目标分支'),
});

/** 合并分支 - 响应数据 */
export const ModifyGitMergeBranchOutputSchema = z.object({
  /** 合并分支结果 */
  Data: ModifyGitMergeBranchDataSchema.describe('合并分支结果'),
});

// --------------- Types ---------------

export type ModifyGitMergeBranchInput = z.infer<typeof ModifyGitMergeBranchInputSchema>;
export type ModifyGitMergeBranchOutput = z.infer<typeof ModifyGitMergeBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitMergeBranchInput, ModifyGitMergeBranchOutput> = {
  action: 'ModifyGitMergeBranch',
  method: 'POST',
  inputSchema: ModifyGitMergeBranchInputSchema,
  outputSchema: ModifyGitMergeBranchOutputSchema,
};

// --------------- Action ---------------

/** 将源分支的改动合并到目标分支 */
export const ModifyGitMergeBranch = (
  client: CodingClient,
  params: ModifyGitMergeBranchInput,
): Promise<Either<SdkError, ModifyGitMergeBranchOutput>> =>
  executeAction(client.config, spec, params);
