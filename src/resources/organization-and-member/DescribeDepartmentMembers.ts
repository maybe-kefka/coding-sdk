import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepartmentDescribeDepartmentMemberPageListSchema } from './schemas';

// --------------- Schema ---------------

/** 部门成员列表查询 - 请求参数 */
export const DescribeDepartmentMembersInputSchema = z.object({
  /** 部门名 */
  DepartmentId: z.number().int().describe('部门名'),
  /** 关键词 */
  KeyWords: z.string().optional().describe('关键词'),
  /** 页数 */
  PageNumber: z.number().int().describe('页数'),
  /** 每页数量 */
  PageSize: z.number().int().describe('每页数量'),
  /** 是否仅查询当前部门的直接成员 */
  Pointer: z.boolean().optional().describe('是否仅查询当前部门的直接成员'),
});

/** 部门成员列表查询 - 响应数据 */
export const DescribeDepartmentMembersOutputSchema = z.object({
  /** 部门成员列表（分页数据） */
  Data: DepartmentDescribeDepartmentMemberPageListSchema.describe('部门成员列表（分页数据）'),
});

// --------------- Types ---------------

export type DescribeDepartmentMembersInput = z.infer<typeof DescribeDepartmentMembersInputSchema>;
export type DescribeDepartmentMembersOutput = z.infer<typeof DescribeDepartmentMembersOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepartmentMembersInput, DescribeDepartmentMembersOutput> = {
  action: 'DescribeDepartmentMembers',
  method: 'POST',
  inputSchema: DescribeDepartmentMembersInputSchema,
  outputSchema: DescribeDepartmentMembersOutputSchema,
};

// --------------- Action ---------------

/** 获取部门成员列表（分页列表）查询选中部门下面所有的成员 */
export const DescribeDepartmentMembers = (
  client: CodingClient,
  params: DescribeDepartmentMembersInput,
): Promise<Either<SdkError, DescribeDepartmentMembersOutput>> =>
  executeAction(client.config, spec, params);
