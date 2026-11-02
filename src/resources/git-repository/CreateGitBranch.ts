import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 新建代码仓库分支 - 请求参数 */
export const CreateGitBranchInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 分支备注 */
  Note: z.string().optional().describe('分支备注'),
  /** 创建来源的分支名称或者commitId */
  StartPoint: z.string().describe('创建来源的分支名称或者commitId'),
});

/** 新建代码仓库分支 - 响应数据 */
export const CreateGitBranchOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateGitBranchInput = z.infer<typeof CreateGitBranchInputSchema>;
export type CreateGitBranchOutput = z.infer<typeof CreateGitBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitBranchInput, CreateGitBranchOutput> = {
  action: 'CreateGitBranch',
  method: 'POST',
  inputSchema: CreateGitBranchInputSchema,
  outputSchema: CreateGitBranchOutputSchema,
};

// --------------- Action ---------------

/** 用于代码仓库新建分支 */
export const CreateGitBranch = (
  client: CodingClient,
  params: CreateGitBranchInput,
): Promise<Either<SdkError, CreateGitBranchOutput>> => executeAction(client.config, spec, params);
