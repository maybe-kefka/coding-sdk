import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ConfigTemplateSchema } from './schemas';

// --------------- Schema ---------------

/** 获取配置方案 - 请求参数 */
export const DescribeConfigTemplateListInputSchema = z.object({
  /** 配置方案协作类型，包括 SCRUM 和 CLASSIC */
  CooperateMode: z.string().optional().describe('配置方案协作类型，包括 SCRUM 和 CLASSIC'),
  /** 关键字 */
  Keyword: z.string().optional().describe('关键字'),
  /** 页码 */
  PageNumber: z.number().int().describe('页码'),
  /** 分页大小 */
  PageSize: z.number().int().describe('分页大小'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 配置方案类型，全局配置方案取值 GLOBAL ，项目配置方案取值 PROJECT，不填默认为 GLOBAL */
  TemplateType: z
    .string()
    .optional()
    .describe(
      '配置方案类型，全局配置方案取值 GLOBAL ，项目配置方案取值 PROJECT，不填默认为 GLOBAL',
    ),
});

/** 获取配置方案 - 响应数据 */
export const DescribeConfigTemplateListOutputSchema = z.object({
  /** 配置方案列表 */
  ConfigTemplateList: z.array(ConfigTemplateSchema).optional().describe('配置方案列表'),
});

// --------------- Types ---------------

export type DescribeConfigTemplateListInput = z.infer<typeof DescribeConfigTemplateListInputSchema>;
export type DescribeConfigTemplateListOutput = z.infer<
  typeof DescribeConfigTemplateListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeConfigTemplateListInput, DescribeConfigTemplateListOutput> = {
  action: 'DescribeConfigTemplateList',
  method: 'POST',
  inputSchema: DescribeConfigTemplateListInputSchema,
  outputSchema: DescribeConfigTemplateListOutputSchema,
};

// --------------- Action ---------------

/** 获取配置方案 */
export const DescribeConfigTemplateList = (
  client: CodingClient,
  params: DescribeConfigTemplateListInput,
): Promise<Either<SdkError, DescribeConfigTemplateListOutput>> =>
  executeAction(client.config, spec, params);
