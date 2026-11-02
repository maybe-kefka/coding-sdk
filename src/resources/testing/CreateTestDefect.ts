import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试任务关联缺陷 - 请求参数 */
export const CreateTestDefectInputSchema = z.object({
  /** 缺陷 ID */
  DefectId: z.number().int().describe('缺陷 ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试任务 ID */
  TestId: z.number().int().describe('测试任务 ID'),
});

/** 测试任务关联缺陷 - 响应数据 */
export const CreateTestDefectOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateTestDefectInput = z.infer<typeof CreateTestDefectInputSchema>;
export type CreateTestDefectOutput = z.infer<typeof CreateTestDefectOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestDefectInput, CreateTestDefectOutput> = {
  action: 'CreateTestDefect',
  method: 'POST',
  inputSchema: CreateTestDefectInputSchema,
  outputSchema: CreateTestDefectOutputSchema,
};

// --------------- Action ---------------

/** 测试任务关联缺陷 */
export const CreateTestDefect = (
  client: CodingClient,
  params: CreateTestDefectInput,
): Promise<Either<SdkError, CreateTestDefectOutput>> => executeAction(client.config, spec, params);
