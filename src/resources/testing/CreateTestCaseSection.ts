import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SectionDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例分组创建 - 请求参数 */
export const CreateTestCaseSectionInputSchema = z.object({
  /** 分组名称 */
  Name: z.string().describe('分组名称'),
  /** 父级 ID，默认 0 */
  ParentId: z.number().int().optional().describe('父级 ID，默认 0'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 测试用例分组创建 - 响应数据 */
export const CreateTestCaseSectionOutputSchema = z.object({
  /** 分组信息 */
  Data: SectionDataSchema.nullable().describe('分组信息'),
});

// --------------- Types ---------------

export type CreateTestCaseSectionInput = z.infer<typeof CreateTestCaseSectionInputSchema>;
export type CreateTestCaseSectionOutput = z.infer<typeof CreateTestCaseSectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestCaseSectionInput, CreateTestCaseSectionOutput> = {
  action: 'CreateTestCaseSection',
  method: 'POST',
  inputSchema: CreateTestCaseSectionInputSchema,
  outputSchema: CreateTestCaseSectionOutputSchema,
};

// --------------- Action ---------------

/** 测试用例分组创建 */
export const CreateTestCaseSection = (
  client: CodingClient,
  params: CreateTestCaseSectionInput,
): Promise<Either<SdkError, CreateTestCaseSectionOutput>> =>
  executeAction(client.config, spec, params);
