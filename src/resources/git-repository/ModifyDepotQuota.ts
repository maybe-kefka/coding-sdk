import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改仓库容量 - 请求参数 */
export const ModifyDepotQuotaInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 仓库容量 */
  DepotQuotaSize: z.string().describe('仓库容量'),
});

/** 修改仓库容量 - 响应数据 */
export const ModifyDepotQuotaOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDepotQuotaInput = z.infer<typeof ModifyDepotQuotaInputSchema>;
export type ModifyDepotQuotaOutput = z.infer<typeof ModifyDepotQuotaOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotQuotaInput, ModifyDepotQuotaOutput> = {
  action: 'ModifyDepotQuota',
  method: 'POST',
  inputSchema: ModifyDepotQuotaInputSchema,
  outputSchema: ModifyDepotQuotaOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库容量 */
export const ModifyDepotQuota = (
  client: CodingClient,
  params: ModifyDepotQuotaInput,
): Promise<Either<SdkError, ModifyDepotQuotaOutput>> => executeAction(client.config, spec, params);
