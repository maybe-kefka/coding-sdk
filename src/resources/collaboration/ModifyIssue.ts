import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  IssueCustomFieldFormSchema,
  IssueDetailSchema,
  IssueRecordHourFormSchema,
} from './schemas';

// --------------- Schema ---------------

/** 修改事项 - 请求参数 */
export const ModifyIssueInputSchema = z.object({
  /** 处理人 Id */
  AssigneeId: z.number().int().optional().describe('处理人 Id'),
  /** 评论 */
  Comment: z.string().optional().describe('评论'),
  /** 自定义属性值列表 */
  CustomFieldValues: z.array(IssueCustomFieldFormSchema).optional().describe('自定义属性值列表'),
  /** 缺陷类型 Id */
  DefectTypeId: z.number().int().optional().describe('缺陷类型 Id'),
  /** 删除的文件 Id 列表 */
  DelFileIds: z.array(z.number().int()).optional().describe('删除的文件 Id 列表'),
  /** 删除的标签 Id 列表 */
  DelLabelIds: z.array(z.number().int()).optional().describe('删除的标签 Id 列表'),
  /** 需要删除的版本jcode列表 */
  DelReleaseCodes: z.array(z.number().int()).optional().describe('需要删除的版本jcode列表'),
  /** 删除的事项关注人 Id 列表 */
  DelWatcherIds: z.array(z.number().int()).optional().describe('删除的事项关注人 Id 列表'),
  /** 截止日期，格式：2021-01-01 */
  DueDate: z.string().date().optional().describe('截止日期，格式：2021-01-01'),
  /** 添加的文件 Id 列表 */
  FileIds: z.array(z.number().int()).optional().describe('添加的文件 Id 列表'),
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 迭代code */
  IterationCode: z.number().int().optional().describe('迭代code'),
  /** 标签 Id 列表 */
  LabelIds: z.array(z.number().int()).optional().describe('标签 Id 列表'),
  /** 事项名称 */
  Name: z.string().optional().describe('事项名称'),
  /** 父事项 Code 敏捷模式：Type 为 SUB_TASK 时必须指定 经典模式：Type 为 MISSION、REQUIREMENT 时可指定 */
  ParentCode: z
    .number()
    .int()
    .optional()
    .describe(
      '父事项 Code 敏捷模式：Type 为 SUB_TASK 时必须指定 经典模式：Type 为 MISSION、REQUIREMENT 时可指定',
    ),
  /** 紧急程度 "0" - 低 "1" - 中 "2" - 高 "3" - 紧急 */
  Priority: z.string().optional().describe('紧急程度 "0" - 低 "1" - 中 "2" - 高 "3" - 紧急'),
  /** 进度 */
  Progress: z.number().optional().describe('进度'),
  /** 项目模块 Id */
  ProjectModuleId: z.number().int().optional().describe('项目模块 Id'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 登记工时 */
  RecordHour: IssueRecordHourFormSchema.optional().describe('登记工时'),
  /** 版本code列表 */
  ReleaseCodes: z.array(z.number().int()).optional().describe('版本code列表'),
  /** 需求类型 Id */
  RequirementTypeId: z.number().int().optional().describe('需求类型 Id'),
  /** 开始日期，格式：2021-01-01 */
  StartDate: z.string().date().optional().describe('开始日期，格式：2021-01-01'),
  /** 事项状态 Id */
  StatusId: z.number().int().optional().describe('事项状态 Id'),
  /** 故事点，例如：0.5、1 */
  StoryPoint: z.string().optional().describe('故事点，例如：0.5、1'),
  /** 标签 Id 列表 */
  UpdateLabelIds: z.array(z.number().int()).optional().describe('标签 Id 列表'),
  /** 关注人 Id 列表 */
  UpdateWatchers: z.array(z.number().int()).optional().describe('关注人 Id 列表'),
  /** 添加的事项关注人 Id 列表 */
  WatcherIds: z.array(z.number().int()).optional().describe('添加的事项关注人 Id 列表'),
  /** 工时（小时数） */
  WorkingHours: z.number().optional().describe('工时（小时数）'),
  /** 是否查询描述中图片的下载地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否查询描述中图片的下载地址'),
});

/** 修改事项 - 响应数据 */
export const ModifyIssueOutputSchema = z.object({
  /** 事项的具体信息 */
  Issue: IssueDetailSchema.describe('事项的具体信息'),
});

// --------------- Types ---------------

export type ModifyIssueInput = z.infer<typeof ModifyIssueInputSchema>;
export type ModifyIssueOutput = z.infer<typeof ModifyIssueOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyIssueInput, ModifyIssueOutput> = {
  action: 'ModifyIssue',
  method: 'POST',
  inputSchema: ModifyIssueInputSchema,
  outputSchema: ModifyIssueOutputSchema,
};

// --------------- Action ---------------

/** 修改事项 */
export const ModifyIssue = (
  client: CodingClient,
  params: ModifyIssueInput,
): Promise<Either<SdkError, ModifyIssueOutput>> => executeAction(client.config, spec, params);
