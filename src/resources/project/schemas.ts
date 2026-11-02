import { z } from 'zod/v4';

// --------------- Credential ---------------

/** 凭据结构 */
export const CredentialSchema = z
  .object({
    /** 凭据唯一 ID */
    CredentialId: z.string().describe('凭据唯一 ID'),
    /** 凭据名称 */
    Name: z.string().describe('凭据名称'),
  })
  .describe('凭据结构');

export type Credential = z.infer<typeof CredentialSchema>;

// --------------- DescribeProjectCredentialsData ---------------

/** 获取凭据列表返回结构 */
export const DescribeProjectCredentialsDataSchema = z
  .object({
    /** 凭据列表返回结构 */
    CredentialList: z.array(CredentialSchema).describe('凭据列表返回结构'),
  })
  .describe('获取凭据列表返回结构');

export type DescribeProjectCredentialsData = z.infer<typeof DescribeProjectCredentialsDataSchema>;

// --------------- Policy ---------------

/** 权限信息 */
export const PolicySchema = z
  .object({
    /** 项目成员 */
    PolicyAlias: z.string().describe('项目成员'),
    /** 1 */
    PolicyId: z.number().int().describe('1'),
    /** ProjectMember类型 */
    PolicyName: z.string().describe('ProjectMember类型'),
  })
  .describe('权限信息');

export type Policy = z.infer<typeof PolicySchema>;

// --------------- PrincipalAdd ---------------

/** 添加项目成员主体 成员对象 */
export const PrincipalAddSchema = z
  .object({
    /** 权限组ID */
    PolicyIds: z.array(z.number().int()).describe('权限组ID'),
    /** 主体ID */
    PrincipalId: z.string().describe('主体ID'),
    /** 主体类型 */
    PrincipalType: z.string().describe('主体类型'),
  })
  .describe('添加项目成员主体 成员对象');

export type PrincipalAdd = z.infer<typeof PrincipalAddSchema>;

// --------------- PrincipalResp ---------------

/** 成员主体返回信息 */
export const PrincipalRespSchema = z
  .object({
    /** 添加时间 */
    CreatedAt: z.number().int().describe('添加时间'),
    /** 权限组Id */
    Policies: z.array(PolicySchema).nullable().describe('权限组Id'),
    /** 成员主体Id */
    PrincipalId: z.string().describe('成员主体Id'),
    /** 成员主体名称 */
    PrincipalName: z.string().describe('成员主体名称'),
    /** 成员主体类型 */
    PrincipalType: z.string().describe('成员主体类型'),
  })
  .describe('成员主体返回信息');

export type PrincipalResp = z.infer<typeof PrincipalRespSchema>;

// --------------- PrincipalData ---------------

