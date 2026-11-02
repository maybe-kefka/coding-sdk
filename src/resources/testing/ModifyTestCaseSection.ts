import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SectionDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例分组修改 - 请求参数 */
export const ModifyTestCaseSectionInputSchema = z.object({
  /** 分组名称 */
  Name: z.string().describe('分组名称'),
  /** 父级 ID，默认 0 */
  ParentId: z.number().int().optional().describe('父级 ID，默认 0'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 分组 ID */
  SectionId: z.number().int().describe('分组 ID'),
});

/** 测试用例分组修改 - 响应数据 */
export const ModifyTestCaseSectionOutputSchema = z.object({
  /** 分组信息 */
  Data: SectionDataSchema.nullable().describe('分组信息'),
});

// --------------- Types ---------------

export type ModifyTestCaseSectionInput = z.infer<typeof ModifyTestCaseSectionInputSchema>;
export type ModifyTestCaseSectionOutput = z.infer<typeof ModifyTestCaseSectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyTestCaseSectionInput, ModifyTestCaseSectionOutput> = {
  action: 'ModifyTestCaseSection',
  method: 'POST',
  inputSchema: ModifyTestCaseSectionInputSchema,
  outputSchema: ModifyTestCaseSectionOutputSchema,
};

// --------------- Action ---------------

/** 测试用例分组修改 */
export const ModifyTestCaseSection = (
  client: CodingClient,
  params: ModifyTestCaseSectionInput,
): Promise<Either<SdkError, ModifyTestCaseSectionOutput>> =>
  executeAction(client.config, spec, params);
