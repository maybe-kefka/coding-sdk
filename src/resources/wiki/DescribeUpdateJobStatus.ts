import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiJobStatusSchema } from './schemas';

// --------------- Schema ---------------

/** zip包更新wiki的任务状态查询 - 请求参数 */
export const DescribeUpdateJobStatusInputSchema = z.object({
  /** 任务Id */
  JobId: z.string().describe('任务Id'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** zip包更新wiki的任务状态查询 - 响应数据 */
export const DescribeUpdateJobStatusOutputSchema = z.object({
  /** 导入wiki的状态 */
  Data: WikiJobStatusSchema.describe('导入wiki的状态'),
});

// --------------- Types ---------------

export type DescribeUpdateJobStatusInput = z.infer<typeof DescribeUpdateJobStatusInputSchema>;
export type DescribeUpdateJobStatusOutput = z.infer<typeof DescribeUpdateJobStatusOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeUpdateJobStatusInput, DescribeUpdateJobStatusOutput> = {
  action: 'DescribeUpdateJobStatus',
  method: 'POST',
  inputSchema: DescribeUpdateJobStatusInputSchema,
  outputSchema: DescribeUpdateJobStatusOutputSchema,
};

// --------------- Action ---------------

/** 通过zip包更新wiki任务状态查询 */
export const DescribeUpdateJobStatus = (
  client: CodingClient,
  params: DescribeUpdateJobStatusInput,
): Promise<Either<SdkError, DescribeUpdateJobStatusOutput>> =>
  executeAction(client.config, spec, params);
