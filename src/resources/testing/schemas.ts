import { z } from 'zod/v4';

// --------------- Attachment ---------------

/** 附件预上传信息 */
export const AttachmentSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** 附件 ID */
    Id: z.number().int().nullable().describe('附件 ID'),
    /** 附件文件名 */
    Name: z.string().nullable().describe('附件文件名'),
    /** 文件访问路径（有效期10分钟） */
    Url: z.string().nullable().describe('文件访问路径（有效期10分钟）'),
  })
  .describe('附件预上传信息');

export type Attachment = z.infer<typeof AttachmentSchema>;

// --------------- AttachmentPrepare ---------------

/** 附件预上传信息 */
export const AttachmentPrepareSchema = z
  .object({
    /** 附件 ID */
    AttachmentId: z.number().int().nullable().describe('附件 ID'),
    /** 附件上传地址 */
    PrepareSignUrl: z.string().nullable().describe('附件上传地址'),
  })
  .describe('附件预上传信息');

export type AttachmentPrepare = z.infer<typeof AttachmentPrepareSchema>;

// --------------- AttachmentPrepareData ---------------

/** 附件预上传信息 */
export const AttachmentPrepareDataSchema = z
  .object({
    /** 附件上传前置数据 */
    AttachmentPrepare: AttachmentPrepareSchema.nullable().describe('附件上传前置数据'),
  })
  .describe('附件预上传信息');

export type AttachmentPrepareData = z.infer<typeof AttachmentPrepareDataSchema>;

// --------------- CustomStep ---------------

/** 自定义步骤（步骤用例必填） */
export const CustomStepSchema = z
  .object({
    /** 步骤 */
    Content: z.string().describe('步骤'),
    /** 预期 */
    Expected: z.string().describe('预期'),
  })
  .describe('自定义步骤（步骤用例必填）');

export type CustomStep = z.infer<typeof CustomStepSchema>;

// --------------- Case ---------------

/** 测试用例 */
export const CaseSchema = z
  .object({
    /** 附件列表（非用例详情时本值为null） */
    Attachments: z
      .array(AttachmentSchema)
      .nullable()
      .describe('附件列表（非用例详情时本值为null）'),
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** 创建人ID */
    CreatedBy: z.number().int().nullable().describe('创建人ID'),
    /** 自定义步骤 */
    CustomSteps: z.array(CustomStepSchema).nullable().describe('自定义步骤'),
    /** 预期结果 （适用于文本用例） */
    Expected: z.string().nullable().describe('预期结果 （适用于文本用例）'),
    /** ID 主键 */
    Id: z.number().int().nullable().describe('ID 主键'),
    /** 前置步骤 */
    Preconds: z.string().nullable().describe('前置步骤'),
    /** 优先级 */
    Priority: z.number().int().nullable().describe('优先级'),
    /** 分组 ID */
    SectionId: z.number().int().nullable().describe('分组 ID'),
    /** 排序值 */
    Sort: z.number().int().nullable().describe('排序值'),
    /** 文本描述（适用于文本用例） */
    Steps: z.string().nullable().describe('文本描述（适用于文本用例）'),
    /** 用例类型，可选值：STEPS，TEXT */
    TemplateType: z.string().nullable().describe('用例类型，可选值：STEPS，TEXT'),
    /** 标题 */
    Title: z.string().nullable().describe('标题'),
    /** 更新时间 */
    UpdatedAt: z.string().nullable().describe('更新时间'),
  })
  .describe('测试用例');

export type Case = z.infer<typeof CaseSchema>;

// --------------- CaseData ---------------

/** 测试用例数据 */
export const CaseDataSchema = z
  .object({
    /** 用例信息 */
    Case: CaseSchema.nullable().describe('用例信息'),
  })
  .describe('测试用例数据');

export type CaseData = z.infer<typeof CaseDataSchema>;

// --------------- CaseSpecial ---------------

