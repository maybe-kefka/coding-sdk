import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试用例删除 - 请求参数 */
export const DeleteTestCaseInputSchema = z.object({
  /** 用例 ID */
  CaseId: z.number().int().describe('用例 ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 测试用例删除 - 响应数据 */
export const DeleteTestCaseOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteTestCaseInput = z.infer<typeof DeleteTestCaseInputSchema>;
export type DeleteTestCaseOutput = z.infer<typeof DeleteTestCaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteTestCaseInput, DeleteTestCaseOutput> = {
  action: 'DeleteTestCase',
  method: 'POST',
  inputSchema: DeleteTestCaseInputSchema,
  outputSchema: DeleteTestCaseOutputSchema,
};

// --------------- Action ---------------

/** 测试用例删除 */
export const DeleteTestCase = (
  client: CodingClient,
  params: DeleteTestCaseInput,
): Promise<Either<SdkError, DeleteTestCaseOutput>> => executeAction(client.config, spec, params);
