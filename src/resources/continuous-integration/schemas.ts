import { z } from 'zod/v4';

// --------------- BuildDescribeCodingCIBuildArtifactsResponseDataReports ---------------

export const BuildDescribeCodingCIBuildArtifactsResponseDataReportsSchema = z.object({
  /** 是否可下载 */
  Downloadable: z.boolean().describe('是否可下载'),
  /** 制品 ID */
  Id: z.string().describe('制品 ID'),
  /** 制品名 */
  Name: z.string().describe('制品名'),
  /** 制品 path */
  Path: z.string().describe('制品 path'),
  /** 制品大小 */
  Size: z.number().int().describe('制品大小'),
  /** 制品 URL */
  Url: z.string().describe('制品 URL'),
});

export type BuildDescribeCodingCIBuildArtifactsResponseDataReports = z.infer<
  typeof BuildDescribeCodingCIBuildArtifactsResponseDataReportsSchema
>;

// --------------- BuildDescribeCodingCIBuildArtifactsData ---------------

export const BuildDescribeCodingCIBuildArtifactsDataSchema = z.object({
  /** 构建报告 */
  Reports: z
    .array(BuildDescribeCodingCIBuildArtifactsResponseDataReportsSchema)
    .describe('构建报告'),
});

export type BuildDescribeCodingCIBuildArtifactsData = z.infer<
  typeof BuildDescribeCodingCIBuildArtifactsDataSchema
>;

// --------------- BuildDescribeCodingCIBuildHtmlReportsResponseDataReports ---------------

export const BuildDescribeCodingCIBuildHtmlReportsResponseDataReportsSchema = z.object({
  /** 创建时间 */
  CreatedAt: z.number().int().describe('创建时间'),
  /** 描述信息 */
  Des: z.string().describe('描述信息'),
  /** 报告 ID */
  Id: z.number().int().describe('报告 ID'),
  /** 报告名 */
  Name: z.string().describe('报告名'),
  /** 报告大小 */
  Size: z.number().int().describe('报告大小'),
  /** 标签 */
  Tag: z.string().describe('标签'),
  /** 报告URL */
  Url: z.string().describe('报告URL'),
});

export type BuildDescribeCodingCIBuildHtmlReportsResponseDataReports = z.infer<
  typeof BuildDescribeCodingCIBuildHtmlReportsResponseDataReportsSchema
>;

// --------------- BuildDescribeCodingCIBuildHtmlReportsData ---------------

export const BuildDescribeCodingCIBuildHtmlReportsDataSchema = z.object({
  /** 报告信息 */
  Reports: z
    .array(BuildDescribeCodingCIBuildHtmlReportsResponseDataReportsSchema)
    .describe('报告信息'),
});

export type BuildDescribeCodingCIBuildHtmlReportsData = z.infer<
  typeof BuildDescribeCodingCIBuildHtmlReportsDataSchema
>;

// --------------- CIBuildTestResult ---------------

/** 构建的测试结果 */
export const CIBuildTestResultSchema = z
  .object({
    /** 时长 */
    Duration: z.number().int().describe('时长'),
    /** 是否空 */
    Empty: z.boolean().describe('是否空'),
    /** 失败次数 */
    FailCount: z.number().int().describe('失败次数'),
    /** 通过次数 */
    PassCount: z.number().int().describe('通过次数'),
    /** 跳过次数 */
    SkipCount: z.number().int().describe('跳过次数'),
    /** 总次数 */
    TotalCount: z.number().int().describe('总次数'),
  })
  .describe('构建的测试结果');

export type CIBuildTestResult = z.infer<typeof CIBuildTestResultSchema>;

// --------------- CIJobCachePath ---------------

/** CI 任务缓存目录配置 */
export const CIJobCachePathSchema = z
  .object({
    /** 绝对路径 */
    AbsolutePath: z.string().describe('绝对路径'),
    /** 是否启用 */
    Enabled: z.boolean().describe('是否启用'),
  })
  .describe('CI 任务缓存目录配置');

export type CIJobCachePath = z.infer<typeof CIJobCachePathSchema>;

// --------------- CIJobEnv ---------------

