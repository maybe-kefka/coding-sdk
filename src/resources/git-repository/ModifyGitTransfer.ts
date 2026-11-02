import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 仓库转移至同团队下的其他项目中 - 请求参数 */
export const ModifyGitTransferInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 目标项目 ID */
  TargetProjectId: z.number().int().describe('目标项目 ID'),
});

/** 仓库转移至同团队下的其他项目中 - 响应数据 */
export const ModifyGitTransferOutputSchema = z.object({
  /** 转移后 web 页面的访问路径(不包含域名) */
  NewDepotPath: z.string().nullable().describe('转移后 web 页面的访问路径(不包含域名)'),
});

// --------------- Types ---------------

export type ModifyGitTransferInput = z.infer<typeof ModifyGitTransferInputSchema>;
export type ModifyGitTransferOutput = z.infer<typeof ModifyGitTransferOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitTransferInput, ModifyGitTransferOutput> = {
  action: 'ModifyGitTransfer',
  method: 'POST',
  inputSchema: ModifyGitTransferInputSchema,
  outputSchema: ModifyGitTransferOutputSchema,
};

// --------------- Action ---------------

/** 仓库转移至同团队下的其他项目中 */
export const ModifyGitTransfer = (
  client: CodingClient,
  params: ModifyGitTransferInput,
): Promise<Either<SdkError, ModifyGitTransferOutput>> => executeAction(client.config, spec, params);
