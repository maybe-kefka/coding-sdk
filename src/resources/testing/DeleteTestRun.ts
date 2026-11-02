import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试计划删除 - 请求参数 */
export const DeleteTestRunInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 计划 ID */
  RunId: z.number().int().describe('计划 ID'),
});

/** 测试计划删除 - 响应数据 */
export const DeleteTestRunOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteTestRunInput = z.infer<typeof DeleteTestRunInputSchema>;
export type DeleteTestRunOutput = z.infer<typeof DeleteTestRunOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteTestRunInput, DeleteTestRunOutput> = {
  action: 'DeleteTestRun',
  method: 'POST',
  inputSchema: DeleteTestRunInputSchema,
  outputSchema: DeleteTestRunOutputSchema,
};

// --------------- Action ---------------

/** 测试计划删除 */
export const DeleteTestRun = (
  client: CodingClient,
  params: DeleteTestRunInput,
): Promise<Either<SdkError, DeleteTestRunOutput>> => executeAction(client.config, spec, params);
