import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改提交对应的流水线状态 - 请求参数 */
export const ModifyGitCommitStatusInputSchema = z.object({
  /** 提交id */
  CommitSha: z.string().describe('提交id'),
  /** 流水线文本内容 */
  Context: z.string().describe('流水线文本内容'),
  /** 仓库id */
  DepotId: z.number().int().optional().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 流水线状态描述 */
  Description: z.string().describe('流水线状态描述'),
  /** 提交状态 */
  State: z.string().describe('提交状态'),
  /** 流水线链接地址 */
  TargetURL: z.string().describe('流水线链接地址'),
});

/** 修改提交对应的流水线状态 - 响应数据 */
export const ModifyGitCommitStatusOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitCommitStatusInput = z.infer<typeof ModifyGitCommitStatusInputSchema>;
export type ModifyGitCommitStatusOutput = z.infer<typeof ModifyGitCommitStatusOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitCommitStatusInput, ModifyGitCommitStatusOutput> = {
  action: 'ModifyGitCommitStatus',
  method: 'POST',
  inputSchema: ModifyGitCommitStatusInputSchema,
  outputSchema: ModifyGitCommitStatusOutputSchema,
};

// --------------- Action ---------------

/** 修改提交对应的流水线状态 */
export const ModifyGitCommitStatus = (
  client: CodingClient,
  params: ModifyGitCommitStatusInput,
): Promise<Either<SdkError, ModifyGitCommitStatusOutput>> =>
  executeAction(client.config, spec, params);
