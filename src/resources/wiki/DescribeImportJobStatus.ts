import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiJobStatusSchema } from './schemas';

// --------------- Schema ---------------

/** zip包创建wiki的任务状态查询 - 请求参数 */
export const DescribeImportJobStatusInputSchema = z.object({
  /** 任务Id */
  JobId: z.string().describe('任务Id'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** zip包创建wiki的任务状态查询 - 响应数据 */
export const DescribeImportJobStatusOutputSchema = z.object({
  /** 导入wiki状态 */
  Data: WikiJobStatusSchema.describe('导入wiki状态'),
});

// --------------- Types ---------------

export type DescribeImportJobStatusInput = z.infer<typeof DescribeImportJobStatusInputSchema>;
export type DescribeImportJobStatusOutput = z.infer<typeof DescribeImportJobStatusOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeImportJobStatusInput, DescribeImportJobStatusOutput> = {
  action: 'DescribeImportJobStatus',
  method: 'POST',
  inputSchema: DescribeImportJobStatusInputSchema,
  outputSchema: DescribeImportJobStatusOutputSchema,
};

// --------------- Action ---------------

/** 通过zip包创建wiki任务状态查询 */
export const DescribeImportJobStatus = (
  client: CodingClient,
  params: DescribeImportJobStatusInput,
): Promise<Either<SdkError, DescribeImportJobStatusOutput>> =>
  executeAction(client.config, spec, params);
