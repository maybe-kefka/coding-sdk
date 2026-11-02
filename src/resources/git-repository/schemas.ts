import { z } from 'zod/v4';

// --------------- BlobDetail ---------------

/** git Blob 信息 */
export const BlobDetailSchema = z
  .object({
    /** blob 的 Sha 值 */
    BlobSha: z.string().nullable().describe('blob 的 Sha 值'),
    /** blob 内容使用 base64编码后的内容 */
    Content: z.string().nullable().describe('blob 内容使用 base64编码后的内容'),
    /** 编码方式(目前就base64一种) */
    Encoding: z.string().nullable().describe('编码方式(目前就base64一种)'),
    /** blob大小(byte) */
    Size: z.number().int().nullable().describe('blob大小(byte)'),
  })
  .describe('git Blob 信息');

export type BlobDetail = z.infer<typeof BlobDetailSchema>;

// --------------- BranchProtection ---------------

/** 保护分支规则详情信息 */
export const BranchProtectionSchema = z
  .object({
    /** 自动添加评审着 */
    AutoAddReviewer: z.boolean().describe('自动添加评审着'),
    /** 保护分支规则id */
    BranchProtectionId: z.number().int().describe('保护分支规则id'),
    /** 是否禁止强制推送 */
    DenyForcePush: z.boolean().describe('是否禁止强制推送'),
    /** 是否使用squash推送 */
    ForceSquash: z.boolean().describe('是否使用squash推送'),
    /** 匹配到的分支数量 */
    MatcherCount: z.number().int().describe('匹配到的分支数量'),
    /** 是否需要文件 owner 授权 */
    RequiredCodeOwnerGrant: z.boolean().describe('是否需要文件 owner 授权'),
    /** 已解决必需的讨论 */
    RequiredDiscussionResolved: z.boolean().describe('已解决必需的讨论'),
    /** 合并请求允许合并授权数量 */
    RequiredGrantCount: z.number().int().describe('合并请求允许合并授权数量'),
    /** 是否开启状态检查 */
    RequiredStatusCheck: z.boolean().describe('是否开启状态检查'),
    /** 保护分支规则 */
    Rule: z.string().describe('保护分支规则'),
    /** 源分支必须已经合并到的某个分支,默认位空串 */
    SrcMustMergedTo: z.string().describe('源分支必须已经合并到的某个分支,默认位空串'),
  })
  .describe('保护分支规则详情信息');

export type BranchProtection = z.infer<typeof BranchProtectionSchema>;

// --------------- BranchProtectionMember ---------------

/** 保护分支规则管理员信息 */
export const BranchProtectionMemberSchema = z
  .object({
    /** 是否允许直接推送 */
    AllowPush: z.boolean().describe('是否允许直接推送'),
    /** 用户globalkey */
    GlobalKey: z.string().describe('用户globalkey'),
    /** 名称 */
    Name: z.string().describe('名称'),
  })
  .describe('保护分支规则管理员信息');

export type BranchProtectionMember = z.infer<typeof BranchProtectionMemberSchema>;

// --------------- Change ---------------

/** 两次提交更改信息 */
export const ChangeSchema = z
  .object({
    /** 总删除行数 */
    Deletions: z.number().int().describe('总删除行数'),
    /** 总新增行数 */
    Insertions: z.number().int().describe('总新增行数'),
    /** 总文件修改数 */
    FilesChanged: z.number().int().describe('总文件修改数'),
  })
  .describe('两次提交更改信息');

export type Change = z.infer<typeof ChangeSchema>;

// --------------- CodingCIDepotDetail ---------------

/** 仓库提交信息 */
export const CodingCIDepotDetailSchema = z
  .object({
    /** Commit 内容 */
    Name: z.string().describe('Commit 内容'),
    /** CommitId */
    Sha: z.string().describe('CommitId'),
  })
  .describe('仓库提交信息');

export type CodingCIDepotDetail = z.infer<typeof CodingCIDepotDetailSchema>;

// --------------- CodingCIPersonalExternalDepot ---------------

/** 个人外部仓库返回结构 */
export const CodingCIPersonalExternalDepotSchema = z
  .object({
    /** 外部仓库是否被关联 */
    Authorized: z.boolean().nullable().describe('外部仓库是否被关联'),
    /** 仓库 Https 地址 */
    DepotHttpsUrl: z.string().nullable().describe('仓库 Https 地址'),
    /** 仓库 Ssh 地址 */
    DepotSshUrl: z.string().nullable().describe('仓库 Ssh 地址'),
    /** 仓库类型 */
    DepotType: z.string().describe('仓库类型'),
    /** 仓库 Id */
    Id: z.number().int().describe('仓库 Id'),
    /** 是否是默认显示第一位的仓库 */
    IsDefault: z.boolean().describe('是否是默认显示第一位的仓库'),
    /** 仓库名称 */
    Name: z.string().describe('仓库名称'),
    /** 请使用 Authorized 代替判断仓库是否关联，该仓库是否 CI 可用，如果可用返回值为 continue_integration，如果仓库类型是 CODING 那么这个值永远是continue_integration */
    OpenModule: z
      .string()
      .describe(
        '请使用 Authorized 代替判断仓库是否关联，该仓库是否 CI 可用，如果可用返回值为 continue_integration，如果仓库类型是 CODING 那么这个值永远是continue_integration',
      ),
    /** 所有者用户名 */
    OwnerName: z.string().nullable().describe('所有者用户名'),
    /** 源代码仓库 id （如果是 coding 跨项目代码仓库，此字段记录代码仓库的实际 id ） */
    SourceDepotId: z
      .number()
      .int()
      .describe('源代码仓库 id （如果是 coding 跨项目代码仓库，此字段记录代码仓库的实际 id ）'),
  })
  .describe('个人外部仓库返回结构');

export type CodingCIPersonalExternalDepot = z.infer<typeof CodingCIPersonalExternalDepotSchema>;

// --------------- CodingCIPersonalExternalDepotData ---------------

/** 获取个人仓库返回结构 */
export const CodingCIPersonalExternalDepotDataSchema = z
  .object({
    /** 仓库列表 */
    DepotList: z.array(CodingCIPersonalExternalDepotSchema).describe('仓库列表'),
    /** 仓库类型是否被授权，如 Github 是否被授权 */
    IsBound: z.boolean().describe('仓库类型是否被授权，如 Github 是否被授权'),
    /** 所有者用户名 */
    OwnerName: z.string().nullable().describe('所有者用户名'),
  })
  .describe('获取个人仓库返回结构');

export type CodingCIPersonalExternalDepotData = z.infer<
  typeof CodingCIPersonalExternalDepotDataSchema
>;

// --------------- CodingCIProjectDepot ---------------

/** Depot 数据结构 */
export const CodingCIProjectDepotSchema = z
  .object({
    /** 外部仓库是否被关联 */
    Authorized: z.boolean().nullable().describe('外部仓库是否被关联'),
    /** 仓库 Https 地址 */
    DepotHttpsUrl: z.string().nullable().describe('仓库 Https 地址'),
    /** 仓库 Ssh 地址 */
    DepotSshUrl: z.string().nullable().describe('仓库 Ssh 地址'),
    /** 仓库类型 */
    DepotType: z.string().describe('仓库类型'),
    /** 仓库 Id */
    Id: z.number().int().describe('仓库 Id'),
    /** 是否是默认显示第一位的仓库 */
    IsDefault: z.boolean().describe('是否是默认显示第一位的仓库'),
    /** 仓库名称 */
    Name: z.string().describe('仓库名称'),
    /** 无用字段 */
    OpenModule: z.string().describe('无用字段'),
  })
  .describe('Depot 数据结构');

export type CodingCIProjectDepot = z.infer<typeof CodingCIProjectDepotSchema>;

// --------------- CodingUser ---------------

/** 用户信息 */
export const CodingUserSchema = z
  .object({
    /** 用户头像地址 */
    Avatar: z.string().nullable().describe('用户头像地址'),
    /** 用户电子邮箱地址 */
    Email: z.string().describe('用户电子邮箱地址'),
    /** 用户全局Key */
    GlobalKey: z.string().nullable().describe('用户全局Key'),
    /** 用户 ID */
    Id: z.number().int().describe('用户 ID'),
    /** 用户名字 */
    Name: z.string().nullable().describe('用户名字'),
    /** 用户状态 */
    Status: z.string().nullable().describe('用户状态'),
    /** 团队 ID */
    TeamId: z.number().int().nullable().describe('团队 ID'),
  })
  .describe('用户信息');

export type CodingUser = z.infer<typeof CodingUserSchema>;

// --------------- Committer ---------------

/** 提交用户信息 */
export const CommitterSchema = z
  .object({
    /** 提交者的e-mail地址 */
    Email: z.string().describe('提交者的e-mail地址'),
    /** 提交者的姓名 */
    Name: z.string().describe('提交者的姓名'),
  })
  .describe('提交用户信息');

export type Committer = z.infer<typeof CommitterSchema>;

// --------------- Commit ---------------

