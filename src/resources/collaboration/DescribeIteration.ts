import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IterationSchema } from './schemas';

// --------------- Schema ---------------

/** 查询迭代详情 - 请求参数 */
export const DescribeIterationInputSchema = z.object({
  /** 迭代编号 */
  IterationCode: z.number().int().describe('迭代编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询迭代详情 - 响应数据 */
export const DescribeIterationOutputSchema = z.object({
  /** 迭代的具体信息 */
  Iteration: IterationSchema.describe('迭代的具体信息'),
});

// --------------- Types ---------------

export type DescribeIterationInput = z.infer<typeof DescribeIterationInputSchema>;
export type DescribeIterationOutput = z.infer<typeof DescribeIterationOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIterationInput, DescribeIterationOutput> = {
  action: 'DescribeIteration',
  method: 'POST',
  inputSchema: DescribeIterationInputSchema,
  outputSchema: DescribeIterationOutputSchema,
};

// --------------- Action ---------------

/** 查询迭代详情 */
export const DescribeIteration = (
  client: CodingClient,
  params: DescribeIterationInput,
): Promise<Either<SdkError, DescribeIterationOutput>> => executeAction(client.config, spec, params);
