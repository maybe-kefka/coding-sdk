import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectIssueStatusSchema } from './schemas';

// --------------- Schema ---------------

/** 查询具体事项类型的状态列表 - 请求参数 */
export const DescribeProjectIssueStatusListInputSchema = z.object({
  /** 事项类型 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 SUB_TASK - 子任务 */
  IssueType: z
    .string()
    .describe(
      '事项类型 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 SUB_TASK - 子任务',
    ),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 事项类型id */
  IssueTypeId: z.number().int().optional().describe('事项类型id'),
});

/** 查询具体事项类型的状态列表 - 响应数据 */
export const DescribeProjectIssueStatusListOutputSchema = z.object({
  /** 项目的事项状态列表 */
  ProjectIssueStatusList: z.array(ProjectIssueStatusSchema).describe('项目的事项状态列表'),
});

// --------------- Types ---------------

export type DescribeProjectIssueStatusListInput = z.infer<
  typeof DescribeProjectIssueStatusListInputSchema
>;
export type DescribeProjectIssueStatusListOutput = z.infer<
  typeof DescribeProjectIssueStatusListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectIssueStatusListInput, DescribeProjectIssueStatusListOutput> =
  {
    action: 'DescribeProjectIssueStatusList',
    method: 'POST',
    inputSchema: DescribeProjectIssueStatusListInputSchema,
    outputSchema: DescribeProjectIssueStatusListOutputSchema,
  };

// --------------- Action ---------------

/** 查询具体事项类型的状态列表 */
export const DescribeProjectIssueStatusList = (
  client: CodingClient,
  params: DescribeProjectIssueStatusListInput,
): Promise<Either<SdkError, DescribeProjectIssueStatusListOutput>> =>
  executeAction(client.config, spec, params);