/** 代码仓库的提交信息 */
export const CommitSchema = z
  .object({
    /** 作者信息 */
    Author: CommitterSchema.describe('作者信息'),
    /** 作者邮箱 */
    AuthorEmail: z.string().describe('作者邮箱'),
    /** 作者姓名 */
    AuthorName: z.string().describe('作者姓名'),
    /** 提交时间的时间戳 */
    CommitDate: z.number().int().describe('提交时间的时间戳'),
    /** 提交者信息 */
    Committer: CommitterSchema.describe('提交者信息'),
    /** 提交时间的时间戳 */
    CreatedAt: z.number().int().describe('提交时间的时间戳'),
    /** 提交附带的全部信息 */
    FullMessage: z.string().describe('提交附带的全部信息'),
    /** 父提交 */
    Parents: z.array(z.string()).nullable().describe('父提交'),
    /** 提交的sha值(commitId) */
    Sha: z.string().describe('提交的sha值(commitId)'),
    /** 提交附带的message */
    ShortMessage: z.string().describe('提交附带的message'),
  })
  .describe('代码仓库的提交信息');

export type Commit = z.infer<typeof CommitSchema>;

// --------------- CommitComment ---------------

/** 提交评论的信息 */
export const CommitCommentSchema = z
  .object({
    /** 评论人 */
    Author: CodingUserSchema.describe('评论人'),
    /** 提交 ID */
    CommitSha: z.string().describe('提交 ID'),
    /** 评论内容 */
    Content: z.string().describe('评论内容'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 仓库 ID */
    DepotId: z.number().int().describe('仓库 ID'),
    /** 提交评论 ID */
    Id: z.number().int().describe('提交评论 ID'),
    /** git diff 信息的第几行 */
    Index: z.number().int().describe('git diff 信息的第几行'),
    /** 评论的文件路径 */
    Path: z.string().describe('评论的文件路径'),
  })
  .describe('提交评论的信息');

export type CommitComment = z.infer<typeof CommitCommentSchema>;

// --------------- PageInfo ---------------

/** 页码信息 */
export const PageInfoSchema = z
  .object({
    /** 页码数量 */
    PageNumber: z.number().int().nullable().describe('页码数量'),
    /** 每页大小 */
    PageSize: z.number().int().nullable().describe('每页大小'),
    /** 页码总数量 */
    TotalPage: z.number().int().nullable().describe('页码总数量'),
    /** 数据总行数 */
    TotalRow: z.number().int().nullable().describe('数据总行数'),
  })
  .describe('页码信息');

export type PageInfo = z.infer<typeof PageInfoSchema>;

// --------------- CommitData ---------------

/** 代码仓库的提交信息 */
export const CommitDataSchema = z
  .object({
    /** 提交信息 */
    Commits: z.array(CommitSchema).nullable().describe('提交信息'),
    /** 分页信息 */
    Page: PageInfoSchema.nullable().describe('分页信息'),
  })
  .describe('代码仓库的提交信息');

export type CommitData = z.infer<typeof CommitDataSchema>;

// --------------- CommitFile ---------------

/** git 提交 文件信息 */
export const CommitFileSchema = z
  .object({
    /** 文件内容 */
    Content: z.string().optional().describe('文件内容'),
    /** ENCODING_RAW：不对文件编码；ENCODING_BASE64：传入的文件内容使用 base64 编码 */
    ContentEncoding: z
      .string()
      .describe('ENCODING_RAW：不对文件编码；ENCODING_BASE64：传入的文件内容使用 base64 编码'),
    /** 新建文件、重命名的文件路径(仓库中没有的文件路径名称)，可以用于创建一个新路径新文件(传入NewPath)，或者给一个文件路径修改名称(需要传入Path、NewPath，WantRename传true) */
    NewPath: z
      .string()
      .optional()
      .describe(
        '新建文件、重命名的文件路径(仓库中没有的文件路径名称)，可以用于创建一个新路径新文件(传入NewPath)，或者给一个文件路径修改名称(需要传入Path、NewPath，WantRename传true)',
      ),
    /** 文件路径(仓库中存在的路径名称)，对该路径下的文件内容进行修改(传入Path) */
    Path: z
      .string()
      .describe('文件路径(仓库中存在的路径名称)，对该路径下的文件内容进行修改(传入Path)'),
    /** 是否删除 */
    WantDelete: z.boolean().describe('是否删除'),
    /** 是否重命名 */
    WantRename: z.boolean().describe('是否重命名'),
  })
  .describe('git 提交 文件信息');

export type CommitFile = z.infer<typeof CommitFileSchema>;

// --------------- CommitInfo ---------------

/** 仓库文件每一行提交详细信息 */
export const CommitInfoSchema = z
  .object({
    /** 提交日期 */
    CommitDate: z.number().int().nullable().describe('提交日期'),
    /** 提交信息 */
    CommitSha: z.string().nullable().describe('提交信息'),
    /** 提交人信息 */
    Committer: CodingUserSchema.nullable().describe('提交人信息'),
    /** 行数 */
    LineNumber: z.number().int().nullable().describe('行数'),
  })
  .describe('仓库文件每一行提交详细信息');

export type CommitInfo = z.infer<typeof CommitInfoSchema>;

// --------------- CommitNote ---------------

/** 用于描述请求的Note值 */
export const CommitNoteSchema = z
  .object({
    /** 请求的sha值 */
    CommitSha: z.string().describe('请求的sha值'),
    /** note的具体值 */
    NoteContent: z.string().describe('note的具体值'),
  })
  .describe('用于描述请求的Note值');

export type CommitNote = z.infer<typeof CommitNoteSchema>;

// --------------- CommitRef ---------------

/** 提交ref信息 */
export const CommitRefSchema = z
  .object({
    /** 分支明称/标签名称 */
    Name: z.string().describe('分支明称/标签名称'),
    /** 分支/标签 */
    Type: z.string().describe('分支/标签'),
  })
  .describe('提交ref信息');

export type CommitRef = z.infer<typeof CommitRefSchema>;

// --------------- Contributor ---------------

/** git 贡献者详情 */
export const ContributorSchema = z
  .object({
    /** 提交次数 */
    Commits: z.number().int().nullable().describe('提交次数'),
    /** 邮箱 */
    Email: z.string().nullable().describe('邮箱'),
    /** 名字 */
    Name: z.string().nullable().describe('名字'),
  })
  .describe('git 贡献者详情');

export type Contributor = z.infer<typeof ContributorSchema>;

// --------------- DeployKeyInfo ---------------

/** 部署公钥信息 */
export const DeployKeyInfoSchema = z
  .object({
    /** 是否授予写入权限 */
    AllowWrite: z.boolean().nullable().describe('是否授予写入权限'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 仓库 Id */
    DepotId: z.number().int().nullable().describe('仓库 Id'),
    /** 过期时间 */
    ExpirationDate: z.string().nullable().describe('过期时间'),
    /** key 指纹 */
    FingerPrint: z.string().nullable().describe('key 指纹'),
    /** 是否过期 */
    HasExpired: z.boolean().nullable().describe('是否过期'),
    /** SSH Key Id */
    KeyId: z.number().int().nullable().describe('SSH Key Id'),
    /** 所属者名字 */
    OwnerName: z.string().nullable().describe('所属者名字'),
    /** key 标题 */
    Title: z.string().nullable().describe('key 标题'),
  })
  .describe('部署公钥信息');

export type DeployKeyInfo = z.infer<typeof DeployKeyInfoSchema>;

// --------------- DepotBranchType ---------------

/** 仓库规范的分支类型 */
export const DepotBranchTypeSchema = z
  .object({
    /** 分支类型的描述 */
    Description: z.string().nullable().describe('分支类型的描述'),
    /** 分支类型名字 */
    Name: z.string().nullable().describe('分支类型名字'),
    /** 分支类型的规则 */
    Rule: z.string().nullable().describe('分支类型的规则'),
  })
  .describe('仓库规范的分支类型');

export type DepotBranchType = z.infer<typeof DepotBranchTypeSchema>;

// --------------- DepotBranchTypeParam ---------------

/** 仓库规范的分支类型入参 */
export const DepotBranchTypeParamSchema = z
  .object({
    /** 分支类型描述信息 */
    Description: z.string().optional().describe('分支类型描述信息'),
    /** 分支类型名字 */
    Name: z.string().describe('分支类型名字'),
    /** 分支类型规则 */
    Rule: z.string().describe('分支类型规则'),
  })
  .describe('仓库规范的分支类型入参');

export type DepotBranchTypeParam = z.infer<typeof DepotBranchTypeParamSchema>;

// --------------- DepotInfo ---------------

/** 仓库信息 */
export const DepotInfoSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 默认分支 */
    DefaultBranch: z.string().nullable().optional().describe('默认分支'),
    /** 仓库描述 */
    Description: z.string().describe('仓库描述'),
    /** 项目组Id */
    GroupId: z.number().int().nullable().optional().describe('项目组Id'),
    /** 项目名称 */
    GroupName: z.string().nullable().optional().describe('项目名称'),
    /** 项目类型 */
    GroupType: z.string().nullable().optional().describe('项目类型'),
    /** 仓库的https地址 */
    HttpsUrl: z.string().describe('仓库的https地址'),
    /** 仓库id */
    Id: z.number().int().describe('仓库id'),
    /** 最终push时间 */
    LastPushAt: z.number().int().describe('最终push时间'),
    /** 仓库名称 */
    Name: z.string().describe('仓库名称'),
    /** 项目Id */
    ProjectId: z.number().int().describe('项目Id'),
    /** 项目名称 */
    ProjectName: z.string().describe('项目名称'),
    /** 仓库类型,具体值为git或者svn */
    RepoType: z.string().describe('仓库类型,具体值为git或者svn'),
    /** 仓库的ssh地址 */
    SshUrl: z.string().describe('仓库的ssh地址'),
    /** 仓库类型,具体值为git或者svn */
    VcsType: z.string().describe('仓库类型,具体值为git或者svn'),
    /** 仓库webURL */
    WebUrl: z.string().describe('仓库webURL'),
    /** 仓库是否开源 */
    IsShared: z.boolean().describe('仓库是否开源'),
  })
  .describe('仓库信息');