/** 测试用例 */
export const CaseSpecialSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** 创建人ID */
    CreatedBy: z.string().nullable().describe('创建人ID'),
    /** 自定义步骤 */
    CustomSteps: z.array(CustomStepSchema).nullable().describe('自定义步骤'),
    /** 预期结果 （适用于文本用例） */
    Expected: z.string().nullable().describe('预期结果 （适用于文本用例）'),
    /** ID 主键 */
    Id: z.number().int().nullable().describe('ID 主键'),
    /** 前置步骤 */
    Preconds: z.string().nullable().describe('前置步骤'),
    /** 优先级 */
    Priority: z.number().int().nullable().describe('优先级'),
    /** 分组 ID */
    SectionId: z.number().int().nullable().describe('分组 ID'),
    /** 排序值 */
    Sort: z.number().int().nullable().describe('排序值'),
    /** 文本描述（适用于文本用例） */
    Steps: z.string().nullable().describe('文本描述（适用于文本用例）'),
    /** 用例类型，可选值：STEPS，TEXT */
    TemplateType: z.string().nullable().describe('用例类型，可选值：STEPS，TEXT'),
    /** 标题 */
    Title: z.string().nullable().describe('标题'),
    /** 更新时间 */
    UpdatedAt: z.string().nullable().describe('更新时间'),
  })
  .describe('测试用例');

export type CaseSpecial = z.infer<typeof CaseSpecialSchema>;

// --------------- CaseDataSpecial ---------------

/** 测试用例数据 */
export const CaseDataSpecialSchema = z
  .object({
    /** 用例信息 */
    Case: CaseSpecialSchema.nullable().describe('用例信息'),
  })
  .describe('测试用例数据');

export type CaseDataSpecial = z.infer<typeof CaseDataSpecialSchema>;

// --------------- CasesData ---------------

/** 测试用例列表 */
export const CasesDataSchema = z
  .object({
    /** 用例列表 */
    Cases: z.array(CaseSchema).nullable().describe('用例列表'),
  })
  .describe('测试用例列表');

export type CasesData = z.infer<typeof CasesDataSchema>;

// --------------- CasesDataSchema ---------------

/** 测试用例列表 */
export const CasesDataSchemaSchema = z
  .object({
    /** 用例列表 */
    Cases: z.array(CaseSchema).nullable().describe('用例列表'),
    /** 页码 */
    Page: z.number().int().optional().describe('页码'),
    /** 分页的大小 */
    PageSize: z.number().int().optional().describe('分页的大小'),
    /** 所有行数 */
    Total: z.number().int().optional().describe('所有行数'),
    /** 全部页 */
    TotalPage: z.number().int().optional().describe('全部页'),
  })
  .describe('测试用例列表');

export type CasesDataSchema = z.infer<typeof CasesDataSchemaSchema>;

// --------------- ReportOverview ---------------

/** 测试报告概览 */
export const ReportOverviewSchema = z
  .object({
    /** 自动化覆盖率：百分比 */
    AutomationPercent: z.number().int().nullable().describe('自动化覆盖率：百分比'),
    /** 平均关闭时长 */
    AvgClosedSeconds: z.number().int().nullable().describe('平均关闭时长'),
    /** 用例总数 */
    CaseSum: z.number().int().nullable().describe('用例总数'),
    /** 已完成数量 */
    CompletedSum: z.number().int().nullable().describe('已完成数量'),
    /** 缺陷修复率：百分比 */
    DefectFixPercent: z.number().int().nullable().describe('缺陷修复率：百分比'),
    /** 重新激活率：百分比 */
    DefectReopenPercent: z.number().int().nullable().describe('重新激活率：百分比'),
    /** 缺陷总数 */
    DefectSum: z.number().int().nullable().describe('缺陷总数'),
    /** 85%解决时长 */
    DurationFixed: z.number().int().nullable().describe('85%解决时长'),
    /** 执行率：百分比 */
    ExecPercent: z.number().int().nullable().describe('执行率：百分比'),
    /** 需求总数 */
    IssuesSum: z.number().int().nullable().describe('需求总数'),
    /** 通过率：百分比 */
    PassPercent: z.number().int().nullable().describe('通过率：百分比'),
    /** 处理中数量 */
    ProcessingSum: z.number().int().nullable().describe('处理中数量'),
    /** 需求覆盖率：百分比 */
    RequirementCoverPercent: z.number().int().nullable().describe('需求覆盖率：百分比'),
    /** 未开始数量 */
    TodoSum: z.number().int().nullable().describe('未开始数量'),
  })
  .describe('测试报告概览');

export type ReportOverview = z.infer<typeof ReportOverviewSchema>;

// --------------- Report ---------------

