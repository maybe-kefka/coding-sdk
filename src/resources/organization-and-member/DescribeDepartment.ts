import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepartmentDepartmentTreeDataSchema } from './schemas';

// --------------- Schema ---------------

/** 部门详情查询 - 请求参数 */
export const DescribeDepartmentInputSchema = z.object({
  /** 部门ID */
  DepartmentId: z.number().int().describe('部门ID'),
  /** 是否获取部门树 */
  GetTree: z.boolean().optional().describe('是否获取部门树'),
});

/** 部门详情查询 - 响应数据 */
export const DescribeDepartmentOutputSchema = z.object({
  /** 部门树信息 */
  DepartmentTree: DepartmentDepartmentTreeDataSchema.describe('部门树信息'),
});

// --------------- Types ---------------

export type DescribeDepartmentInput = z.infer<typeof DescribeDepartmentInputSchema>;
export type DescribeDepartmentOutput = z.infer<typeof DescribeDepartmentOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepartmentInput, DescribeDepartmentOutput> = {
  action: 'DescribeDepartment',
  method: 'POST',
  inputSchema: DescribeDepartmentInputSchema,
  outputSchema: DescribeDepartmentOutputSchema,
};

// --------------- Action ---------------

/** 部门详情查询 */
export const DescribeDepartment = (
  client: CodingClient,
  params: DescribeDepartmentInput,
): Promise<Either<SdkError, DescribeDepartmentOutput>> =>
  executeAction(client.config, spec, params);
