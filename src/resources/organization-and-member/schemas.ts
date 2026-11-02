import { z } from 'zod/v4';

// --------------- ApiUserMemberRef ---------------

export const ApiUserMemberRefSchema = z.object({
  /** 是否管理员 */
  Assignee: z.boolean().optional().describe('是否管理员'),
  /** 部门ID */
  DepartmentId: z.number().int().optional().describe('部门ID'),
  /** 部门成员ID */
  DepartmentMemberId: z.number().int().optional().describe('部门成员ID'),
  /** 部门名 */
  DepartmentName: z.string().optional().describe('部门名'),
  /** 描述ID */
  DescribeId: z.string().optional().describe('描述ID'),
  /** 是否是当前查询部门的直接成员 */
  Pointer: z.boolean().optional().describe('是否是当前查询部门的直接成员'),
});

export type ApiUserMemberRef = z.infer<typeof ApiUserMemberRefSchema>;

// --------------- ApiUserRole ---------------

export const ApiUserRoleSchema = z.object({
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
});

export type ApiUserRole = z.infer<typeof ApiUserRoleSchema>;

// --------------- ApiUserUserDepartmentMember ---------------

export const ApiUserUserDepartmentMemberSchema = z.object({
  /** 部门成员refId */
  RefId: z.number().int().describe('部门成员refId'),
  /** 关联信息 */
  Refs: z.array(ApiUserMemberRefSchema).describe('关联信息'),
  /** 三方头像 */
  ThirdPartyAvatar: z.string().describe('三方头像'),
  /** 三方名 */
  ThirdPartyName: z.string().describe('三方名'),
  /** 三方ID，目前仅支持ldap的用户id信息 */
  ThirdPartyId: z.string().optional().describe('三方ID，目前仅支持ldap的用户id信息'),
});

export type ApiUserUserDepartmentMember = z.infer<typeof ApiUserUserDepartmentMemberSchema>;

// --------------- ApiUserUserData ---------------

export const ApiUserUserDataSchema = z.object({
  /** 头像 */
  Avatar: z.string().describe('头像'),
  /** 部门成员 */
  DepartmentMember: ApiUserUserDepartmentMemberSchema.describe('部门成员'),
  /** 邮件 */
  Email: z.string().describe('邮件'),
  /** 邮件校验 */
  EmailValidation: z.number().int().describe('邮件校验'),
  /** gk */
  GlobalKey: z.string().describe('gk'),
  /** 用户ID */
  Id: z.number().int().describe('用户ID'),
  /** 用户名 */
  Name: z.string().describe('用户名'),
  /** 用户拼音名 */
  NamePinYin: z.string().describe('用户拼音名'),
  /** 手机号 */
  Phone: z.string().describe('手机号'),
  /** 手机校验 */
  PhoneValidation: z.number().int().describe('手机校验'),
  /** 角色 */
  Roles: z.array(ApiUserRoleSchema).describe('角色'),
  /** 用户状态 0不活跃，1活跃，-1被锁定，-2锁定登录，-3退出团队 */
  Status: z.number().int().describe('用户状态 0不活跃，1活跃，-1被锁定，-2锁定登录，-3退出团队'),
  /** 团队ID */
  TeamId: z.number().int().describe('团队ID'),
  /** 团队用户扩展字段、唯一。非必填 */
  UniqueExtField: z.string().describe('团队用户扩展字段、唯一。非必填'),
});

export type ApiUserUserData = z.infer<typeof ApiUserUserDataSchema>;

// --------------- DepartmentDepartmentData ---------------

/** 部门信息 */
export const DepartmentDepartmentDataSchema = z
  .object({
    /** 创建人ID */
    CreatorId: z.number().int().describe('创建人ID'),
    /** 部门ID */
    Id: z.number().int().describe('部门ID'),
    /** 部门名 */
    Name: z.string().describe('部门名'),
    /** 父级部门ID */
    ParentId: z.number().int().describe('父级部门ID'),
    /** 排序值 */
    Sort: z.number().int().describe('排序值'),
    /** 团队ID */
    TeamId: z.number().int().describe('团队ID'),
  })
  .describe('部门信息');

export type DepartmentDepartmentData = z.infer<typeof DepartmentDepartmentDataSchema>;

// --------------- DepartmentDepartmentMemberRef ---------------

/** 关联的 部门等信息 */
export const DepartmentDepartmentMemberRefSchema = z
  .object({
    /** 是否部门负责人 */
    Assignee: z.boolean().describe('是否部门负责人'),
    /** 部门ID */
    DepartmentId: z.number().int().describe('部门ID'),
    /** 部门成员ID */
    DepartmentMemberId: z.number().int().describe('部门成员ID'),
    /** 部门名 */
    DepartmentName: z.string().describe('部门名'),
    /** 部门描述ID */
    DescribeId: z.string().describe('部门描述ID'),
    /** 是否是当前查询部门的直接成员 */
    Pointer: z.boolean().describe('是否是当前查询部门的直接成员'),
    /** 部门用户的refId */
    RefId: z.number().int().describe('部门用户的refId'),
  })
  .describe('关联的 部门等信息');

export type DepartmentDepartmentMemberRef = z.infer<typeof DepartmentDepartmentMemberRefSchema>;

// --------------- DepartmentDepartmentMembersData ---------------

