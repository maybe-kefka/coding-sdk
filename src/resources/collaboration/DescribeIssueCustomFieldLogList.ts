import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CustomFieldChangeLogSchema } from './schemas';

// --------------- Schema ---------------

/** 获取某个事项的自定义属性变更日志 - 请求参数 */
export const DescribeIssueCustomFieldLogListInputSchema = z.object({
  /** 自定义属性名称 */
  FieldName: z.string().describe('自定义属性名称'),
  /** 事项编号 */
  IssueCode: z.number().int().describe('事项编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 获取某个事项的自定义属性变更日志 - 响应数据 */
export const DescribeIssueCustomFieldLogListOutputSchema = z.object({
  /** 事项的自定义属性变更日志 */
  FieldChangeLogList: z
    .array(CustomFieldChangeLogSchema)
    .optional()
    .describe('事项的自定义属性变更日志'),
});

// --------------- Types ---------------

export type DescribeIssueCustomFieldLogListInput = z.infer<
  typeof DescribeIssueCustomFieldLogListInputSchema
>;
export type DescribeIssueCustomFieldLogListOutput = z.infer<
  typeof DescribeIssueCustomFieldLogListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeIssueCustomFieldLogListInput,
  DescribeIssueCustomFieldLogListOutput
> = {
  action: 'DescribeIssueCustomFieldLogList',
  method: 'POST',
  inputSchema: DescribeIssueCustomFieldLogListInputSchema,
  outputSchema: DescribeIssueCustomFieldLogListOutputSchema,
};

// --------------- Action ---------------

/** 获取某个事项的自定义属性变更日志 */
export const DescribeIssueCustomFieldLogList = (
  client: CodingClient,
  params: DescribeIssueCustomFieldLogListInput,
): Promise<Either<SdkError, DescribeIssueCustomFieldLogListOutput>> =>
  executeAction(client.config, spec, params);
