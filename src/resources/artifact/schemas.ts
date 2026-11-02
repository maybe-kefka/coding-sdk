import { z } from 'zod/v4';

// --------------- ArtifactChecksum ---------------

/** 制品文件Checksum信息实体 */
export const ArtifactChecksumSchema = z
  .object({
    /** 文件Md5 */
    Md5: z.string().nullable().describe('文件Md5'),
    /** 文件名称 */
    Name: z.string().nullable().describe('文件名称'),
    /** 文件Sha1 */
    Sha1: z.string().nullable().describe('文件Sha1'),
    /** 文件Sha256 */
    Sha256: z.string().nullable().describe('文件Sha256'),
  })
  .describe('制品文件Checksum信息实体');

export type ArtifactChecksum = z.infer<typeof ArtifactChecksumSchema>;

// --------------- ArtifactFilterRuleDetail ---------------

/** 制品筛选规则明细 */
export const ArtifactFilterRuleDetailSchema = z
  .object({
    /** 名称匹配规则（支持 “EQUAL” 和 “REGEX”） */
    Algorithm: z.string().describe('名称匹配规则（支持 “EQUAL” 和 “REGEX”）'),
    /** 名称匹配值 */
    Value: z.string().describe('名称匹配值'),
  })
  .describe('制品筛选规则明细');

export type ArtifactFilterRuleDetail = z.infer<typeof ArtifactFilterRuleDetailSchema>;

// --------------- ArtifactFilterRule ---------------

/** 制品筛选规则实体 */
export const ArtifactFilterRuleSchema = z
  .object({
    /** 制品类型筛选（1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm） */
    ArtifactType: z
      .array(z.number().int())
      .optional()
      .describe(
        '制品类型筛选（1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm）',
      ),
    /** 包筛选 */
    Package: z.array(ArtifactFilterRuleDetailSchema).optional().describe('包筛选'),
    /** 版本筛选 */
    PackageVersion: z.array(ArtifactFilterRuleDetailSchema).optional().describe('版本筛选'),
    /** 项目筛选 */
    ProjectName: z.array(z.string()).optional().describe('项目筛选'),
    /** 仓库筛选 */
    Repository: z.array(z.string()).optional().describe('仓库筛选'),
  })
  .describe('制品筛选规则实体');

export type ArtifactFilterRule = z.infer<typeof ArtifactFilterRuleSchema>;

// --------------- ArtifactPackageBean ---------------

/** 制品包（镜像） */
export const ArtifactPackageBeanSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 制品包描述 */
    Description: z.string().nullable().describe('制品包描述'),
    /** 制品包 ID */
    Id: z.number().int().describe('制品包 ID'),
    /** 最新推送版本的版本号 ID */
    LatestVersionId: z.number().int().describe('最新推送版本的版本号 ID'),
    /** 最新推送版本的版本号 */
    LatestVersionName: z.string().describe('最新推送版本的版本号'),
    /** 最新推送版本的版本发布状态：1-未发布;2-已发布 */
    LatestVersionReleaseStatus: z
      .number()
      .int()
      .describe('最新推送版本的版本发布状态：1-未发布;2-已发布'),
    /** 制品包名称 */
    Name: z.string().describe('制品包名称'),
    /** 版本发布策略：1-允许覆盖发布;2-不允许覆盖发布;3-快照策略;4-继承于仓库的策略 */
    ReleaseStrategy: z
      .number()
      .int()
      .describe('版本发布策略：1-允许覆盖发布;2-不允许覆盖发布;3-快照策略;4-继承于仓库的策略'),
    /** 制品仓库 ID */
    RepoId: z.number().int().describe('制品仓库 ID'),
    /** 包下的版本数量 */
    VersionCount: z.number().int().describe('包下的版本数量'),
  })
  .describe('制品包（镜像）');

export type ArtifactPackageBean = z.infer<typeof ArtifactPackageBeanSchema>;

// --------------- ArtifactPackagePageBean ---------------