/** 环境变量配置 */
export const CIJobEnvSchema = z
  .object({
    /** 环境变量名称 */
    Name: z.string().describe('环境变量名称'),
    /** 是否保密 */
    Sensitive: z.boolean().describe('是否保密'),
    /** 环境变量值 */
    Value: z.string().describe('环境变量值'),
  })
  .describe('环境变量配置');

export type CIJobEnv = z.infer<typeof CIJobEnvSchema>;

// --------------- CIJobSchedule ---------------

/** 针对 CRON TriggerMethod 的设置 */
export const CIJobScheduleSchema = z
  .object({
    /** 要触发的分支 */
    Branch: z.string().describe('要触发的分支'),
    /** 结束时间。如果是单次触发，结束时间为空 */
    EndTime: z.string().describe('结束时间。如果是单次触发，结束时间为空'),
    /** 间隔 */
    Interval: z.string().describe('间隔'),
    /** 代码无变化时是否触发 */
    RefChangeTrigger: z.boolean().describe('代码无变化时是否触发'),
    /** 是否周期触发（周期触发/单次触发） */
    Repeat: z.boolean().describe('是否周期触发（周期触发/单次触发）'),
    /** 开始时间。如果是周期触发，精确到小时（ 8 ）如果是单次触发，精确到分钟数（ 8:20 ） */
    StartTime: z
      .string()
      .describe(
        '开始时间。如果是周期触发，精确到小时（ 8 ）如果是单次触发，精确到分钟数（ 8:20 ）',
      ),
    /** 星期几 */
    Weekend: z.string().describe('星期几'),
  })
  .describe('针对 CRON TriggerMethod 的设置');

export type CIJobSchedule = z.infer<typeof CIJobScheduleSchema>;

// --------------- CodingCIBuild ---------------

/** CodingCiBuild 结构 */
export const CodingCIBuildSchema = z
  .object({
    /** 分支 */
    Branch: z.string().describe('分支'),
    /** 触发原因 */
    Cause: z.string().describe('触发原因'),
    /** 构建唯一标识 */
    CodingCIId: z.string().describe('构建唯一标识'),
    /** Git Commit ID */
    CommitId: z.string().describe('Git Commit ID'),
    /** 构建创建时间 */
    CreatedAt: z.number().int().describe('构建创建时间'),
    /** 构建执行时间 QUEUED  等待构建 INITIALIZING  初始化 NOT_BUILT  准备构建 RUNNING  运行中 SUCCEED  成功 FAILED  失败 ABORTED  被取消 TIMEOUT  超时 */
    Duration: z
      .number()
      .int()
      .describe(
        '构建执行时间 QUEUED  等待构建 INITIALIZING  初始化 NOT_BUILT  准备构建 RUNNING  运行中 SUCCEED  成功 FAILED  失败 ABORTED  被取消 TIMEOUT  超时',
      ),
    /** 构建使用的环境变量 */
    EnvList: z.array(CIJobEnvSchema).nullable().describe('构建使用的环境变量'),
    /** 失败原因 */
    FailedMessage: z.string().describe('失败原因'),
    /** 构建 ID */
    Id: z.number().int().describe('构建 ID'),
    /** 本次构建的 Jenkinsfile */
    JenkinsFileContent: z.string().describe('本次构建的 Jenkinsfile'),
    /** 构建计划 ID */
    JobId: z.number().int().describe('构建计划 ID'),
    /** 获取到执行机的时间，如果为负数表示还未获取到构建节点 */
    NodeObtainedAt: z
      .number()
      .int()
      .nullable()
      .describe('获取到执行机的时间，如果为负数表示还未获取到构建节点'),
    /** 构建序号 */
    Number: z.number().int().describe('构建序号'),
    /** 开始构建时间，如果为负数就是默认值表示还未开始 */
    StartedAt: z
      .number()
      .int()
      .nullable()
      .describe('开始构建时间，如果为负数就是默认值表示还未开始'),
    /** 构建当前状态 */
    Status: z.string().describe('构建当前状态'),
    /** 构建进行到了哪个 stage/node */
    StatusNode: z.string().describe('构建进行到了哪个 stage/node'),
    /** 测试结果 */
    TestResult: CIBuildTestResultSchema.describe('测试结果'),
  })
  .describe('CodingCiBuild 结构');