/** 测试报告信息 */
export const ReportSchema = z
  .object({
    /** 附件列表 */
    Attachments: z.array(AttachmentSchema).nullable().describe('附件列表'),
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** 创建人 */
    CreatedBy: z.number().int().nullable().describe('创建人'),
    /** ID 主键 */
    Id: z.number().int().nullable().describe('ID 主键'),
    /** 迭代 ID */
    IterationId: z.string().nullable().describe('迭代 ID'),
    /** 迭代名称 */
    IterationName: z.string().nullable().describe('迭代名称'),
    /** 报告名称 */
    Name: z.string().nullable().describe('报告名称'),
    /** 项目名称 */
    ProjectName: z.string().nullable().describe('项目名称'),
    /** 报告概览 */
    ReportOverview: ReportOverviewSchema.nullable().describe('报告概览'),
    /** 测试计划 ID */
    RunIds: z.array(z.string()).nullable().describe('测试计划 ID'),
    /** 测试计划名称 */
    RunNames: z.array(z.string()).nullable().describe('测试计划名称'),
    /** 数据统计结束时间 */
    StatisticsEndTime: z.string().nullable().describe('数据统计结束时间'),
    /** 数据统计开始时间 */
    StatisticsStartTime: z.string().nullable().describe('数据统计开始时间'),
    /** 报告状态：CREATING 创建中，AVAILABLE 可用，UNAVAILABLE 不可用 */
    Status: z
      .string()
      .nullable()
      .describe('报告状态：CREATING 创建中，AVAILABLE 可用，UNAVAILABLE 不可用'),
    /** 报告总结 */
    Summary: z.string().nullable().describe('报告总结'),
    /** 模板 ID */
    TemplateId: z.number().int().nullable().describe('模板 ID'),
  })
  .describe('测试报告信息');

export type Report = z.infer<typeof ReportSchema>;

// --------------- ReportData ---------------

/** 测试报告详情 */
export const ReportDataSchema = z
  .object({
    /** 测试报告详情 */
    Report: ReportSchema.nullable().describe('测试报告详情'),
  })
  .describe('测试报告详情');

export type ReportData = z.infer<typeof ReportDataSchema>;

// --------------- ReportLittle ---------------

/** 测试报告信息-简单 */
export const ReportLittleSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** ID 主键 */
    Id: z.number().int().nullable().describe('ID 主键'),
    /** 报告名称 */
    Name: z.string().nullable().describe('报告名称'),
    /** 数据统计结束时间 */
    StatisticsEndTime: z.string().nullable().describe('数据统计结束时间'),
    /** 数据统计开始时间 */
    StatisticsStartTime: z.string().nullable().describe('数据统计开始时间'),
    /** 报告状态：CREATING 创建中，AVAILABLE 可用，UNAVAILABLE 不可用 */
    Status: z
      .string()
      .nullable()
      .describe('报告状态：CREATING 创建中，AVAILABLE 可用，UNAVAILABLE 不可用'),
    /** 报告总结 */
    Summary: z.string().nullable().describe('报告总结'),
  })
  .describe('测试报告信息-简单');

export type ReportLittle = z.infer<typeof ReportLittleSchema>;

// --------------- ReportLittleData ---------------

/** 测试报告详情 */
export const ReportLittleDataSchema = z
  .object({
    /** 测试报告详情 */
    Report: ReportLittleSchema.nullable().describe('测试报告详情'),
  })
  .describe('测试报告详情');

export type ReportLittleData = z.infer<typeof ReportLittleDataSchema>;

// --------------- ReportsLittleData ---------------

/** 测试报告详情 */
export const ReportsLittleDataSchema = z
  .object({
    /** 测试报告详情 */
    Reports: z.array(ReportLittleSchema).nullable().describe('测试报告详情'),
  })
  .describe('测试报告详情');

export type ReportsLittleData = z.infer<typeof ReportsLittleDataSchema>;

// --------------- Run ---------------