/** 制品包列表分页返回体 */
export const ArtifactPackagePageBeanSchema = z
  .object({
    /** 分页数据列表 */
    InstanceSet: z.array(ArtifactPackageBeanSchema).describe('分页数据列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页展示数量 */
    PageSize: z.number().int().describe('每页展示数量'),
    /** 数据总数 */
    TotalCount: z.number().int().describe('数据总数'),
  })
  .describe('制品包列表分页返回体');

export type ArtifactPackagePageBean = z.infer<typeof ArtifactPackagePageBeanSchema>;

// --------------- ArtifactProperty ---------------

/** 制品属性实体，用于查询制品属性列表 */
export const ArtifactPropertySchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 属性 ID */
    Id: z.number().int().describe('属性 ID'),
    /** 是否不可变更 */
    Immutable: z.boolean().describe('是否不可变更'),
    /** 属性名称（以 ‘coding.’ 作为属性名称开头的属性，将不可变更及删除，即 Immutable = false） */
    Name: z
      .string()
      .describe(
        '属性名称（以 ‘coding.’ 作为属性名称开头的属性，将不可变更及删除，即 Immutable = false）',
      ),
    /** 属性值 */
    Value: z.string().describe('属性值'),
    /** 制品版本 */
    Version: z.string().describe('制品版本'),
  })
  .describe('制品属性实体，用于查询制品属性列表');

export type ArtifactProperty = z.infer<typeof ArtifactPropertySchema>;

// --------------- ArtifactPropertyBean ---------------

/** 简单制品属性实体，用于新增、修改制品属性 */
export const ArtifactPropertyBeanSchema = z
  .object({
    /** 属性名称（以 ‘coding.’ 作为属性名称开头的属性，将不可变更及删除，即 Immutable = false） */
    Name: z
      .string()
      .describe(
        '属性名称（以 ‘coding.’ 作为属性名称开头的属性，将不可变更及删除，即 Immutable = false）',
      ),
    /** 属性值 */
    Value: z.string().describe('属性值'),
  })
  .describe('简单制品属性实体，用于新增、修改制品属性');

export type ArtifactPropertyBean = z.infer<typeof ArtifactPropertyBeanSchema>;

// --------------- ArtifactRepositoryBean ---------------

