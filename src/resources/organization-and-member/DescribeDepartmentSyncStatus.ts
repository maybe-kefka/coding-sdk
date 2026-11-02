import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 查看部门同步状态 - 请求参数 */
export const DescribeDepartmentSyncStatusInputSchema = z.object({});

/** 查看部门同步状态 - 响应数据 */
export const DescribeDepartmentSyncStatusOutputSchema = z.object({
  /** 同步结果 */
  Result: z.string().optional().describe('同步结果'),
});

// --------------- Types ---------------

export type DescribeDepartmentSyncStatusInput = z.infer<
  typeof DescribeDepartmentSyncStatusInputSchema
>;
export type DescribeDepartmentSyncStatusOutput = z.infer<
  typeof DescribeDepartmentSyncStatusOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepartmentSyncStatusInput, DescribeDepartmentSyncStatusOutput> = {
  action: 'DescribeDepartmentSyncStatus',
  method: 'POST',
  inputSchema: DescribeDepartmentSyncStatusInputSchema,
  outputSchema: DescribeDepartmentSyncStatusOutputSchema,
};

// --------------- Action ---------------

/** 查看部门同步状态 */
export const DescribeDepartmentSyncStatus = (
  client: CodingClient,
  params: DescribeDepartmentSyncStatusInput,
): Promise<Either<SdkError, DescribeDepartmentSyncStatusOutput>> =>
  executeAction(client.config, spec, params);
