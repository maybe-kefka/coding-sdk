import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectIssueFieldSchema } from './schemas';

// --------------- Schema ---------------

/** 查询具体事项类型的属性列表 - 请求参数 */
export const DescribeProjectIssueFieldListInputSchema = z.object({
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

/** 查询具体事项类型的属性列表 - 响应数据 */
export const DescribeProjectIssueFieldListOutputSchema = z.object({
  /** 项目的事项属性列表 */
  ProjectIssueFieldList: z.array(ProjectIssueFieldSchema).describe('项目的事项属性列表'),
});

// --------------- Types ---------------

export type DescribeProjectIssueFieldListInput = z.infer<
  typeof DescribeProjectIssueFieldListInputSchema
>;
export type DescribeProjectIssueFieldListOutput = z.infer<
  typeof DescribeProjectIssueFieldListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectIssueFieldListInput, DescribeProjectIssueFieldListOutput> = {
  action: 'DescribeProjectIssueFieldList',
  method: 'POST',
  inputSchema: DescribeProjectIssueFieldListInputSchema,
  outputSchema: DescribeProjectIssueFieldListOutputSchema,
};

// --------------- Action ---------------

/** 查询具体事项类型的属性列表 */
export const DescribeProjectIssueFieldList = (
  client: CodingClient,
  params: DescribeProjectIssueFieldListInput,
): Promise<Either<SdkError, DescribeProjectIssueFieldListOutput>> =>
  executeAction(client.config, spec, params);
