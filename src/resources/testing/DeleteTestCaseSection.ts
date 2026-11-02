import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试用例分组删除 - 请求参数 */
export const DeleteTestCaseSectionInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 分组 ID */
  SectionId: z.number().int().describe('分组 ID'),
});

/** 测试用例分组删除 - 响应数据 */
export const DeleteTestCaseSectionOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteTestCaseSectionInput = z.infer<typeof DeleteTestCaseSectionInputSchema>;
export type DeleteTestCaseSectionOutput = z.infer<typeof DeleteTestCaseSectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteTestCaseSectionInput, DeleteTestCaseSectionOutput> = {
  action: 'DeleteTestCaseSection',
  method: 'POST',
  inputSchema: DeleteTestCaseSectionInputSchema,
  outputSchema: DeleteTestCaseSectionOutputSchema,
};

// --------------- Action ---------------

/** 测试用例分组删除 */
export const DeleteTestCaseSection = (
  client: CodingClient,
  params: DeleteTestCaseSectionInput,
): Promise<Either<SdkError, DeleteTestCaseSectionOutput>> =>
  executeAction(client.config, spec, params);
