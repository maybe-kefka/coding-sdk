import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectSchema } from './schemas';

// --------------- Schema ---------------

/** 项目列表查询-指定项目标签 - 请求参数 */
export const DescribeProjectLabelsInputSchema = z.object({
  /** 标签 */
  Label: z.string().optional().describe('标签'),
});

/** 项目列表查询-指定项目标签 - 响应数据 */
export const DescribeProjectLabelsOutputSchema = z.object({
  /** 项目列表信息 */
  ProjectList: z.array(ProjectSchema).nullable().describe('项目列表信息'),
});

// --------------- Types ---------------

export type DescribeProjectLabelsInput = z.infer<typeof DescribeProjectLabelsInputSchema>;
export type DescribeProjectLabelsOutput = z.infer<typeof DescribeProjectLabelsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectLabelsInput, DescribeProjectLabelsOutput> = {
  action: 'DescribeProjectLabels',
  method: 'POST',
  inputSchema: DescribeProjectLabelsInputSchema,
  outputSchema: DescribeProjectLabelsOutputSchema,
};

// --------------- Action ---------------

/** 项目列表查询-指定项目标签 */
export const DescribeProjectLabels = (
  client: CodingClient,
  params: DescribeProjectLabelsInput,
): Promise<Either<SdkError, DescribeProjectLabelsOutput>> =>
  executeAction(client.config, spec, params);
