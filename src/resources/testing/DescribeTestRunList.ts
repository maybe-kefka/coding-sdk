import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RunsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试计划列表 - 请求参数 */
export const DescribeTestRunListInputSchema = z.object({
  /** 执行方式: 1-手动执行 2-自动化流水线执行 */
  ExecuteType: z.number().int().optional().describe('执行方式: 1-手动执行 2-自动化流水线执行'),
  /** 发布版本状态：0-未发布 1-已发布（与参数IterationId、IterationStatus、SectionId互斥） */
  GitReleaseState: z
    .number()
    .int()
    .optional()
    .describe(
      '发布版本状态：0-未发布 1-已发布（与参数IterationId、IterationStatus、SectionId互斥）',
    ),
  /** 是否已经归档 */
  IsCompleted: z.boolean().optional().describe('是否已经归档'),
  /** 迭代 ID（与参数IterationStatus、GitReleaseState、SectionId互斥） */
  IterationId: z
    .array(z.number().int())
    .optional()
    .describe('迭代 ID（与参数IterationStatus、GitReleaseState、SectionId互斥）'),
  /** 迭代状态: WAIT_PROCESS、PROCESSING、COMPLETED（与参数IterationId、GitReleaseState、SectionId互斥） */
  IterationStatus: z
    .array(z.string())
    .optional()
    .describe(
      '迭代状态: WAIT_PROCESS、PROCESSING、COMPLETED（与参数IterationId、GitReleaseState、SectionId互斥）',
    ),
  /** 计划名称 */
  Keyword: z.string().optional().describe('计划名称'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 分组 ID（与参数IterationId、IterationStatus、GitReleaseState互斥） */
  SectionId: z
    .number()
    .int()
    .optional()
    .describe('分组 ID（与参数IterationId、IterationStatus、GitReleaseState互斥）'),
  /** 状态: 0-未开始 1-进行中 2-已测完 */
  State: z.number().int().optional().describe('状态: 0-未开始 1-进行中 2-已测完'),
});

/** 测试计划列表 - 响应数据 */
export const DescribeTestRunListOutputSchema = z.object({
  /** 测试计划列表 */
  Data: RunsDataSchema.nullable().describe('测试计划列表'),
});

// --------------- Types ---------------

export type DescribeTestRunListInput = z.infer<typeof DescribeTestRunListInputSchema>;
export type DescribeTestRunListOutput = z.infer<typeof DescribeTestRunListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestRunListInput, DescribeTestRunListOutput> = {
  action: 'DescribeTestRunList',
  method: 'POST',
  inputSchema: DescribeTestRunListInputSchema,
  outputSchema: DescribeTestRunListOutputSchema,
};

// --------------- Action ---------------

/** 测试计划列表 */
export const DescribeTestRunList = (
  client: CodingClient,
  params: DescribeTestRunListInput,
): Promise<Either<SdkError, DescribeTestRunListOutput>> =>
  executeAction(client.config, spec, params);
