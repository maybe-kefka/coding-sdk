import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectSchema } from './schemas';

// --------------- Schema ---------------

/** 项目查询(通过项目名称) - 请求参数 */
export const DescribeProjectByNameInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 项目查询(通过项目名称) - 响应数据 */
export const DescribeProjectByNameOutputSchema = z.object({
  /** 项目信息 */
  Project: ProjectSchema.nullable().describe('项目信息'),
});

// --------------- Types ---------------

export type DescribeProjectByNameInput = z.infer<typeof DescribeProjectByNameInputSchema>;
export type DescribeProjectByNameOutput = z.infer<typeof DescribeProjectByNameOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectByNameInput, DescribeProjectByNameOutput> = {
  action: 'DescribeProjectByName',
  method: 'POST',
  inputSchema: DescribeProjectByNameInputSchema,
  outputSchema: DescribeProjectByNameOutputSchema,
};

// --------------- Action ---------------

/** 项目查询(通过项目名称) */
export const DescribeProjectByName = (
  client: CodingClient,
  params: DescribeProjectByNameInput,
): Promise<Either<SdkError, DescribeProjectByNameOutput>> =>
  executeAction(client.config, spec, params);
