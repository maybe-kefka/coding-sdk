import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Coding项目创建 - 请求参数 */
export const CreateCodingProjectInputSchema = z.object({
  /** 项目描述 */
  Description: z.string().optional().describe('项目描述'),
  /** 项目名称 */
  DisplayName: z.string().describe('项目名称'),
  /** 项目图标 */
  Icon: z.string().optional().describe('项目图标'),
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

/** Coding项目创建 - 响应数据 */
export const CreateCodingProjectOutputSchema = z.object({
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

// --------------- Types ---------------

export type CreateCodingProjectInput = z.infer<typeof CreateCodingProjectInputSchema>;
export type CreateCodingProjectOutput = z.infer<typeof CreateCodingProjectOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCodingProjectInput, CreateCodingProjectOutput> = {
  action: 'CreateCodingProject',
  method: 'POST',
  inputSchema: CreateCodingProjectInputSchema,
  outputSchema: CreateCodingProjectOutputSchema,
};

// --------------- Action ---------------

/** Coding项目创建 */
export const CreateCodingProject = (
  client: CodingClient,
  params: CreateCodingProjectInput,
): Promise<Either<SdkError, CreateCodingProjectOutput>> =>
  executeAction(client.config, spec, params);
