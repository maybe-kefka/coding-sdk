import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TestDefectsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试任务关联的缺陷列表 - 请求参数 */
export const DescribeTestDefectListInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试任务 ID */
  TestId: z.number().int().optional().describe('测试任务 ID'),
});

/** 测试任务关联的缺陷列表 - 响应数据 */
export const DescribeTestDefectListOutputSchema = z.object({
  /** 测试任务关联的缺陷列表 */
  Data: TestDefectsDataSchema.describe('测试任务关联的缺陷列表'),
});

// --------------- Types ---------------

export type DescribeTestDefectListInput = z.infer<typeof DescribeTestDefectListInputSchema>;
export type DescribeTestDefectListOutput = z.infer<typeof DescribeTestDefectListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTestDefectListInput, DescribeTestDefectListOutput> = {
  action: 'DescribeTestDefectList',
  method: 'POST',
  inputSchema: DescribeTestDefectListInputSchema,
  outputSchema: DescribeTestDefectListOutputSchema,
};

// --------------- Action ---------------

/** 测试任务关联的缺陷列表 */
export const DescribeTestDefectList = (
  client: CodingClient,
  params: DescribeTestDefectListInput,
): Promise<Either<SdkError, DescribeTestDefectListOutput>> =>
  executeAction(client.config, spec, params);
