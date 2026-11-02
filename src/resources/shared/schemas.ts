import { z } from 'zod/v4';

// --------------- Role ---------------

/** 用户组 */
export const RoleSchema = z
  .object({
    /** 用户组 ID */
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
  .describe('RoleSchema 结构定义');

export type Role = z.infer<typeof RoleSchema>;
