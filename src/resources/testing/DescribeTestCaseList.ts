import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CasesDataSchemaSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例列表 - 请求参数 */
export const DescribeTestCaseListInputSchema = z.object({
  /** 关键字搜索 */
  Keyword: z.string().optional().describe('关键字搜索'),
  /** 优先级，默认2（中），可选值：0（紧急）,1（高）,2（中）,3（低） */
  Priority: z
    .number()
    .int()
    .optional()
    .describe('优先级，默认2（中），可选值：0（紧急）,1（高）,2（中）,3（低）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 分组 ID */
  SectionId: z.number().int().optional().describe('分组 ID'),
  /** 用例类型，可选值：STEPS(步骤用例)，TEXT(文本用例) */
  TemplateType: z.string().optional().describe('用例类型，可选值：STEPS(步骤用例)，TEXT(文本用例)'),
  /** 页码 */
  Page: z.number().int().optional().describe('页码'),
  /** 分页大小 */
  PageSize: z.number().int().optional().describe('分页大小'),
});

/** 测试用例列表 - 响应数据 */
export const DescribeTestCaseListOutputSchema = z.object({
  /** 测试用例分页数据 */
  Data: CasesDataSchemaSchema.nullable().describe('测试用例分页数据'),
});

// --------------- Types ---------------

export type DescribeTestCaseListInput = z.infer<typeof DescribeTestCaseListInputSchema>;
export type DescribeTestCaseListOutput = z.infer<typeof DescribeTestCaseListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestCaseListInput, DescribeTestCaseListOutput> = {
  action: 'DescribeTestCaseList',
  method: 'POST',
  inputSchema: DescribeTestCaseListInputSchema,
  outputSchema: DescribeTestCaseListOutputSchema,
};

// --------------- Action ---------------

/** 测试用例分页数据 */
export const DescribeTestCaseList = (
  client: CodingClient,
  params: DescribeTestCaseListInput,
): Promise<Either<SdkError, DescribeTestCaseListOutput>> =>
  executeAction(client.config, spec, params);
