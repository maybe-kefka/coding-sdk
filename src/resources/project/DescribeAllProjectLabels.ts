import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectLabelLabelsSchema } from './schemas';

// --------------- Schema ---------------

/** 项目标签查询 - 请求参数 */
export const DescribeAllProjectLabelsInputSchema = z.object({
  /** 项目ID */
  ProjectId: z.number().int().describe('项目ID'),
});

/** 项目标签查询 - 响应数据 */
export const DescribeAllProjectLabelsOutputSchema = z.object({
  /** 标签列表 */
  Labels: z.array(ProjectLabelLabelsSchema).describe('标签列表'),
});

// --------------- Types ---------------

export type DescribeAllProjectLabelsInput = z.infer<typeof DescribeAllProjectLabelsInputSchema>;
export type DescribeAllProjectLabelsOutput = z.infer<typeof DescribeAllProjectLabelsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeAllProjectLabelsInput, DescribeAllProjectLabelsOutput> = {
  action: 'DescribeAllProjectLabels',
  method: 'POST',
  inputSchema: DescribeAllProjectLabelsInputSchema,
  outputSchema: DescribeAllProjectLabelsOutputSchema,
};

// --------------- Action ---------------

/** 项目标签查询 */
export const DescribeAllProjectLabels = (
  client: CodingClient,
  params: DescribeAllProjectLabelsInput,
): Promise<Either<SdkError, DescribeAllProjectLabelsOutput>> =>
  executeAction(client.config, spec, params);
