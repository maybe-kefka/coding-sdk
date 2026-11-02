import { z } from 'zod/v4';

// --------------- ServiceHookUser ---------------

/** ServiceHook User 对象 */
export const ServiceHookUserSchema = z
  .object({
    /** 用户头像 */
    Avatar: z.string().describe('用户头像'),
    /** 用户编号 */
    Id: z.number().int().describe('用户编号'),
    /** 用户名 */
    Name: z.string().describe('用户名'),
    /** 用户名拼音 */
    NamePinyin: z.string().describe('用户名拼音'),
  })
  .describe('ServiceHook User 对象');

export type ServiceHookUser = z.infer<typeof ServiceHookUserSchema>;

// --------------- ServiceHook ---------------

/** ServiceHook 对象 */
export const ServiceHookSchema = z
  .object({
    /** 发送类型 */
    Action: z.string().describe('发送类型'),
    /** 发送类型描述 */
    ActionLabel: z.string().describe('发送类型描述'),
    /** 发送行为属性 */
    ActionProperties: z.string().describe('发送行为属性'),
    /** 创建时间 */
    CreatedAt: z.number().int().describe('创建时间'),
    /** 创建者编号 */
    CreatorBy: z.number().int().describe('创建者编号'),
    /** 创建者 */
    CreatorByUser: ServiceHookUserSchema.describe('创建者'),
    /** 事件开关 */
    Enabled: z.boolean().describe('事件开关'),
    /** 事件列表 */
    Event: z.array(z.string()).describe('事件列表'),
    /** 事件描述列表 */
    EventLabel: z.array(z.string()).describe('事件描述列表'),
    /** 过滤器属性 */
    FilterProperties: z.string().describe('过滤器属性'),
    /** Service Hook 编号 */
    Id: z.string().describe('Service Hook 编号'),
    /** 最近发送成功时间 */
    LastSucceedAt: z.number().int().describe('最近发送成功时间'),
    /** Service Hook 名称 */
    Name: z.string().describe('Service Hook 名称'),
    /** 服务类型 */
    Service: z.string().describe('服务类型'),
    /** 服务名 */
    ServiceName: z.string().describe('服务名'),
    /** 发送状态 */
    Status: z.number().int().describe('发送状态'),
    /** 目标数据编号 */
    TargetId: z.number().int().describe('目标数据编号'),
    /** 目标数据类型：Project、Team,Space,Program */
    TargetType: z.string().describe('目标数据类型：Project、Team,Space,Program'),
    /** 更新时间 */
    UpdatedAt: z.number().int().describe('更新时间'),
    /** 更新者编号 */
    UpdatedBy: z.number().int().describe('更新者编号'),
    /** 更新者 */
    UpdatedByUser: ServiceHookUserSchema.describe('更新者'),
    /** 版本 */
    Version: z.number().int().describe('版本'),
  })
  .describe('ServiceHook 对象');

export type ServiceHook = z.infer<typeof ServiceHookSchema>;

// --------------- ServiceHookEvent ---------------

/** 事件详情 */
export const ServiceHookEventSchema = z
  .object({
    /** 分组名 */
    GroupLabel: z.string().describe('分组名'),
    /** 分组标识 */
    GroupName: z.string().describe('分组标识'),
    /** 事件名 */
    Label: z.string().describe('事件名'),
    /** 事件标识 */
    Name: z.string().describe('事件标识'),
  })
  .describe('事件详情');

export type ServiceHookEvent = z.infer<typeof ServiceHookEventSchema>;

// --------------- ServiceHookLog ---------------

/** Service Hook 发送记录 */
export const ServiceHookLogSchema = z
  .object({
    /** 创建时间 */
    CreatedAt: z.number().int().nullable().describe('创建时间'),
    /** 事件名 */
    Event: z.string().nullable().describe('事件名'),
    /** 日志记录编号 */
    Id: z.string().describe('日志记录编号'),
    /** 发送请求内容 */
    RequestContent: z.string().nullable().describe('发送请求内容'),
    /** 发送请求头 */
    RequestHeaders: z.string().nullable().describe('发送请求头'),
    /** 发送请求编号 */
    RequestId: z.string().nullable().describe('发送请求编号'),
    /** 响应事件 */
    ResponseAt: z.number().int().nullable().describe('响应事件'),
    /** 响应内容 */
    ResponseBody: z.string().nullable().describe('响应内容'),
    /** 响应头 */
    ResponseHeaders: z.string().nullable().describe('响应头'),
    /** 响应状态码 */
    ResponseStatus: z.number().int().nullable().describe('响应状态码'),
    /** 发送事件 */
    SendAt: z.number().int().nullable().describe('发送事件'),
    /** Service Hook 编号 */
    ServiceHookId: z.string().nullable().describe('Service Hook 编号'),
    /** 发送状态 */
    Status: z.number().int().nullable().describe('发送状态'),
  })
  .describe('Service Hook 发送记录');

export type ServiceHookLog = z.infer<typeof ServiceHookLogSchema>;

// --------------- ServiceHookLogPage ---------------

/** Service Hook 发送记录分页 */
export const ServiceHookLogPageSchema = z
  .object({
    /** Service Hook 发送记录列表 */
    Log: z.array(ServiceHookLogSchema).describe('Service Hook 发送记录列表'),
    /** 分页页码 */
    PageNumber: z.number().int().describe('分页页码'),
    /** 分页大小 */
    PageSize: z.number().int().describe('分页大小'),
    /** 总记录数 */
    TotalCount: z.number().int().describe('总记录数'),
  })
  .describe('Service Hook 发送记录分页');

export type ServiceHookLogPage = z.infer<typeof ServiceHookLogPageSchema>;

// --------------- ServiceHookPage ---------------

/** Service Hook 分页数据 */
export const ServiceHookPageSchema = z
  .object({
    /** 分页页码 */
    PageNumber: z.number().int().describe('分页页码'),
    /** 分页大小 */
    PageSize: z.number().int().describe('分页大小'),
    /** Service Hook 列表 */
    ServiceHook: z.array(ServiceHookSchema).describe('Service Hook 列表'),
    /** 总记录数 */
    TotalCount: z.number().int().describe('总记录数'),
  })
  .describe('Service Hook 分页数据');

export type ServiceHookPage = z.infer<typeof ServiceHookPageSchema>;

// --------------- ServiceHookResendServiceHookResult ---------------

export const ServiceHookResendServiceHookResultSchema = z.object({
  /** 是否成功 */
  Success: z.boolean().describe('是否成功'),
});

export type ServiceHookResendServiceHookResult = z.infer<
  typeof ServiceHookResendServiceHookResultSchema
>;