/** 制品仓库实体 */
export const ArtifactRepositoryBeanSchema = z
  .object({
    /** 仓库访问权限：1-项目内;2-团队内;3-公开 */
    AccessLevel: z.number().int().describe('仓库访问权限：1-项目内;2-团队内;3-公开'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 仓库描述 */
    Description: z.string().nullable().describe('仓库描述'),
    /** 仓库 ID */
    Id: z.number().int().describe('仓库 ID'),
    /** 仓库名称 */
    Name: z.string().describe('仓库名称'),
    /** 项目 ID */
    ProjectId: z.number().int().describe('项目 ID'),
    /** 版本发布策略：1-允许覆盖发布;2-不允许覆盖发布;3-快照策略 */
    ReleaseStrategy: z
      .number()
      .int()
      .describe('版本发布策略：1-允许覆盖发布;2-不允许覆盖发布;3-快照策略'),
    /** 团队 ID */
    TeamId: z.number().int().describe('团队 ID'),
    /** 仓库类型：1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm */
    Type: z
      .number()
      .int()
      .describe(
        '仓库类型：1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm',
      ),
  })
  .describe('制品仓库实体');

export type ArtifactRepositoryBean = z.infer<typeof ArtifactRepositoryBeanSchema>;

// --------------- ArtifactRepositoryFile ---------------

/** 制品库文件列表 */
export const ArtifactRepositoryFileSchema = z
  .object({
    /** 制品类型 */
    ArtifactType: z.string().describe('制品类型'),
    /** 符合对应制品标准协议的下载链接（有效期：300 s） */
    DownloadUrl: z.string().describe('符合对应制品标准协议的下载链接（有效期：300 s）'),
    /** 制品版本 Hash */
    Hash: z.string().describe('制品版本 Hash'),
    /** 制品仓库 Host */
    Host: z.string().describe('制品仓库 Host'),
    /** 制品包名称 */
    PackageName: z.string().describe('制品包名称'),
    /** 相对于仓库级别的文件路径 */
    Path: z.string().describe('相对于仓库级别的文件路径'),
    /** 项目名称 */
    Project: z.string().describe('项目名称'),
    /** 制品仓库名称 */
    Repository: z.string().describe('制品仓库名称'),
    /** 制品版本 */
    VersionName: z.string().describe('制品版本'),
  })
  .describe('制品库文件列表');

export type ArtifactRepositoryFile = z.infer<typeof ArtifactRepositoryFileSchema>;

// --------------- ArtifactRepositoryFileListData ---------------

/** 制品仓库文件列表 */
export const ArtifactRepositoryFileListDataSchema = z
  .object({
    /** 翻页符，最后一页该字段为空 */
    ContinuationToken: z.string().describe('翻页符，最后一页该字段为空'),
    /** 文件列表 */
    InstanceSet: z.array(ArtifactRepositoryFileSchema).describe('文件列表'),
  })
  .describe('制品仓库文件列表');

export type ArtifactRepositoryFileListData = z.infer<typeof ArtifactRepositoryFileListDataSchema>;

// --------------- ArtifactRepositoryPageBean ---------------

/** 制品仓库列表分页返回体 */
export const ArtifactRepositoryPageBeanSchema = z
  .object({
    /** 分页数据列表 */
    InstanceSet: z.array(ArtifactRepositoryBeanSchema).describe('分页数据列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页展示数量 */
    PageSize: z.number().int().describe('每页展示数量'),
    /** 数据总数 */
    TotalCount: z.number().int().describe('数据总数'),
  })
  .describe('制品仓库列表分页返回体');

export type ArtifactRepositoryPageBean = z.infer<typeof ArtifactRepositoryPageBeanSchema>;

// --------------- ArtifactVersionBean ---------------

/** 制品版本实体 */
export const ArtifactVersionBeanSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 版本描述 */
    Description: z.string().describe('版本描述'),
    /** 下载量 */
    DownloadCount: z.number().int().describe('下载量'),
    /** 版本哈希 */
    Hash: z.string().describe('版本哈希'),
    /** 版本 ID */
    Id: z.number().int().describe('版本 ID'),
    /** 制品包 ID */
    PkgId: z.number().int().describe('制品包 ID'),
    /** 发布状态：1-未发布;2-已发布 */
    ReleaseStatus: z.number().int().describe('发布状态：1-未发布;2-已发布'),
    /** 版本大小（单位：MB） */
    Size: z.number().nullable().describe('版本大小（单位：MB）'),
    /** 版本号 */
    Version: z.string().describe('版本号'),
  })
  .describe('制品版本实体');

export type ArtifactVersionBean = z.infer<typeof ArtifactVersionBeanSchema>;

// --------------- ArtifactVersionFileBean ---------------

/** 制品文件实体 */
export const ArtifactVersionFileBeanSchema = z
  .object({
    /** 文件名称 */
    Name: z.string().describe('文件名称'),
    /** 文件大小，单位：MB */
    Size: z.number().describe('文件大小，单位：MB'),
  })
  .describe('制品文件实体');

export type ArtifactVersionFileBean = z.infer<typeof ArtifactVersionFileBeanSchema>;

// --------------- ArtifactVersionPageBean ---------------

