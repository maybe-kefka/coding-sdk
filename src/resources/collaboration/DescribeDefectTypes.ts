import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DefectTypeSchema } from './schemas';

// --------------- Schema ---------------

/** 缺陷类型列表查询 - 请求参数 */
export const DescribeDefectTypesInputSchema = z.object({
  /** 项目标识 */
  ProjectName: z.string().describe('项目标识'),
});

/** 缺陷类型列表查询 - 响应数据 */
export const DescribeDefectTypesOutputSchema = z.object({
  /** 缺陷类型列表 */
  DefectTypes: z.array(DefectTypeSchema).optional().describe('缺陷类型列表'),
});

// --------------- Types ---------------

export type DescribeDefectTypesInput = z.infer<typeof DescribeDefectTypesInputSchema>;
export type DescribeDefectTypesOutput = z.infer<typeof DescribeDefectTypesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDefectTypesInput, DescribeDefectTypesOutput> = {
  action: 'DescribeDefectTypes',
  method: 'POST',
  inputSchema: DescribeDefectTypesInputSchema,
  outputSchema: DescribeDefectTypesOutputSchema,
};

// --------------- Action ---------------

/** 缺陷类型列表查询 */
export const DescribeDefectTypes = (
  client: CodingClient,
  params: DescribeDefectTypesInput,
): Promise<Either<SdkError, DescribeDefectTypesOutput>> =>
  executeAction(client.config, spec, params);
