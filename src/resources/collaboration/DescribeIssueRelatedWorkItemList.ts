import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项关联的项目集中的工作项 - 请求参数 */
export const DescribeIssueRelatedWorkItemListInputSchema = z.object({
  /** 事项code */
  IssueCode: z.number().int().describe('事项code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 是否展示描述中图片外部可访问的地址 */
  ShowImageOutUrl: z.string().optional().describe('是否展示描述中图片外部可访问的地址'),
});

/** 查询事项关联的项目集中的工作项 - 响应数据 */
export const DescribeIssueRelatedWorkItemListOutputSchema = z.object({
  /** 事项关联的项目集中的工作项列表 */
  WorkItemList: z.array(IssueDetailSchema).optional().describe('事项关联的项目集中的工作项列表'),
});

// --------------- Types ---------------

export type DescribeIssueRelatedWorkItemListInput = z.infer<
  typeof DescribeIssueRelatedWorkItemListInputSchema
>;
export type DescribeIssueRelatedWorkItemListOutput = z.infer<
  typeof DescribeIssueRelatedWorkItemListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeIssueRelatedWorkItemListInput,
  DescribeIssueRelatedWorkItemListOutput
> = {
  action: 'DescribeIssueRelatedWorkItemList',
  method: 'POST',
  inputSchema: DescribeIssueRelatedWorkItemListInputSchema,
  outputSchema: DescribeIssueRelatedWorkItemListOutputSchema,
};

// --------------- Action ---------------

/** 查询事项关联的项目集中的工作项 */
export const DescribeIssueRelatedWorkItemList = (
  client: CodingClient,
  params: DescribeIssueRelatedWorkItemListInput,
): Promise<Either<SdkError, DescribeIssueRelatedWorkItemListOutput>> =>
  executeAction(client.config, spec, params);
