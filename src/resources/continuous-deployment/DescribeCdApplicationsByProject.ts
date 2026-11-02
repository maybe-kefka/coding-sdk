import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdApplicationsByProjectResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 关联应用列表获取（指定项目名） - 请求参数 */
export const DescribeCdApplicationsByProjectInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 关联应用列表获取（指定项目名） - 响应数据 */
export const DescribeCdApplicationsByProjectOutputSchema = z.object({
  /** CD 应用列表 */
  Data: DescribeCdApplicationsByProjectResponseDataSchema.describe('CD 应用列表'),
});

// --------------- Types ---------------

export type DescribeCdApplicationsByProjectInput = z.infer<
  typeof DescribeCdApplicationsByProjectInputSchema
>;
export type DescribeCdApplicationsByProjectOutput = z.infer<
  typeof DescribeCdApplicationsByProjectOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCdApplicationsByProjectInput,
  DescribeCdApplicationsByProjectOutput
> = {
  action: 'DescribeCdApplicationsByProject',
  method: 'POST',
  inputSchema: DescribeCdApplicationsByProjectInputSchema,
  outputSchema: DescribeCdApplicationsByProjectOutputSchema,
};

// --------------- Action ---------------

/** 根据项目名获取关联应用列表 */
export const DescribeCdApplicationsByProject = (
  client: CodingClient,
  params: DescribeCdApplicationsByProjectInput,
): Promise<Either<SdkError, DescribeCdApplicationsByProjectOutput>> =>
  executeAction(client.config, spec, params);