/** 查询项目成员主体 响应信息 */
export const PrincipalDataSchema = z
  .object({
    /** 页数 */
    PageNumber: z.number().int().describe('页数'),
    /** 条数 */
    PageSize: z.number().int().describe('条数'),
    /** 成员主体信息 */
    Principals: z.array(PrincipalRespSchema).describe('成员主体信息'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('查询项目成员主体 响应信息');

export type PrincipalData = z.infer<typeof PrincipalDataSchema>;

// --------------- PrincipalDel ---------------

/** 删除项目成员主体 成员对象 */
export const PrincipalDelSchema = z
  .object({
    /** 主体ID */
    PrincipalId: z.string().describe('主体ID'),
    /** 主体类型，支持USER_GROUP、DEPARTMENT、USER */
    PrincipalType: z.string().describe('主体类型，支持USER_GROUP、DEPARTMENT、USER'),
  })
  .describe('删除项目成员主体 成员对象');

export type PrincipalDel = z.infer<typeof PrincipalDelSchema>;

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

// --------------- ProjectAnnouncementProjectAnnouncement ---------------

export const ProjectAnnouncementProjectAnnouncementSchema = z.object({
  /** 公告内容 */
  ContentHtml: z.string().describe('公告内容'),
  /** markdown 源文本 */
  ContentOrigin: z.string().describe('markdown 源文本'),
  /** 公告id */
  Id: z.number().int().describe('公告id'),
});

export type ProjectAnnouncementProjectAnnouncement = z.infer<
  typeof ProjectAnnouncementProjectAnnouncementSchema
>;

// --------------- ProjectLabelLabels ---------------

export const ProjectLabelLabelsSchema = z.object({
  /** 标签名 */
  Name: z.string().describe('标签名'),
  /** 颜色 */
  Color: z.string().describe('颜色'),
  /** 标签id */
  Id: z.number().int().describe('标签id'),
  /** 项目id */
  ProjectId: z.number().int().describe('项目id'),
  /** 创建人用户id */
  CreatorId: z.number().int().describe('创建人用户id'),
});

export type ProjectLabelLabels = z.infer<typeof ProjectLabelLabelsSchema>;

// --------------- Role ---------------

/** 用户组 */
export const RoleSchema = z
  .object({
    /** 用户组Id */
    RoleId: z.number().int().describe('用户组Id'),
    /** 用户组类型： UserDefined 用户自定义的角色， EnterpriseOwner 企业所有者，EnterpriseAdmin 企业管理员， EnterpriseMember 企业普通成员， ProjectAdmin 项目管理员， ProjectMember 项目成员-> 新的权限系统里面叫"开发"，ProjectGuest 项目受限成员 -> 新的权限系统里面叫"测试"，ProjectManager 项目经理，ProductManager 产品经理，ProjectOperation 运维 ProgramOwner 项目集负责人，ProgramAdmin 项目集管理员，ProgramMember 项目集成员， ProgramProjectMember 项目集-项目成员 */
    RoleType: z
      .string()
      .describe(
        '用户组类型： UserDefined 用户自定义的角色， EnterpriseOwner 企业所有者，EnterpriseAdmin 企业管理员， EnterpriseMember 企业普通成员， ProjectAdmin 项目管理员， ProjectMember 项目成员-> 新的权限系统里面叫"开发"，ProjectGuest 项目受限成员 -> 新的权限系统里面叫"测试"，ProjectManager 项目经理，ProductManager 产品经理，ProjectOperation 运维 ProgramOwner 项目集负责人，ProgramAdmin 项目集管理员，ProgramMember 项目集成员， ProgramProjectMember 项目集-项目成员',
      ),
    /** 用户组类型名称 */
    RoleTypeName: z.string().describe('用户组类型名称'),
  })
  .describe('用户组');

export type Role = z.infer<typeof RoleSchema>;

// --------------- ProjectMemberMemberRef ---------------

export const ProjectMemberMemberRefSchema = z.object({
  /** 是否管理员 */
  Assignee: z.boolean().nullable().describe('是否管理员'),
  /** 部门ID */
  DepartmentId: z.number().int().nullable().describe('部门ID'),
  /** 部门成员ID */
  DepartmentMemberId: z.number().int().nullable().describe('部门成员ID'),
  /** 部门名 */
  DepartmentName: z.string().nullable().describe('部门名'),
  /** 描述ID */
  DescribeId: z.string().nullable().describe('描述ID'),
  /** 是否是当前查询部门的直接成员 */
  Pointer: z.boolean().nullable().describe('是否是当前查询部门的直接成员'),
});

export type ProjectMemberMemberRef = z.infer<typeof ProjectMemberMemberRefSchema>;

// --------------- ProjectMemberDepartmentMember ---------------

export const ProjectMemberDepartmentMemberSchema = z.object({
  /** 部门成员refId */
  RefId: z.number().int().nullable().describe('部门成员refId'),
  /** 关联信息 */
  Refs: z.array(ProjectMemberMemberRefSchema).nullable().describe('关联信息'),
  /** 三方头像 */
  ThirdPartyAvatar: z.string().nullable().describe('三方头像'),
  /** 三方名 */
  ThirdPartyName: z.string().nullable().describe('三方名'),
  /** 三方ID，目前仅支持ldap的用户id信息 */
  ThirdPartyId: z.string().optional().describe('三方ID，目前仅支持ldap的用户id信息'),
});

export type ProjectMemberDepartmentMember = z.infer<typeof ProjectMemberDepartmentMemberSchema>;

// --------------- ProjectMemberUserData ---------------

/** 用户成员信息 */
export const ProjectMemberUserDataSchema = z
  .object({
    /** 头像 */
    Avatar: z.string().describe('头像'),
    /** 邮箱 */
    Email: z.string().describe('邮箱'),
    /** 邮箱是否验证 0 否 /1 是 */
    EmailValidation: z.number().int().describe('邮箱是否验证 0 否 /1 是'),
    /** 用户 GK */
    GlobalKey: z.string().describe('用户 GK'),
    /** 用户Id */
    Id: z.number().int().describe('用户Id'),
    /** 用户名 */
    Name: z.string().describe('用户名'),
    /** 用户名拼音 */
    NamePinYin: z.string().describe('用户名拼音'),
    /** 手机号 */
    Phone: z.string().describe('手机号'),
    /** 手机是否验证 0 否 /1 是 */
    PhoneValidation: z.number().int().describe('手机是否验证 0 否 /1 是'),
    /** 用户组 */
    Roles: z.array(RoleSchema).describe('用户组'),
    /** 用户状态 0不活跃，1活跃，-1被锁定，-2锁定登录，-3退出团队 */
    Status: z.number().int().describe('用户状态 0不活跃，1活跃，-1被锁定，-2锁定登录，-3退出团队'),
    /** 团队Id */
    TeamId: z.number().int().describe('团队Id'),
    /** 拓展字段 */
    UniqueExtField: z.string().optional().describe('拓展字段'),
    /** 用户组 */
    DepartmentMember: ProjectMemberDepartmentMemberSchema.optional().describe('用户组'),
  })
  .describe('用户成员信息');

export type ProjectMemberUserData = z.infer<typeof ProjectMemberUserDataSchema>;

// --------------- ProjectMemberData ---------------

/** 项目成员分页信息 */
export const ProjectMemberDataSchema = z
  .object({
    /** 第几页 */
    PageNumber: z.number().int().describe('第几页'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 项目成员列表信息 */
    ProjectMembers: z.array(ProjectMemberUserDataSchema).describe('项目成员列表信息'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('项目成员分页信息');

export type ProjectMemberData = z.infer<typeof ProjectMemberDataSchema>;

// --------------- ProjectsData ---------------

/** 查询团队内所有项目 */
export const ProjectsDataSchema = z
  .object({
    /** 第几页 */
    PageNumber: z.number().int().describe('第几页'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 项目集合 */
    ProjectList: z.array(ProjectSchema).nullable().describe('项目集合'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('查询团队内所有项目');

export type ProjectsData = z.infer<typeof ProjectsDataSchema>;
