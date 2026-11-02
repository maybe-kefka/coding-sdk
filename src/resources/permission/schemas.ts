import { z } from 'zod/v4';

// --------------- DescribeAvailablePoliciesOnResourceRequestFilter ---------------

/** 查询指定资源可用的 policy 列表的查询条件 */
export const DescribeAvailablePoliciesOnResourceRequestFilterSchema = z
  .object({
    /** 权限组显示名称，模糊匹配 */
    PolicyAlias: z.string().optional().describe('权限组显示名称，模糊匹配'),
    /** 可见范围（默认 true），all：全部；true：用户可见；false：界面不可见（逻辑权限组） */
    Visible: z
      .string()
      .optional()
      .describe(
        '可见范围（默认 true），all：全部；true：用户可见；false：界面不可见（逻辑权限组）',
      ),
  })
  .describe('查询指定资源可用的 policy 列表的查询条件');

export type DescribeAvailablePoliciesOnResourceRequestFilter = z.infer<
  typeof DescribeAvailablePoliciesOnResourceRequestFilterSchema
>;

// --------------- PolicyInfo ---------------

/** 权限组信息 */
export const PolicyInfoSchema = z
  .object({
    /** 显示名称 */
    Alias: z.string().describe('显示名称'),
    /** 版本号 */
    CurrentVersion: z.string().describe('版本号'),
    /** 版本记录 ID */
    CurrentVersionId: z.number().int().describe('版本记录 ID'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 权限组 ID */
    PolicyId: z.number().int().describe('权限组 ID'),
    /** 类型：IDENTITY | RESOURCE */
    PolicyType: z.string().describe('类型：IDENTITY | RESOURCE'),
    /** 作用范围：SYSTEM | CUSTOM */
    Scope: z.string().describe('作用范围：SYSTEM | CUSTOM'),
  })
  .describe('权限组信息');

export type PolicyInfo = z.infer<typeof PolicyInfoSchema>;

// --------------- DescribeAvailablePoliciesOnResponsePageData ---------------

/** 查询指定资源可用的权限组列表的分页数据 */
export const DescribeAvailablePoliciesOnResponsePageDataSchema = z
  .object({
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 权限组列表 */
    PolicyList: z.array(PolicyInfoSchema).nullable().describe('权限组列表'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('查询指定资源可用的权限组列表的分页数据');

export type DescribeAvailablePoliciesOnResponsePageData = z.infer<
  typeof DescribeAvailablePoliciesOnResponsePageDataSchema
>;

// --------------- GrantObjectInfo ---------------

/** 授权对象信息 */
export const GrantObjectInfoSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 授权对象 ID */
    GrantObjectId: z.string().describe('授权对象 ID'),
    /** 授权对象名称 */
    GrantObjectName: z.string().describe('授权对象名称'),
    /** 授权对象类型：USER,USER_GROUP,DEPARTMENT */
    GrantScope: z.string().describe('授权对象类型：USER,USER_GROUP,DEPARTMENT'),
  })
  .describe('授权对象信息');

export type GrantObjectInfo = z.infer<typeof GrantObjectInfoSchema>;

// --------------- DescribeGrantObjectsOnResourcePageData ---------------

/** 资源下授权体列表分页数据 */
export const DescribeGrantObjectsOnResourcePageDataSchema = z
  .object({
    /** 授权资源列表 */
    GrantObjectList: z.array(GrantObjectInfoSchema).nullable().describe('授权资源列表'),
    /** 请求页数 */
    PageNumber: z.number().int().nullable().describe('请求页数'),
    /** 请求条数 */
    PageSize: z.number().int().nullable().describe('请求条数'),
    /** 总条数 */
    TotalCount: z.number().int().nullable().describe('总条数'),
  })
  .describe('资源下授权体列表分页数据');

export type DescribeGrantObjectsOnResourcePageData = z.infer<
  typeof DescribeGrantObjectsOnResourcePageDataSchema
>;

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

// --------------- DescribeGrantUsersOnResourcePageData ---------------

/** 指定资源下授权的用户列表分页数据 */
export const DescribeGrantUsersOnResourcePageDataSchema = z
  .object({
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
    /** 请求条数 */
    PageSize: z.number().int().describe('请求条数'),
    /** 请求页数 */
    PageNumber: z.number().int().describe('请求页数'),
    UserDataList: z.array(UserDataSchema),
  })
  .describe('指定资源下授权的用户列表分页数据');

export type DescribeGrantUsersOnResourcePageData = z.infer<
  typeof DescribeGrantUsersOnResourcePageDataSchema
>;

// --------------- DescribePoliciesOnResourceTypeRequestFilter ---------------

/** 获取指定资源类型对应的权限组列表的查询条件 */
export const DescribePoliciesOnResourceTypeRequestFilterSchema = z
  .object({
    /** 权限组显示名称，模糊匹配 */
    PolicyAlias: z.string().optional().describe('权限组显示名称，模糊匹配'),
    /** 资源类型，精确匹配 */
    ResourceType: z.string().describe('资源类型，精确匹配'),
    /** 可见范围（默认 true），all：全部；true：用户可见；false：界面不可见（逻辑权限组） */
    Visible: z
      .string()
      .optional()
      .describe(
        '可见范围（默认 true），all：全部；true：用户可见；false：界面不可见（逻辑权限组）',
      ),
  })
  .describe('获取指定资源类型对应的权限组列表的查询条件');

export type DescribePoliciesOnResourceTypeRequestFilter = z.infer<
  typeof DescribePoliciesOnResourceTypeRequestFilterSchema
>;

// --------------- DescribePoliciesOnResourceTypeResponsePageData ---------------

/** 获取指定资源类型对应的权限组列表的数据 */
export const DescribePoliciesOnResourceTypeResponsePageDataSchema = z
  .object({
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 权限组列表 */
    PolicyList: z.array(PolicyInfoSchema).nullable().describe('权限组列表'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('获取指定资源类型对应的权限组列表的数据');

export type DescribePoliciesOnResourceTypeResponsePageData = z.infer<
  typeof DescribePoliciesOnResourceTypeResponsePageDataSchema
>;

// --------------- DescribeResourceScopeListOnPolicyRequestFilter ---------------

/** 查询指定权限组的可用资源范围（分页）的查询条件 */
export const DescribeResourceScopeListOnPolicyRequestFilterSchema = z
  .object({
    /** 资源类型（精确匹配） */
    ResourceType: z.string().nullable().optional().describe('资源类型（精确匹配）'),
  })
  .describe('查询指定权限组的可用资源范围（分页）的查询条件');

export type DescribeResourceScopeListOnPolicyRequestFilter = z.infer<
  typeof DescribeResourceScopeListOnPolicyRequestFilterSchema
>;

// --------------- ResourceInfoOfPolicyScope ---------------

/** 权限组可用资源范围的资源信息 */
export const ResourceInfoOfPolicyScopeSchema = z
  .object({
    /** 资源 ID */
    ResourceId: z.string().describe('资源 ID'),
    /** 资源类型：例如 project */
    ResourceType: z.string().describe('资源类型：例如 project'),
  })
  .describe('权限组可用资源范围的资源信息');

export type ResourceInfoOfPolicyScope = z.infer<typeof ResourceInfoOfPolicyScopeSchema>;

// --------------- PolicyResourceScopeInfo ---------------

/** 权限组的可用资源范围信息 */
export const PolicyResourceScopeInfoSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 权限组 ID */
    PolicyId: z.number().int().describe('权限组 ID'),
    /** 资源信息 */
    Resource: ResourceInfoOfPolicyScopeSchema.describe('资源信息'),
  })
  .describe('权限组的可用资源范围信息');

export type PolicyResourceScopeInfo = z.infer<typeof PolicyResourceScopeInfoSchema>;

// --------------- DescribeResourceScopeListOnPolicyResponseData ---------------

/** 查询指定权限组的可用资源范围（分页）的列表数据 */
export const DescribeResourceScopeListOnPolicyResponseDataSchema = z
  .object({
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 权限组可用资源范围列表 */
    PolicyResourceScopeList: z
      .array(PolicyResourceScopeInfoSchema)
      .nullable()
      .describe('权限组可用资源范围列表'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('查询指定权限组的可用资源范围（分页）的列表数据');

export type DescribeResourceScopeListOnPolicyResponseData = z.infer<
  typeof DescribeResourceScopeListOnPolicyResponseDataSchema
>;

// --------------- DescribeUserGroupsRequestFilter ---------------

/** 用户组列表查询条件 */
export const DescribeUserGroupsRequestFilterSchema = z
  .object({
    /** 用户组名称 */
    GroupName: z.string().optional().describe('用户组名称'),
  })
  .describe('用户组列表查询条件');

export type DescribeUserGroupsRequestFilter = z.infer<typeof DescribeUserGroupsRequestFilterSchema>;

// --------------- UserGroup ---------------

/** 用户组 */
export const UserGroupSchema = z
  .object({
    /** 用户组创建时间 */
    CreatedAt: z.number().int().nullable().describe('用户组创建时间'),
    /** 用户组描述 */
    Description: z.string().nullable().describe('用户组描述'),
    /** 用户组 ID */
    Id: z.number().int().describe('用户组 ID'),
    /** 用户组名称 */
    Name: z.string().describe('用户组名称'),
  })
  .describe('用户组');

export type UserGroup = z.infer<typeof UserGroupSchema>;

// --------------- DescribeUserGroupsResponsePageData ---------------

/** 用户组列表的分页数据 */
export const DescribeUserGroupsResponsePageDataSchema = z
  .object({
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
    /** 用户组列表 */
    UserGroupList: z.array(UserGroupSchema).nullable().describe('用户组列表'),
  })
  .describe('用户组列表的分页数据');

export type DescribeUserGroupsResponsePageData = z.infer<
  typeof DescribeUserGroupsResponsePageDataSchema
>;

// --------------- DescribeUsersByGroupIdResponsePageData ---------------

/** 用户列表分页数据 */
export const DescribeUsersByGroupIdResponsePageDataSchema = z
  .object({
    /** 页码 */
    PageNumber: z.number().int().nullable().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().nullable().describe('每页条数'),
    /** 总条数 */
    TotalCount: z.number().int().nullable().describe('总条数'),
    /** 用户组列表 */
    UserDataList: z.array(UserDataSchema).nullable().optional().describe('用户组列表'),
  })
  .describe('用户列表分页数据');

export type DescribeUsersByGroupIdResponsePageData = z.infer<
  typeof DescribeUsersByGroupIdResponsePageDataSchema
>;

// --------------- DescribeUsersOnResourceAndGrantObjectGrantInfo ---------------

/** 资源下的授权对象中的用户信息请求参数 */
export const DescribeUsersOnResourceAndGrantObjectGrantInfoSchema = z
  .object({
    /** 授权对象 ID */
    GrantObjectId: z.string().nullable().describe('授权对象 ID'),
    /** 授权对象类型：USER,USER_GROUP,DEPARTMENT */
    GrantScope: z.string().nullable().describe('授权对象类型：USER,USER_GROUP,DEPARTMENT'),
  })
  .describe('资源下的授权对象中的用户信息请求参数');

export type DescribeUsersOnResourceAndGrantObjectGrantInfo = z.infer<
  typeof DescribeUsersOnResourceAndGrantObjectGrantInfoSchema
>;

// --------------- DescribeUsersOnResourceAndGrantObjectPageData ---------------

/** 指定资源下某个授权体中用户列表分页数据 */
export const DescribeUsersOnResourceAndGrantObjectPageDataSchema = z
  .object({
    /** 请求页数 */
    PageNumber: z.number().int().nullable().describe('请求页数'),
    /** 请求条数 */
    PageSize: z.number().int().nullable().describe('请求条数'),
    /** 总条数 */
    TotalCount: z.number().int().nullable().describe('总条数'),
    /** 用户信息列表 */
    UserDataList: z.array(UserDataSchema).nullable().optional().describe('用户信息列表'),
  })
  .describe('指定资源下某个授权体中用户列表分页数据');

export type DescribeUsersOnResourceAndGrantObjectPageData = z.infer<
  typeof DescribeUsersOnResourceAndGrantObjectPageDataSchema
>;

// --------------- GrantInfo ---------------

/** 授权信息 */
export const GrantInfoSchema = z
  .object({
    /** 授权对象 ID */
    GrantObjectId: z.string().describe('授权对象 ID'),
    /** 授权对象类型：USER,USER_GROUP,DEPARTMENT */
    GrantScope: z.string().describe('授权对象类型：USER,USER_GROUP,DEPARTMENT'),
    /** 权限组 ID */
    PolicyId: z.number().int().describe('权限组 ID'),
    /** 身份 key，后期扩展场景使用，暂时留空即可 */
    PrincipalKey: z.string().optional().describe('身份 key，后期扩展场景使用，暂时留空即可'),
    /** 身份 value，后期扩展场景使用，暂时留空即可 */
    PrincipalValue: z.string().optional().describe('身份 value，后期扩展场景使用，暂时留空即可'),
  })
  .describe('授权信息');

export type GrantInfo = z.infer<typeof GrantInfoSchema>;

// --------------- PolicyStatement ---------------

/** 权限组授权句柄 */
export const PolicyStatementSchema = z
  .object({
    /** 权限 action 的二段式描述 */
    Action: z.array(z.string()).describe('权限 action 的二段式描述'),
    /** 效能：ALLOW | DENY */
    Effect: z.string().describe('效能：ALLOW | DENY'),
    /** 授权资源的三段式描述，一般填 * 即可 */
    Resource: z.array(z.string()).describe('授权资源的三段式描述，一般填 * 即可'),
  })
  .describe('权限组授权句柄');

export type PolicyStatement = z.infer<typeof PolicyStatementSchema>;

// --------------- PolicyDocument ---------------

/** 权限组 Document */
export const PolicyDocumentSchema = z
  .object({
    /** 授权句柄 */
    Statement: z.array(PolicyStatementSchema).describe('授权句柄'),
  })
  .describe('权限组 Document');

export type PolicyDocument = z.infer<typeof PolicyDocumentSchema>;

// --------------- PolicyDetail ---------------

/** 权限组详情 */
export const PolicyDetailSchema = z
  .object({
    /** 显示名称 */
    Alias: z.string().describe('显示名称'),
    /** 版本号 */
    CurrentVersion: z.string().describe('版本号'),
    /** 版本记录 ID */
    CurrentVersionId: z.number().int().describe('版本记录 ID'),
    /** 描述 */
    Description: z.string().nullable().describe('描述'),
    /** 名称 */
    Name: z.string().describe('名称'),
    /** 权限语句 */
    PolicyDocument: PolicyDocumentSchema.describe('权限语句'),
    /** 权限组 ID */
    PolicyId: z.number().int().describe('权限组 ID'),
    /** 权限组类型：IDENTITY | RESOURCE */
    PolicyType: z.string().describe('权限组类型：IDENTITY | RESOURCE'),
    /** 作用范围： SYSTEM | CUSTOM */
    Scope: z.string().describe('作用范围： SYSTEM | CUSTOM'),
  })
  .describe('权限组详情');

export type PolicyDetail = z.infer<typeof PolicyDetailSchema>;

// --------------- PredicatePolicy ---------------

/** 资源权限判定策略信息 */
export const PredicatePolicySchema = z
  .object({
    /** 是否存在admin授权 */
    HasAdministrator: z.boolean().describe('是否存在admin授权'),
    /** SELF_PARENT  // 同时使用父级资源+当前资源 SELF_NONE  // 只使用当前资源 NONE_PARENT  // 只使用父级资源 */
    ResourcePredicatePolicy: z
      .string()
      .describe(
        'SELF_PARENT  // 同时使用父级资源+当前资源 SELF_NONE  // 只使用当前资源 NONE_PARENT  // 只使用父级资源',
      ),
  })
  .describe('资源权限判定策略信息');

export type PredicatePolicy = z.infer<typeof PredicatePolicySchema>;

// --------------- RamGrantResourceInfoRequest ---------------

export const RamGrantResourceInfoRequestSchema = z.object({
  /** 资源 ID  */
  ResourceId: z.string().describe('资源 ID '),
  /** 资源类型 */
  ResourceType: z.string().describe('资源类型'),
});

export type RamGrantResourceInfoRequest = z.infer<typeof RamGrantResourceInfoRequestSchema>;

// --------------- ResourceInfo ---------------

/** 授权的资源信息 */
export const ResourceInfoSchema = z
  .object({
    /** 资源三段式描述的资源定位描述，支持 path 形式及模糊表达匹配 */
    RelativeResource: z
      .string()
      .optional()
      .describe('资源三段式描述的资源定位描述，支持 path 形式及模糊表达匹配'),
    /** 资源 ID */
    ResourceId: z.string().describe('资源 ID'),
    /** 资源三段式描述的 scope，目前固定 coding */
    ResourceScope: z.string().optional().describe('资源三段式描述的 scope，目前固定 coding'),
    /** 资源类型：例如 project */
    ResourceType: z.string().describe('资源类型：例如 project'),
    /** 资源三段式描述的 serviceName 部分，表示业务模块 */
    ServiceName: z.string().optional().describe('资源三段式描述的 serviceName 部分，表示业务模块'),
  })
  .describe('授权的资源信息');

export type ResourceInfo = z.infer<typeof ResourceInfoSchema>;

// --------------- UserGroupUserInfos ---------------

/** 用户组用户信息 */
export const UserGroupUserInfosSchema = z
  .object({
    /** 用户组id */
    GroupId: z.number().int().nullable().describe('用户组id'),
    /** 用户id */
    UserId: z.number().int().nullable().describe('用户id'),
  })
  .describe('用户组用户信息');

export type UserGroupUserInfos = z.infer<typeof UserGroupUserInfosSchema>;
