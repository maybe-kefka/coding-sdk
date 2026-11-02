import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试用例添加测试结果 - 请求参数 */
export const CreateCaseResultInputSchema = z.object({
  /** 测试任务 ID */
  CaseId: z.number().int().describe('测试任务 ID'),
  /** 每一步的测试结果（步骤用例时需要本参数） */
  CustomStepStatus: z
    .array(z.string())
    .optional()
    .describe('每一步的测试结果（步骤用例时需要本参数）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试计划 ID */
  RunId: z.number().int().describe('测试计划 ID'),
  /** 该任务的测试结果，可选值：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败 */
  Status: z
    .string()
    .describe(
      '该任务的测试结果，可选值：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败',
    ),
});

/** 测试用例添加测试结果 - 响应数据 */
export const CreateCaseResultOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateCaseResultInput = z.infer<typeof CreateCaseResultInputSchema>;
export type CreateCaseResultOutput = z.infer<typeof CreateCaseResultOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCaseResultInput, CreateCaseResultOutput> = {
  action: 'CreateCaseResult',
  method: 'POST',
  inputSchema: CreateCaseResultInputSchema,
  outputSchema: CreateCaseResultOutputSchema,
};

// --------------- Action ---------------

/** 测试用例添加测试结果 */
export const CreateCaseResult = (
  client: CodingClient,
  params: CreateCaseResultInput,
): Promise<Either<SdkError, CreateCaseResultOutput>> => executeAction(client.config, spec, params);