export type CodingCIBuild = z.infer<typeof CodingCIBuildSchema>;

// --------------- CodingCIBuildStageData ---------------

/** Stage 返回结构 */
export const CodingCIBuildStageDataSchema = z
  .object({
    /** Stage 返回字符串 */
    StageJsonString: z.string().describe('Stage 返回字符串'),
  })
  .describe('Stage 返回结构');

export type CodingCIBuildStageData = z.infer<typeof CodingCIBuildStageDataSchema>;

// --------------- CodingCIBuildStepData ---------------

/** 获取构建任务指定阶段的步骤 */
export const CodingCIBuildStepDataSchema = z
  .object({
    /** 步骤 */
    StepJsonString: z.string().describe('步骤'),
  })
  .describe('获取构建任务指定阶段的步骤');

export type CodingCIBuildStepData = z.infer<typeof CodingCIBuildStepDataSchema>;

// --------------- CodingCIJob ---------------

/** 构建计划信息 */
export const CodingCIJobSchema = z
  .object({
    /** 不管构建成功还是失败总是通知的用户 */
    AlwaysUserIdList: z.array(z.number().int()).describe('不管构建成功还是失败总是通知的用户'),
    /** 自动取消相同 MR */
    AutoCancelSameMergeRequest: z.boolean().describe('自动取消相同 MR'),
    /** 自动取消相同版本 */
    AutoCancelSameRevision: z.boolean().describe('自动取消相同版本'),
    /** 分支匹配正则 */
    BranchRegex: z.string().describe('分支匹配正则'),
    /** 触发构建的分支 */
    BranchSelector: z.string().describe('触发构建的分支'),
    /** 仅构建失败时要通知的用户 */
    BuildFailUserIdList: z.array(z.number().int()).describe('仅构建失败时要通知的用户'),
    /** 任务缓存目录配置 */
    CachePathList: z.array(CIJobCachePathSchema).describe('任务缓存目录配置'),
    /** 构建缓存大小 */
    CacheSize: z.number().int().describe('构建缓存大小'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 创建者 */
    CreatorId: z.number().int().describe('创建者'),
    /** 仓库库的 Https 地址 */
    DepotHttpsUrl: z.string().describe('仓库库的 Https 地址'),
    /** 仓库ID */
    DepotId: z.number().int().describe('仓库ID'),
    /** 仓库名称 */
    DepotName: z.string().describe('仓库名称'),
    /** 仓库库的 SSH 地址 */
    DepotSshUrl: z.string().describe('仓库库的 SSH 地址'),
    /** 仓库类型 */
    DepotType: z.string().describe('仓库类型'),
    /** 仓库库的 Web 页面 */
    DepotWebUrl: z.string().describe('仓库库的 Web 页面'),
    /** 环境变量配置 */
    EnvList: z.array(CIJobEnvSchema).describe('环境变量配置'),
    /** 执行方式 */
    ExecuteIn: z.string().describe('执行方式'),
    /** 自定义构建节点池 ID */
    ExecutedAgentPoolId: z.number().int().describe('自定义构建节点池 ID'),
    /** 代码更新触发匹配规则 */
    HookType: z.string().describe('代码更新触发匹配规则'),
    /** 构建计划ID */
    Id: z.number().int().describe('构建计划ID'),
    /** Jenkinsfile 来源 */
    JenkinsFileFromType: z.string().describe('Jenkinsfile 来源'),
    /** Jenkinsfile 在仓库中的文件路径 */
    JenkinsFilePath: z.string().describe('Jenkinsfile 在仓库中的文件路径'),
    /** Jenkinsfile 文件内容 */
    JenkinsFileStaticContent: z.string().describe('Jenkinsfile 文件内容'),
    /** 构建计划创建来源 */
    JobFromType: z.string().describe('构建计划创建来源'),
    /** 构建计划名称 */
    Name: z.string().describe('构建计划名称'),
    /** 项目ID */
    ProjectId: z.number().int().describe('项目ID'),
    /** 项目名称 */
    ProjectName: z.string().describe('项目名称'),
    /** 针对 CRON triggerMethod 的 schedule 规则配置 */
    ScheduleList: z
      .array(CIJobScheduleSchema)
      .describe('针对 CRON triggerMethod 的 schedule 规则配置'),
    /** 构建计划触发方式 */
    TriggerMethodList: z.array(z.string()).describe('构建计划触发方式'),
    /** 构建结果通知触发者机制 */
    TriggerRemind: z.string().describe('构建结果通知触发者机制'),
    /** 最后更新时间 */
    UpdatedAt: z.number().int().describe('最后更新时间'),
  })
  .describe('构建计划信息');

export type CodingCIJob = z.infer<typeof CodingCIJobSchema>;

// --------------- CodingCIJobCachePath ---------------

/** CI 任务缓存目录配置 */
export const CodingCIJobCachePathSchema = z
  .object({
    /** 绝对路径 */
    AbsolutePath: z.string().describe('绝对路径'),
    /** 是否启用 */
    Enabled: z.boolean().describe('是否启用'),
  })
  .describe('CI 任务缓存目录配置');

export type CodingCIJobCachePath = z.infer<typeof CodingCIJobCachePathSchema>;

// --------------- CodingCIJobEnv ---------------

/** 环境变量配置 */
export const CodingCIJobEnvSchema = z
  .object({
    /** 环境变量名称 */
    Name: z.string().describe('环境变量名称'),
    /** 是否保密 */
    Sensitive: z.boolean().describe('是否保密'),
    /** 环境变量值 */
    Value: z.string().describe('环境变量值'),
  })
  .describe('环境变量配置');

export type CodingCIJobEnv = z.infer<typeof CodingCIJobEnvSchema>;

// --------------- CodingCIJobSchedule ---------------

/** 针对 CRON TriggerMethod 的设置 */
export const CodingCIJobScheduleSchema = z
  .object({
    /** 目标触发的分支 */
    Branch: z.string().describe('目标触发的分支'),
    /** 结束时间。如果是单次触发，结束时间为空 */
    EndTime: z.string().describe('结束时间。如果是单次触发，结束时间为空'),
    /** 间隔 */
    Interval: z.string().describe('间隔'),
    /** 代码无变化时是否触发 */
    RefChangeTrigger: z.boolean().describe('代码无变化时是否触发'),
    /** 是否周期触发（周期触发/单次触发） */
    Repeat: z.boolean().describe('是否周期触发（周期触发/单次触发）'),
    /** 开始时间。如果是周期触发，精确到小时（ 8 ）如果是单次触发，精确到分钟数（ 8:20 ） */
    StartTime: z
      .string()
      .describe(
        '开始时间。如果是周期触发，精确到小时（ 8 ）如果是单次触发，精确到分钟数（ 8:20 ）',
      ),
    /** 星期几 */
    Weekend: z.string().describe('星期几'),
  })
  .describe('针对 CRON TriggerMethod 的设置');

export type CodingCIJobSchedule = z.infer<typeof CodingCIJobScheduleSchema>;

// --------------- CreateCodingCIJobData ---------------

/** 创建构建计划返回值 */
export const CreateCodingCIJobDataSchema = z
  .object({
    /** 构建计划 Id */
    Id: z.number().int().describe('构建计划 Id'),
  })
  .describe('创建构建计划返回值');

export type CreateCodingCIJobData = z.infer<typeof CreateCodingCIJobDataSchema>;

// --------------- DescribeCodingCIBuildLogData ---------------

/** DescribeCodingCIBuildLog 返回值 */
export const DescribeCodingCIBuildLogDataSchema = z
  .object({
    /** 日志 */
    Log: z.string().describe('日志'),
    /** 是否有更多的日志 */
    MoreData: z.boolean().describe('是否有更多的日志'),
    /** 当前展示日志长度 */
    TextDelivered: z.number().int().describe('当前展示日志长度'),
    /** 总日志长度 */
    TextSize: z.number().int().describe('总日志长度'),
  })
  .describe('DescribeCodingCIBuildLog 返回值');

export type DescribeCodingCIBuildLogData = z.infer<typeof DescribeCodingCIBuildLogDataSchema>;

// --------------- DescribeCodingCIBuildLogRawData ---------------

/** 构建完整的日志 */
export const DescribeCodingCIBuildLogRawDataSchema = z
  .object({
    /** 日志 */
    Raw: z.string().describe('日志'),
  })
  .describe('构建完整的日志');

export type DescribeCodingCIBuildLogRawData = z.infer<typeof DescribeCodingCIBuildLogRawDataSchema>;

// --------------- DescribeCodingCIBuildMetrics ---------------

/** DescribeCodingCIBuildMetrics 结构 */
export const DescribeCodingCIBuildMetricsSchema = z
  .object({
    /** 日期 */
    Date: z.string().nullable().describe('日期'),
    /** 构建成功总数 */
    SuccessBuildCount: z.number().int().describe('构建成功总数'),
    /** 构建总数 */
    TotalBuildCount: z.number().int().describe('构建总数'),
    /** 构建总耗时，单位毫秒 */
    TotalDuration: z.number().int().describe('构建总耗时，单位毫秒'),
  })
  .describe('DescribeCodingCIBuildMetrics 结构');

// --------------- DescribeCodingCIBuildStatisticsResponseData ---------------

/** 构建统计数据结构 */
export const DescribeCodingCIBuildStatisticsResponseDataSchema = z
  .object({
    /** 区间数据数组 */
    PointList: z.array(z.number().int()).describe('区间数据数组'),
  })
  .describe('构建统计数据结构');

export type DescribeCodingCIBuildStatisticsResponseData = z.infer<
  typeof DescribeCodingCIBuildStatisticsResponseDataSchema
>;

// --------------- DescribeCodingCIBuildStepLogData ---------------

/** 获取构建某个阶段的日志 */
export const DescribeCodingCIBuildStepLogDataSchema = z
  .object({
    /** 日志 */
    Log: z.string().describe('日志'),
    /** 是否有更多数据 */
    MoreData: z.boolean().describe('是否有更多数据'),
    /** 当前展示总长度 */
    TextDelivered: z.number().int().describe('当前展示总长度'),
    /** 总长度 */
    TextSize: z.number().int().describe('总长度'),
  })
  .describe('获取构建某个阶段的日志');

export type DescribeCodingCIBuildStepLogData = z.infer<
  typeof DescribeCodingCIBuildStepLogDataSchema
>;

// --------------- DescribeCodingCIBuildsData ---------------

/** 获取构建计划的构建列表 */
export const DescribeCodingCIBuildsDataSchema = z
  .object({
    /** 构建列表 */
    BuildList: z.array(CodingCIBuildSchema).describe('构建列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页多少条 */
    PageSize: z.number().int().describe('每页多少条'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('获取构建计划的构建列表');

export type DescribeCodingCIBuildsData = z.infer<typeof DescribeCodingCIBuildsDataSchema>;

// --------------- Filter ---------------

/** Filter 过滤参数 */
export const FilterSchema = z
  .object({
    /** 过滤字段名称 (只支持 Name ) */
    Name: z.string().describe('过滤字段名称 (只支持 Name )'),
    /** 过滤字段值 */
    Value: z.array(z.string()).describe('过滤字段值'),
  })
  .describe('Filter 过滤参数');

export type Filter = z.infer<typeof FilterSchema>;

// --------------- JobCreateJobData ---------------

export const JobCreateJobDataSchema = z.object({
  /** 构建计划 ID */
  Id: z.number().int().describe('构建计划 ID'),
});

export type JobCreateJobData = z.infer<typeof JobCreateJobDataSchema>;

// --------------- TriggerCodingCIBuildData ---------------

/** 触发构建返回数据 */
export const TriggerCodingCIBuildDataSchema = z
  .object({
    /** 构建信息 */
    Build: CodingCIBuildSchema.describe('构建信息'),
  })
  .describe('触发构建返回数据');

export type TriggerCodingCIBuildData = z.infer<typeof TriggerCodingCIBuildDataSchema>;
