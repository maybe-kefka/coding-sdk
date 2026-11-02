import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CaseDataSchema, CustomStepSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例修改 - 请求参数 */
export const ModifyTestCaseInputSchema = z.object({
  /** 附件 ID 数组：来自“生成附件预上传信息”接口 */
  AttachmentIds: z
    .array(z.number().int())
    .optional()
    .describe('附件 ID 数组：来自“生成附件预上传信息”接口'),
  /** 用例 ID */
  CaseId: z.number().int().describe('用例 ID'),
  /** 自定义步骤（步骤用例必填） */
  CustomSteps: z.array(CustomStepSchema).optional().describe('自定义步骤（步骤用例必填）'),
  /** 预期结果（适用于文本用例） */
  Expected: z.string().optional().describe('预期结果（适用于文本用例）'),
  /** 前置步骤 */
  Preconds: z.string().optional().describe('前置步骤'),
  /** 优先级，默认2（中），可选值：0（紧急）,1（高）,2（中）,3（低） */
  Priority: z
    .number()
    .int()
    .optional()
    .describe('优先级，默认2（中），可选值：0（紧急）,1（高）,2（中）,3（低）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 分组ID */
  SectionId: z.number().int().describe('分组ID'),
  /** 文本描述（适用于文本用例） */
  Steps: z.string().optional().describe('文本描述（适用于文本用例）'),
  /** 用例类型，可选值：STEPS(步骤用例)，TEXT(文本用例) */
  TemplateType: z.string().describe('用例类型，可选值：STEPS(步骤用例)，TEXT(文本用例)'),
  /** 用例标题 */
  Title: z.string().describe('用例标题'),
});

/** 测试用例修改 - 响应数据 */
export const ModifyTestCaseOutputSchema = z.object({
  /** 测试用例信息 */
  Data: CaseDataSchema.nullable().describe('测试用例信息'),
});

// --------------- Types ---------------

export type ModifyTestCaseInput = z.infer<typeof ModifyTestCaseInputSchema>;
export type ModifyTestCaseOutput = z.infer<typeof ModifyTestCaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyTestCaseInput, ModifyTestCaseOutput> = {
  action: 'ModifyTestCase',
  method: 'POST',
  inputSchema: ModifyTestCaseInputSchema,
  outputSchema: ModifyTestCaseOutputSchema,
};

// --------------- Action ---------------

/** 测试用例修改 */
export const ModifyTestCase = (
  client: CodingClient,
  params: ModifyTestCaseInput,
): Promise<Either<SdkError, ModifyTestCaseOutput>> => executeAction(client.config, spec, params);
