import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 项目配置方案初始化 - 请求参数 */
export const InitProjectTemplateInputSchema = z.object({
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
  /** 是否同步配置方案，取值 true 或者 false，不填默认为 false */
  Sync: z.boolean().describe('是否同步配置方案，取值 true 或者 false，不填默认为 false'),
  /** 模板id，为DescribeConfigTemplateList接口返回的，如果这里TemplateType选PROJECT，则TemplateId参数有效，否则无效。 */
  TemplateId: z
    .number()
    .int()
    .describe(
      '模板id，为DescribeConfigTemplateList接口返回的，如果这里TemplateType选PROJECT，则TemplateId参数有效，否则无效。',
    ),
  /** 模板类型，取值包括 SCRUM，CLASSIC，PROJECT */
  TemplateType: z.string().describe('模板类型，取值包括 SCRUM，CLASSIC，PROJECT'),
});

/** 项目配置方案初始化 - 响应数据 */
export const InitProjectTemplateOutputSchema = z.object({});

// --------------- Types ---------------

export type InitProjectTemplateInput = z.infer<typeof InitProjectTemplateInputSchema>;
export type InitProjectTemplateOutput = z.infer<typeof InitProjectTemplateOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<InitProjectTemplateInput, InitProjectTemplateOutput> = {
  action: 'InitProjectTemplate',
  method: 'POST',
  inputSchema: InitProjectTemplateInputSchema,
  outputSchema: InitProjectTemplateOutputSchema,
};

// --------------- Action ---------------

/** 初始化项目配置方案 */
export const InitProjectTemplate = (
  client: CodingClient,
  params: InitProjectTemplateInput,
): Promise<Either<SdkError, InitProjectTemplateOutput>> =>
  executeAction(client.config, spec, params);
