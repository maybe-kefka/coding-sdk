import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { JobCreateJobDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建计划-根据团队模版创建 - 请求参数 */
export const CreateCodingCIJobByTeamTemplateInputSchema = z.object({
  /** 描述信息 */
  DepotId: z.number().int().describe('描述信息'),
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 构建计划名称 */
  JobName: z.string().describe('构建计划名称'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 团队构建模版 ID */
  TemplateId: z.number().int().describe('团队构建模版 ID'),
});

/** 构建计划-根据团队模版创建 - 响应数据 */
export const CreateCodingCIJobByTeamTemplateOutputSchema = z.object({
  /** 根据团队模板创建构建计划返回结构 */
  Data: JobCreateJobDataSchema.describe('根据团队模板创建构建计划返回结构'),
});

// --------------- Types ---------------

export type CreateCodingCIJobByTeamTemplateInput = z.infer<
  typeof CreateCodingCIJobByTeamTemplateInputSchema
>;
export type CreateCodingCIJobByTeamTemplateOutput = z.infer<
  typeof CreateCodingCIJobByTeamTemplateOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  CreateCodingCIJobByTeamTemplateInput,
  CreateCodingCIJobByTeamTemplateOutput
> = {
  action: 'CreateCodingCIJobByTeamTemplate',
  method: 'POST',
  inputSchema: CreateCodingCIJobByTeamTemplateInputSchema,
  outputSchema: CreateCodingCIJobByTeamTemplateOutputSchema,
};

// --------------- Action ---------------

/** 根据团队模版创建构建计划 */
export const CreateCodingCIJobByTeamTemplate = (
  client: CodingClient,
  params: CreateCodingCIJobByTeamTemplateInput,
): Promise<Either<SdkError, CreateCodingCIJobByTeamTemplateOutput>> =>
  executeAction(client.config, spec, params);
