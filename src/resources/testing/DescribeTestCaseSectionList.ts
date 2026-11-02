import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { SectionsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试用例分组列表 - 请求参数 */
export const DescribeTestCaseSectionListInputSchema = z.object({
  /** 父级 ID，默认 0 */
  ParentId: z.number().int().optional().describe('父级 ID，默认 0'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 测试用例分组列表 - 响应数据 */
export const DescribeTestCaseSectionListOutputSchema = z.object({
  /** 分组信息 */
  Data: SectionsDataSchema.nullable().describe('分组信息'),
});

// --------------- Types ---------------

export type DescribeTestCaseSectionListInput = z.infer<
  typeof DescribeTestCaseSectionListInputSchema
>;
export type DescribeTestCaseSectionListOutput = z.infer<
  typeof DescribeTestCaseSectionListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestCaseSectionListInput, DescribeTestCaseSectionListOutput> = {
  action: 'DescribeTestCaseSectionList',
  method: 'POST',
  inputSchema: DescribeTestCaseSectionListInputSchema,
  outputSchema: DescribeTestCaseSectionListOutputSchema,
};

// --------------- Action ---------------

/** 测试用例分组列表 */
export const DescribeTestCaseSectionList = (
  client: CodingClient,
  params: DescribeTestCaseSectionListInput,
): Promise<Either<SdkError, DescribeTestCaseSectionListOutput>> =>
  executeAction(client.config, spec, params);
