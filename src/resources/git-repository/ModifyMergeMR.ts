import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 执行合并 - 请求参数 */
export const ModifyMergeMRInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 是否删除源分支 */
  IsDelSourceBranch: z.boolean().describe('是否删除源分支'),
  /** 是否 Fast Forward 模式 */
  IsFastForward: z.boolean().describe('是否 Fast Forward 模式'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
  /** 合并信息 */
  Message: z.string().describe('合并信息'),
  /** 是否需要对mr进行 Squash */
  Squash: z.boolean().describe('是否需要对mr进行 Squash'),
});

/** 执行合并 - 响应数据 */
export const ModifyMergeMROutputSchema = z.object({
  /** 合并请求信息 */
  MergeRequestInfo: MergeRequestInfoSchema.describe('合并请求信息'),
});

// --------------- Types ---------------

export type ModifyMergeMRInput = z.infer<typeof ModifyMergeMRInputSchema>;
export type ModifyMergeMROutput = z.infer<typeof ModifyMergeMROutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyMergeMRInput, ModifyMergeMROutput> = {
  action: 'ModifyMergeMR',
  method: 'POST',
  inputSchema: ModifyMergeMRInputSchema,
  outputSchema: ModifyMergeMROutputSchema,
};

// --------------- Action ---------------

/** 执行合并 */
export const ModifyMergeMR = (
  client: CodingClient,
  params: ModifyMergeMRInput,
): Promise<Either<SdkError, ModifyMergeMROutput>> => executeAction(client.config, spec, params);
