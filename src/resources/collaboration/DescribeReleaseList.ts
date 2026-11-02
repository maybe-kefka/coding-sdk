import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueConditionSchema, OpenApiReleaseListDataWithPageSchema } from './schemas';

// --------------- Schema ---------------

/** 查询项目内版本列表 - 请求参数 */
export const DescribeReleaseListInputSchema = z.object({
  /** 筛选条件列表，每一个值都是一个筛选条件，条件取值可以参考页面上的对应的HTTP接口  */
  Conditions: z
    .array(IssueConditionSchema)
    .optional()
    .describe('筛选条件列表，每一个值都是一个筛选条件，条件取值可以参考页面上的对应的HTTP接口 '),
  /** 分页查询中的页数，page从1开始计数  */
  Page: z.number().int().optional().describe('分页查询中的页数，page从1开始计数 '),
  /** 分页查询中每页的大小  */
  PageSize: z.number().int().optional().describe('分页查询中每页的大小 '),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 排序KEY  */
  SortKey: z.string().optional().describe('排序KEY '),
  /** 排序VALUE  */
  SortValue: z.string().optional().describe('排序VALUE '),
});

/** 查询项目内版本列表 - 响应数据 */
export const DescribeReleaseListOutputSchema = z.object({
  /** 版本列表 */
  Data: OpenApiReleaseListDataWithPageSchema.optional().describe('版本列表'),
});

// --------------- Types ---------------

export type DescribeReleaseListInput = z.infer<typeof DescribeReleaseListInputSchema>;
export type DescribeReleaseListOutput = z.infer<typeof DescribeReleaseListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeReleaseListInput, DescribeReleaseListOutput> = {
  action: 'DescribeReleaseList',
  method: 'POST',
  inputSchema: DescribeReleaseListInputSchema,
  outputSchema: DescribeReleaseListOutputSchema,
};

// --------------- Action ---------------

/** 查询项目内版本列表 */
export const DescribeReleaseList = (
  client: CodingClient,
  params: DescribeReleaseListInput,
): Promise<Either<SdkError, DescribeReleaseListOutput>> =>
  executeAction(client.config, spec, params);
