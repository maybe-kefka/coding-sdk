import { z } from 'zod/v4';

// --------------- ApiIssueIssueAttachmentPreSign ---------------

export const ApiIssueIssueAttachmentPreSignSchema = z.object({
  /** 认证凭据 */
  AuthToken: z.string().describe('认证凭据'),
  /** cos的临时token */
  CosSecurityToken: z.string().describe('cos的临时token'),
  /** 文件名 */
  StorageKey: z.string().describe('文件名'),
  /** 时间 */
  Time: z.number().int().describe('时间'),
  /** 上传链接 */
  UploadLink: z.string().describe('上传链接'),
});

export type ApiIssueIssueAttachmentPreSign = z.infer<typeof ApiIssueIssueAttachmentPreSignSchema>;

// --------------- ApiIssueLogIssueLog ---------------

export const ApiIssueLogIssueLogSchema = z.object({
  /** 动作类型, 取值包括如下：ADD、CHANGE_PARENT、CREATE、DELETE、REMOVE、UPDATE */
  ActionType: z
    .string()
    .describe('动作类型, 取值包括如下：ADD、CHANGE_PARENT、CREATE、DELETE、REMOVE、UPDATE'),
  /** 内容，为转义后的JSON字符串 */
  Content: z.string().describe('内容，为转义后的JSON字符串'),
  /** 创建时间 */
  CreateAt: z.number().int().describe('创建时间'),
  /** 创建人 */
  Creator: z.number().int().describe('创建人'),
  /** 事项id */
  IssueId: z.number().int().describe('事项id'),
  /** 操作对象，取值如下 ASSIGNEE  处理人，ATTACHMENT 附件，CHILD_ISSUE  子事项，CUSTOM_FIELD  自定义属性，DEFECT_TYPE 缺陷类型，DESCRIPTION 描述，DUE_DATE 截止日期，EPIC_ISSUE 所属史诗，ISSUE_EPIC_CHANGED ，ISSUE_PROGRAM_RELATION，ISSUE_RELATION，ITERATION 迭代，LABEL 标签，MODULE 模块，NAME 名字，PARENT_ISSUE 父事项，PRIORITY 优先级，PROGRESS 进度，RELATE_DEFECT，RELATE_REQUIREMENT，REQUIREMENT_TYPE，RESOURCE，SELF，START_DATE，STATUS 状态，STORY_POINT 故事点，THIRD_LINK 第三方链接，WATCHER 关注人，WORKING_HOURS 工时 */
  Target: z
    .string()
    .describe(
      '操作对象，取值如下 ASSIGNEE  处理人，ATTACHMENT 附件，CHILD_ISSUE  子事项，CUSTOM_FIELD  自定义属性，DEFECT_TYPE 缺陷类型，DESCRIPTION 描述，DUE_DATE 截止日期，EPIC_ISSUE 所属史诗，ISSUE_EPIC_CHANGED ，ISSUE_PROGRAM_RELATION，ISSUE_RELATION，ITERATION 迭代，LABEL 标签，MODULE 模块，NAME 名字，PARENT_ISSUE 父事项，PRIORITY 优先级，PROGRESS 进度，RELATE_DEFECT，RELATE_REQUIREMENT，REQUIREMENT_TYPE，RESOURCE，SELF，START_DATE，STATUS 状态，STORY_POINT 故事点，THIRD_LINK 第三方链接，WATCHER 关注人，WORKING_HOURS 工时',
    ),
  /** 操作对象名 */
  TargetName: z.string().describe('操作对象名'),
  /** 更新时间 */
  UpdatedAt: z.number().int().describe('更新时间'),
});

export type ApiIssueLogIssueLog = z.infer<typeof ApiIssueLogIssueLogSchema>;

// --------------- ConfigTemplate ---------------

/** 模版 */
export const ConfigTemplateSchema = z
  .object({
    /** 配置方案Code  */
    Code: z.number().int().nullable().optional().describe('配置方案Code '),
    /** 配置方案协作类型，包括 SCRUM 和 CLASSIC  */
    CooperateMode: z
      .string()
      .nullable()
      .optional()
      .describe('配置方案协作类型，包括 SCRUM 和 CLASSIC '),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().optional().describe('创建时间'),
    /** 配置方案描述  */
    Description: z.string().nullable().optional().describe('配置方案描述 '),
    /** 配置方案ID */
    Id: z.number().int().nullable().optional().describe('配置方案ID'),
    /** 是否是草稿配置方案  */
    IsDraft: z.boolean().nullable().optional().describe('是否是草稿配置方案 '),
    /** 是否是系统配置方案  */
    IsSystem: z.boolean().nullable().optional().describe('是否是系统配置方案 '),
    /** 配置方案名字  */
    Name: z.string().nullable().optional().describe('配置方案名字 '),
    /** 配置方案名字，取值和CooperateMode字段一样  */
    NameType: z
      .string()
      .nullable()
      .optional()
      .describe('配置方案名字，取值和CooperateMode字段一样 '),
    /** 关联项目id  */
    RelatedProjects: z.number().int().nullable().optional().describe('关联项目id '),
    /** 配置方案类型，和入参的TemplateType取值一样  */
    Scope: z.string().nullable().optional().describe('配置方案类型，和入参的TemplateType取值一样 '),
    /** 团队ID */
    TeamId: z.number().int().nullable().optional().describe('团队ID'),
    /** 更新时间 */
    UpdatedAt: z.number().int().nullable().optional().describe('更新时间'),
  })
  .describe('模版');

export type ConfigTemplate = z.infer<typeof ConfigTemplateSchema>;

// --------------- CustomFieldChangeLog ---------------

/** 事项自定义属性变更日志 */
export const CustomFieldChangeLogSchema = z
  .object({
    /** 动作类型  */
    ActionType: z.string().nullable().optional().describe('动作类型 '),
    /** 创建人ID  */
    Creator: z.number().int().nullable().optional().describe('创建人ID '),
    /** 自定义属性ID  */
    FieldId: z.number().int().nullable().optional().describe('自定义属性ID '),
    /** 自定义属性名字  */
    FieldName: z.string().nullable().optional().describe('自定义属性名字 '),
    /** 自定义属性类型  */
    FieldType: z.string().nullable().optional().describe('自定义属性类型 '),
    /** 自定义属性的值  */
    FieldValue: z.string().nullable().optional().describe('自定义属性的值 '),
    /** 事项id（不是页面上的ID，是数据库中的唯一ID） */
    IssueId: z
      .number()
      .int()
      .nullable()
      .optional()
      .describe('事项id（不是页面上的ID，是数据库中的唯一ID）'),
    /** 更新时间戳  */
    UpdatedAt: z.number().int().nullable().optional().describe('更新时间戳 '),
  })
  .describe('事项自定义属性变更日志');

export type CustomFieldChangeLog = z.infer<typeof CustomFieldChangeLogSchema>;

// --------------- CustomFields ---------------

/** 自定义属性列表 */
export const CustomFieldsSchema = z
  .object({
    /** 自定义属性 Id */
    Id: z.number().int().describe('自定义属性 Id'),
    /** 自定义属性名称 */
    Name: z.string().describe('自定义属性名称'),
    /** 自定义属性值 */
    ValueString: z.string().describe('自定义属性值'),
  })
  .describe('自定义属性列表');

export type CustomFields = z.infer<typeof CustomFieldsSchema>;

// --------------- DefectType ---------------

/** 缺陷类型 */
export const DefectTypeSchema = z
  .object({
    /** 图标地址 */
    IconUrl: z.string().describe('图标地址'),
    /** 缺陷类型 Id */
    Id: z.number().int().describe('缺陷类型 Id'),
    /** 名称 */
    Name: z.string().describe('名称'),
  })
  .describe('缺陷类型');

export type DefectType = z.infer<typeof DefectTypeSchema>;

// --------------- Iteration ---------------

