import { z } from 'zod/v4';

// --------------- ResourceReferenceResource ---------------

/** 资源信息 */
export const ResourceReferenceResourceSchema = z
  .object({
    /** 资源附加信息，json格式 */
    Meta: z.string().describe('资源附加信息，json格式'),
    /** 资源code */
    ResourceCode: z.string().describe('资源code'),
    /** 资源类型名 */
    ResourceTypeName: z.string().describe('资源类型名'),
    /** 资源 ID */
    ResourceId: z.string().describe('资源 ID'),
    /** 资源名 */
    Title: z.string().describe('资源名'),
    /** 资源类型 */
    ResourceType: z.string().describe('资源类型'),
    /** 资源图标 */
    Icon: z.string().describe('资源图标'),
  })
  .describe('资源信息');

export type ResourceReferenceResource = z.infer<typeof ResourceReferenceResourceSchema>;

// --------------- ResourceReferenceResourceScope ---------------

/** 资源所属主体信息 */
export const ResourceReferenceResourceScopeSchema = z
  .object({
    /** 所属主体类型： 1项目、2团队 */
    ScopeType: z.number().int().describe('所属主体类型： 1项目、2团队'),
    /** 所属主体名 */
    ScopeName: z.string().describe('所属主体名'),
    /** 所属主体展示名 */
    ScopeDisplayName: z.string().describe('所属主体展示名'),
    /** 所属主体ID */
    ScopeId: z.number().int().describe('所属主体ID'),
  })
  .describe('资源所属主体信息');

export type ResourceReferenceResourceScope = z.infer<typeof ResourceReferenceResourceScopeSchema>;

// --------------- ResourceReferenceResourceInfo ---------------

/** 资源相关信息 */
export const ResourceReferenceResourceInfoSchema = z
  .object({
    /** 所属主体信息 */
    Scope: ResourceReferenceResourceScopeSchema.describe('所属主体信息'),
    /** 资源信息 */
    Resource: ResourceReferenceResourceSchema.describe('资源信息'),
  })
  .describe('资源相关信息');

export type ResourceReferenceResourceInfo = z.infer<typeof ResourceReferenceResourceInfoSchema>;
