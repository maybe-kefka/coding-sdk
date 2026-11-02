import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { OpenApiTeamIssueDataSchema } from './schemas';

// --------------- Schema ---------------

/** 获取一个用户在团队内的所有代办事项 - 请求参数 */
export const DescribeWorkbenchIssueListInputSchema = z.object({
  /** 关键字 */
  Keyword: z.string().optional().describe('关键字'),
  /** 分页查询的分页数，不填的话从第一页开始查询 */
  PageNumber: z.number().int().optional().describe('分页查询的分页数，不填的话从第一页开始查询'),
  /** 每页展示数，默认 20 ，最大值 500 */
  PageSize: z.number().int().optional().describe('每页展示数，默认 20 ，最大值 500'),
  /** 不填或者填0则查询团队内参与的所有项目 */
  ProjectId: z.number().int().optional().describe('不填或者填0则查询团队内参与的所有项目'),
  /** 事项类型，取值如REQUIREMENT、DEFECT等 */
  Type: z.string().optional().describe('事项类型，取值如REQUIREMENT、DEFECT等'),
  /** 是否查询描述中图片的下载地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否查询描述中图片的下载地址'),
});

/** 获取一个用户在团队内的所有代办事项 - 响应数据 */
export const DescribeWorkbenchIssueListOutputSchema = z.object({
  /** 工作台事项数据 */
  Data: OpenApiTeamIssueDataSchema.optional().describe('工作台事项数据'),
});

// --------------- Types ---------------

export type DescribeWorkbenchIssueListInput = z.infer<typeof DescribeWorkbenchIssueListInputSchema>;
export type DescribeWorkbenchIssueListOutput = z.infer<
  typeof DescribeWorkbenchIssueListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeWorkbenchIssueListInput, DescribeWorkbenchIssueListOutput> = {
  action: 'DescribeWorkbenchIssueList',
  method: 'POST',
  inputSchema: DescribeWorkbenchIssueListInputSchema,
  outputSchema: DescribeWorkbenchIssueListOutputSchema,
};

// --------------- Action ---------------

/** 获取一个用户在团队内的所有代办事项（即前端页面上个人工作台中的事项列表） */
export const DescribeWorkbenchIssueList = (
  client: CodingClient,
  params: DescribeWorkbenchIssueListInput,
): Promise<Either<SdkError, DescribeWorkbenchIssueListOutput>> =>
  executeAction(client.config, spec, params);
