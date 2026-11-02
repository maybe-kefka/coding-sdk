import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectSchema } from './schemas';

// --------------- Schema ---------------

/** 项目列表查询（已加入的项目） - 请求参数 */
export const DescribeUserProjectsInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().optional().describe('项目名称'),
  /** 用户编号 */
  UserId: z.number().int().describe('用户编号'),
});

/** 项目列表查询（已加入的项目） - 响应数据 */
export const DescribeUserProjectsOutputSchema = z.object({
  /** 项目列表信息 */
  ProjectList: z.array(ProjectSchema).nullable().describe('项目列表信息'),
});

// --------------- Types ---------------

export type DescribeUserProjectsInput = z.infer<typeof DescribeUserProjectsInputSchema>;
export type DescribeUserProjectsOutput = z.infer<typeof DescribeUserProjectsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeUserProjectsInput, DescribeUserProjectsOutput> = {
  action: 'DescribeUserProjects',
  method: 'POST',
  inputSchema: DescribeUserProjectsInputSchema,
  outputSchema: DescribeUserProjectsOutputSchema,
};

// --------------- Action ---------------

/** 项目列表查询（已加入的项目） */
export const DescribeUserProjects = (
  client: CodingClient,
  params: DescribeUserProjectsInput,
): Promise<Either<SdkError, DescribeUserProjectsOutput>> =>
  executeAction(client.config, spec, params);
