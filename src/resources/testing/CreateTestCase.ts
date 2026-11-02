import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CaseDataSpecialSchema, CustomStepSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例创建 - 请求参数 */
export const CreateTestCaseInputSchema = z.object({
  /** 附件 ID 数组：来自“生成附件预上传信息”接口 */
  AttachmentIds: z
    .array(z.number().int())
    .optional()
    .describe('附件 ID 数组：来自“生成附件预上传信息”接口'),
  /** 自定义步骤（步骤用例必填） */
  CustomSteps: z.array(CustomStepSchema).optional().describe('自定义步骤（步骤用例必填）'),
  /** 预期结果 （适用于文本用例） */
  Expected: z.string().optional().describe('预期结果 （适用于文本用例）'),
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

/** 测试用例创建 - 响应数据 */
export const CreateTestCaseOutputSchema = z.object({
  /** 测试用例信息 */
  Data: CaseDataSpecialSchema.nullable().describe('测试用例信息'),
});

// --------------- Types ---------------

export type CreateTestCaseInput = z.infer<typeof CreateTestCaseInputSchema>;
export type CreateTestCaseOutput = z.infer<typeof CreateTestCaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestCaseInput, CreateTestCaseOutput> = {
  action: 'CreateTestCase',
  method: 'POST',
  inputSchema: CreateTestCaseInputSchema,
  outputSchema: CreateTestCaseOutputSchema,
};

// --------------- Action ---------------

/** 测试用例创建 */
export const CreateTestCase = (
  client: CodingClient,
  params: CreateTestCaseInput,
): Promise<Either<SdkError, CreateTestCaseOutput>> => executeAction(client.config, spec, params);