/** 制品版本列表分页返回体 */
export const ArtifactVersionPageBeanSchema = z
  .object({
    /** 分页数据列表 */
    InstanceSet: z.array(ArtifactVersionBeanSchema).describe('分页数据列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页展示数量 */
    PageSize: z.number().int().describe('每页展示数量'),
    /** 数据总数 */
    TotalCount: z.number().int().describe('数据总数'),
  })
  .describe('制品版本列表分页返回体');

export type ArtifactVersionPageBean = z.infer<typeof ArtifactVersionPageBeanSchema>;

// --------------- ArtifactsOpenApiProjectData ---------------

export const ArtifactsOpenApiProjectDataSchema = z.object({
  /** 是否生效，0-否，1-是 */
  Status: z.number().int().describe('是否生效，0-否，1-是'),
  /** 项目URL */
  HtmlUrl: z.string().describe('项目URL'),
  /** 更新时间 */
  Updated_at: z.number().int().describe('更新时间'),
  /** 团队ID */
  TeamId: z.number().int().describe('团队ID'),
  /** 名称 */
  Name: z.string().describe('名称'),
  /** 项目类型 */
  Type: z.number().int().describe('项目类型'),
  /** 接口URL */
  ApiUrl: z.string().describe('接口URL'),
  /** 显示名称 */
  DisplayName: z.string().describe('显示名称'),
  /** 项目所属用户名 */
  OwnerUserName: z.string().describe('项目所属用户名'),
  /** ID */
  Id: z.number().int().describe('ID'),
  /** 图标 */
  Icon: z.string().describe('图标'),
  /** 团队所有者 ID */
  TeamOwnerId: z.number().int().describe('团队所有者 ID'),
  /** 项目位置 */
  ProjectPath: z.string().describe('项目位置'),
  /** 项目管理类型 */
  PmTypeName: z.string().describe('项目管理类型'),
  /** 创建时间 */
  Created_at: z.number().int().describe('创建时间'),
});

export type ArtifactsOpenApiProjectData = z.infer<typeof ArtifactsOpenApiProjectDataSchema>;

// --------------- ArtifactsOpenApiRemoteRepoData ---------------

export const ArtifactsOpenApiRemoteRepoDataSchema = z.object({
  /** 项目名 */
  Project: z.string().describe('项目名'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

export type ArtifactsOpenApiRemoteRepoData = z.infer<typeof ArtifactsOpenApiRemoteRepoDataSchema>;

// --------------- ArtifactsOpenApiRemoteTeamData ---------------

export const ArtifactsOpenApiRemoteTeamDataSchema = z.object({
  /** 下发信息 */
  SyncMessage: z.string().describe('下发信息'),
  /** 团队地址 */
  RemoteTeamUrl: z.string().describe('团队地址'),
  /** 用户名 */
  UserName: z.string().describe('用户名'),
  /** 下发状态 */
  SyncStatus: z.number().int().describe('下发状态'),
  /** ID */
  Id: z.number().int().describe('ID'),
  /** 远程仓库列表 */
  RemoteRepos: z.array(ArtifactsOpenApiRemoteRepoDataSchema).describe('远程仓库列表'),
  /** 远程团队名 */
  RemoteTeamName: z.string().describe('远程团队名'),
  /** 是否成功 */
  Successful: z.boolean().describe('是否成功'),
  /** 是否删除 */
  Deleting: z.boolean().describe('是否删除'),
});

export type ArtifactsOpenApiRemoteTeamData = z.infer<typeof ArtifactsOpenApiRemoteTeamDataSchema>;

// --------------- ArtifactsOpenApiRepositoryData ---------------

export const ArtifactsOpenApiRepositoryDataSchema = z.object({
  /** 制品类型(1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan,10-cocoapods,11-rpm,12-Go) */
  Type: z
    .number()
    .int()
    .describe(
      '制品类型(1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan,10-cocoapods,11-rpm,12-Go)',
    ),
  /** 存储规则 */
  StorageRule: z.number().int().describe('存储规则'),
  /** 项目描述 */
  Description: z.string().describe('项目描述'),
  /** 创建人ID */
  CreatorId: z.number().int().describe('创建人ID'),
  /** 项目ID */
  ProjectId: z.number().int().describe('项目ID'),
  /** 制品仓库ID */
  Id: z.number().int().describe('制品仓库ID'),
  /** 团队ID */
  TeamId: z.number().int().describe('团队ID'),
  /** 版本发布策略：1-允许覆盖发布;2-不允许覆盖发布;3-快照策略 */
  ReleaseStrategy: z
    .number()
    .int()
    .describe('版本发布策略：1-允许覆盖发布;2-不允许覆盖发布;3-快照策略'),
  /** 是否删除 */
  Deleting: z.boolean().describe('是否删除'),
  /** 制品库名称 */
  Name: z.string().describe('制品库名称'),
});

export type ArtifactsOpenApiRepositoryData = z.infer<typeof ArtifactsOpenApiRepositoryDataSchema>;

// --------------- ArtifactsOpenApiArtifactCreditsRangeData ---------------

export const ArtifactsOpenApiArtifactCreditsRangeDataSchema = z.object({
  /** 项目信息 */
  Project: ArtifactsOpenApiProjectDataSchema.describe('项目信息'),
  /** 远程团队信息 */
  RemoteTeam: ArtifactsOpenApiRemoteTeamDataSchema.describe('远程团队信息'),
  /** 生效范围（TEAM:团队；REMOTE-TEAM:远程团队；PROJECT:项目;REPO:仓库） */
  RangeType: z
    .string()
    .describe('生效范围（TEAM:团队；REMOTE-TEAM:远程团队；PROJECT:项目;REPO:仓库）'),
  /** 仓库信息 */
  Repository: ArtifactsOpenApiRepositoryDataSchema.describe('仓库信息'),
  /** 适用范围ID */
  RangeId: z.number().int().describe('适用范围ID'),
});

export type ArtifactsOpenApiArtifactCreditsRangeData = z.infer<
  typeof ArtifactsOpenApiArtifactCreditsRangeDataSchema
>;

// --------------- ArtifactsOpenApiArtifactCreditsRuleData ---------------

export const ArtifactsOpenApiArtifactCreditsRuleDataSchema = z.object({
  /** 制品版本 */
  Version: z.string().describe('制品版本'),
  /** 制品的类型(1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan,10-cocoapods,11-rpm,12-Go) */
  ArtifactType: z
    .number()
    .int()
    .describe(
      '制品的类型(1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan,10-cocoapods,11-rpm,12-Go)',
    ),
  /** 制品名称计算规则：1-EQUAL(等于)，2-REGEX(正则表达式) */
  PkgNameAlgorithm: z.string().describe('制品名称计算规则：1-EQUAL(等于)，2-REGEX(正则表达式)'),
  /** 制品名称 */
  PkgName: z.string().describe('制品名称'),
  /** 制品版本计算规则：1-EQUAL(等于)，2-REGEX(正则表达式) */
  VersionAlgorithm: z.string().describe('制品版本计算规则：1-EQUAL(等于)，2-REGEX(正则表达式)'),
});

export type ArtifactsOpenApiArtifactCreditsRuleData = z.infer<
  typeof ArtifactsOpenApiArtifactCreditsRuleDataSchema
>;

// --------------- ArtifactsOpenApiArtifactCreditsData ---------------

export const ArtifactsOpenApiArtifactCreditsDataSchema = z.object({
  /** 授信清单Key */
  CreditKey: z.string().describe('授信清单Key'),
  /** 授信清单适用范围列表 */
  Ranges: z.array(ArtifactsOpenApiArtifactCreditsRangeDataSchema).describe('授信清单适用范围列表'),
  /** 类型: NORMAL=普通类型，SYNC=来源其他系统同步 */
  Type: z.string().describe('类型: NORMAL=普通类型，SYNC=来源其他系统同步'),
  /** 是否启用 */
  Enabled: z.boolean().describe('是否启用'),
  /** 授信清单ID */
  Id: z.number().int().describe('授信清单ID'),
  /** 授信清单适用范围列表 */
  Rules: z.array(ArtifactsOpenApiArtifactCreditsRuleDataSchema).describe('授信清单适用范围列表'),
  /** 授信清单名称 */
  Name: z.string().describe('授信清单名称'),
});

export type ArtifactsOpenApiArtifactCreditsData = z.infer<
  typeof ArtifactsOpenApiArtifactCreditsDataSchema
>;

// --------------- ArtifactsOpenApiCreditRemoteTeam ---------------

export const ArtifactsOpenApiCreditRemoteTeamSchema = z.object({
  /** 远程团队地址 */
  RemoteTeamUrl: z.string().describe('远程团队地址'),
  /** 用户名 */
  UserName: z.string().describe('用户名'),
  /** 远程仓库列表 */
  RemoteRepos: z.array(ArtifactsOpenApiRemoteRepoDataSchema).describe('远程仓库列表'),
  /** 个人令牌base64编码 */
  Password: z.string().describe('个人令牌base64编码'),
});

export type ArtifactsOpenApiCreditRemoteTeam = z.infer<
  typeof ArtifactsOpenApiCreditRemoteTeamSchema
>;

// --------------- ArtifactsOpenApiCreateArtifactCreditsRangeData ---------------

export const ArtifactsOpenApiCreateArtifactCreditsRangeDataSchema = z.object({
  /** 远程团队信息 */
  RemoteTeam: ArtifactsOpenApiCreditRemoteTeamSchema.optional().describe('远程团队信息'),
  /** 生效范围（TEAM:团队；REMOTE_TEAM:远程团队；PROJECT:项目;REPO:仓库） */
  RangeType: z
    .string()
    .describe('生效范围（TEAM:团队；REMOTE_TEAM:远程团队；PROJECT:项目;REPO:仓库）'),
  /** 适用范围ID */
  RangeId: z.number().int().describe('适用范围ID'),
});

export type ArtifactsOpenApiCreateArtifactCreditsRangeData = z.infer<
  typeof ArtifactsOpenApiCreateArtifactCreditsRangeDataSchema
>;

// --------------- Maven ---------------

/** 查询制品版本可下载文件参数 */
export const MavenSchema = z
  .object({
    /** 附属构件 */
    Classifier: z.string().describe('附属构件'),
    /** 打包方式：pom;jar;war */
    Packaging: z.string().describe('打包方式：pom;jar;war'),
  })
  .describe('查询制品版本可下载文件参数');

export type Maven = z.infer<typeof MavenSchema>;

// --------------- SpecifiedArtifact ---------------

/** 指定的制品 */
export const SpecifiedArtifactSchema = z
  .object({
    /** 制品包名称（必须配合 VersionName 使用） */
    PackageName: z.string().optional().describe('制品包名称（必须配合 VersionName 使用）'),
    /** 制品版本（必须配合 PackageName 使用） */
    VersionName: z.string().optional().describe('制品版本（必须配合 PackageName 使用）'),
  })
  .describe('指定的制品');

export type SpecifiedArtifact = z.infer<typeof SpecifiedArtifactSchema>;

// --------------- TeamArtifact ---------------

/** 制品完整信息 */
export const TeamArtifactSchema = z
  .object({
    /** 制品类型（1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm） */
    ArtifactType: z
      .number()
      .int()
      .describe(
        '制品类型（1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm）',
      ),
    /** 推送时间 */
    CreatedAt: z.number().int().describe('推送时间'),
    /** 制品描述 */
    Description: z.string().describe('制品描述'),
    /** 下载次数 */
    DownloadCount: z.string().describe('下载次数'),
    /** 制品hash */
    Hash: z.string().describe('制品hash'),
    /** 制品名称 */
    Package: z.string().describe('制品名称'),
    /** 制品版本 */
    PackageVersion: z.string().describe('制品版本'),
    /** 制品包ID */
    PkgId: z.number().int().describe('制品包ID'),
    /** 项目ID */
    ProjectId: z.number().int().describe('项目ID'),
    /** 项目名称 */
    ProjectName: z.boolean().describe('项目名称'),
    /** 发布状态（1=未发布，2=已发布） */
    ReleaseStatus: z.number().int().describe('发布状态（1=未发布，2=已发布）'),
    /** 制品仓库ID */
    RepoId: z.number().int().describe('制品仓库ID'),
    /** 制品仓库名称 */
    Repository: z.string().describe('制品仓库名称'),
    /** 制品代销 */
    Size: z.number().describe('制品代销'),
    /** 制品版本ID */
    VersionId: z.number().int().describe('制品版本ID'),
  })
  .describe('制品完整信息');

export type TeamArtifact = z.infer<typeof TeamArtifactSchema>;

// --------------- TeamArtifactPage ---------------

/** 团队制品列表分页实体 */
export const TeamArtifactPageSchema = z
  .object({
    /** 当前页的版本列表 */
    InstanceSet: z.array(TeamArtifactSchema).describe('当前页的版本列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页展示数量 */
    PageSize: z.number().int().describe('每页展示数量'),
    /** 总数 */
    TotalCount: z.number().int().describe('总数'),
  })
  .describe('团队制品列表分页实体');

export type TeamArtifactPage = z.infer<typeof TeamArtifactPageSchema>;
