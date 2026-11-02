import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 修改合并请求的标题和描述信息 - 请求参数 */
export const ModifyGitMergeRequestInputSchema = z.object({
  /** 待修改的合并请求描述 */
  Content: z.string().optional().describe('待修改的合并请求描述'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 合并请求 IID */
  MergeId: z.number().int().describe('合并请求 IID'),
  /** 待修改的合并请求标题 */
  Title: z.string().optional().describe('待修改的合并请求标题'),
});

/** 修改合并请求的标题和描述信息 - 响应数据 */
export const ModifyGitMergeRequestOutputSchema = z.object({
  /** 合并请求Info信息 */
  MergeRequestInfo: MergeRequestInfoSchema.describe('合并请求Info信息'),
});

// --------------- Types ---------------

export type ModifyGitMergeRequestInput = z.infer<typeof ModifyGitMergeRequestInputSchema>;
export type ModifyGitMergeRequestOutput = z.infer<typeof ModifyGitMergeRequestOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitMergeRequestInput, ModifyGitMergeRequestOutput> = {
  action: 'ModifyGitMergeRequest',
  method: 'POST',
  inputSchema: ModifyGitMergeRequestInputSchema,
  outputSchema: ModifyGitMergeRequestOutputSchema,
};

// --------------- Action ---------------

/** 修改合并请求的标题和描述信息 */
export const ModifyGitMergeRequest = (
  client: CodingClient,
  params: ModifyGitMergeRequestInput,
): Promise<Either<SdkError, ModifyGitMergeRequestOutput>> =>
  executeAction(client.config, spec, params);