/** 部门成员信息 */
export const DepartmentDepartmentMembersDataSchema = z
  .object({
    /** 是否授权 实际表示已加入或已被授权，如果要表示 已授权未加入(allowed && userId>0) */
    Allowed: z
      .boolean()
      .describe('是否授权 实际表示已加入或已被授权，如果要表示 已授权未加入(allowed && userId>0)'),
    /** 头像 */
    Avatar: z.string().describe('头像'),
    /** 是否被锁定 */
    Locked: z.boolean().describe('是否被锁定'),
    /** 成员名 */
    Name: z.string().describe('成员名'),
    /** 是否部门所有者 */
    Owner: z.boolean().describe('是否部门所有者'),
    /** 部门用户的refId */
    RefId: z.number().int().describe('部门用户的refId'),
    /** 关联的 部门等信息 */
    Refs: z.array(DepartmentDepartmentMemberRefSchema).describe('关联的 部门等信息'),
    /** 三方头像 */
    ThirdPartyAvatar: z.string().describe('三方头像'),
    /** 三方名 */
    ThirdPartyName: z.string().describe('三方名'),
    /** 用户GK */
    UserGlobalKey: z.string().describe('用户GK'),
    /** 用户ID */
    UserId: z.number().int().describe('用户ID'),
    /** 用户状态 0不活跃，1活跃，-1被锁定，-2锁定登录，-3退出团队 */
    UserStatus: z
      .number()
      .int()
      .describe('用户状态 0不活跃，1活跃，-1被锁定，-2锁定登录，-3退出团队'),
  })
  .describe('部门成员信息');

export type DepartmentDepartmentMembersData = z.infer<typeof DepartmentDepartmentMembersDataSchema>;

// --------------- DepartmentDepartmentTreeData ---------------

export interface DepartmentDepartmentTreeData {
  /** 子部门信息 */
  Children: DepartmentDepartmentTreeData[];
  /** 创建人ID */
  CreatorId: number;
  /** 部门描述ID */
  DescribeId: string;
  /** 部门ID */
  Id: number;
  /** 部门名 */
  Name: string;
  /** 父级部门ID */
  ParentId: number;
  /** 排序值 */
  Sort: number;
  /** 团队ID */
  TeamId: number;
}

export const DepartmentDepartmentTreeDataSchema: z.ZodType<DepartmentDepartmentTreeData> = z.lazy(
  () =>
    z.object({
      /** 子部门信息 */
      Children: z.array(DepartmentDepartmentTreeDataSchema).describe('子部门信息'),
      /** 创建人ID */
      CreatorId: z.number().int().describe('创建人ID'),
      /** 部门描述ID */
      DescribeId: z.string().describe('部门描述ID'),
      /** 部门ID */
      Id: z.number().int().describe('部门ID'),
      /** 部门名 */
      Name: z.string().describe('部门名'),
      /** 父级部门ID */
      ParentId: z.number().int().describe('父级部门ID'),
      /** 排序值 */
      Sort: z.number().int().describe('排序值'),
      /** 团队ID */
      TeamId: z.number().int().describe('团队ID'),
    }),
);

// --------------- DepartmentDescribeDepartmentMemberPageList ---------------

/** 部门成员分页数据 */
export const DepartmentDescribeDepartmentMemberPageListSchema = z
  .object({
    /** 部门成员 */
    DepartmentMembers: z.array(DepartmentDepartmentMembersDataSchema).describe('部门成员'),
    /** 页数 */
    PageNumber: z.number().int().describe('页数'),
    /** 每页数量 */
    PageSize: z.number().int().describe('每页数量'),
    /** 总数 */
    TotalCount: z.number().int().describe('总数'),
  })
  .describe('部门成员分页数据');

export type DepartmentDescribeDepartmentMemberPageList = z.infer<
  typeof DepartmentDescribeDepartmentMemberPageListSchema
>;

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

// --------------- TeamAdminMember ---------------

/** 团队管理员信息 */
export const TeamAdminMemberSchema = z
  .object({
    /** 头像 */
    Avatar: z.string().describe('头像'),
    /** 用户 GK */
    GlobalKey: z.string().describe('用户 GK'),
    /** 用户Id */
    Id: z.number().int().describe('用户Id'),
    /** 用户名 */
    Name: z.string().describe('用户名'),
    /** 用户名拼音 */
    NamePinYin: z.string().describe('用户名拼音'),
    /** 团队Id */
    TeamId: z.number().int().describe('团队Id'),
  })
  .describe('团队管理员信息');

export type TeamAdminMember = z.infer<typeof TeamAdminMemberSchema>;

// --------------- TeamAdminMemberData ---------------

/** 团队管理员分页数据 */
export const TeamAdminMemberDataSchema = z
  .object({
    /** 团队管理员列表信息 */
    Members: z.array(TeamAdminMemberSchema).describe('团队管理员列表信息'),
    /** 第几页 */
    PageNumber: z.number().int().describe('第几页'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('团队管理员分页数据');

export type TeamAdminMemberData = z.infer<typeof TeamAdminMemberDataSchema>;

// --------------- UserData ---------------

/** 用户成员信息 */
export const UserDataSchema = z
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
    /** 部门成员 */
    DepartmentMember: ProjectMemberDepartmentMemberSchema.optional().describe('部门成员'),
    /** 团队用户扩展字段、唯一。非必填 */
    UniqueExtField: z.string().optional().describe('团队用户扩展字段、唯一。非必填'),
  })
  .describe('用户成员信息');

export type UserData = z.infer<typeof UserDataSchema>;

// --------------- TeamMemberData ---------------

/** 团队成员分页信息 */
export const TeamMemberDataSchema = z
  .object({
    /** 第几页 */
    PageNumber: z.number().int().describe('第几页'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 成员列表信息 */
    TeamMembers: z.array(UserDataSchema).describe('成员列表信息'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('团队成员分页信息');

export type TeamMemberData = z.infer<typeof TeamMemberDataSchema>;
