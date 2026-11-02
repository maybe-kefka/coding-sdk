import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PrincipalDataSchema } from './schemas';

// --------------- Schema ---------------

/** 项目成员主体查询(包含用户组、部门、成员) - 请求参数 */
export const DescribeProjectMemberPrincipalsInputSchema = z.object({
  /** 关键字搜索：成员名/邮箱 */
  Keyword: z.string().optional().describe('关键字搜索：成员名/邮箱'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
  /** 权限组Id */
  PolicyId: z.number().int().optional().describe('权限组Id'),
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

/** 项目成员主体查询(包含用户组、部门、成员) - 响应数据 */
export const DescribeProjectMemberPrincipalsOutputSchema = z.object({
  /** 成员主体信息 */
  Data: PrincipalDataSchema.nullable().describe('成员主体信息'),
});

// --------------- Types ---------------

export type DescribeProjectMemberPrincipalsInput = z.infer<
  typeof DescribeProjectMemberPrincipalsInputSchema
>;
export type DescribeProjectMemberPrincipalsOutput = z.infer<
  typeof DescribeProjectMemberPrincipalsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeProjectMemberPrincipalsInput,
  DescribeProjectMemberPrincipalsOutput
> = {
  action: 'DescribeProjectMemberPrincipals',
  method: 'POST',
  inputSchema: DescribeProjectMemberPrincipalsInputSchema,
  outputSchema: DescribeProjectMemberPrincipalsOutputSchema,
};

// --------------- Action ---------------

/** 项目成员主体查询(包含用户组、部门、成员) */
export const DescribeProjectMemberPrincipals = (
  client: CodingClient,
  params: DescribeProjectMemberPrincipalsInput,
): Promise<Either<SdkError, DescribeProjectMemberPrincipalsOutput>> =>
  executeAction(client.config, spec, params);
