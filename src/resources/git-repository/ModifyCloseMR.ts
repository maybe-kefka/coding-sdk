import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 关闭合并请求 - 请求参数 */
export const ModifyCloseMRInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 合并请求id */
  MergeId: z.number().int().describe('合并请求id'),
});

/** 关闭合并请求 - 响应数据 */
export const ModifyCloseMROutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyCloseMRInput = z.infer<typeof ModifyCloseMRInputSchema>;
export type ModifyCloseMROutput = z.infer<typeof ModifyCloseMROutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyCloseMRInput, ModifyCloseMROutput> = {
  action: 'ModifyCloseMR',
  method: 'POST',
  inputSchema: ModifyCloseMRInputSchema,
  outputSchema: ModifyCloseMROutputSchema,
};

// --------------- Action ---------------

/** 关闭合并请求 */
export const ModifyCloseMR = (
  client: CodingClient,
  params: ModifyCloseMRInput,
): Promise<Either<SdkError, ModifyCloseMROutput>> => executeAction(client.config, spec, params);
