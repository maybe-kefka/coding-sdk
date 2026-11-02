import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试任务状态批量更新 - 请求参数 */
export const CreateTestResultsInputSchema = z.object({
  /** 测试用例 ID 数组 */
  CaseIds: z.array(z.number().int()).describe('测试用例 ID 数组'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试计划 ID */
  RunId: z.number().int().describe('测试计划 ID'),
  /** 测试状态：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败 */
  Status: z
    .string()
    .describe('测试状态：UNTESTED:未测试,PASSED:通过,BLOCKED:阻塞,RETEST:重测,FAILED:失败'),
});

/** 测试任务状态批量更新 - 响应数据 */
export const CreateTestResultsOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateTestResultsInput = z.infer<typeof CreateTestResultsInputSchema>;
export type CreateTestResultsOutput = z.infer<typeof CreateTestResultsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestResultsInput, CreateTestResultsOutput> = {
  action: 'CreateTestResults',
  method: 'POST',
  inputSchema: CreateTestResultsInputSchema,
  outputSchema: CreateTestResultsOutputSchema,
};

// --------------- Action ---------------

/** 测试任务状态批量更新 */
export const CreateTestResults = (
  client: CodingClient,
  params: CreateTestResultsInput,
): Promise<Either<SdkError, CreateTestResultsOutput>> => executeAction(client.config, spec, params);
