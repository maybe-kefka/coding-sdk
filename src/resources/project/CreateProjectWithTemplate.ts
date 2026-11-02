import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 模版项目创建 - 请求参数 */
export const CreateProjectWithTemplateInputSchema = z.object({
  /** 项目描述 */
  Description: z.string().optional().describe('项目描述'),
  /** 项目名称 */
  DisplayName: z.string().describe('项目名称'),
  /** 项目图标 */
  Icon: z.string().optional().describe('项目图标'),
  /** 隐藏项目在 CODING 入口不可见  true 不可见|false 可见 */
  Invisible: z.boolean().describe('隐藏项目在 CODING 入口不可见  true 不可见|false 可见'),
  /** 标签(TKE、TCB、SLS、QUICKSTART、APIGW) */
  Label: z.string().describe('标签(TKE、TCB、SLS、QUICKSTART、APIGW)'),
  /** 项目标识 */
  Name: z.string().describe('项目标识'),
  /** 项目模版 CODE_HOST 代码托管项目， PROJECT_MANAGE 项目管理项目， DEV_OPS DevOps项目， DEMO_BEGIN 范例项目 */
  ProjectTemplate: z
    .string()
    .describe(
      '项目模版 CODE_HOST 代码托管项目， PROJECT_MANAGE 项目管理项目， DEV_OPS DevOps项目， DEMO_BEGIN 范例项目',
    ),
  /** 0： 不公开 1：公开源代码 */
  Shared: z.number().int().describe('0： 不公开 1：公开源代码'),
});

/** 模版项目创建 - 响应数据 */
export const CreateProjectWithTemplateOutputSchema = z.object({
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

// --------------- Types ---------------

export type CreateProjectWithTemplateInput = z.infer<typeof CreateProjectWithTemplateInputSchema>;
export type CreateProjectWithTemplateOutput = z.infer<typeof CreateProjectWithTemplateOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProjectWithTemplateInput, CreateProjectWithTemplateOutput> = {
  action: 'CreateProjectWithTemplate',
  method: 'POST',
  inputSchema: CreateProjectWithTemplateInputSchema,
  outputSchema: CreateProjectWithTemplateOutputSchema,
};

// --------------- Action ---------------

/** 模版项目创建 */
export const CreateProjectWithTemplate = (
  client: CodingClient,
  params: CreateProjectWithTemplateInput,
): Promise<Either<SdkError, CreateProjectWithTemplateOutput>> =>
  executeAction(client.config, spec, params);