export type DepotInfo = z.infer<typeof DepotInfoSchema>;

// --------------- DepotData ---------------

/** 仓库信息列表 */
export const DepotDataSchema = z
  .object({
    /** 仓库信息列表 */
    Depots: z.array(DepotInfoSchema).describe('仓库信息列表'),
    /** 页码信息 */
    Page: PageInfoSchema.nullable().optional().describe('页码信息'),
  })
  .describe('仓库信息列表');

export type DepotData = z.infer<typeof DepotDataSchema>;

// --------------- DepotDetailData ---------------

/** 仓库提交详情 */
export const DepotDetailDataSchema = z
  .object({
    /** 仓库信息列表 */
    DepotDetailList: z.array(CodingCIDepotDetailSchema).describe('仓库信息列表'),
  })
  .describe('仓库提交详情');

export type DepotDetailData = z.infer<typeof DepotDetailDataSchema>;

// --------------- DepotMergeRequestRule ---------------

/** 仓库规范的合并方向规则 */
export const DepotMergeRequestRuleSchema = z
  .object({
    /** 源分支类型名字 */
    SourceBranchTypeName: z.string().nullable().describe('源分支类型名字'),
    /** 源分支类型规则 */
    SourceBranchTypeRule: z.string().nullable().describe('源分支类型规则'),
    /** 目标分支类型名字 */
    TargetBranchTypeName: z.string().nullable().describe('目标分支类型名字'),
    /** 目标分支类型规则 */
    TargetBranchTypeRule: z.string().nullable().describe('目标分支类型规则'),
  })
  .describe('仓库规范的合并方向规则');

export type DepotMergeRequestRule = z.infer<typeof DepotMergeRequestRuleSchema>;

// --------------- DepotMergeRequestRuleParam ---------------

/** 仓库规范的合并方向规则入参 */
export const DepotMergeRequestRuleParamSchema = z
  .object({
    /** 源分支类型名称 */
    SourceBranchTypeName: z.string().describe('源分支类型名称'),
    /** 目标分支类型名称 */
    TargetBranchTypeName: z.string().describe('目标分支类型名称'),
  })
  .describe('仓库规范的合并方向规则入参');

export type DepotMergeRequestRuleParam = z.infer<typeof DepotMergeRequestRuleParamSchema>;

// --------------- DepotPushSetting ---------------

/** 仓库推送规则信息 */
export const DepotPushSettingSchema = z
  .object({
    /** 检查 Git 提交的提交者 (Committer) 和提交作者 (Author) 必须是已验证的邮箱。 */
    CheckCommitAuthor: z
      .boolean()
      .nullable()
      .describe('检查 Git 提交的提交者 (Committer) 和提交作者 (Author) 必须是已验证的邮箱。'),
    /** Git 提交信息的格式校验 */
    CommitMessageMustMatchRegex: z.string().nullable().describe('Git 提交信息的格式校验'),
    /** 禁止强制推送 (Force Push) */
    DenyForcePush: z.boolean().nullable().describe('禁止强制推送 (Force Push)'),
    /** 禁止推送的文件（文件类型用换行符隔开） */
    PushDenyFile: z.string().nullable().describe('禁止推送的文件（文件类型用换行符隔开）'),
    /** 开启单次提交的文件总大小限制，Git LFS 文件除外（单位MB） */
    PushFileSize: z
      .string()
      .nullable()
      .describe('开启单次提交的文件总大小限制，Git LFS 文件除外（单位MB）'),
  })
  .describe('仓库推送规则信息');

export type DepotPushSetting = z.infer<typeof DepotPushSettingSchema>;

// --------------- DepotSpec ---------------

/** 仓库规范 */
export const DepotSpecSchema = z
  .object({
    /** 仓库规范描述信息 */
    Description: z.string().describe('仓库规范描述信息'),
    /** 仓库规范名字 */
    Name: z.string().describe('仓库规范名字'),
    /** 仓库规范类型 system:系统级别，team：团队级别 */
    Type: z.string().describe('仓库规范类型 system:系统级别，team：团队级别'),
  })
  .describe('仓库规范');

export type DepotSpec = z.infer<typeof DepotSpecSchema>;

// --------------- DepotSpecDepotLevelParam ---------------

/** 仓库规范 - 新增、修改仓库级别规范的参数 */
export const DepotSpecDepotLevelParamSchema = z
  .object({
    /** 允许创建规定分支类型以外的分支 */
    AllowPushWildRef: z.boolean().optional().describe('允许创建规定分支类型以外的分支'),
    /** 分支类型列表 */
    DepotBranchTypeList: z.array(DepotBranchTypeParamSchema).optional().describe('分支类型列表'),
    /** 合并方向规则列表 */
    DepotMergeRequestRuleList: z
      .array(DepotMergeRequestRuleParamSchema)
      .optional()
      .describe('合并方向规则列表'),
  })
  .describe('仓库规范 - 新增、修改仓库级别规范的参数');

export type DepotSpecDepotLevelParam = z.infer<typeof DepotSpecDepotLevelParamSchema>;

// --------------- DepotSpecDetail ---------------

/** 分支规范详细信息 */
export const DepotSpecDetailSchema = z
  .object({
    /** 允许创建规定分支类型以外的分支 */
    AllowPushWildRef: z.boolean().nullable().describe('允许创建规定分支类型以外的分支'),
    /** 分支类型列表 */
    DepotBranchTypeList: z.array(DepotBranchTypeSchema).nullable().describe('分支类型列表'),
    /** 合并方向规则列表 */
    DepotMergeRequestRuleList: z
      .array(DepotMergeRequestRuleSchema)
      .nullable()
      .describe('合并方向规则列表'),
    /** 仓库规范描述信息 */
    Description: z.string().nullable().describe('仓库规范描述信息'),
    /** 仓库规范名字 */
    Name: z.string().nullable().describe('仓库规范名字'),
    /** system：系统级别的规范；team：团队级别的规范 */
    Type: z.string().nullable().describe('system：系统级别的规范；team：团队级别的规范'),
    /** 使用的是系统/团队级别的仓库规范（这个字段只在使用仓库路径查询时有用） */
    UseExistingSolution: z
      .boolean()
      .nullable()
      .describe('使用的是系统/团队级别的仓库规范（这个字段只在使用仓库路径查询时有用）'),
  })
  .describe('分支规范详细信息');

export type DepotSpecDetail = z.infer<typeof DepotSpecDetailSchema>;

// --------------- DepotSpecTeamLevelParam ---------------

/** 仓库规范 - 新增团队规范的参数 */
export const DepotSpecTeamLevelParamSchema = z
  .object({
    /** 允许创建规定分支类型以外的分支 */
    AllowPushWildRef: z.boolean().describe('允许创建规定分支类型以外的分支'),
    /** 分支类型列表 */
    DepotBranchTypeList: z.array(DepotBranchTypeParamSchema).optional().describe('分支类型列表'),
    /** 合并方向规则列表 */
    DepotMergeRequestRuleList: z
      .array(DepotMergeRequestRuleParamSchema)
      .optional()
      .describe('合并方向规则列表'),
    /** 仓库规范描述 */
    Description: z.string().optional().describe('仓库规范描述'),
    /** 规范的名字唯一，当名字是已有规范的名字时，为修改；当名字不是已有规范名字时为新增 */
    Name: z
      .string()
      .describe('规范的名字唯一，当名字是已有规范的名字时，为修改；当名字不是已有规范名字时为新增'),
    /** 当需要修改已有规范的名字时，需要填写新名字 */
    ReName: z.string().optional().describe('当需要修改已有规范的名字时，需要填写新名字'),
  })
  .describe('仓库规范 - 新增团队规范的参数');

export type DepotSpecTeamLevelParam = z.infer<typeof DepotSpecTeamLevelParamSchema>;

// --------------- DepotUser ---------------

/** 仓库返回user信息 */
export const DepotUserSchema = z
  .object({
    /** 用户头像 */
    Avatar: z.string().nullable().optional().describe('用户头像'),
    /** 邮箱 */
    Email: z.string().optional().describe('邮箱'),
    /** 用户GlobalKey */
    GlobalKey: z.string().nullable().optional().describe('用户GlobalKey'),
    /** 用户id */
    Id: z.number().int().nullable().optional().describe('用户id'),
    /** 姓名 */
    Name: z.string().optional().describe('姓名'),
    /** 用户状态 */
    Status: z.string().nullable().optional().describe('用户状态'),
    /** 团队id */
    TeamId: z.number().int().nullable().optional().describe('团队id'),
  })
  .describe('仓库返回user信息');

export type DepotUser = z.infer<typeof DepotUserSchema>;

// --------------- DescribeGitFileStatPayload ---------------

