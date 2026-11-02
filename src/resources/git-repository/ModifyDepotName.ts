import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 修改仓库名称 - 请求参数 */
export const ModifyDepotNameInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库名称 */
  DepotName: z.string().describe('仓库名称'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 修改仓库名称 - 响应数据 */
export const ModifyDepotNameOutputSchema = z.object({
  /** 仓库详细信息 */
  DepotInfo: DepotInfoSchema.nullable().describe('仓库详细信息'),
});

// --------------- Types ---------------

export type ModifyDepotNameInput = z.infer<typeof ModifyDepotNameInputSchema>;
export type ModifyDepotNameOutput = z.infer<typeof ModifyDepotNameOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotNameInput, ModifyDepotNameOutput> = {
  action: 'ModifyDepotName',
  method: 'POST',
  inputSchema: ModifyDepotNameInputSchema,
  outputSchema: ModifyDepotNameOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库名称 */
export const ModifyDepotName = (
  client: CodingClient,
  params: ModifyDepotNameInput,
): Promise<Either<SdkError, ModifyDepotNameOutput>> => executeAction(client.config, spec, params);
