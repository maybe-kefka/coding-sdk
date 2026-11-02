import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 同步部门三方成员 - 请求参数 */
export const TriggerDepartmentSyncInputSchema = z.object({});

/** 同步部门三方成员 - 响应数据 */
export const TriggerDepartmentSyncOutputSchema = z.object({});

// --------------- Types ---------------

export type TriggerDepartmentSyncInput = z.infer<typeof TriggerDepartmentSyncInputSchema>;
export type TriggerDepartmentSyncOutput = z.infer<typeof TriggerDepartmentSyncOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<TriggerDepartmentSyncInput, TriggerDepartmentSyncOutput> = {
  action: 'TriggerDepartmentSync',
  method: 'POST',
  inputSchema: TriggerDepartmentSyncInputSchema,
  outputSchema: TriggerDepartmentSyncOutputSchema,
};

// --------------- Action ---------------

/** 同步部门三方成员(限制最多每两分钟执行一次) */
export const TriggerDepartmentSync = (
  client: CodingClient,
  params: TriggerDepartmentSyncInput,
): Promise<Either<SdkError, TriggerDepartmentSyncOutput>> =>
  executeAction(client.config, spec, params);
