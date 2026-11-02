import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 项目列表查询 - 请求参数 */
export const DescribeCodingProjectsInputSchema = z.object({
  /** 页数 */
  PageNumber: z.number().int().describe('页数'),
  /** 每页条数 */
  PageSize: z.number().int().describe('每页条数'),
  /** 项目名称 */
  ProjectName: z.string().optional().describe('项目名称'),
});

/** 项目列表查询 - 响应数据 */
export const DescribeCodingProjectsOutputSchema = z.object({
  /** 项目集合 */
  Data: ProjectsDataSchema.nullable().describe('项目集合'),
});

// --------------- Types ---------------

export type DescribeCodingProjectsInput = z.infer<typeof DescribeCodingProjectsInputSchema>;
export type DescribeCodingProjectsOutput = z.infer<typeof DescribeCodingProjectsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingProjectsInput, DescribeCodingProjectsOutput> = {
  action: 'DescribeCodingProjects',
  method: 'POST',
  inputSchema: DescribeCodingProjectsInputSchema,
  outputSchema: DescribeCodingProjectsOutputSchema,
};

// --------------- Action ---------------

/** 项目列表查询 */
export const DescribeCodingProjects = (
  client: CodingClient,
  params: DescribeCodingProjectsInput,
): Promise<Either<SdkError, DescribeCodingProjectsOutput>> =>
  executeAction(client.config, spec, params);