/** 迭代信息 */
export const IterationSchema = z
  .object({
    /** 处理人 ID ，为 0 代表没有设置 */
    Assignee: z.number().int().describe('处理人 ID ，为 0 代表没有设置'),
    /** 迭代编号，项目内唯一 */
    Code: z.number().int().describe('迭代编号，项目内唯一'),
    /** 迭代中完成事项总数 */
    CompletedCount: z.number().int().describe('迭代中完成事项总数'),
    /** 迭代中事项完成比率 */
    CompletedPercent: z.number().describe('迭代中事项完成比率'),
    /** 完成人 ID */
    Completer: z.number().int().describe('完成人 ID'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 创建人 ID */
    Creator: z.number().int().describe('创建人 ID'),
    /** 结束时间，时间戳，-28800000 代表没有设置 */
    EndAt: z.number().int().nullable().describe('结束时间，时间戳，-28800000 代表没有设置'),
    /** 迭代目标 */
    Goal: z.string().nullable().describe('迭代目标'),
    /** 标题 */
    Name: z.string().describe('标题'),
    /** 迭代中进行中事项总数 */
    ProcessingCount: z.number().int().describe('迭代中进行中事项总数'),
    /** 开始时间，时间戳，-28800000 代表没有设置 */
    StartAt: z.number().int().nullable().describe('开始时间，时间戳，-28800000 代表没有设置'),
    /** 开始人 ID */
    Starter: z.number().int().describe('开始人 ID'),
    /** 迭代状态：WAIT_PROCESS,PROCESSING,COMPLETED */
    Status: z.string().describe('迭代状态：WAIT_PROCESS,PROCESSING,COMPLETED'),
    /** 修改时间 */
    UpdatedAt: z.number().int().nullable().describe('修改时间'),
    /** 迭代中待处理事项总数 */
    WaitProcessCount: z.number().int().describe('迭代中待处理事项总数'),
  })
  .describe('迭代信息');

export type Iteration = z.infer<typeof IterationSchema>;

// --------------- DescribeIterationListData ---------------

/** 查询迭代列表数据结构 */
export const DescribeIterationListDataSchema = z
  .object({
    /** 迭代列表 */
    List: z.array(IterationSchema).describe('迭代列表'),
    /** 结果总条数 */
    TotalRow: z.number().int().describe('结果总条数'),
  })
  .describe('查询迭代列表数据结构');

export type DescribeIterationListData = z.infer<typeof DescribeIterationListDataSchema>;

// --------------- User ---------------

/** 用户信息 */
export const UserSchema = z
  .object({
    /** 头像地址 */
    Avatar: z.string().describe('头像地址'),
    /** 邮箱 */
    Email: z.string().describe('邮箱'),
    /** gk */
    GlobalKey: z.string().describe('gk'),
    /** userId */
    Id: z.number().int().describe('userId'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 电话 */
    Phone: z.string().describe('电话'),
    /** 状态 */
    Status: z.number().int().nullable().describe('状态'),
    /** 团队gk */
    TeamGlobalKey: z.string().describe('团队gk'),
    /** 团队Id */
    TeamId: z.number().int().describe('团队Id'),
  })
  .describe('用户信息');

export type User = z.infer<typeof UserSchema>;

// --------------- Epic ---------------

/** 史诗信息 */
export const EpicSchema = z
  .object({
    /** 处理人 */
    Assignee: UserSchema.nullable().describe('处理人'),
    /** 史诗 Code */
    Code: z.number().int().describe('史诗 Code'),
    /** 事项状态 Id */
    IssueStatusId: z.number().int().nullable().describe('事项状态 Id'),
    /** 事项状态名称 */
    IssueStatusName: z.string().nullable().describe('事项状态名称'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定 */
    Priority: z
      .string()
      .nullable()
      .describe('优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定'),
    /** 史诗 Type */
    Type: z.string().optional().describe('史诗 Type'),
  })
  .describe('史诗信息');

export type Epic = z.infer<typeof EpicSchema>;

// --------------- IssueComment ---------------

/** 事项评论 */
export const IssueCommentSchema = z
  .object({
    /** 评论 ID */
    CommentId: z.number().int().describe('评论 ID'),
    /** 解析后的内容 */
    Content: z.string().describe('解析后的内容'),
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 创建人 ID */
    CreatorId: z.number().int().describe('创建人 ID'),
    /** 父评论 ID */
    ParentId: z.number().int().describe('父评论 ID'),
    /** 内容 */
    RawContent: z.string().describe('内容'),
    /** 更新时间戳 */
    UpdatedAt: z.number().int().describe('更新时间戳'),
    /** 评论中图片的文件 Id 列表 */
    FileId: z.array(z.number().int()).optional().describe('评论中图片的文件 Id 列表'),
  })
  .describe('事项评论');

export type IssueComment = z.infer<typeof IssueCommentSchema>;

// --------------- IssueCondition ---------------

/** 事项筛选条件 */
export const IssueConditionSchema = z
  .object({
    /** 常量值 "UNSPECIFIC" 表示未指定，例如：处理人、需求类型、标签等字段，使用此值来筛选未指定处理人、需求类型或标签的事项。 */
    ConstValue: z
      .string()
      .optional()
      .describe(
        '常量值 "UNSPECIFIC" 表示未指定，例如：处理人、需求类型、标签等字段，使用此值来筛选未指定处理人、需求类型或标签的事项。',
      ),
    /** 自定义字段 Id，Key 为 "CUSTOM" 时需设置该值，常规字段无需设置。 */
    CustomFieldId: z
      .number()
      .int()
      .optional()
      .describe('自定义字段 Id，Key 为 "CUSTOM" 时需设置该值，常规字段无需设置。'),
    /** 自定义字段名称 */
    CustomFieldName: z.string().optional().describe('自定义字段名称'),
    /** 筛选字段 KEY，可选值如下。 DEFECT_TYPE：缺陷类型，多选 REQUIREMENT_TYPE：需求类型，多选 MISSION_TYPE：任务类型，多选 PRIORITY：优先级，多选 DUE_DATE：截止日期，日期范围 UPDATED_AT：更新时间，日期范围 CREATED_AT：创建时间，日期范围 START_DATE：开始日期，日期范围 ASSIGNEE：处理人ID，多选 CREATOR：创建者ID，多选 WATCHER：关注者ID，多选 MODULE：模块，多选 LABEL：标签，多选 STATUS：状态，多选 STATUS_TYPE：状态类型，多选 KEYWORD：事项名称、CODE 模糊搜索 ISSUE_TYPE：事项类型，多选 ISSUE_SUB_TYPE：事项的子项类型，多选 WORKING_HOURS：预估工时，数值范围 ITERATION：迭代，多选 PARENT：父需求，多选 CUSTOM：自定义字段，同时需指定 CustomFieldId */
    Key: z
      .string()
      .describe(
        '筛选字段 KEY，可选值如下。 DEFECT_TYPE：缺陷类型，多选 REQUIREMENT_TYPE：需求类型，多选 MISSION_TYPE：任务类型，多选 PRIORITY：优先级，多选 DUE_DATE：截止日期，日期范围 UPDATED_AT：更新时间，日期范围 CREATED_AT：创建时间，日期范围 START_DATE：开始日期，日期范围 ASSIGNEE：处理人ID，多选 CREATOR：创建者ID，多选 WATCHER：关注者ID，多选 MODULE：模块，多选 LABEL：标签，多选 STATUS：状态，多选 STATUS_TYPE：状态类型，多选 KEYWORD：事项名称、CODE 模糊搜索 ISSUE_TYPE：事项类型，多选 ISSUE_SUB_TYPE：事项的子项类型，多选 WORKING_HOURS：预估工时，数值范围 ITERATION：迭代，多选 PARENT：父需求，多选 CUSTOM：自定义字段，同时需指定 CustomFieldId',
      ),
    /** 筛选值，多选值用逗号隔开。 日期格式: 2020-08-01，日期时间格式: 2020-08-01 12:00:00 整数、小数、日期、日期时间类型的字段值应为一个范围，前后闭区间，范围开始值与结束值之间使用"_"连接，例如："0.1_5.0"、"2020-08-01_2020-08-31"。 */
    Value: z
      .string()
      .optional()
      .describe(
        '筛选值，多选值用逗号隔开。 日期格式: 2020-08-01，日期时间格式: 2020-08-01 12:00:00 整数、小数、日期、日期时间类型的字段值应为一个范围，前后闭区间，范围开始值与结束值之间使用"_"连接，例如："0.1_5.0"、"2020-08-01_2020-08-31"。',
      ),
  })
  .describe('事项筛选条件');

export type IssueCondition = z.infer<typeof IssueConditionSchema>;

// --------------- IssueCustomField ---------------

/** 事项自定义属性 */
export const IssueCustomFieldSchema = z
  .object({
    /** 自定义属性 Id */
    Id: z.number().int().describe('自定义属性 Id'),
    /** 自定义属性名称 */
    Name: z.string().describe('自定义属性名称'),
    /** 自定义属性值 根据自定义属性的 ComponentType，返回不同类型的值： 单个成员选择（SELECT_MEMBER_SINGLE）为 User 对象 JSON， 多个成员选择（SELECT_MEMBER_MULTI）为 User 数组 JSON， 多选菜单（SELECT_MULTI）为 String 数组 JSON， 其余类型为普通字符串 */
    ValueString: z
      .string()
      .describe(
        '自定义属性值 根据自定义属性的 ComponentType，返回不同类型的值： 单个成员选择（SELECT_MEMBER_SINGLE）为 User 对象 JSON， 多个成员选择（SELECT_MEMBER_MULTI）为 User 数组 JSON， 多选菜单（SELECT_MULTI）为 String 数组 JSON， 其余类型为普通字符串',
      ),
  })
  .describe('事项自定义属性');

export type IssueCustomField = z.infer<typeof IssueCustomFieldSchema>;

// --------------- IssueCustomFieldForm ---------------

/** 事项自定义属性表单 */
export const IssueCustomFieldFormSchema = z
  .object({
    /** 自定义属性值，多选值使用 "," 分隔 */
    Content: z.string().describe('自定义属性值，多选值使用 "," 分隔'),
    /** 事项自定义属性 Id */
    Id: z.number().int().describe('事项自定义属性 Id'),
  })
  .describe('事项自定义属性表单');

export type IssueCustomFieldForm = z.infer<typeof IssueCustomFieldFormSchema>;

// --------------- IssueFile ---------------

/** 事项附件 */
export const IssueFileSchema = z
  .object({
    /** 文件 Id */
    FileId: z.number().int().describe('文件 Id'),
    /** 文件名称 */
    Name: z.string().describe('文件名称'),
    /** 文件大小 */
    Size: z.number().int().describe('文件大小'),
    /** 类型： 1-文本， 2-图片， 3-二进制文件， 4-SVG */
    Type: z.number().int().describe('类型： 1-文本， 2-图片， 3-二进制文件， 4-SVG'),
    /** 临时下载地址 */
    Url: z.string().describe('临时下载地址'),
  })
  .describe('事项附件');

export type IssueFile = z.infer<typeof IssueFileSchema>;

// --------------- IssueTypeDetail ---------------

/** 事项类型详情 */
export const IssueTypeDetailSchema = z
  .object({
    /** 描述 */
    Description: z.string().describe('描述'),
    /** 事项类型 ID */
    Id: z.number().int().describe('事项类型 ID'),
    /** 是否是系统类型 */
    IsSystem: z.boolean().describe('是否是系统类型'),
    /** 事项类型大类 */
    IssueType: z.string().describe('事项类型大类'),
    /** 事项类型名称 */
    Name: z.string().describe('事项类型名称'),
  })
  .describe('事项类型详情');

export type IssueTypeDetail = z.infer<typeof IssueTypeDetailSchema>;

// --------------- IterationSimple ---------------

/** 迭代基础信息 */
export const IterationSimpleSchema = z
  .object({
    /** 迭代代码 */
    Code: z.number().int().describe('迭代代码'),
    /** 迭代Id */
    Id: z.number().int().describe('迭代Id'),
    /** 迭代名称 */
    Name: z.string().describe('迭代名称'),
    /** 迭代状态：WAIT_PROCESS,PROCESSING,COMPLETED */
    Status: z.string().describe('迭代状态：WAIT_PROCESS,PROCESSING,COMPLETED'),
  })
  .describe('迭代基础信息');

export type IterationSimple = z.infer<typeof IterationSimpleSchema>;

// --------------- IssueProjectLabel ---------------

/** 事项的项目标签 */
export const IssueProjectLabelSchema = z
  .object({
    /** 标签颜色，例如：#5A606B */
    Color: z.string().describe('标签颜色，例如：#5A606B'),
    /** 项目标签 Id */
    Id: z.number().int().describe('项目标签 Id'),
    /** 名称 */
    Name: z.string().describe('名称'),
  })
  .describe('事项的项目标签');

export type IssueProjectLabel = z.infer<typeof IssueProjectLabelSchema>;

// --------------- IssueSimpleData ---------------

/** 事项基础信息 */
export const IssueSimpleDataSchema = z
  .object({
    /** 处理人 */
    Assignee: UserSchema.describe('处理人'),
    /** 事项 Code */
    Code: z.number().int().describe('事项 Code'),
    /** 事项状态 Id */
    IssueStatusId: z.number().int().describe('事项状态 Id'),
    /** 事项状态名称 */
    IssueStatusName: z.string().describe('事项状态名称'),
    /** 事项状态类型： TODO｜PROCESSING｜ COMPLETED */
    IssueStatusType: z.string().describe('事项状态类型： TODO｜PROCESSING｜ COMPLETED'),
    /** 事项类型详情 */
    IssueTypeDetail: IssueTypeDetailSchema.describe('事项类型详情'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定 */
    Priority: z
      .string()
      .nullable()
      .describe('优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定'),
    /** 事项类型： DEFECT - 缺陷， REQUIREMENT - 需求， MISSION - 任务， EPIC - 史诗， SUB_TASK - 子工作项 */
    Type: z
      .string()
      .describe(
        '事项类型： DEFECT - 缺陷， REQUIREMENT - 需求， MISSION - 任务， EPIC - 史诗， SUB_TASK - 子工作项',
      ),
  })
  .describe('事项基础信息');

export type IssueSimpleData = z.infer<typeof IssueSimpleDataSchema>;

// --------------- Project ---------------

/** 项目信息 */
export const ProjectSchema = z
  .object({
    /** 是否压缩 */
    Archived: z.boolean().nullable().describe('是否压缩'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 显示名称 */
    DisplayName: z.string().nullable().describe('显示名称'),
    /** 项目结束时间 */
    EndDate: z.number().int().nullable().describe('项目结束时间'),
    /** 图标 */
    Icon: z.string().nullable().describe('图标'),
    /** 项目 ID */
    Id: z.number().int().describe('项目 ID'),
    /** 是否为模板项目 */
    IsDemo: z.boolean().nullable().describe('是否为模板项目'),
    /** 最大团员数 */
    MaxMember: z.number().int().nullable().describe('最大团员数'),
    /** 名称 */
    Name: z.string().nullable().describe('名称'),
    /** 项目开始时间 */
    StartDate: z.number().int().nullable().describe('项目开始时间'),
    /** 状态 默认都为1 */
    Status: z.number().int().nullable().describe('状态 默认都为1'),
    /** 团队 ID */
    TeamId: z.number().int().nullable().describe('团队 ID'),
    /** 团队所有者 ID */
    TeamOwnerId: z.number().int().nullable().describe('团队所有者 ID'),
    /** 项目类型, 项目集为0，公开项目为1，私密项目为2 */
    Type: z.number().int().nullable().describe('项目类型, 项目集为0，公开项目为1，私密项目为2'),
    /** 更新时间 */
    UpdatedAt: z.number().int().nullable().describe('更新时间'),
    /** 个人所有者 ID */
    UserOwnerId: z.number().int().nullable().describe('个人所有者 ID'),
    /** 项目集id */
    ProgramIds: z.array(z.number().int()).optional().describe('项目集id'),
  })
  .describe('项目信息');

export type Project = z.infer<typeof ProjectSchema>;

// --------------- IssueProjectModule ---------------

/** 事项模块 */
export const IssueProjectModuleSchema = z
  .object({
    /** 模块 Id */
    Id: z.number().int().describe('模块 Id'),
    /** 模块名称 */
    Name: z.string().describe('模块名称'),
  })
  .describe('事项模块');

export type IssueProjectModule = z.infer<typeof IssueProjectModuleSchema>;

// --------------- RequirementType ---------------

/** 需求类型 */
export const RequirementTypeSchema = z
  .object({
    /** 需求类型 Id */
    Id: z.number().int().describe('需求类型 Id'),
    /** 需求类型名称 */
    Name: z.string().describe('需求类型名称'),
  })
  .describe('需求类型');

export type RequirementType = z.infer<typeof RequirementTypeSchema>;

// --------------- SubTask ---------------

/** 子工作项信息 */
export const SubTaskSchema = z
  .object({
    /** 处理人 */
    Assignee: UserSchema.nullable().describe('处理人'),
    /** 子工作项 Code */
    Code: z.number().int().describe('子工作项 Code'),
    /** 事项状态 Id */
    IssueStatusId: z.number().int().nullable().describe('事项状态 Id'),
    /** 事项状态名称 */
    IssueStatusName: z.string().nullable().describe('事项状态名称'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定 */
    Priority: z
      .string()
      .nullable()
      .describe('优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定'),
    /** 事项类型名称 */
    Type: z.string().nullable().optional().describe('事项类型名称'),
  })
  .describe('子工作项信息');

export type SubTask = z.infer<typeof SubTaskSchema>;

// --------------- IssueThirdLink ---------------

/** 事项第三方链接 */
export const IssueThirdLinkSchema = z
  .object({
    /** 第三方链接 Id */
    Id: z.number().int().describe('第三方链接 Id'),
    /** 链接地址 */
    Link: z.string().describe('链接地址'),
    /** 第三方链接类型，MODAO - 墨刀 */
    ThirdType: z.string().describe('第三方链接类型，MODAO - 墨刀'),
    /** 名称 */
    Title: z.string().describe('名称'),
  })
  .describe('事项第三方链接');

export type IssueThirdLink = z.infer<typeof IssueThirdLinkSchema>;

// --------------- IssueDetail ---------------

/** 事项详情 */
export const IssueDetailSchema = z
  .object({
    /** 处理人，Assignee.Id 等于 0 时表示未指定 */
    Assignee: UserSchema.describe('处理人，Assignee.Id 等于 0 时表示未指定'),
    /** 事项 Code */
    Code: z.number().int().describe('事项 Code'),
    /** 完成时间戳 */
    CompletedAt: z.number().int().describe('完成时间戳'),
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 创建人 */
    Creator: UserSchema.describe('创建人'),
    /** 自定义属性列表 */
    CustomFields: z.array(CustomFieldsSchema).describe('自定义属性列表'),
    /** 缺陷类型 */
    DefectType: DefectTypeSchema.describe('缺陷类型'),
    /** 描述 */
    Description: z.string().describe('描述'),
    /** 截止日期时间戳 */
    DueDate: z.number().int().describe('截止日期时间戳'),
    /** 所属史诗 */
    Epic: EpicSchema.describe('所属史诗'),
    /** 附件列表 */
    Files: z.array(IssueFileSchema).describe('附件列表'),
    /** 事项状态 Id */
    IssueStatusId: z.number().int().describe('事项状态 Id'),
    /** 事项状态名称 */
    IssueStatusName: z.string().describe('事项状态名称'),
    /** 事项状态类型 */
    IssueStatusType: z.string().describe('事项状态类型'),
    /** 事项类型详情 */
    IssueTypeDetail: IssueTypeDetailSchema.describe('事项类型详情'),
    /** 事项类型 ID */
    IssueTypeId: z.number().int().describe('事项类型 ID'),
    /** 所属迭代 */
    Iteration: IterationSimpleSchema.describe('所属迭代'),
    /** 迭代 Id */
    IterationId: z.number().int().describe('迭代 Id'),
    /** 标签列表 */
    Labels: z.array(IssueProjectLabelSchema).describe('标签列表'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 父事项 */
    Parent: IssueSimpleDataSchema.describe('父事项'),
    /** 父事项类型 */
    ParentType: z.string().describe('父事项类型'),
    /** 优先级： 0 - 低， 1 - 中， 2 - 高， 3 - 紧急， "" - 未指定 */
    Priority: z.string().describe('优先级： 0 - 低， 1 - 中， 2 - 高， 3 - 紧急， "" - 未指定'),
    /** 项目信息 */
    Project: ProjectSchema.nullable().describe('项目信息'),
    /** 项目模块，ProjectModule.Id 等于 0 时表示未指定。 */
    ProjectModule: IssueProjectModuleSchema.describe(
      '项目模块，ProjectModule.Id 等于 0 时表示未指定。',
    ),
    /** 需求类型 */
    RequirementType: RequirementTypeSchema.describe('需求类型'),
    /** 开始日期时间戳 */
    StartDate: z.number().int().describe('开始日期时间戳'),
    /** 故事点，例如：0.5、0、1 空字符串 "" 表示未指定。 */
    StoryPoint: z.string().describe('故事点，例如：0.5、0、1 空字符串 "" 表示未指定。'),
    /** 子工作项列表 */
    SubTasks: z.array(SubTaskSchema).describe('子工作项列表'),
    /** 第三方链接列表 */
    ThirdLinks: z.array(IssueThirdLinkSchema).describe('第三方链接列表'),
    /** 事项类型：DEFECT - 缺陷，REQUIREMENT - 需求，MISSION - 任务，EPIC - 史诗，SUB_TASK - 子工作项, STORY - 用户故事 */
    Type: z
      .string()
      .describe(
        '事项类型：DEFECT - 缺陷，REQUIREMENT - 需求，MISSION - 任务，EPIC - 史诗，SUB_TASK - 子工作项, STORY - 用户故事',
      ),
    /** 修改时间戳 */
    UpdatedAt: z.number().int().describe('修改时间戳'),
    /** 关注人列表 */
    Watchers: z.array(UserSchema).describe('关注人列表'),
    /** 工时（小时数） */
    WorkingHours: z.number().describe('工时（小时数）'),
    /** 经办人列表 */
    Assignees: z.array(UserSchema).optional().describe('经办人列表'),
  })
  .describe('事项详情');

export type IssueDetail = z.infer<typeof IssueDetailSchema>;

// --------------- IssueDetailListDataWithPage ---------------

/** 分页查询版本发布范围 */
export const IssueDetailListDataWithPageSchema = z
  .object({
    /** 事项列表  */
    List: z.array(IssueDetailSchema).optional().describe('事项列表 '),
    /** 页码 */
    PageNumber: z.number().int().optional().describe('页码'),
    /** 页数 */
    PageSize: z.number().int().optional().describe('页数'),
    /** 总共几条事项  */
    TotalCount: z.number().int().optional().describe('总共几条事项 '),
    /** 总共几页  */
    TotalPage: z.number().int().optional().describe('总共几页 '),
  })
  .describe('分页查询版本发布范围');

export type IssueDetailListDataWithPage = z.infer<typeof IssueDetailListDataWithPageSchema>;

// --------------- IssueFieldOption ---------------

/** 事项属性选项 */
export const IssueFieldOptionSchema = z
  .object({
    /** 图标地址 */
    Icon: z.string().nullable().describe('图标地址'),
    /** 排序 */
    Sort: z.number().int().describe('排序'),
    /** 标题 */
    Title: z.string().describe('标题'),
    /** 选项值 */
    Value: z.string().describe('选项值'),
  })
  .describe('事项属性选项');

export type IssueFieldOption = z.infer<typeof IssueFieldOptionSchema>;

// --------------- IssueField ---------------

/** 事项属性 */
export const IssueFieldSchema = z
  .object({
    /** 字段空间类型 TEXT_SINGLE_LINE - 单行文本 TEXT_MULTI_LINE - 多行文本 SELECT_SINGLE - 单选列表 SELECT_MULTI - 多选列表 RADIO - 单选框 CHECKBOX - 多选框 SELECT_MEMBER_SINGLE - 用户单选列表 SELECT_MEMBER_MULTI - 用户多选列表 TEXT_DATETIME - 日期时间选择框 TEXT_DATE - 日期选择框 TEXT_INTEGER - 整数输入框 TEXT_DECIMAL - 小数输入框 */
    ComponentType: z
      .string()
      .describe(
        '字段空间类型 TEXT_SINGLE_LINE - 单行文本 TEXT_MULTI_LINE - 多行文本 SELECT_SINGLE - 单选列表 SELECT_MULTI - 多选列表 RADIO - 单选框 CHECKBOX - 多选框 SELECT_MEMBER_SINGLE - 用户单选列表 SELECT_MEMBER_MULTI - 用户多选列表 TEXT_DATETIME - 日期时间选择框 TEXT_DATE - 日期选择框 TEXT_INTEGER - 整数输入框 TEXT_DECIMAL - 小数输入框',
      ),
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 创建者 ID */
    CreatedBy: z.number().int().describe('创建者 ID'),
    /** 是否可删除 */
    Deletable: z.boolean().describe('是否可删除'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 是否可修改 */
    Editable: z.boolean().describe('是否可修改'),
    /** 图标地址 */
    IconUrl: z.string().nullable().describe('图标地址'),
    /** 属性 ID */
    Id: z.number().int().describe('属性 ID'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 选项列表 */
    Options: z.array(IssueFieldOptionSchema).nullable().describe('选项列表'),
    /** 是否必填 */
    Required: z.boolean().describe('是否必填'),
    /** 项目中属性可选 */
    Selectable: z.boolean().describe('项目中属性可选'),
    /** 是否可排序 */
    Sortable: z.boolean().describe('是否可排序'),
    /** 字段类型 */
    Type: z.string().describe('字段类型'),
    /** 单位 */
    Unit: z.string().nullable().describe('单位'),
    /** 修改时间戳 */
    UpdatedAt: z.number().int().describe('修改时间戳'),
  })
  .describe('事项属性');

export type IssueField = z.infer<typeof IssueFieldSchema>;

// --------------- IssueFilter ---------------

/** 事项过滤器 */
export const IssueFilterSchema = z
  .object({
    /** 筛选组合，JSON 字符串<br />例如：`{"filterIssueType":"ALL","sort":{"key":"PRIORITY","value":"DESC"},"conditions":[{"value":["TODO","PROCESSING"],"key":"STATUS_TYPE","fixed":true,"filterIssueType":"ALL","projectId":1},{"value":[],"key":"ASSIGNEE","fixed":true,"constValue":["UNSPECIFIC"],"filterIssueType":"ALL","projectId":1}]}` */
    ContentString: z
      .string()
      .describe(
        '筛选组合，JSON 字符串<br />例如：`{"filterIssueType":"ALL","sort":{"key":"PRIORITY","value":"DESC"},"conditions":[{"value":["TODO","PROCESSING"],"key":"STATUS_TYPE","fixed":true,"filterIssueType":"ALL","projectId":1},{"value":[],"key":"ASSIGNEE","fixed":true,"constValue":["UNSPECIFIC"],"filterIssueType":"ALL","projectId":1}]}`',
      ),
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 创建人 ID */
    CreatorId: z.number().int().describe('创建人 ID'),
    /** 过滤器 ID */
    Id: z.number().int().describe('过滤器 ID'),
    /** 默认筛选器 */
    IsDefault: z.boolean().describe('默认筛选器'),
    /** 是否是系统自带 */
    IsSystem: z.boolean().describe('是否是系统自带'),
    /** 事项类型 */
    IssueType: z.string().describe('事项类型'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 是否是团队筛选器 */
    SharedTeam: z.boolean().describe('是否是团队筛选器'),
    /** 修改时间戳 */
    UpdatedAt: z.number().int().describe('修改时间戳'),
  })
  .describe('事项过滤器');

export type IssueFilter = z.infer<typeof IssueFilterSchema>;

// --------------- IssueFilterListData ---------------

/** 事项过滤器列表数据结构 */
export const IssueFilterListDataSchema = z
  .object({
    /** 自定义过滤器列表 */
    CustomFilterList: z.array(IssueFilterSchema).describe('自定义过滤器列表'),
    /** 系统过滤器列表 */
    SystemFilterList: z.array(IssueFilterSchema).describe('系统过滤器列表'),
  })
  .describe('事项过滤器列表数据结构');

export type IssueFilterListData = z.infer<typeof IssueFilterListDataSchema>;

// --------------- IssueListData ---------------

/** 事项列表信息 */
export const IssueListDataSchema = z
  .object({
    /** 处理人 Id */
    AssigneeId: z.number().int().describe('处理人 Id'),
    /** 事项 Code */
    Code: z.number().int().describe('事项 Code'),
    /** 完成时间时间戳 */
    CompletedAt: z.number().int().nullable().describe('完成时间时间戳'),
    /** 创建时间时间戳 */
    CreatedAt: z.number().int().nullable().describe('创建时间时间戳'),
    /** 创建人 Id */
    CreatorId: z.number().int().describe('创建人 Id'),
    /** 自定义属性 */
    CustomFields: z.array(IssueCustomFieldSchema).nullable().optional().describe('自定义属性'),
    /** 描述 */
    Description: z.string().describe('描述'),
    /** 截止日期时间戳 */
    DueDate: z.number().int().nullable().describe('截止日期时间戳'),
    /** 状态 Id */
    IssueStatusId: z.number().int().describe('状态 Id'),
    /** 状态名称 */
    IssueStatusName: z.string().describe('状态名称'),
    /** 状态类型： TODO｜PROCESSING｜COMPLETED */
    IssueStatusType: z.string().describe('状态类型： TODO｜PROCESSING｜COMPLETED'),
    /** 事项类型详情 */
    IssueTypeDetail: IssueTypeDetailSchema.nullable().describe('事项类型详情'),
    /** 事项类型 ID */
    IssueTypeId: z.number().int().nullable().describe('事项类型 ID'),
    /** 迭代信息 */
    Iteration: IterationSimpleSchema.nullable().describe('迭代信息'),
    /** 迭代 Id */
    IterationId: z.number().int().describe('迭代 Id'),
    /** 事项标签 */
    Labels: z.array(IssueProjectLabelSchema).nullable().optional().describe('事项标签'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 父事项code */
    ParentCode: z.number().int().nullable().optional().describe('父事项code'),
    /** 父事项ID */
    ParentId: z.number().int().nullable().optional().describe('父事项ID'),
    /** 父事项类型： DEFECT - 缺陷， REQUIREMENT - 需求， MISSION - 任务， EPIC - 史诗 */
    ParentType: z
      .string()
      .describe('父事项类型： DEFECT - 缺陷， REQUIREMENT - 需求， MISSION - 任务， EPIC - 史诗'),
    /** 优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定 */
    Priority: z
      .string()
      .describe('优先级： "0" - 低， "1" - 中， "2" - 高， "3" - 紧急， "" - 未指定'),
    /** 开始日期时间戳 */
    StartDate: z.number().int().nullable().describe('开始日期时间戳'),
    /** 故事点，例如："0.5"、"0"， 空字符串 "" 表示未指定 */
    StoryPoint: z.string().nullable().describe('故事点，例如："0.5"、"0"， 空字符串 "" 表示未指定'),
    /** 事项类型： DEFECT - 缺陷， REQUIREMENT - 需求， MISSION - 任务， EPIC - 史诗， SUB_TASK - 子工作项 */
    Type: z
      .string()
      .describe(
        '事项类型： DEFECT - 缺陷， REQUIREMENT - 需求， MISSION - 任务， EPIC - 史诗， SUB_TASK - 子工作项',
      ),
    /** 修改时间时间戳 */
    UpdatedAt: z.number().int().nullable().describe('修改时间时间戳'),
    /** 工时（小时） */
    WorkingHours: z.number().describe('工时（小时）'),
    /** 经办人列表 */
    Assignees: z.array(UserSchema).optional().describe('经办人列表'),
  })
  .describe('事项列表信息');

export type IssueListData = z.infer<typeof IssueListDataSchema>;

// --------------- IssueModule ---------------

/** 事项模块 */
export const IssueModuleSchema = z
  .object({
    /** 模块ID */
    Id: z.number().int().optional().describe('模块ID'),
    /** 模块名称 */
    Name: z.string().optional().describe('模块名称'),
  })
  .describe('事项模块');

export type IssueModule = z.infer<typeof IssueModuleSchema>;

// --------------- IssueRecordHourForm ---------------

/** 事项登记工时表单 */
export const IssueRecordHourFormSchema = z
  .object({
    /** 剩余工时 */
    RemainingHour: z.number().describe('剩余工时'),
    /** 使用工时 */
    SpendHour: z.number().describe('使用工时'),
    /** 开始时间 */
    StartAt: z.number().int().describe('开始时间'),
    /** 工作描述 */
    WorkingDesc: z.string().describe('工作描述'),
  })
  .describe('事项登记工时表单');

export type IssueRecordHourForm = z.infer<typeof IssueRecordHourFormSchema>;

// --------------- IssueRelatedDepot ---------------

/** 事项关联的代码仓库信息 */
export const IssueRelatedDepotSchema = z
  .object({
    /** 仓库ID */
    DepotId: z.number().int().nullable().describe('仓库ID'),
    /** 仓库名称  */
    Name: z.string().nullable().describe('仓库名称 '),
    /** 项目ID */
    ProjectId: z.number().int().nullable().describe('项目ID'),
  })
  .describe('事项关联的代码仓库信息');

export type IssueRelatedDepot = z.infer<typeof IssueRelatedDepotSchema>;

// --------------- IssueStatus ---------------

/** 事项状态 */
export const IssueStatusSchema = z
  .object({
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 事项状态 ID */
    Id: z.number().int().describe('事项状态 ID'),
    /** 状态序号 */
    Index: z.number().int().describe('状态序号'),
    /** 是否是系统内置 */
    IsSystem: z.boolean().describe('是否是系统内置'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 类型：TODO、PROCESSING、COMPLETED */
    Type: z.string().describe('类型：TODO、PROCESSING、COMPLETED'),
    /** 修改时间戳 */
    UpdatedAt: z.number().int().describe('修改时间戳'),
  })
  .describe('事项状态');

export type IssueStatus = z.infer<typeof IssueStatusSchema>;

// --------------- IssueStatusChangeLog ---------------

/** 事项状态修改日志结构体 */
export const IssueStatusChangeLogSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().optional().describe('创建时间'),
    /** 事项code */
    IssueCode: z.number().int().nullable().optional().describe('事项code'),
    /** 事项状态 */
    IssueStatus: IssueStatusSchema.nullable().optional().describe('事项状态'),
    /** 状态ID */
    StatusId: z.number().int().nullable().optional().describe('状态ID'),
    /** 事项章台名称 */
    StatusName: z.string().nullable().optional().describe('事项章台名称'),
  })
  .describe('事项状态修改日志结构体');

export type IssueStatusChangeLog = z.infer<typeof IssueStatusChangeLogSchema>;

// --------------- IssueStatusChangeLogList ---------------

/** 事项状态修改日志list */
export const IssueStatusChangeLogListSchema = z
  .object({
    /** 事项状态修改日志list */
    List: z
      .array(IssueStatusChangeLogSchema)
      .nullable()
      .optional()
      .describe('事项状态修改日志list'),
  })
  .describe('事项状态修改日志list');

export type IssueStatusChangeLogList = z.infer<typeof IssueStatusChangeLogListSchema>;

// --------------- IssueThirdLinkForm ---------------

/** 事项第三方链接表单 */
export const IssueThirdLinkFormSchema = z
  .object({
    /** 链接创建时间 */
    CreatedAt: z.number().int().optional().describe('链接创建时间'),
    /** 链接地址 */
    Link: z.string().describe('链接地址'),
    /** 第三方链接类型 MODAO：墨刀 */
    ThirdType: z.string().describe('第三方链接类型 MODAO：墨刀'),
    /** 链接标题 */
    Title: z.string().describe('链接标题'),
  })
  .describe('事项第三方链接表单');

export type IssueThirdLinkForm = z.infer<typeof IssueThirdLinkFormSchema>;

// --------------- IssueTypeDetailWithSplit ---------------

/** 事项类型详情(带分解类型) */
export const IssueTypeDetailWithSplitSchema = z
  .object({
    /** 描述 */
    Description: z.string().describe('描述'),
    /** 事项类型 ID */
    Id: z.number().int().describe('事项类型 ID'),
    /** 是否是系统类型 */
    IsSystem: z.boolean().describe('是否是系统类型'),
    /** 事项类型大类 */
    IssueType: z.string().describe('事项类型大类'),
    /** 事项类型名称 */
    Name: z.string().describe('事项类型名称'),
    /** 可分解类型 ID，SplitType = SPECIFIC_TYPE 时需指定 */
    SplitTargetIssueTypeId: z
      .array(z.number().int())
      .describe('可分解类型 ID，SplitType = SPECIFIC_TYPE 时需指定'),
    /** 需求分解类型，SPECIFIC_TYPE - 可分解为制定需求类型，UNSPLITTABLE - 不可分解需求，ALL_REQUIREMENT - 可分解为全部需求类型 */
    SplitType: z
      .string()
      .describe(
        '需求分解类型，SPECIFIC_TYPE - 可分解为制定需求类型，UNSPLITTABLE - 不可分解需求，ALL_REQUIREMENT - 可分解为全部需求类型',
      ),
  })
  .describe('事项类型详情(带分解类型)');

export type IssueTypeDetailWithSplit = z.infer<typeof IssueTypeDetailWithSplitSchema>;

// --------------- IssueWorkLog ---------------

/** 事项工时日志信息 */
export const IssueWorkLogSchema = z
  .object({
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 工时日志 Id */
    Id: z.number().int().describe('工时日志 Id'),
    /** 事项编号 */
    IssueCode: z.number().int().describe('事项编号'),
    /** 事项 Id */
    IssueId: z.number().int().describe('事项 Id'),
    /** 项目名称 */
    ProjectName: z.string().describe('项目名称'),
    /** 使用工时 */
    RecordHours: z.number().describe('使用工时'),
    /** 剩余工时 */
    RemainingHours: z.number().describe('剩余工时'),
    /** 开始时间 */
    StartAt: z.number().int().optional().describe('开始时间'),
    /** 更新时间 */
    UpdatedAt: z.number().int().nullable().optional().describe('更新时间'),
    /** 用户 Id */
    UserId: z.number().int().describe('用户 Id'),
    /** 工作描述 */
    WorkingDesc: z.string().describe('工作描述'),
  })
  .describe('事项工时日志信息');

export type IssueWorkLog = z.infer<typeof IssueWorkLogSchema>;

// --------------- OpenApiIssueListDataWithPage ---------------

/** 分页查询事项 */
export const OpenApiIssueListDataWithPageSchema = z
  .object({
    /** 所有事项数据 */
    List: z.array(IssueListDataSchema).optional().describe('所有事项数据'),
    /** 页码 */
    PageNumber: z.number().int().optional().describe('页码'),
    /** 分页的大小 */
    PageSize: z.number().int().optional().describe('分页的大小'),
    /** 所有行数 */
    TotalCount: z.number().int().optional().describe('所有行数'),
    /** 全部页 */
    TotalPage: z.number().int().optional().describe('全部页'),
  })
  .describe('分页查询事项');

export type OpenApiIssueListDataWithPage = z.infer<typeof OpenApiIssueListDataWithPageSchema>;

// --------------- OpenApiIteration ---------------

/** 迭代信息 */
export const OpenApiIterationSchema = z
  .object({
    /** 全部故事点 */
    AllStoryPoint: z.number().nullable().optional().describe('全部故事点'),
    /** 处理人 */
    Assignee: z.number().int().nullable().describe('处理人'),
    /** 迭代编号 */
    Code: z.number().int().nullable().describe('迭代编号'),
    /** 迭代中完成事项总数 */
    CompletedCount: z.number().int().nullable().describe('迭代中完成事项总数'),
    /** 迭代中事项完成比率 */
    CompletedPercent: z.number().nullable().describe('迭代中事项完成比率'),
    /** 已完成故事点 */
    CompletedStoryPoint: z.number().nullable().optional().describe('已完成故事点'),
    /** 完成人 ID */
    Completer: z.number().int().nullable().describe('完成人 ID'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 创建人id */
    Creator: z.number().int().nullable().describe('创建人id'),
    /** 删除人id */
    Deleter: z.number().int().nullable().describe('删除人id'),
    /** 结束时间 */
    EndAt: z.number().int().nullable().describe('结束时间'),
    /** 迭代目标 */
    Goal: z.string().nullable().describe('迭代目标'),
    /** 迭代id */
    Id: z.number().int().nullable().describe('迭代id'),
    /** 迭代名称 */
    Name: z.string().nullable().describe('迭代名称'),
    /** 进行中的故事点 */
    ProcessStoryPoint: z.number().nullable().optional().describe('进行中的故事点'),
    /** 迭代中进行中事项总数 */
    ProcessingCount: z.number().int().nullable().describe('迭代中进行中事项总数'),
    /** 开始时间，时间戳，-28800000 代表没有设置 */
    StartAt: z.number().int().nullable().describe('开始时间，时间戳，-28800000 代表没有设置'),
    /** 开始人id */
    Starter: z.number().int().nullable().describe('开始人id'),
    /** 迭代状态：WAIT_PROCESS,PROCESSING,COMPLETED */
    Status: z.string().nullable().describe('迭代状态：WAIT_PROCESS,PROCESSING,COMPLETED'),
    /** 待处理故事点 */
    TodoStoryPoint: z.number().nullable().optional().describe('待处理故事点'),
    /** 更新时间 */
    UpdatedAt: z.number().int().nullable().describe('更新时间'),
    /** 迭代中待处理事项总数 */
    WaitProcessCount: z.number().int().nullable().describe('迭代中待处理事项总数'),
  })
  .describe('迭代信息');

export type OpenApiIteration = z.infer<typeof OpenApiIterationSchema>;

// --------------- OpenApiRelease ---------------

/** open-api 版本数据类型 */
export const OpenApiReleaseSchema = z
  .object({
    /** 处理人 */
    Assignee: z.number().int().optional().describe('处理人'),
    /** 版本code */
    Code: z.number().int().optional().describe('版本code'),
    /** 已完成事项数目  */
    CompletedCount: z.number().int().optional().describe('已完成事项数目 '),
    /** 事项完成率  */
    CompletedPercent: z.number().nullable().optional().describe('事项完成率 '),
    /** 创建时间 */
    CreatedAt: z.number().int().optional().describe('创建时间'),
    /** 创建人 */
    Creator: z.number().int().optional().describe('创建人'),
    /** 描述 */
    Description: z.string().nullable().optional().describe('描述'),
    /** 版本ID */
    Id: z.number().int().optional().describe('版本ID'),
    /** 版本关联迭代列表  */
    Iterations: z.array(IterationSimpleSchema).optional().describe('版本关联迭代列表 '),
    /** 版本名称 */
    Name: z.string().optional().describe('版本名称'),
    /** 处理中事项数目  */
    ProcessingCount: z.number().int().optional().describe('处理中事项数目 '),
    /** 项目ID */
    ProjectId: z.number().int().optional().describe('项目ID'),
    /** 发表日期 */
    ReleaseDate: z.number().int().optional().describe('发表日期'),
    /** 开始日期 */
    StartDate: z.number().int().optional().describe('开始日期'),
    /** 状态 */
    Status: z.string().optional().describe('状态'),
    /** 更新时间 */
    UpdatedAt: z.number().int().optional().describe('更新时间'),
    /** 待处理事项数目  */
    WaitProcessCount: z.number().int().optional().describe('待处理事项数目 '),
  })
  .describe('open-api 版本数据类型');

export type OpenApiRelease = z.infer<typeof OpenApiReleaseSchema>;

// --------------- OpenApiReleaseListDataWithPage ---------------

/** 版本列表 */
export const OpenApiReleaseListDataWithPageSchema = z
  .object({
    /** 版本信息列表 */
    List: z.array(OpenApiReleaseSchema).nullable().optional().describe('版本信息列表'),
    /** 页码 */
    PageNumber: z.number().int().nullable().optional().describe('页码'),
    /** 页数 */
    PageSize: z.number().int().nullable().optional().describe('页数'),
    /** 数据总条数 */
    TotalCount: z.number().int().nullable().optional().describe('数据总条数'),
    /** 总页数 */
    TotalPage: z.number().int().nullable().optional().describe('总页数'),
  })
  .describe('版本列表');

export type OpenApiReleaseListDataWithPage = z.infer<typeof OpenApiReleaseListDataWithPageSchema>;

// --------------- OpenApiWorkbenchIssue ---------------

/** 工作台事项数据 */
export const OpenApiWorkbenchIssueSchema = z
  .object({
    /** 处理人 */
    Assignee: UserSchema.nullable().optional().describe('处理人'),
    /** 子 */
    ChildCompletedCount: z.number().int().nullable().optional().describe('子'),
    /** 子 */
    ChildCount: z.number().int().nullable().optional().describe('子'),
    /** 事项code */
    Code: z.number().int().nullable().optional().describe('事项code'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().optional().describe('创建时间'),
    /** 创建人 */
    Creator: UserSchema.nullable().optional().describe('创建人'),
    /** 描述 */
    Description: z.boolean().nullable().optional().describe('描述'),
    /** 截止时间 */
    DueDate: z.number().int().nullable().optional().describe('截止时间'),
    /** 是想所在的史诗 */
    Epic: EpicSchema.nullable().optional().describe('是想所在的史诗'),
    /** 事项状态 */
    IssueStatus: IssueStatusSchema.nullable().optional().describe('事项状态'),
    /** 事项类型 */
    IssueType: IssueTypeDetailSchema.nullable().optional().describe('事项类型'),
    /** 迭代信息 */
    Iteration: IterationSimpleSchema.nullable().optional().describe('迭代信息'),
    /** 事项名称 */
    Name: z.string().nullable().optional().describe('事项名称'),
    /** 父事项code */
    ParentCode: z.number().int().nullable().optional().describe('父事项code'),
    /** 父事项 */
    ParentIssue: IssueSimpleDataSchema.nullable().optional().describe('父事项'),
    /** 优先级 */
    Priority: z.string().nullable().optional().describe('优先级'),
    /** 项目信息 */
    Project: ProjectSchema.nullable().optional().describe('项目信息'),
    /** 项目ID */
    ProjectId: z.number().int().nullable().optional().describe('项目ID'),
    /** 子工作项 */
    SubTasks: z.array(SubTaskSchema).nullable().optional().describe('子工作项'),
    /** 事项类型 */
    Type: z.string().nullable().optional().describe('事项类型'),
    /** 更新时间 */
    UpdatedAt: z.number().int().nullable().optional().describe('更新时间'),
  })
  .describe('工作台事项数据');

export type OpenApiWorkbenchIssue = z.infer<typeof OpenApiWorkbenchIssueSchema>;

// --------------- OpenApiTeamIssueData ---------------

/** 工作台个人事项 */
export const OpenApiTeamIssueDataSchema = z
  .object({
    /** 工作台事项 */
    IssueList: z.array(OpenApiWorkbenchIssueSchema).optional().describe('工作台事项'),
    /** 页码 */
    PageNumber: z.number().int().optional().describe('页码'),
    /** 分页大小 */
    PageSize: z.number().int().optional().describe('分页大小'),
    /** 所有数据条目 */
    TotalCount: z.number().int().optional().describe('所有数据条目'),
    /** 总页数 */
    TotalPage: z.number().int().optional().describe('总页数'),
  })
  .describe('工作台个人事项');

export type OpenApiTeamIssueData = z.infer<typeof OpenApiTeamIssueDataSchema>;

// --------------- ProjectIssueField ---------------

/** 项目的事项属性 */
export const ProjectIssueFieldSchema = z
  .object({
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 关联属性 */
    IssueField: IssueFieldSchema.describe('关联属性'),
    /** 关联属性 ID */
    IssueFieldId: z.number().int().describe('关联属性 ID'),
    /** 事项类型 */
    IssueType: z.string().describe('事项类型'),
    /** 是否有默认值 */
    NeedDefault: z.boolean().describe('是否有默认值'),
    /** 是否必填 */
    Required: z.boolean().describe('是否必填'),
    /** 修改时间戳 */
    UpdatedAt: z.number().int().describe('修改时间戳'),
    /** 默认值， JSON 字符串。例如：{"type":"VARIABLE","value":"CREATOR"} type：默认值类型，VARIABLE（变量）、CONSTANT（常量）； value：默认值，根据 IssueField.ComponentType，可能为不同类型的值（数值、字符串、数组）；常量值 CREATOR 表示创建者 */
    ValueString: z
      .string()
      .nullable()
      .describe(
        '默认值， JSON 字符串。例如：{"type":"VARIABLE","value":"CREATOR"} type：默认值类型，VARIABLE（变量）、CONSTANT（常量）； value：默认值，根据 IssueField.ComponentType，可能为不同类型的值（数值、字符串、数组）；常量值 CREATOR 表示创建者',
      ),
  })
  .describe('项目的事项属性');

export type ProjectIssueField = z.infer<typeof ProjectIssueFieldSchema>;

// --------------- ProjectIssueStatus ---------------

/** 项目的事项状态 */
export const ProjectIssueStatusSchema = z
  .object({
    /** 创建时间戳 */
    CreatedAt: z.number().int().describe('创建时间戳'),
    /** 是否是默认值 */
    IsDefault: z.boolean().describe('是否是默认值'),
    /** 事项状态 */
    IssueStatus: IssueStatusSchema.describe('事项状态'),
    /** 事项状态 ID */
    IssueStatusId: z.number().int().describe('事项状态 ID'),
    /** 事项类型 */
    IssueType: z.string().describe('事项类型'),
    /** 排序 */
    Sort: z.number().int().describe('排序'),
    /** 修改时间戳 */
    UpdatedAt: z.number().int().describe('修改时间戳'),
  })
  .describe('项目的事项状态');

export type ProjectIssueStatus = z.infer<typeof ProjectIssueStatusSchema>;

// --------------- RelatedCase ---------------

/** 测试用例 */
export const RelatedCaseSchema = z
  .object({
    /** 用例ID */
    Id: z.number().int().describe('用例ID'),
    /** 用例名称 */
    Name: z.string().describe('用例名称'),
    /** 优先级, 0 => \'紧急\', 1 => \'高\', 2 => \'中\', 3 => \'低 */
    Priority: z
      .number()
      .int()
      .optional()
      .describe("优先级, 0 => '紧急', 1 => '高', 2 => '中', 3 => '低"),
  })
  .describe('测试用例');

export type RelatedCase = z.infer<typeof RelatedCaseSchema>;

// --------------- ResourceReference ---------------

/** 协同事项引用资源 */
export const ResourceReferenceSchema = z
  .object({
    /** 项目ID */
    ProjectId: z.number().int().nullable().optional().describe('项目ID'),
    /** 项目名称 */
    ProjectName: z.string().nullable().optional().describe('项目名称'),
    /** 资源code */
    ResourceCode: z.number().int().nullable().optional().describe('资源code'),
    /** 资源ID */
    ResourceId: z.number().int().nullable().optional().describe('资源ID'),
    /** 资源名称 */
    ResourceName: z.string().nullable().optional().describe('资源名称'),
    /** 资源状态 */
    ResourceStatus: z.string().nullable().optional().describe('资源状态'),
    /** 资源类型 */
    ResourceType: z.string().nullable().optional().describe('资源类型'),
  })
  .describe('协同事项引用资源');

export type ResourceReference = z.infer<typeof ResourceReferenceSchema>;

// --------------- TeamIssueCondition ---------------

/** 事项筛选条件 */
export const TeamIssueConditionSchema = z
  .object({
    /** 常量值 "UNSPECIFIC" 表示未指定，例如：处理人、需求类型、标签等字段，使用此值来筛选未指定处理人、需求类型或标签的事项。 */
    ConstValue: z
      .string()
      .optional()
      .describe(
        '常量值 "UNSPECIFIC" 表示未指定，例如：处理人、需求类型、标签等字段，使用此值来筛选未指定处理人、需求类型或标签的事项。',
      ),
    /** 自定义字段 Id，Key 为 "CUSTOM" 时需设置该值，常规字段无需设置。 */
    CustomFieldId: z
      .number()
      .int()
      .optional()
      .describe('自定义字段 Id，Key 为 "CUSTOM" 时需设置该值，常规字段无需设置。'),
    /** 筛选字段 KEY，可选值如下。ISSUE_TYPE_ID: 具体的事项类型, 可以调用https://coding.net/help/openapi#/operations/DescribeTeamIssueTypeList获取, 多选; PROJECT: 项目/项目集 多选; DEFECT_TYPE：缺陷类型，多选; REQUIREMENT_TYPE：需求类型，多选; MISSION_TYPE：任务类型，多选; PRIORITY;  优先级，多选;DUE_DATE：截止日期，日期范围; UPDATED_AT：更新时间，日期范围; CREATED_AT：创建时间，日期范围; START_DATE：开始日期，日期范围; ASSIGNEE：处理人ID，多选; CREATOR：创建者ID，多选;WATCHER：关注者ID，多选;MODULE：模块，多选; LABEL：标签，多选;STATUS：状态，多选;STATUS_TYPE：状态类型，多选;KEYWORD：事项名称、CODE 模糊搜索;  ISSUE_SUB_TYPE：事项的子项类型，多选; WORKING_HOURS：预估工时，数值范围; ITERATION：迭代，多选; PARTICIPANT 经办人 多选; ASSOCIATE_PROGRAM 关联项目集 多选; ASSOCIATE_RELEASE 版本 多选; PROGRESS 进度 数字范围(例如: {start: "1", end: "19"}); PARENT：父需求，多选;CUSTOM：自定义字段，同时需指定 CustomFieldId */
    Key: z
      .string()
      .describe(
        '筛选字段 KEY，可选值如下。ISSUE_TYPE_ID: 具体的事项类型, 可以调用https://coding.net/help/openapi#/operations/DescribeTeamIssueTypeList获取, 多选; PROJECT: 项目/项目集 多选; DEFECT_TYPE：缺陷类型，多选; REQUIREMENT_TYPE：需求类型，多选; MISSION_TYPE：任务类型，多选; PRIORITY;  优先级，多选;DUE_DATE：截止日期，日期范围; UPDATED_AT：更新时间，日期范围; CREATED_AT：创建时间，日期范围; START_DATE：开始日期，日期范围; ASSIGNEE：处理人ID，多选; CREATOR：创建者ID，多选;WATCHER：关注者ID，多选;MODULE：模块，多选; LABEL：标签，多选;STATUS：状态，多选;STATUS_TYPE：状态类型，多选;KEYWORD：事项名称、CODE 模糊搜索;  ISSUE_SUB_TYPE：事项的子项类型，多选; WORKING_HOURS：预估工时，数值范围; ITERATION：迭代，多选; PARTICIPANT 经办人 多选; ASSOCIATE_PROGRAM 关联项目集 多选; ASSOCIATE_RELEASE 版本 多选; PROGRESS 进度 数字范围(例如: {start: "1", end: "19"}); PARENT：父需求，多选;CUSTOM：自定义字段，同时需指定 CustomFieldId',
      ),
    /** 筛选值，多选值用逗号隔开。日期格式: 2020-08-01，日期时间格式: 2020-08-01 12:00:00整数、小数、日期、日期时间类型的字段值应为一个范围，前后闭区间，范围开始值与结束值之间使用_连接，例如：0.1_5.0、2020-08-01_2020-08-31。Key为ITERATION时, Value为数据库ID */
    Value: z
      .string()
      .optional()
      .describe(
        '筛选值，多选值用逗号隔开。日期格式: 2020-08-01，日期时间格式: 2020-08-01 12:00:00整数、小数、日期、日期时间类型的字段值应为一个范围，前后闭区间，范围开始值与结束值之间使用_连接，例如：0.1_5.0、2020-08-01_2020-08-31。Key为ITERATION时, Value为数据库ID',
      ),
  })
  .describe('事项筛选条件');

export type TeamIssueCondition = z.infer<typeof TeamIssueConditionSchema>;

// --------------- TeamIssueSortCondition ---------------

/** 事项筛选条件 */
export const TeamIssueSortConditionSchema = z
  .object({
    /** 自定义字段 Id，Key 为 "CUSTOM" 时需设置该值，常规字段无需设置。 */
    CustomFieldId: z
      .number()
      .int()
      .optional()
      .describe('自定义字段 Id，Key 为 "CUSTOM" 时需设置该值，常规字段无需设置。'),
    /** 筛选字段 KEY，可选值如下。 DEFECT_TYPE：缺陷类型;  REQUIREMENT_TYPE：需求类型;  MISSION_TYPE：任务类型;  PRIORITY; 优先级;  DUE_DATE：截止日期;  UPDATED_AT：更新时间;  CREATED_AT：创建时间;  START_DATE：开始日期;  ASSIGNEE：处理人;  CREATOR：创建者; WATCHER：关注者; MODULE：模块 LABEL：标签; STATUS：状态; STATUS_TYPE：状态类型; KEYWORD：事项名称、CODE 模糊搜索 ISSUE_TYPE：事项类型; ISSUE_SUB_TYPE：事项的子项类型; WORKING_HOURS：预估工时 ITERATION：迭代; PARENT：父需求; CUSTOM：自定义字段，同时需指定 CustomFieldId */
    Key: z
      .string()
      .describe(
        '筛选字段 KEY，可选值如下。 DEFECT_TYPE：缺陷类型;  REQUIREMENT_TYPE：需求类型;  MISSION_TYPE：任务类型;  PRIORITY; 优先级;  DUE_DATE：截止日期;  UPDATED_AT：更新时间;  CREATED_AT：创建时间;  START_DATE：开始日期;  ASSIGNEE：处理人;  CREATOR：创建者; WATCHER：关注者; MODULE：模块 LABEL：标签; STATUS：状态; STATUS_TYPE：状态类型; KEYWORD：事项名称、CODE 模糊搜索 ISSUE_TYPE：事项类型; ISSUE_SUB_TYPE：事项的子项类型; WORKING_HOURS：预估工时 ITERATION：迭代; PARENT：父需求; CUSTOM：自定义字段，同时需指定 CustomFieldId',
      ),
    /** 排序值, DESC/ASC */
    Value: z.string().optional().describe('排序值, DESC/ASC'),
  })
  .describe('事项筛选条件');

export type TeamIssueSortCondition = z.infer<typeof TeamIssueSortConditionSchema>;