/** 测试计划详情 */
export const RunSchema = z
  .object({
    /** 处理人ID */
    AssignedToId: z.number().int().nullable().describe('处理人ID'),
    /** 计划内阻塞测试数量 */
    BlockedCount: z.number().int().nullable().describe('计划内阻塞测试数量'),
    /** 归档时间 */
    CompletedAt: z.string().nullable().describe('归档时间'),
    /** 环境标识 */
    ConfigEnvironmentId: z.number().int().nullable().describe('环境标识'),
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** 创建人ID */
    CreatedBy: z.number().int().nullable().describe('创建人ID'),
    /** 持续天数 */
    Days: z.number().int().nullable().describe('持续天数'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 执行方式: 1-手动执行 2-自动化流水线执行 */
    ExecuteType: z.number().int().nullable().describe('执行方式: 1-手动执行 2-自动化流水线执行'),
    /** 计划内失败测试数量 */
    FailedCount: z.number().int().nullable().describe('计划内失败测试数量'),
    /** 代码仓库 ID */
    GitDepotId: z.number().int().nullable().describe('代码仓库 ID'),
    /** 代码仓库名名称 */
    GitDepotName: z.string().nullable().describe('代码仓库名名称'),
    /** 发布版本 ID（资源 ID） */
    GitReleaseId: z.number().int().nullable().describe('发布版本 ID（资源 ID）'),
    /** 发布版本名称 */
    GitReleaseName: z.string().nullable().describe('发布版本名称'),
    /** 发布版本名称状态：0-未发布 1-已发布 */
    GitReleaseState: z.number().int().nullable().describe('发布版本名称状态：0-未发布 1-已发布'),
    /** ID 主键 */
    Id: z.number().int().nullable().describe('ID 主键'),
    /** 是否包含全部用例 */
    IncludeAll: z.boolean().nullable().describe('是否包含全部用例'),
    /** 是否归档 */
    IsCompleted: z.boolean().nullable().describe('是否归档'),
    /** 所属迭代 ID */
    IterationId: z.number().int().nullable().describe('所属迭代 ID'),
    /** 迭代名称 */
    IterationName: z.string().nullable().describe('迭代名称'),
    /** 名称 */
    Name: z.string().nullable().describe('名称'),
    /** 计划内通过测试数量 */
    PassedCount: z.number().int().nullable().describe('计划内通过测试数量'),
    /** 计划内重新测试数量 */
    RetestCount: z.number().int().nullable().describe('计划内重新测试数量'),
    /** 分组 ID */
    SectionId: z.number().int().nullable().describe('分组 ID'),
    /** 分组名 */
    SectionName: z.string().nullable().describe('分组名'),
    /** 状态: 0-未开始 1-进行中 2-已测完 */
    State: z.number().int().nullable().describe('状态: 0-未开始 1-进行中 2-已测完'),
    /** 计划内未测试数量 */
    UntestedCount: z.number().int().nullable().describe('计划内未测试数量'),
  })
  .describe('测试计划详情');

export type Run = z.infer<typeof RunSchema>;

// --------------- RunData ---------------

/** 测试计划数据 */
export const RunDataSchema = z
  .object({
    /** 测试计划信息 */
    Run: RunSchema.nullable().describe('测试计划信息'),
  })
  .describe('测试计划数据');

export type RunData = z.infer<typeof RunDataSchema>;

// --------------- RunsData ---------------

/** 测试计划列表 */
export const RunsDataSchema = z
  .object({
    /** 测试计划列表 */
    Runs: z.array(RunSchema).nullable().describe('测试计划列表'),
  })
  .describe('测试计划列表');

export type RunsData = z.infer<typeof RunsDataSchema>;

// --------------- Section ---------------

/** 分组信息 */
export const SectionSchema = z
  .object({
    /** 分组ID */
    Id: z.number().int().describe('分组ID'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 父级 ID */
    ParentId: z.number().int().describe('父级 ID'),
    /** 排序值 */
    Sort: z.number().int().describe('排序值'),
  })
  .describe('分组信息');

export type Section = z.infer<typeof SectionSchema>;

// --------------- SectionData ---------------

/** 分组信息 */
export const SectionDataSchema = z
  .object({
    /** 分组信息 */
    Section: SectionSchema.describe('分组信息'),
  })
  .describe('分组信息');

export type SectionData = z.infer<typeof SectionDataSchema>;

// --------------- SectionsData ---------------

/** 分组列表 */
export const SectionsDataSchema = z
  .object({
    /** 分组列表 */
    Sections: z.array(SectionSchema).nullable().describe('分组列表'),
  })
  .describe('分组列表');

export type SectionsData = z.infer<typeof SectionsDataSchema>;

// --------------- Test ---------------

/** 测试任务信息 */
export const TestSchema = z
  .object({
    /** 处理人 ID */
    AssignedToId: z.number().int().nullable().describe('处理人 ID'),
    /** 用例 ID */
    CaseId: z.number().int().nullable().describe('用例 ID'),
    /** 测试任务 ID */
    Id: z.number().int().nullable().describe('测试任务 ID'),
    /** 是否归档 */
    IsCompleted: z.boolean().nullable().describe('是否归档'),
    /** 优先级 */
    Priority: z.number().int().nullable().describe('优先级'),
    /** 分组 ID */
    SectionId: z.number().int().nullable().describe('分组 ID'),
    /** 排序 */
    Sort: z.number().int().nullable().describe('排序'),
    /** 状态 */
    Status: z.string().nullable().describe('状态'),
    /** 测试时间 */
    TestedAt: z.string().nullable().describe('测试时间'),
    /** 标题 */
    Title: z.string().nullable().describe('标题'),
  })
  .describe('测试任务信息');

export type Test = z.infer<typeof TestSchema>;

// --------------- TestFull ---------------

/** 测试任务详细信息 */
export const TestFullSchema = z
  .object({
    /** 处理人 ID */
    AssignedToId: z.number().int().nullable().describe('处理人 ID'),
    /** 用例详细信息 */
    Case: CaseSchema.nullable().describe('用例详细信息'),
    /** 用例 ID */
    CaseId: z.number().int().nullable().describe('用例 ID'),
    /** 测试任务 ID */
    Id: z.number().int().nullable().describe('测试任务 ID'),
    /** 是否归档 */
    IsCompleted: z.boolean().nullable().describe('是否归档'),
    /** 优先级 */
    Priority: z.number().int().nullable().describe('优先级'),
    /** 分组 ID */
    SectionId: z.number().int().nullable().describe('分组 ID'),
    /** 用例所属分组（按层级由上到下排序） */
    SectionPath: z.array(z.string()).nullable().describe('用例所属分组（按层级由上到下排序）'),
    /** 排序 */
    Sort: z.number().int().nullable().describe('排序'),
    /** 状态 */
    Status: z.string().nullable().describe('状态'),
    /** 测试时间 */
    TestedAt: z.string().nullable().describe('测试时间'),
    /** 测试人 ID */
    TestedBy: z.number().int().nullable().describe('测试人 ID'),
    /** 标题 */
    Title: z.string().nullable().describe('标题'),
  })
  .describe('测试任务详细信息');

export type TestFull = z.infer<typeof TestFullSchema>;

// --------------- TestData ---------------

/** 测试任务详情 */
export const TestDataSchema = z
  .object({
    /** 测试任务详细信息 */
    Test: TestFullSchema.nullable().describe('测试任务详细信息'),
  })
  .describe('测试任务详情');

export type TestData = z.infer<typeof TestDataSchema>;

// --------------- TestDefect ---------------

/** 测试任务的缺陷信息 */
export const TestDefectSchema = z
  .object({
    /** 处理人 */
    AssignedTo: z.string().nullable().describe('处理人'),
    /** 创建人 */
    Author: z.string().nullable().describe('创建人'),
    /** 创建时间 */
    CreatedAt: z.string().nullable().describe('创建时间'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 缺陷 ID */
    Id: z.number().int().nullable().describe('缺陷 ID'),
    /** 标题 */
    Name: z.string().nullable().describe('标题'),
    /** 状态 */
    Status: z.string().nullable().describe('状态'),
    /** 状态名称 */
    StatusName: z.string().nullable().describe('状态名称'),
  })
  .describe('测试任务的缺陷信息');

export type TestDefect = z.infer<typeof TestDefectSchema>;

// --------------- TestDefectsData ---------------

/** 测试任务缺陷数据 */
export const TestDefectsDataSchema = z
  .object({
    /** 测试任务的缺陷信息 */
    Defects: z.array(TestDefectSchema).describe('测试任务的缺陷信息'),
  })
  .describe('测试任务缺陷数据');

export type TestDefectsData = z.infer<typeof TestDefectsDataSchema>;

// --------------- TestsData ---------------

/** 测试任务列表 */
export const TestsDataSchema = z
  .object({
    /** 测试任务信息 */
    Tests: z.array(TestSchema).nullable().describe('测试任务信息'),
  })
  .describe('测试任务列表');

export type TestsData = z.infer<typeof TestsDataSchema>;
