import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectSchema } from './schemas';

// --------------- Schema ---------------

/** 单个项目查询 - 请求参数 */
export const DescribeOneProjectInputSchema = z.object({
  /** 项目编号 */
  ProjectId: z.number().int().describe('项目编号'),
});

/** 单个项目查询 - 响应数据 */
export const DescribeOneProjectOutputSchema = z.object({
  /** 项目信息 */
  Project: ProjectSchema.nullable().describe('项目信息'),
});

// --------------- Types ---------------

export type DescribeOneProjectInput = z.infer<typeof DescribeOneProjectInputSchema>;
export type DescribeOneProjectOutput = z.infer<typeof DescribeOneProjectOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeOneProjectInput, DescribeOneProjectOutput> = {
  action: 'DescribeOneProject',
  method: 'POST',
  inputSchema: DescribeOneProjectInputSchema,
  outputSchema: DescribeOneProjectOutputSchema,
};

// --------------- Action ---------------

/** 单个项目查询 */
export const DescribeOneProject = (
  client: CodingClient,
  params: DescribeOneProjectInput,
): Promise<Either<SdkError, DescribeOneProjectOutput>> =>
  executeAction(client.config, spec, params);
