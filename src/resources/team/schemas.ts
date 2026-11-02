import { z } from 'zod/v4';

// --------------- CurrentUser ---------------

/** 当前用户信息 */
export const CurrentUserSchema = z
  .object({
    /** 头像地址 */
    Avatar: z.string().nullable().describe('头像地址'),
    /** 邮箱 */
    Email: z.string().nullable().describe('邮箱'),
    /** 邮箱是否已验证 */
    EmailValidation: z.number().int().nullable().describe('邮箱是否已验证'),
    /** 用户唯一标志 */
    GlobalKey: z.string().nullable().describe('用户唯一标志'),
    /** 无用头像 */
    Gravatar: z.string().nullable().describe('无用头像'),
    /** 用户 ID */
    Id: z.number().int().describe('用户 ID'),
    /** 姓名 */
    Name: z.string().nullable().describe('姓名'),
    /** 姓名拼音 */
    NamePinYin: z.string().nullable().describe('姓名拼音'),
    /** 联系电话 */
    Phone: z.string().nullable().describe('联系电话'),
    /** 手机号地区 */
    PhoneRegionCode: z.string().nullable().describe('手机号地区'),
    /** 手机是否已验证 */
    PhoneValidation: z.number().int().nullable().describe('手机是否已验证'),
    /** 区号 */
    Region: z.string().nullable().describe('区号'),
    /** 状态(新用户/已激活) */
    Status: z.number().int().nullable().describe('状态(新用户/已激活)'),
    /** 团队 ID */
    TeamId: z.number().int().nullable().describe('团队 ID'),
    /** 企微id */
    WeComId: z.string().nullable().describe('企微id'),
  })
  .describe('当前用户信息');

export type CurrentUser = z.infer<typeof CurrentUserSchema>;

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

// --------------- TeamData ---------------

/** 团队和团队所有者信息 */
export const TeamDataSchema = z
  .object({
    /** 团队域名 */
    TeamHost: z.string().describe('团队域名'),
    /** 团队名-拼音 */
    NamePinYin: z.string().describe('团队名-拼音'),
    /** 团队ID */
    Id: z.number().int().describe('团队ID'),
    /** 团队所有者信息 */
    TeamOwner: UserDataSchema.describe('团队所有者信息'),
    /** 团队图标 */
    Avatar: z.string().describe('团队图标'),
    /** 团队名 */
    Name: z.string().describe('团队名'),
    /** 是否实名认证 */
    IsVerification: z.boolean().describe('是否实名认证'),
  })
  .describe('团队和团队所有者信息');

export type TeamData = z.infer<typeof TeamDataSchema>;