/** 检查仓库文件是否存在 */
export const DescribeGitFileStatPayloadSchema = z
  .object({
    /** 文件是否存在 */
    IsExist: z.boolean().describe('文件是否存在'),
  })
  .describe('检查仓库文件是否存在');

export type DescribeGitFileStatPayload = z.infer<typeof DescribeGitFileStatPayloadSchema>;

// --------------- MergeRequestData ---------------

/** 合并请求数据 */
export const MergeRequestDataSchema = z
  .object({
    /** 合并时间 */
    ActionAt: z.number().int().nullable().describe('合并时间'),
    /** 合并者 */
    ActionAuthor: CodingUserSchema.nullable().describe('合并者'),
    /** 创建者 */
    Author: CodingUserSchema.nullable().describe('创建者'),
    /** 基础sha */
    BaseSha: z.string().nullable().describe('基础sha'),
    /** 评论数 */
    CommentCount: z.number().int().nullable().describe('评论数'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 仓库 Id */
    DepotId: z.number().int().describe('仓库 Id'),
    /** MR描述 */
    Describe: z.string().nullable().describe('MR描述'),
    /** 授权数 */
    Granted: z.number().int().nullable().describe('授权数'),
    /** 合并请求 Id */
    Id: z.number().int().describe('合并请求 Id'),
    /** 标签列表 */
    Labels: z.array(z.string()).nullable().describe('标签列表'),
    /** 合并Commit Sha */
    MergeCommitSha: z.string().nullable().describe('合并Commit Sha'),
    /** 合并请求 IId */
    MergeId: z.number().int().describe('合并请求 IId'),
    /** 合并请求 web 页面路径 */
    Path: z.string().nullable().describe('合并请求 web 页面路径'),
    /** 项目ID */
    ProjectId: z.number().int().describe('项目ID'),
    /** 是否提醒 */
    Reminded: z.boolean().nullable().describe('是否提醒'),
    /** 评审者列表 */
    Reviewers: z.array(CodingUserSchema).nullable().describe('评审者列表'),
    /** 源分支 */
    SourceBranch: z.string().nullable().describe('源分支'),
    /** 源分支Commit Sha */
    SourceBranchSha: z.string().nullable().describe('源分支Commit Sha'),
    /** 合并请求状态 */
    Status: z.string().nullable().describe('合并请求状态'),
    /** MR阻塞点 */
    StickingPoint: z.string().nullable().describe('MR阻塞点'),
    /** 目标分支 */
    TargetBranch: z.string().nullable().describe('目标分支'),
    /** 目标分支是否保护分支 */
    TargetBranchProtected: z.boolean().nullable().describe('目标分支是否保护分支'),
    /** 目标分支Commit Sha */
    TargetBranchSha: z.string().nullable().describe('目标分支Commit Sha'),
    /** 合并请求标题 */
    Title: z.string().describe('合并请求标题'),
    /** 更新时间 */
    UpdateAt: z.number().int().nullable().describe('更新时间'),
  })
  .describe('合并请求数据');

export type MergeRequestData = z.infer<typeof MergeRequestDataSchema>;

// --------------- DescribeMergeRequestsData ---------------

/** 获取合并请求数据 */
export const DescribeMergeRequestsDataSchema = z
  .object({
    /** 合并请求列表 */
    List: z.array(MergeRequestDataSchema).nullable().describe('合并请求列表'),
    /** 页数 */
    PageNumber: z.number().int().describe('页数'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 总页数 */
    TotalPage: z.number().int().describe('总页数'),
    /** 总条数 */
    TotalRow: z.number().int().describe('总条数'),
  })
  .describe('获取合并请求数据');

export type DescribeMergeRequestsData = z.infer<typeof DescribeMergeRequestsDataSchema>;

// --------------- DescribeProjectDepotsData ---------------

/** DescribeProjectDepots 返回数据结构 */
export const DescribeProjectDepotsDataSchema = z
  .object({
    /** 仓库信息列表 */
    DepotList: z.array(CodingCIProjectDepotSchema).describe('仓库信息列表'),
    /** 仓库类型是否被授权，如 Github 是否被授权 */
    IsBound: z.boolean().describe('仓库类型是否被授权，如 Github 是否被授权'),
  })
  .describe('DescribeProjectDepots 返回数据结构');

export type DescribeProjectDepotsData = z.infer<typeof DescribeProjectDepotsDataSchema>;

// --------------- DifferentLine ---------------

/** 文件差异信息 */
export const DifferentLineSchema = z
  .object({
    /** 排序号，由小到大递增 */
    Index: z.number().int().describe('排序号，由小到大递增'),
    /** 操作起始行号 */
    LeftNo: z.number().int().describe('操作起始行号'),
    /** 操作方式:”+”表示新增,”-“表示删除,” “表示不变 */
    Prefix: z.string().describe('操作方式:”+”表示新增,”-“表示删除,” “表示不变'),
    /** 操作结束行号 */
    RightNo: z.number().int().describe('操作结束行号'),
    /** 文本 */
    Text: z.string().describe('文本'),
  })
  .describe('文件差异信息');

export type DifferentLine = z.infer<typeof DifferentLineSchema>;

// --------------- DiffFileInfo ---------------

/** 文件差异信息汇总详情 */
export const DiffFileInfoSchema = z
  .object({
    /** 总删除行数 */
    Deletions: z.number().int().describe('总删除行数'),
    /** 差异信息 */
    DifferentLines: z.array(DifferentLineSchema).describe('差异信息'),
    /** 总新增行数 */
    Insertions: z.number().int().describe('总新增行数'),
  })
  .describe('文件差异信息汇总详情');

export type DiffFileInfo = z.infer<typeof DiffFileInfoSchema>;

// --------------- DifferentOfCommit ---------------

/** 请求之间的文件差别 */
export const DifferentOfCommitSchema = z
  .object({
    /** 修改类型 */
    ChangeType: z.string().nullable().optional().describe('修改类型'),
    /** 删除的行数 */
    Deletions: z.number().int().describe('删除的行数'),
    /** 新增的行数 */
    Insertions: z.number().int().describe('新增的行数'),
    /** 提交的名称 */
    Name: z.string().describe('提交的名称'),
    /** 文件路径 */
    Path: z.string().describe('文件路径'),
  })
  .describe('请求之间的文件差别');

export type DifferentOfCommit = z.infer<typeof DifferentOfCommitSchema>;

// --------------- GitCommit ---------------

/** 提交信息 */
export const GitCommitSchema = z
  .object({
    /** 作者邮箱 */
    AuthorEmail: z.string().describe('作者邮箱'),
    /** 作者姓名 */
    AuthorName: z.string().describe('作者姓名'),
    /** 提交日期 */
    CommitDate: z.number().int().describe('提交日期'),
    /** 提交人 */
    Committer: CommitterSchema.describe('提交人'),
    /** 提交日期 */
    CreatedAt: z.number().int().describe('提交日期'),
    /** 父提交 */
    Parents: z.array(z.string()).describe('父提交'),
    /** 提交 ID */
    Sha: z.string().describe('提交 ID'),
    /** 提交信息 */
    ShortMessage: z.string().describe('提交信息'),
  })
  .describe('提交信息');

export type GitCommit = z.infer<typeof GitCommitSchema>;

// --------------- DifferentOfCommitDetail ---------------

/** 请求列表及文件差别列表 */
export const DifferentOfCommitDetailSchema = z
  .object({
    /** 请求列表 */
    Commits: z.array(GitCommitSchema).describe('请求列表'),
    /** 总删除行数 */
    Deletions: z.number().int().describe('总删除行数'),
    /** 差异文件列表 */
    DifferentOfCommits: z.array(DifferentOfCommitSchema).describe('差异文件列表'),
    /** 总新增行数 */
    Insertions: z.number().int().describe('总新增行数'),
    /** 总文件修改数 */
    UpdateFileNum: z.number().int().describe('总文件修改数'),
  })
  .describe('请求列表及文件差别列表');

export type DifferentOfCommitDetail = z.infer<typeof DifferentOfCommitDetailSchema>;

// --------------- FileDiff ---------------

/** 文件差别详情 */
export const FileDiffSchema = z
  .object({
    /** 操作类型,具体值为: ADD(添加), MODIFY(修改), DELETE(删除), REPLACE(替换) */
    ChangeType: z
      .string()
      .describe('操作类型,具体值为: ADD(添加), MODIFY(修改), DELETE(删除), REPLACE(替换)'),
    /** 删除的行数 */
    Deletions: z.number().int().describe('删除的行数'),
    /** Diff Line */
    DiffLines: z.array(DifferentLineSchema).describe('Diff Line'),
    /** 新增的行数 */
    Insertions: z.number().int().describe('新增的行数'),
    /** 请求的objectid */
    ObjectId: z.string().describe('请求的objectid'),
    /** 文件路径 */
    Path: z.string().describe('文件路径'),
  })
  .describe('文件差别详情');

export type FileDiff = z.infer<typeof FileDiffSchema>;

// --------------- GitAllTagCommit ---------------

/** 请求标签的commit信息 */
export const GitAllTagCommitSchema = z
  .object({
    /** 作者邮箱 */
    AuthorEmail: z.string().nullable().describe('作者邮箱'),
    /** 作者姓名 */
    AuthorName: z.string().nullable().describe('作者姓名'),
    /** 提交时间 */
    CommitDate: z.number().int().nullable().describe('提交时间'),
    /** 提交者邮箱 */
    CommitterEmail: z.string().nullable().describe('提交者邮箱'),
    /** 提交者姓名 */
    CommitterName: z.string().nullable().describe('提交者姓名'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 父提交 */
    Parents: z.array(z.string()).nullable().describe('父提交'),
    /** 提交sha */
    Sha: z.string().nullable().describe('提交sha'),
    /** 短描述 */
    ShortMessage: z.string().nullable().describe('短描述'),
  })
  .describe('请求标签的commit信息');

export type GitAllTagCommit = z.infer<typeof GitAllTagCommitSchema>;

// --------------- GitBranch ---------------

/** 用于展示单个分支的信息 */
export const GitBranchSchema = z
  .object({
    /** 分支名称 */
    BranchName: z.string().describe('分支名称'),
    /** 是否为默认分支 */
    IsDefaultBranch: z.boolean().describe('是否为默认分支'),
    /** 是否为保护分支 */
    IsProtected: z.boolean().describe('是否为保护分支'),
    /** 最后一次提交的信息 */
    LastCommit: GitCommitSchema.describe('最后一次提交的信息'),
    /** 分支的sha值 */
    Sha: z.string().describe('分支的sha值'),
    /** 分支的备注信息 */
    Content: z.string().describe('分支的备注信息'),
  })
  .describe('用于展示单个分支的信息');

export type GitBranch = z.infer<typeof GitBranchSchema>;

// --------------- GitBranchInfo ---------------

/** 分支简略信息 */
export const GitBranchInfoSchema = z
  .object({
    /** 分支名称 */
    BranchName: z.string().describe('分支名称'),
    /** 是否禁止强制推送 */
    DenyForcePush: z.boolean().nullable().optional().describe('是否禁止强制推送'),
    /** 是否可以ForceSquash */
    ForceSquash: z.boolean().nullable().optional().describe('是否可以ForceSquash'),
    /** 是否默认分支 */
    IsDefaultBranch: z.boolean().describe('是否默认分支'),
    /** 是否保护分支 */
    IsProtected: z.boolean().describe('是否保护分支'),
    /** 是否只读 */
    IsReadOnly: z.boolean().nullable().optional().describe('是否只读'),
    /** 最后提交时间 */
    LastCommitDate: z.number().int().nullable().optional().describe('最后提交时间'),
    /** 分支sha值 */
    Sha: z.string().describe('分支sha值'),
    /** 仓库规范类型 */
    SpecBranchType: z.string().nullable().optional().describe('仓库规范类型'),
  })
  .describe('分支简略信息');

export type GitBranchInfo = z.infer<typeof GitBranchInfoSchema>;

// --------------- GitBranchesData ---------------

/** 用于描述分支列表信息 */
export const GitBranchesDataSchema = z
  .object({
    /** 分支列表 */
    Branches: z.array(GitBranchInfoSchema).describe('分支列表'),
    /** Branches的总条数 */
    TotalCount: z.number().int().describe('Branches的总条数'),
  })
  .describe('用于描述分支列表信息');

export type GitBranchesData = z.infer<typeof GitBranchesDataSchema>;

// --------------- GitCommitComment ---------------

/** 提交评论信息带分页 */
export const GitCommitCommentSchema = z
  .object({
    /** 提交评论详细信息 */
    CommitComments: z.array(CommitCommentSchema).describe('提交评论详细信息'),
    /** 分页信息 */
    Page: PageInfoSchema.describe('分页信息'),
  })
  .describe('提交评论信息带分页');

export type GitCommitComment = z.infer<typeof GitCommitCommentSchema>;

// --------------- GitCommitFilePath ---------------

/** git 提交中文件路径信息 */
export const GitCommitFilePathSchema = z
  .object({
    /** 文件改动类型为 move 时，（移动、重命名），文件的新路径 */
    NewPath: z
      .string()
      .nullable()
      .describe('文件改动类型为 move 时，（移动、重命名），文件的新路径'),
    /** 改动文件的路径 */
    Path: z.string().nullable().describe('改动文件的路径'),
    /** 文件改动类型 add update delete move */
    Type: z.string().nullable().describe('文件改动类型 add update delete move'),
  })
  .describe('git 提交中文件路径信息');

export type GitCommitFilePath = z.infer<typeof GitCommitFilePathSchema>;

// --------------- Line ---------------

/** git diff详情中每行的详细信息 */
export const LineSchema = z
  .object({
    /** diff信息中的行数 */
    Index: z.number().int().nullable().describe('diff信息中的行数'),
    /** 修改前第几行 */
    LeftNo: z.number().int().nullable().describe('修改前第几行'),
    /** 前缀 + - */
    Prefix: z.string().nullable().describe('前缀 + -'),
    /** 修改后第几行 */
    RightNo: z.number().int().nullable().describe('修改后第几行'),
    /** 文件每行的具体内容 */
    Text: z.string().nullable().describe('文件每行的具体内容'),
  })
  .describe('git diff详情中每行的详细信息');

export type Line = z.infer<typeof LineSchema>;

// --------------- GitDiff ---------------

/** git diff 信息详情 */
export const GitDiffSchema = z
  .object({
    /** 文件改变类型 */
    ChangeType: z.string().describe('文件改变类型'),
    /** diff信息内容 */
    Content: z.string().describe('diff信息内容'),
    /** 一共删除几行 */
    Deletions: z.number().int().describe('一共删除几行'),
    /** 一共新增几行 */
    Insertions: z.number().int().describe('一共新增几行'),
    /** diff每行信息拆解后的集合信息 */
    Lines: z.array(LineSchema).describe('diff每行信息拆解后的集合信息'),
    /** 修改后文件的权限 */
    NewMode: z.string().describe('修改后文件的权限'),
    /** 修改前文件的权限 */
    OldMode: z.string().describe('修改前文件的权限'),
    /** 文件路径 */
    Path: z.string().describe('文件路径'),
  })
  .describe('git diff 信息详情');

export type GitDiff = z.infer<typeof GitDiffSchema>;

// --------------- GitFile ---------------

/** git 文件 */
export const GitFileSchema = z
  .object({
    /** 文件内容 */
    Content: z.string().describe('文件内容'),
    /** 是否创建一个新路径文件 */
    NewPath: z.string().optional().describe('是否创建一个新路径文件'),
    /** 文件路径 */
    Path: z.string().describe('文件路径'),
  })
  .describe('git 文件');

export type GitFile = z.infer<typeof GitFileSchema>;

// --------------- GitFileContent ---------------

/** 文件详情 */
export const GitFileContentSchema = z
  .object({
    /** 内容 */
    Content: z.string().describe('内容'),
    /** 是否为lfs文件 */
    IsLargeFileStorage: z.boolean().describe('是否为lfs文件'),
    /** 是否lfs文件 */
    IsLfs: z.boolean().describe('是否lfs文件'),
    /** 是否文本 */
    IsText: z.boolean().describe('是否文本'),
  })
  .describe('文件详情');

export type GitFileContent = z.infer<typeof GitFileContentSchema>;

// --------------- GitFileItem ---------------

/** 文件详情 */
export const GitFileItemSchema = z
  .object({
    /** 加密后文件的内容 */
    Content: z.string().nullable().describe('加密后文件的内容'),
    /** 文件内容的hash结果 */
    ContentSha256: z.string().nullable().describe('文件内容的hash结果'),
    /** 加密形式 */
    Encoding: z.string().describe('加密形式'),
    /** 文件名 */
    FileName: z.string().describe('文件名'),
    /** 文件路径 */
    FilePath: z.string().describe('文件路径'),
    /** commitID */
    Sha: z.string().describe('commitID'),
    /** 文件大小 */
    Size: z.number().int().describe('文件大小'),
  })
  .describe('文件详情');

export type GitFileItem = z.infer<typeof GitFileItemSchema>;

// --------------- GitFilePushRuleRole ---------------

/** git 文件推送规则角色 */
export const GitFilePushRuleRoleSchema = z
  .object({
    /** 角色名字 */
    Name: z.string().nullable().describe('角色名字'),
    /** 角色 ID */
    RoleId: z.number().int().nullable().describe('角色 ID'),
  })
  .describe('git 文件推送规则角色');

export type GitFilePushRuleRole = z.infer<typeof GitFilePushRuleRoleSchema>;

// --------------- GitFilePushRuleUser ---------------

/** git 文件推送权限用户 */
export const GitFilePushRuleUserSchema = z
  .object({
    /** 头像路径 */
    Avatar: z.string().nullable().describe('头像路径'),
    /** 用户全局 key */
    GlobalKey: z.string().nullable().describe('用户全局 key'),
    /** 用户名 */
    Name: z.string().nullable().describe('用户名'),
  })
  .describe('git 文件推送权限用户');

export type GitFilePushRuleUser = z.infer<typeof GitFilePushRuleUserSchema>;

// --------------- GitFilePushRulePrivilege ---------------

/** git 文件推送规则特权者 */
export const GitFilePushRulePrivilegeSchema = z
  .object({
    /** 拒绝推送文件 */
    IsDeny: z.boolean().describe('拒绝推送文件'),
    /** 特权者是角色 */
    IsRole: z.boolean().describe('特权者是角色'),
    /** 特权者是用户 */
    IsUser: z.boolean().describe('特权者是用户'),
    /** 角色信息 */
    Role: GitFilePushRuleRoleSchema.nullable().describe('角色信息'),
    /** 用户信息 */
    User: GitFilePushRuleUserSchema.nullable().describe('用户信息'),
  })
  .describe('git 文件推送规则特权者');

export type GitFilePushRulePrivilege = z.infer<typeof GitFilePushRulePrivilegeSchema>;

// --------------- GitFilePushRule ---------------

/** git 文件推送权限规则 */
export const GitFilePushRuleSchema = z
  .object({
    /** 文件推送规则 ID */
    FilePushRuleId: z.number().int().describe('文件推送规则 ID'),
    /** 拒绝所有人推送 */
    IsDenyForAllUser: z.boolean().describe('拒绝所有人推送'),
    /** 文件路径 */
    Pattern: z.string().describe('文件路径'),
    /** 特权者列表 */
    Privileges: z.array(GitFilePushRulePrivilegeSchema).nullable().describe('特权者列表'),
  })
  .describe('git 文件推送权限规则');

export type GitFilePushRule = z.infer<typeof GitFilePushRuleSchema>;

// --------------- GitMergeRequest ---------------

/** Git合并请求信息 */
export const GitMergeRequestSchema = z
  .object({
    /** 代码仓库的唯一编号 */
    DepotId: z.number().int().describe('代码仓库的唯一编号'),
    /** 仓库路径 */
    DepotPath: z.string().nullable().optional().describe('仓库路径'),
    /** 定位一个项目的内的资源的 ID */
    IId: z.number().int().describe('定位一个项目的内的资源的 ID'),
    /** 定位一个项目的内的MR资源的 ID */
    MergeId: z.number().int().describe('定位一个项目的内的MR资源的 ID'),
    /** 项目 ID */
    ProjectId: z.number().int().describe('项目 ID'),
  })
  .describe('Git合并请求信息');

export type GitMergeRequest = z.infer<typeof GitMergeRequestSchema>;

// --------------- GitRef ---------------

/** 仓库分支 */
export const GitRefSchema = z
  .object({
    /** 是否是附注标签 */
    AnnotatedTag: z.boolean().describe('是否是附注标签'),
    /** 展示名 */
    DisplayName: z.string().describe('展示名'),
    /** 最后一次提交全部信息 */
    FullMessage: z.string().describe('最后一次提交全部信息'),
    /** 名字 */
    Name: z.string().describe('名字'),
    /** 对象id */
    ObjectId: z.string().describe('对象id'),
    /** 分支objectId */
    RefObjectId: z.string().describe('分支objectId'),
    /** 最后一次提交简短信息 */
    ShortMessage: z.string().describe('最后一次提交简短信息'),
  })
  .describe('仓库分支');

export type GitRef = z.infer<typeof GitRefSchema>;

// --------------- GitReference ---------------

/** Git 标签/分支的信息 */
export const GitReferenceSchema = z
  .object({
    /** 分支或标签的名字 */
    Name: z.string().describe('分支或标签的名字'),
    /** all：全部，branch：分支，tag：标签 */
    Type: z.string().describe('all：全部，branch：分支，tag：标签'),
  })
  .describe('Git 标签/分支的信息');

export type GitReference = z.infer<typeof GitReferenceSchema>;

// --------------- GitTag ---------------

/** 用于展示GitTag相关信息 */
export const GitTagSchema = z
  .object({
    /** tag提交信息 */
    Commit: GitAllTagCommitSchema.describe('tag提交信息'),
    /** tag信息 */
    Message: z.string().describe('tag信息'),
    /** tag的名称 */
    TagName: z.string().describe('tag的名称'),
  })
  .describe('用于展示GitTag相关信息');

export type GitTag = z.infer<typeof GitTagSchema>;

// --------------- GitTree ---------------

/** git的树 */
export const GitTreeSchema = z
  .object({
    /** 文件或目录权限 */
    Mode: z.string().nullable().optional().describe('文件或目录权限'),
    /** 路径 */
    Path: z.string().nullable().optional().describe('路径'),
    /** 哈希值 */
    Sha: z.string().nullable().optional().describe('哈希值'),
    /** 类型 */
    Type: z.string().nullable().optional().describe('类型'),
  })
  .describe('git的树');

export type GitTree = z.infer<typeof GitTreeSchema>;

// --------------- GitTreeItem ---------------

/** 仓库文件信息 */
export const GitTreeItemSchema = z
  .object({
    /** 文件类型 */
    Mode: z.string().describe('文件类型'),
    /** 文件名 */
    Name: z.string().describe('文件名'),
    /** 文件路径 */
    Path: z.string().describe('文件路径'),
    /** commitID */
    Sha: z.string().describe('commitID'),
  })
  .describe('仓库文件信息');

export type GitTreeItem = z.infer<typeof GitTreeItemSchema>;

// --------------- GrepLineInfo ---------------

/** 代码片段搜索信息详细列表 */
export const GrepLineInfoSchema = z
  .object({
    /** 分支名称 */
    BranchName: z.string().nullable().describe('分支名称'),
    /** 提交Id */
    CommitId: z.string().nullable().describe('提交Id'),
    /** 文件内容 */
    Contents: z.array(z.string()).nullable().describe('文件内容'),
    /** 文件最大行数 */
    FileMaxLine: z.number().int().nullable().describe('文件最大行数'),
    /** 代码片段的行数 */
    LineNum: z.number().int().nullable().describe('代码片段的行数'),
    /** 页面上展现的最大行数 */
    MaxNum: z.number().int().nullable().describe('页面上展现的最大行数'),
    /** 页面上展现的最小行数 */
    MinNum: z.number().int().nullable().describe('页面上展现的最小行数'),
    /** 代码片段对应的文件路径 */
    Path: z.string().nullable().describe('代码片段对应的文件路径'),
    /** 查询代码片段的文本 */
    Text: z.string().nullable().describe('查询代码片段的文本'),
  })
  .describe('代码片段搜索信息详细列表');

export type GrepLineInfo = z.infer<typeof GrepLineInfoSchema>;

// --------------- GrepLineData ---------------

/** 代码片段数据 */
export const GrepLineDataSchema = z
  .object({
    /** 代码片段详细信息 */
    GrepLines: z.array(GrepLineInfoSchema).nullable().describe('代码片段详细信息'),
    /** 页码信息 */
    Page: PageInfoSchema.nullable().describe('页码信息'),
  })
  .describe('代码片段数据');

export type GrepLineData = z.infer<typeof GrepLineDataSchema>;

// --------------- Mission ---------------

/** Mission */
export const MissionSchema = z
  .object({
    /** 返回码 */
    Code: z.number().int().nullable().optional().describe('返回码'),
    /** 连接 */
    Link: z.string().nullable().optional().describe('连接'),
    /** 目标id */
    TargetId: z.number().int().nullable().optional().describe('目标id'),
    /** 目标项目名称 */
    TargetProjectName: z.string().nullable().optional().describe('目标项目名称'),
    /** 类型 */
    TargetType: z.string().nullable().optional().describe('类型'),
    /** 标题 */
    Title: z.string().nullable().optional().describe('标题'),
  })
  .describe('Mission');

export type Mission = z.infer<typeof MissionSchema>;

// --------------- MergeRequestInfo ---------------

/** 合并请求详情 */
export const MergeRequestInfoSchema = z
  .object({
    /** 操作时间 */
    ActionAt: z.number().int().describe('操作时间'),
    /** 操作人 */
    ActionAuthor: CodingUserSchema.describe('操作人'),
    /** MR所有人 */
    Author: CodingUserSchema.describe('MR所有人'),
    /** 基础Sha */
    BaseSha: z.string().describe('基础Sha'),
    /** 评论数 */
    CommentCount: z.number().int().describe('评论数'),
    /** 冲突文件列表 */
    Conflicts: z.array(z.string()).describe('冲突文件列表'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 仓库ID */
    DepotId: z.number().int().describe('仓库ID'),
    /** 描述,为 markdown 格式 */
    Describe: z.string().describe('描述,为 markdown 格式'),
    /** 是否授权 */
    Granted: z.number().int().describe('是否授权'),
    /** 合并请求ID */
    Id: z.number().int().describe('合并请求ID'),
    /** 合并请求标签列表 */
    Labels: z.array(z.string()).nullable().describe('合并请求标签列表'),
    /** 合并Commit Sha */
    MergeCommitSha: z.string().describe('合并Commit Sha'),
    /** 合并请求iid */
    MergeId: z.number().int().describe('合并请求iid'),
    /** 任务 */
    Mission: MissionSchema.nullable().optional().describe('任务'),
    /** 合并请求 web 页面路径 */
    Path: z.string().describe('合并请求 web 页面路径'),
    /** 项目ID */
    ProjectId: z.number().int().describe('项目ID'),
    /** 是否提醒 */
    Reminded: z.boolean().nullable().describe('是否提醒'),
    /** MR评审者 */
    Reviewers: z.array(CodingUserSchema).nullable().describe('MR评审者'),
    /** 源分支 */
    SourceBranch: z.string().describe('源分支'),
    /** 源分支Commit Sha */
    SourceBranchSha: z.string().describe('源分支Commit Sha'),
    /** 合并状态,CANMERGE(状态可自动合并),ACCEPTED(状态已接受), CANNOTMERGE(状态不可自动合并), REFUSED(状态已拒绝(关闭)), CANCEL(取消), MERGING(正在合并中), ABNORMAL(状态异常) */
    Status: z
      .string()
      .describe(
        '合并状态,CANMERGE(状态可自动合并),ACCEPTED(状态已接受), CANNOTMERGE(状态不可自动合并), REFUSED(状态已拒绝(关闭)), CANCEL(取消), MERGING(正在合并中), ABNORMAL(状态异常)',
      ),
    /** MR阻塞点 */
    StickingPoint: z.string().describe('MR阻塞点'),
    /** 目标分支 */
    TargetBranch: z.string().describe('目标分支'),
    /** 目标分支是否为保护分支 */
    TargetBranchProtected: z.boolean().describe('目标分支是否为保护分支'),
    /** 目标分支Commit Sha */
    TargetBranchSha: z.string().describe('目标分支Commit Sha'),
    /** 合并标题 */
    Title: z.string().describe('合并标题'),
    /** 更新时间 */
    UpdatedAt: z.number().int().describe('更新时间'),
  })
  .describe('合并请求详情');

export type MergeRequestInfo = z.infer<typeof MergeRequestInfoSchema>;

// --------------- MergeInfo ---------------

/** 合并请求详情 */
export const MergeInfoSchema = z
  .object({
    /** 仓库id */
    DepotId: z.number().int().describe('仓库id'),
    /** 合并请求id */
    MergeRequestId: z.number().int().describe('合并请求id'),
    /** 合并请求Info */
    MergeRequestInfo: MergeRequestInfoSchema.describe('合并请求Info'),
    /** 合并请求URl */
    MergeRequestUrl: z.string().nullable().describe('合并请求URl'),
    /** 项目id */
    ProjectId: z.number().int().describe('项目id'),
  })
  .describe('合并请求详情');

export type MergeInfo = z.infer<typeof MergeInfoSchema>;

// --------------- MergeReqInfo ---------------

/** 合并请求详情 */
export const MergeReqInfoSchema = z
  .object({
    /** 描述,为 markdown 格式 */
    Describe: z.string().describe('描述,为 markdown 格式'),
    /** 源分支 */
    SourceBranch: z.string().describe('源分支'),
    /** 合并状态,状态值如下: CANMERGE:状态可自动合并; ACCEPTED:状态已接受; CANNOTMERGE:状态不可自动合并; REFUSED:状态已拒绝(关闭); CANCEL: 取消; MERGING:正在合并中; ABNORMAL:状态异常; */
    Status: z
      .string()
      .describe(
        '合并状态,状态值如下: CANMERGE:状态可自动合并; ACCEPTED:状态已接受; CANNOTMERGE:状态不可自动合并; REFUSED:状态已拒绝(关闭); CANCEL: 取消; MERGING:正在合并中; ABNORMAL:状态异常;',
      ),
    /** 目标分支 */
    TargetBranch: z.string().describe('目标分支'),
    /** 合并标题 */
    Title: z.string().describe('合并标题'),
  })
  .describe('合并请求详情');

export type MergeReqInfo = z.infer<typeof MergeReqInfoSchema>;

// --------------- MergeRequestDetail ---------------

/** 合并请求详细数据 */
export const MergeRequestDetailSchema = z
  .object({
    /** 是否允许合并时间 */
    ActionAt: z.number().int().nullable().describe('是否允许合并时间'),
    /** 合并人 */
    ActionAuthor: CodingUserSchema.nullable().describe('合并人'),
    /** 合并请求创建人 */
    Author: CodingUserSchema.nullable().describe('合并请求创建人'),
    /** 合并请求描述 */
    Content: z.string().nullable().describe('合并请求描述'),
    /** 合并请求描述（html 格式） */
    ContentHtml: z.string().nullable().describe('合并请求描述（html 格式）'),
    /** 创建时间 */
    CreateAt: z.number().int().nullable().describe('创建时间'),
    /** 仓库 Id */
    DepotId: z.number().int().nullable().describe('仓库 Id'),
    /** 合并请求 Id */
    Id: z.number().int().nullable().describe('合并请求 Id'),
    /** 合并请求 Iid */
    MergeId: z.number().int().nullable().describe('合并请求 Iid'),
    /** 合并请求状态 */
    MergeStatus: z.string().nullable().describe('合并请求状态'),
    /** 合并 Sha */
    MergedSha: z.string().nullable().describe('合并 Sha'),
    /** 源分支名 */
    SourceBranch: z.string().nullable().describe('源分支名'),
    /** 源分支 Sha */
    SourceSha: z.string().nullable().describe('源分支 Sha'),
    /** 目标分支名 */
    TargetBranch: z.string().nullable().describe('目标分支名'),
    /** 目标分支 Sha */
    TargetSha: z.string().nullable().describe('目标分支 Sha'),
    /** 合并请求标题 */
    Title: z.string().nullable().describe('合并请求标题'),
    /** 更新时间 */
    UpdateAt: z.number().int().nullable().describe('更新时间'),
  })
  .describe('合并请求详细数据');

export type MergeRequestDetail = z.infer<typeof MergeRequestDetailSchema>;

// --------------- MergeRequestDiffFile ---------------

/** diff 信息详情 */
export const MergeRequestDiffFileSchema = z
  .object({
    /** 文件对应的 blob Id */
    BlobSha: z.string().nullable().describe('文件对应的 blob Id'),
    /** 文件改变类型 */
    ChangeType: z.string().nullable().describe('文件改变类型'),
    /** 一共删除几行 */
    Deletions: z.number().int().nullable().describe('一共删除几行'),
    /** 一共新增几行 */
    Insertions: z.number().int().nullable().describe('一共新增几行'),
    /** 文件路径 */
    Path: z.string().nullable().describe('文件路径'),
    /** 文件大小（字节） */
    Size: z.number().int().nullable().describe('文件大小（字节）'),
  })
  .describe('diff 信息详情');

export type MergeRequestDiffFile = z.infer<typeof MergeRequestDiffFileSchema>;

// --------------- MergeRequestDiff ---------------

/** 合并请求 diff 信息 */
export const MergeRequestDiffSchema = z
  .object({
    /** 一共减少行数 */
    Deletions: z.number().int().nullable().describe('一共减少行数'),
    /** 一共新增行数 */
    Insertions: z.number().int().nullable().describe('一共新增行数'),
    /** diff 信息是否过多，不宜于展示 */
    IsLarge: z.boolean().nullable().describe('diff 信息是否过多，不宜于展示'),
    /** 源分支对应的Sha值 */
    NewSha: z.string().nullable().describe('源分支对应的Sha值'),
    /** 目标分支对应的Sha值 */
    OldSha: z.string().nullable().describe('目标分支对应的Sha值'),
    /** 文件信息 */
    Paths: z.array(MergeRequestDiffFileSchema).nullable().describe('文件信息'),
  })
  .describe('合并请求 diff 信息');

export type MergeRequestDiff = z.infer<typeof MergeRequestDiffSchema>;

// --------------- MergeRequestDiffNoteForm ---------------

/** 创建Diff信息行评论表单 */
export const MergeRequestDiffNoteFormSchema = z
  .object({
    /** 提交Id */
    CommitSha: z.string().describe('提交Id'),
    /** Diff信息行数 */
    Index: z.number().int().describe('Diff信息行数'),
    /** 改动文件路径 */
    Path: z.string().describe('改动文件路径'),
  })
  .describe('创建Diff信息行评论表单');

export type MergeRequestDiffNoteForm = z.infer<typeof MergeRequestDiffNoteFormSchema>;

// --------------- MergeRequestFileDiff ---------------

/** 文件修改记录 */
export const MergeRequestFileDiffSchema = z
  .object({
    /** 总删除条数 */
    Deletions: z.number().int().describe('总删除条数'),
    /** 文件差异列表 */
    FileDiffs: z.array(FileDiffSchema).describe('文件差异列表'),
    /** 总新增条数 */
    Insertions: z.number().int().describe('总新增条数'),
    /** 新请求的 sha 值 */
    NewSha: z.string().describe('新请求的 sha 值'),
    /** 旧请求的 sha 值 */
    OldSha: z.string().describe('旧请求的 sha 值'),
  })
  .describe('文件修改记录');

export type MergeRequestFileDiff = z.infer<typeof MergeRequestFileDiffSchema>;

// --------------- MergeRequestLog ---------------

/** 合并请求操作记录 */
export const MergeRequestLogSchema = z
  .object({
    /** 操作方式 */
    Action: z.string().describe('操作方式'),
    /** 请求id */
    Id: z.number().int().describe('请求id'),
    /** 操作人姓名 */
    Name: z.string().describe('操作人姓名'),
  })
  .describe('合并请求操作记录');

export type MergeRequestLog = z.infer<typeof MergeRequestLogSchema>;

// --------------- MergeRequestNote ---------------

/** 合并请求评论 */
export const MergeRequestNoteSchema = z
  .object({
    /** 创建行评论的用户 */
    Author: CodingUserSchema.describe('创建行评论的用户'),
    /** 合并请求中提交Id */
    CommitSha: z.string().nullable().describe('合并请求中提交Id'),
    /** 行评论的内容 */
    Content: z.string().describe('行评论的内容'),
    /** 行评论创建时间 */
    CreatedAt: z.number().int().describe('行评论创建时间'),
    /** 行评论的Id */
    Id: z.number().int().describe('行评论的Id'),
    /** diff信息中的行数 */
    Index: z.number().int().nullable().describe('diff信息中的行数'),
    /** 合并请求的Iid */
    MergeId: z.number().int().describe('合并请求的Iid'),
    /** 子评论的父Id */
    ParentId: z.number().int().describe('子评论的父Id'),
    /** 改动文件的路径 */
    Path: z.string().nullable().describe('改动文件的路径'),
    /** 行评论更新时间 */
    UpdatedAt: z.number().int().describe('行评论更新时间'),
  })
  .describe('合并请求评论');

export type MergeRequestNote = z.infer<typeof MergeRequestNoteSchema>;

// --------------- MergeRequestNoteList ---------------

/** 合并请求评论列表 */
export const MergeRequestNoteListSchema = z
  .object({
    /** 合并请求中父子评论列表、diff信息同行评论列表 */
    Note: z.array(MergeRequestNoteSchema).describe('合并请求中父子评论列表、diff信息同行评论列表'),
  })
  .describe('合并请求评论列表');

export type MergeRequestNoteList = z.infer<typeof MergeRequestNoteListSchema>;

// --------------- ModifyGitMergeBranchData ---------------

/** 合并请求数据 */
export const ModifyGitMergeBranchDataSchema = z
  .object({
    /** 合并提交详情 */
    MergeCommit: GitCommitSchema.nullable().describe('合并提交详情'),
    /** 合并状态 MERGED 合并成功 FAILED 合并失败，异常原因 NOT_MERGEABLE 不可合并，有代码冲突 ALREADY_MERGED 两个分支已经合并，两个分支是一样的或者目标分支的已经合并进当前分支了 */
    MergeStatus: z
      .string()
      .nullable()
      .describe(
        '合并状态 MERGED 合并成功 FAILED 合并失败，异常原因 NOT_MERGEABLE 不可合并，有代码冲突 ALREADY_MERGED 两个分支已经合并，两个分支是一样的或者目标分支的已经合并进当前分支了',
      ),
  })
  .describe('合并请求数据');

export type ModifyGitMergeBranchData = z.infer<typeof ModifyGitMergeBranchDataSchema>;

// --------------- ProtectedBranch ---------------

/** 保护分支详情 */
export const ProtectedBranchSchema = z
  .object({
    /** 提交时间戳,单位毫秒 */
    CommitDate: z.number().int().describe('提交时间戳,单位毫秒'),
    /** 是否禁止强制推送 */
    DenyForcePush: z.boolean().describe('是否禁止强制推送'),
    /** 是否使用 squash 推送 */
    ForceSquash: z.boolean().describe('是否使用 squash 推送'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 是否开启状态检查 */
    StatusCheck: z.boolean().describe('是否开启状态检查'),
  })
  .describe('保护分支详情');

export type ProtectedBranch = z.infer<typeof ProtectedBranchSchema>;

// --------------- ProtectedBranchMember ---------------

/** 保护分支用户信息 */
export const ProtectedBranchMemberSchema = z
  .object({
    /** 成员global_key */
    GlobalKey: z.string().describe('成员global_key'),
    /** 是否允许强制推送 */
    HasPushAccess: z.boolean().describe('是否允许强制推送'),
    /** 是否允许合并修改分支 */
    HasUpdateAccess: z.boolean().describe('是否允许合并修改分支'),
    /** 成员姓名 */
    Name: z.string().describe('成员姓名'),
  })
  .describe('保护分支用户信息');

export type ProtectedBranchMember = z.infer<typeof ProtectedBranchMemberSchema>;

// --------------- QcloudApiGitDepotDifferentLine ---------------

export const QcloudApiGitDepotDifferentLineSchema = z.object({
  /** 排序号 */
  Index: z.number().int().describe('排序号'),
  /** 操作起始行号 */
  LeftNo: z.number().int().describe('操作起始行号'),
  /** 操作方式:"+"表示新增,"-"表示删除," "表示不变 */
  Prefix: z.string().describe('操作方式:"+"表示新增,"-"表示删除," "表示不变'),
  /** 操作结束行号 */
  RightNo: z.number().int().describe('操作结束行号'),
  /** 文本 */
  Text: z.string().describe('文本'),
});

export type QcloudApiGitDepotDifferentLine = z.infer<typeof QcloudApiGitDepotDifferentLineSchema>;

// --------------- QcloudApiGitDepotDiffFileInfo ---------------

export const QcloudApiGitDepotDiffFileInfoSchema = z.object({
  /** 总删除行数 */
  Deletions: z.number().int().describe('总删除行数'),
  DifferentLines: z.array(QcloudApiGitDepotDifferentLineSchema),
  /** 总新增行数 */
  Insertions: z.number().int().describe('总新增行数'),
});

export type QcloudApiGitDepotDiffFileInfo = z.infer<typeof QcloudApiGitDepotDiffFileInfoSchema>;

// --------------- RefInfo ---------------

/** 用于描述分支信息 */
export const RefInfoSchema = z
  .object({
    /** 分支名称 */
    Ref: z.string().describe('分支名称'),
  })
  .describe('用于描述分支信息');

export type RefInfo = z.infer<typeof RefInfoSchema>;

// --------------- ReleaseAttachment ---------------

/** 附件信息 */
export const ReleaseAttachmentSchema = z
  .object({
    /** 附件下载地址 */
    AttachmentDownloadUrl: z.string().describe('附件下载地址'),
    /** 附件名 */
    AttachmentName: z.string().describe('附件名'),
    /** 附件大小 */
    AttachmentSize: z.string().optional().describe('附件大小'),
  })
  .describe('附件信息');

export type ReleaseAttachment = z.infer<typeof ReleaseAttachmentSchema>;

// --------------- Release ---------------

/** git 版本 */
export const ReleaseSchema = z
  .object({
    /** 内容 */
    Body: z.string().nullable().describe('内容'),
    /** commit Sha 值 */
    CommitSha: z.string().nullable().describe('commit Sha 值'),
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 创建者 */
    CreatorId: z.number().int().nullable().describe('创建者'),
    /** 仓库 Id */
    DepotId: z.number().int().nullable().describe('仓库 Id'),
    /** html内容 */
    Html: z.string().nullable().describe('html内容'),
    /** 版本 Id */
    Id: z.number().int().nullable().describe('版本 Id'),
    /** 是否预发布 */
    Pre: z.boolean().nullable().describe('是否预发布'),
    /** 项目 Id */
    ProjectId: z.number().int().nullable().describe('项目 Id'),
    /** 版本序号Id */
    ReleaseId: z.number().int().nullable().describe('版本序号Id'),
    /** 标签名字 */
    TagName: z.string().nullable().describe('标签名字'),
    /** 目标 commit Sha 值 */
    TargetCommitBranch: z.string().nullable().describe('目标 commit Sha 值'),
    /** 标题 */
    Title: z.string().nullable().describe('标题'),
    /** 更新时间 */
    UpdatedAt: z.number().int().nullable().describe('更新时间'),
    /** 附件信息 */
    ReleaseAttachment: ReleaseAttachmentSchema.describe('附件信息'),
  })
  .describe('git 版本');

export type Release = z.infer<typeof ReleaseSchema>;

// --------------- ReleaseListPage ---------------

/** git 版本分页列表信息 */
export const ReleaseListPageSchema = z
  .object({
    /** 版本分页列表 */
    Releases: z.array(ReleaseSchema).describe('版本分页列表'),
    /** 总共数量 */
    TotalCount: z.number().int().describe('总共数量'),
  })
  .describe('git 版本分页列表信息');

export type ReleaseListPage = z.infer<typeof ReleaseListPageSchema>;

// --------------- SshKeyInfo ---------------

/** SSH 公钥详细信息 */
export const SshKeyInfoSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 过期时间 */
    ExpirationDate: z.string().describe('过期时间'),
    /** 指纹信息 */
    FingerPrint: z.string().describe('指纹信息'),
    /** 是否过期 */
    HasExpired: z.boolean().describe('是否过期'),
    /** 公钥Id */
    Id: z.number().int().describe('公钥Id'),
    /** 公钥所属者Id */
    OwnerId: z.number().int().describe('公钥所属者Id'),
    /** 公钥标题 */
    Title: z.string().describe('公钥标题'),
  })
  .describe('SSH 公钥详细信息');

export type SshKeyInfo = z.infer<typeof SshKeyInfoSchema>;

// --------------- StatusCheckResult ---------------

/** 查询提交对应的流水线状态 */
export const StatusCheckResultSchema = z
  .object({
    /** 提交sha */
    CommitSha: z.string().nullable().optional().describe('提交sha'),
    /** 流水线文本内容 */
    Context: z.string().nullable().optional().describe('流水线文本内容'),
    /** 记录创建时间 */
    CreateDate: z.number().int().nullable().optional().describe('记录创建时间'),
    /** 仓库路径 */
    DepotId: z.number().int().nullable().optional().describe('仓库路径'),
    /** 流水线状态描述 */
    Description: z.string().nullable().optional().describe('流水线状态描述'),
    /** 构建状态 */
    State: z.string().nullable().optional().describe('构建状态'),
    /** 流水线链接地址 */
    TargetURL: z.string().nullable().optional().describe('流水线链接地址'),
  })
  .describe('查询提交对应的流水线状态');

export type StatusCheckResult = z.infer<typeof StatusCheckResultSchema>;
