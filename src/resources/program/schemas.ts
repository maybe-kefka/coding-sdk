import { z } from 'zod/v4';

// --------------- Program ---------------

/** 项目/项目集数据 */
export const ProgramSchema = z
  .object({
    /** 结束时间 */
    CreatedAt: z.number().int().describe('结束时间'),
    /** 描述信息 */
    Description: z.string().describe('描述信息'),
    /** 展示名称 */
    DisplayName: z.string().describe('展示名称'),
    /** 结束时间 */
    EndDate: z.number().int().describe('结束时间'),
    /** 图标 */
    Icon: z.string().describe('图标'),
    /** ID */
    Id: z.number().int().describe('ID'),
    /** 标识 */
    Name: z.string().describe('标识'),
    /** 名称拼音 */
    NamePinyin: z.string().describe('名称拼音'),
    /** 开始时间 */
    StartDate: z.number().int().describe('开始时间'),
    /** 修改时间 */
    UpdatedAt: z.number().int().describe('修改时间'),
  })
  .describe('项目/项目集数据');

export type Program = z.infer<typeof ProgramSchema>;

// --------------- ProgramData ---------------

/** 项目集分页参数 */
export const ProgramDataSchema = z
  .object({
    /** 请求页数 */
    PageNumber: z.number().int().describe('请求页数'),
    /** 请求条数 */
    PageSize: z.number().int().describe('请求条数'),
    /** 项目集列表 */
    Programs: z.array(ProgramSchema).describe('项目集列表'),
    /** 总条数 */
    TotalCount: z.number().int().describe('总条数'),
  })
  .describe('项目集分页参数');

export type ProgramData = z.infer<typeof ProgramDataSchema>;

// --------------- ProgramProgram ---------------

export const ProgramProgramSchema = z.object({
  /** 创建时间 */
  CreatedAt: z.number().int().describe('创建时间'),
  /** 描述信息 */
  Description: z.string().describe('描述信息'),
  /** 展示名 */
  DisplayName: z.string().describe('展示名'),
  /** 截止时间 */
  EndDate: z.number().int().describe('截止时间'),
  /** 图标 */
  Icon: z.string().describe('图标'),
  /** 项目集ID */
  Id: z.number().int().describe('项目集ID'),
  /** 项目集名 */
  Name: z.string().describe('项目集名'),
  /** 项目集名-拼音 */
  NamePinyin: z.string().describe('项目集名-拼音'),
  /** 开始时间 */
  StartDate: z.number().int().describe('开始时间'),
  /** 更新时间 */
  UpdatedAt: z.number().int().describe('更新时间'),
});

export type ProgramProgram = z.infer<typeof ProgramProgramSchema>;

// --------------- ProgramProgramMemberPolicy ---------------

export const ProgramProgramMemberPolicySchema = z.object({
  /** 策略别名 */
  PolicyAlias: z.string().describe('策略别名'),
  /** 策略 ID */
  PolicyId: z.string().describe('策略 ID'),
  /** 策略名 */
  PolicyName: z.string().describe('策略名'),
});

export type ProgramProgramMemberPolicy = z.infer<typeof ProgramProgramMemberPolicySchema>;
