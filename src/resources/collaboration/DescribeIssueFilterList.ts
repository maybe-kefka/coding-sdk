import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueFilterListDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项筛选器列表 - 请求参数 */
export const DescribeIssueFilterListInputSchema = z.object({
  /** 事项类型 ALL - 全部事项 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 */
  IssueType: z
    .string()
    .describe(
      '事项类型 ALL - 全部事项 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗',
    ),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询事项筛选器列表 - 响应数据 */
export const DescribeIssueFilterListOutputSchema = z.object({
  /** 过滤器列表，包含系统过滤器和自定义过滤器 */
  Data: IssueFilterListDataSchema.describe('过滤器列表，包含系统过滤器和自定义过滤器'),
});

// --------------- Types ---------------

export type DescribeIssueFilterListInput = z.infer<typeof DescribeIssueFilterListInputSchema>;
export type DescribeIssueFilterListOutput = z.infer<typeof DescribeIssueFilterListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueFilterListInput, DescribeIssueFilterListOutput> = {
  action: 'DescribeIssueFilterList',
  method: 'POST',
  inputSchema: DescribeIssueFilterListInputSchema,
  outputSchema: DescribeIssueFilterListOutputSchema,
};

// --------------- Action ---------------

/** 查询事项筛选器列表 */
export const DescribeIssueFilterList = (
  client: CodingClient,
  params: DescribeIssueFilterListInput,
): Promise<Either<SdkError, DescribeIssueFilterListOutput>> =>
  executeAction(client.config, spec, params);
