import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 创建git合并请求 - 请求参数 */
export const CreateGitMergeReqInputSchema = z.object({
  /** 合并请求内容 */
  Content: z.string().describe('合并请求内容'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径与depotId选择其一就可以 */
  DepotPath: z.string().optional().describe('仓库路径与depotId选择其一就可以'),
  /** 目标分支 */
  DestBranch: z.string().describe('目标分支'),
  /** 评审者 */
  Reviewers: z.string().optional().describe('评审者'),
  /** 源分支 */
  SrcBranch: z.string().describe('源分支'),
  /** 合并请求title */
  Title: z.string().describe('合并请求title'),
});

/** 创建git合并请求 - 响应数据 */
export const CreateGitMergeReqOutputSchema = z.object({
  /** 合并请求信息 */
  MergeInfo: MergeInfoSchema.describe('合并请求信息'),
});

// --------------- Types ---------------

export type CreateGitMergeReqInput = z.infer<typeof CreateGitMergeReqInputSchema>;
export type CreateGitMergeReqOutput = z.infer<typeof CreateGitMergeReqOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitMergeReqInput, CreateGitMergeReqOutput> = {
  action: 'CreateGitMergeReq',
  method: 'POST',
  inputSchema: CreateGitMergeReqInputSchema,
  outputSchema: CreateGitMergeReqOutputSchema,
};

// --------------- Action ---------------

/** 创建git合并请求 */
export const CreateGitMergeReq = (
  client: CodingClient,
  params: CreateGitMergeReqInput,
): Promise<Either<SdkError, CreateGitMergeReqOutput>> => executeAction(client.config, spec, params);
