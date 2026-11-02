import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改仓库描述 - 请求参数 */
export const ModifyDepotDescriptionInputSchema = z.object({
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 仓库描述信息 */
  Description: z.string().describe('仓库描述信息'),
});

/** 修改仓库描述 - 响应数据 */
export const ModifyDepotDescriptionOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDepotDescriptionInput = z.infer<typeof ModifyDepotDescriptionInputSchema>;
export type ModifyDepotDescriptionOutput = z.infer<typeof ModifyDepotDescriptionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotDescriptionInput, ModifyDepotDescriptionOutput> = {
  action: 'ModifyDepotDescription',
  method: 'POST',
  inputSchema: ModifyDepotDescriptionInputSchema,
  outputSchema: ModifyDepotDescriptionOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库描述 */
export const ModifyDepotDescription = (
  client: CodingClient,
  params: ModifyDepotDescriptionInput,
): Promise<Either<SdkError, ModifyDepotDescriptionOutput>> =>
  executeAction(client.config, spec, params);
