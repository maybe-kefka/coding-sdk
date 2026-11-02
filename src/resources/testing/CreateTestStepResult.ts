import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试任务添加某步骤的测试结果 - 请求参数 */
export const CreateTestStepResultInputSchema = z.object({
  /** 该步骤的实际测试结果 */
  Actual: z.string().optional().describe('该步骤的实际测试结果'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 该任务的测试结果，可选值：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败 */
  Status: z
    .string()
    .optional()
    .describe(
      '该任务的测试结果，可选值：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败',
    ),
  /** 步骤的索引顺序，起始值为 1 */
  StepIndex: z.number().int().describe('步骤的索引顺序，起始值为 1'),
  /** 该步骤的测试结果，可选值：PASSED:通过,FAILED:失败 */
  StepStatus: z.string().describe('该步骤的测试结果，可选值：PASSED:通过,FAILED:失败'),
  /** 测试任务 ID */
  TestId: z.number().int().describe('测试任务 ID'),
});

/** 测试任务添加某步骤的测试结果 - 响应数据 */
export const CreateTestStepResultOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateTestStepResultInput = z.infer<typeof CreateTestStepResultInputSchema>;
export type CreateTestStepResultOutput = z.infer<typeof CreateTestStepResultOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestStepResultInput, CreateTestStepResultOutput> = {
  action: 'CreateTestStepResult',
  method: 'POST',
  inputSchema: CreateTestStepResultInputSchema,
  outputSchema: CreateTestStepResultOutputSchema,
};

// --------------- Action ---------------

/** 测试任务添加某步骤的测试结果 */
export const CreateTestStepResult = (
  client: CodingClient,
  params: CreateTestStepResultInput,
): Promise<Either<SdkError, CreateTestStepResultOutput>> =>
  executeAction(client.config, spec, params);
