import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiIssueLogIssueLogSchema } from './schemas';

// --------------- Schema ---------------

/** DescribeIssueLogList - 请求参数 */
export const DescribeIssueLogListInputSchema = z.object({
  /** 动作类型，ADD、CHANGE_PARENT、CREATE、DELETE、REMOVE、UPDATE。要获取更新处理人的日志，用UPDATE+ASSIGNEE，要获取更新迭代的日志，用UPDATE+ITERATION，要获取创建事项的日志，用CREATE+SELF，以此类推 */
  ActionType: z
    .string()
    .describe(
      '动作类型，ADD、CHANGE_PARENT、CREATE、DELETE、REMOVE、UPDATE。要获取更新处理人的日志，用UPDATE+ASSIGNEE，要获取更新迭代的日志，用UPDATE+ITERATION，要获取创建事项的日志，用CREATE+SELF，以此类推',
    ),
  /** 事项code */
  IssueCode: z.number().int().describe('事项code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 操作对象，取值如下 ASSIGNEE  处理人，ATTACHMENT 附件，CHILD_ISSUE  子事项，CUSTOM_FIELD  自定义属性，DEFECT_TYPE 缺陷类型，DESCRIPTION 描述，DUE_DATE 截止日期，EPIC_ISSUE 所属史诗，ISSUE_EPIC_CHANGED ，ISSUE_PROGRAM_RELATION，ISSUE_RELATION，ITERATION 迭代，LABEL 标签，MODULE 模块，NAME 名字，PARENT_ISSUE 父事项，PRIORITY 优先级，PROGRESS 进度，RELATE_DEFECT，RELATE_REQUIREMENT，REQUIREMENT_TYPE，RESOURCE，SELF，START_DATE，STATUS 状态，STORY_POINT 故事点，THIRD_LINK 第三方链接，WATCHER 关注人，WORKING_HOURS 工时 */
  Target: z
    .string()
    .describe(
      '操作对象，取值如下 ASSIGNEE  处理人，ATTACHMENT 附件，CHILD_ISSUE  子事项，CUSTOM_FIELD  自定义属性，DEFECT_TYPE 缺陷类型，DESCRIPTION 描述，DUE_DATE 截止日期，EPIC_ISSUE 所属史诗，ISSUE_EPIC_CHANGED ，ISSUE_PROGRAM_RELATION，ISSUE_RELATION，ITERATION 迭代，LABEL 标签，MODULE 模块，NAME 名字，PARENT_ISSUE 父事项，PRIORITY 优先级，PROGRESS 进度，RELATE_DEFECT，RELATE_REQUIREMENT，REQUIREMENT_TYPE，RESOURCE，SELF，START_DATE，STATUS 状态，STORY_POINT 故事点，THIRD_LINK 第三方链接，WATCHER 关注人，WORKING_HOURS 工时',
    ),
});

/** DescribeIssueLogList - 响应数据 */
export const DescribeIssueLogListOutputSchema = z.object({
  IssueLogList: z.array(ApiIssueLogIssueLogSchema).optional(),
});

// --------------- Types ---------------

export type DescribeIssueLogListInput = z.infer<typeof DescribeIssueLogListInputSchema>;
export type DescribeIssueLogListOutput = z.infer<typeof DescribeIssueLogListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueLogListInput, DescribeIssueLogListOutput> = {
  action: 'DescribeIssueLogList',
  method: 'POST',
  inputSchema: DescribeIssueLogListInputSchema,
  outputSchema: DescribeIssueLogListOutputSchema,
};

// --------------- Action ---------------

/** 获取某个事项的活动日志 */
export const DescribeIssueLogList = (
  client: CodingClient,
  params: DescribeIssueLogListInput,
): Promise<Either<SdkError, DescribeIssueLogListOutput>> =>
  executeAction(client.config, spec, params);
