import { z } from 'zod/v4';

// --------------- Token ---------------

/** 用于wiki 压缩包导入时的验证 */
export const TokenSchema = z
  .object({
    /** 验证文件的Token（用于导入wiki zip import 使用） */
    AuthToken: z.string().describe('验证文件的Token（用于导入wiki zip import 使用）'),
    /** cos存储对象 */
    Provider: z.string().describe('cos存储对象'),
    /** cos上传的Id */
    SecretId: z.string().describe('cos上传的Id'),
    /** cos上传的key （用于导入wiki zip import 使用） */
    SecretKey: z.string().describe('cos上传的key （用于导入wiki zip import 使用）'),
    /** 获取token 的时间（用于导入wiki zip import使用） */
    Time: z.number().int().describe('获取token 的时间（用于导入wiki zip import使用）'),
    /** 上传文件的Token */
    UpToken: z.string().describe('上传文件的Token'),
    /** 上传地址 */
    UploadLink: z.string().describe('上传地址'),
  })
  .describe('用于wiki 压缩包导入时的验证');

export type Token = z.infer<typeof TokenSchema>;

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

// --------------- WikiChildrenData ---------------

/** wiki自页面列表信息 */
export const WikiChildrenDataSchema = z
  .object({
    /** 内容 */
    Content: z.string().describe('内容'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 创建者 */
    Creator: UserSchema.describe('创建者'),
    /** 编辑者 */
    Editor: UserSchema.describe('编辑者'),
    /** wiki Id */
    Id: z.number().int().describe('wiki Id'),
    /** wiki编号 */
    Iid: z.number().int().describe('wiki编号'),
    /** 是否分享 */
    IsShared: z.boolean().describe('是否分享'),
    /** 是否整树分享 */
    IsTreeShared: z.boolean().describe('是否整树分享'),
    /** 所处顺序位置 */
    Order: z.number().describe('所处顺序位置'),
    /** 父级编号 */
    ParentIid: z.number().int().describe('父级编号'),
    /** 标题 */
    Title: z.string().describe('标题'),
    /** 更新时间 */
    UpdatedAt: z.number().int().describe('更新时间'),
    /** 可见范围 */
    VisibleRange: z.string().describe('可见范围'),
  })
  .describe('wiki自页面列表信息');

export type WikiChildrenData = z.infer<typeof WikiChildrenDataSchema>;

// --------------- WikiData ---------------

/** wiki的具体信息 */
export const WikiDataSchema = z
  .object({
    /** 是否为维护者 */
    CanMaintain: z.boolean().describe('是否为维护者'),
    /** 是否可以阅读 */
    CanRead: z.boolean().nullable().describe('是否可以阅读'),
    /** 内容 */
    Content: z.string().describe('内容'),
    /** 创建时间 */
    CreatedAt: z.string().describe('创建时间'),
    /** 创建者 */
    Creator: UserSchema.describe('创建者'),
    /** 当前versionId */
    CurrentVersion: z.number().int().describe('当前versionId'),
    /** 修改者 */
    Editor: UserSchema.describe('修改者'),
    /** 修改次数 */
    HistoriesCount: z.number().int().describe('修改次数'),
    /** wiki历史Id */
    HistoryId: z.number().int().describe('wiki历史Id'),
    /** 内容转成的html */
    Html: z.string().describe('内容转成的html'),
    /** wikiId */
    Id: z.number().int().describe('wikiId'),
    /** wik的code */
    Iid: z.number().int().describe('wik的code'),
    /** 最新versionId */
    LastVersion: z.number().int().describe('最新versionId'),
    /** 提交说明 */
    Msg: z.string().nullable().describe('提交说明'),
    /** 所处顺序位置 */
    Order: z.number().int().describe('所处顺序位置'),
    /** 父级 IiD */
    ParentIid: z.number().int().describe('父级 IiD'),
    /** 是否父级分享 */
    ParentShared: z.boolean().describe('是否父级分享'),
    /** 父级可见范围 */
    ParentVisibleRange: z.string().nullable().describe('父级可见范围'),
    /** 路径 */
    Path: z.string().nullable().describe('路径'),
    /** 标题 */
    Title: z.string().describe('标题'),
    /** 修改时间 */
    UpdatedAt: z.string().describe('修改时间'),
    /** 可见范围 */
    VisibleRange: z.string().nullable().describe('可见范围'),
  })
  .describe('wiki的具体信息');

export type WikiData = z.infer<typeof WikiDataSchema>;

// --------------- WikiJobStatus ---------------

/** 查询wiki导入状态信息 */
export const WikiJobStatusSchema = z
  .object({
    /** 任务Id */
    JobId: z.string().describe('任务Id'),
    /** 任务状态 */
    Status: z.string().describe('任务状态'),
  })
  .describe('查询wiki导入状态信息');

export type WikiJobStatus = z.infer<typeof WikiJobStatusSchema>;

// --------------- WikiListData ---------------

/** wiki列表信息 */
export const WikiListDataSchema = z
  .object({
    /** 子页面信息 */
    Children: z.array(WikiChildrenDataSchema).describe('子页面信息'),
    /** 内容 */
    Content: z.string().describe('内容'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 创建者 */
    Creator: UserSchema.describe('创建者'),
    /** 编辑者 */
    Editor: UserSchema.describe('编辑者'),
    /** wiki Id */
    Id: z.number().int().describe('wiki Id'),
    /** wiki编号 */
    Iid: z.number().int().describe('wiki编号'),
    /** 是否分享 */
    IsShared: z.boolean().describe('是否分享'),
    /** 是否整树分享 */
    IsTreeShared: z.boolean().describe('是否整树分享'),
    /** 所处顺序位置 */
    Order: z.number().describe('所处顺序位置'),
    /** 父级编号 */
    ParentIid: z.number().int().describe('父级编号'),
    /** 标题 */
    Title: z.string().describe('标题'),
    /** 更新时间 */
    UpdatedAt: z.number().int().describe('更新时间'),
    /** 可见范围 */
    VisibleRange: z.string().describe('可见范围'),
  })
  .describe('wiki列表信息');

export type WikiListData = z.infer<typeof WikiListDataSchema>;
