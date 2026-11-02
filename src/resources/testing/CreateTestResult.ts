import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试任务添加测试结果 - 请求参数 */
export const CreateTestResultInputSchema = z.object({
  /** 每一步的测试结果（步骤用例时需要本参数） */
  CustomStepStatus: z
    .array(z.string())
    .optional()
    .describe('每一步的测试结果（步骤用例时需要本参数）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 该任务的测试结果，可选值：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败 */
  Status: z
    .string()
    .describe(
      '该任务的测试结果，可选值：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败',
    ),
  /** 测试任务 ID */
  TestId: z.number().int().describe('测试任务 ID'),
});

/** 测试任务添加测试结果 - 响应数据 */
export const CreateTestResultOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateTestResultInput = z.infer<typeof CreateTestResultInputSchema>;
export type CreateTestResultOutput = z.infer<typeof CreateTestResultOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestResultInput, CreateTestResultOutput> = {
  action: 'CreateTestResult',
  method: 'POST',
  inputSchema: CreateTestResultInputSchema,
  outputSchema: CreateTestResultOutputSchema,
};

// --------------- Action ---------------

/** 测试任务添加测试结果 */
export const CreateTestResult = (
  client: CodingClient,
  params: CreateTestResultInput,
): Promise<Either<SdkError, CreateTestResultOutput>> => executeAction(client.config, spec, params);
