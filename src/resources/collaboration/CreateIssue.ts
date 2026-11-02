import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueCustomFieldFormSchema, IssueDetailSchema, IssueThirdLinkFormSchema } from './schemas';

// --------------- Schema ---------------

/** 创建事项 - 请求参数 */
export const CreateIssueInputSchema = z.object({
  /** 处理人 Id */
  AssigneeId: z.number().int().optional().describe('处理人 Id'),
  /** 自定义属性值列表 */
  CustomFieldValues: z.array(IssueCustomFieldFormSchema).optional().describe('自定义属性值列表'),
  /** 缺陷类型 Id */
  DefectTypeId: z.number().int().optional().describe('缺陷类型 Id'),
  /** 描述 */
  Description: z.string().optional().describe('描述'),
  /** 截止日期，格式：2021-01-01 */
  DueDate: z.string().date().optional().describe('截止日期，格式：2021-01-01'),
  /** 史诗 Code，Type 为 EPIC 或 SUB_TASK时，不传该值 */
  EpicCode: z.number().int().optional().describe('史诗 Code，Type 为 EPIC 或 SUB_TASK时，不传该值'),
  /** 附件的文件 Id 列表 */
  FileIds: z.array(z.number().int()).optional().describe('附件的文件 Id 列表'),
  /** 事项类型 Id */
  IssueTypeId: z.number().int().optional().describe('事项类型 Id'),
  /** 迭代 Code，Type 为 EPIC 或 SUB_TASK时，忽略该值 */
  IterationCode: z
    .number()
    .int()
    .optional()
    .describe('迭代 Code，Type 为 EPIC 或 SUB_TASK时，忽略该值'),
  /** 标签 Id 列表 */
  LabelIds: z.array(z.number().int()).optional().describe('标签 Id 列表'),
  /** 事项名称 */
  Name: z.string().describe('事项名称'),
  /** 父事项 Code 敏捷模式：Type 为 SUB_TASK 时必须指定 经典模式：Type 为 MISSION、REQUIREMENT 时可指定 */
  ParentCode: z
    .number()
    .int()
    .optional()
    .describe(
      '父事项 Code 敏捷模式：Type 为 SUB_TASK 时必须指定 经典模式：Type 为 MISSION、REQUIREMENT 时可指定',
    ),
  /** 紧急程度 "0" - 低 "1" - 中 "2" - 高 "3" - 紧急 */
  Priority: z.string().describe('紧急程度 "0" - 低 "1" - 中 "2" - 高 "3" - 紧急'),
  /** 项目模块 Id */
  ProjectModuleId: z.number().int().optional().describe('项目模块 Id'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
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
  /** 排序目标位置的事项 code 可不填，排在底位 */
  TargetSortCode: z.number().int().optional().describe('排序目标位置的事项 code 可不填，排在底位'),
  /** 第三方链接列表 */
  ThirdLinks: z.array(IssueThirdLinkFormSchema).optional().describe('第三方链接列表'),
  /** 事项类型 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 SUB_TASK - 子任务 */
  Type: z
    .string()
    .describe(
      '事项类型 DEFECT - 缺陷 REQUIREMENT - 需求 MISSION - 任务 EPIC - 史诗 SUB_TASK - 子任务',
    ),
  /** 关注人 Id 列表 */
  WatcherIds: z.array(z.number().int()).optional().describe('关注人 Id 列表'),
  /** 工时（小时数） */
  WorkingHours: z.number().optional().describe('工时（小时数）'),
  /** 是否查询描述中图片的下载地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否查询描述中图片的下载地址'),
});

/** 创建事项 - 响应数据 */
export const CreateIssueOutputSchema = z.object({
  /** 事项的具体信息 */
  Issue: IssueDetailSchema.describe('事项的具体信息'),
});

// --------------- Types ---------------

export type CreateIssueInput = z.infer<typeof CreateIssueInputSchema>;
export type CreateIssueOutput = z.infer<typeof CreateIssueOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateIssueInput, CreateIssueOutput> = {
  action: 'CreateIssue',
  method: 'POST',
  inputSchema: CreateIssueInputSchema,
  outputSchema: CreateIssueOutputSchema,
};

// --------------- Action ---------------

/** 创建事项 */
export const CreateIssue = (
  client: CodingClient,
  params: CreateIssueInput,
): Promise<Either<SdkError, CreateIssueOutput>> => executeAction(client.config, spec, params);
