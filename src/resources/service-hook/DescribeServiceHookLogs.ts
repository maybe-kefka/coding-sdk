import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ServiceHookLogPageSchema } from './schemas';

// --------------- Schema ---------------

/** Service Hook 发送记录分页查询 - 请求参数 */
export const DescribeServiceHookLogsInputSchema = z.object({
  /** Service Hook 编号 */
  Id: z.string().describe('Service Hook 编号'),
  /** 分页页码 */
  PageNumber: z.number().int().describe('分页页码'),
  /** 分页大小 */
  PageSize: z.number().int().describe('分页大小'),
  /** 项目编号 */
  ProjectId: z.number().int().describe('项目编号'),
  /** 目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT */
  TargetType: z
    .string()
    .optional()
    .describe('目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT'),
});

/** Service Hook 发送记录分页查询 - 响应数据 */
export const DescribeServiceHookLogsOutputSchema = z.object({
  /** Service Hook 发送记录分页 */
  Data: ServiceHookLogPageSchema.describe('Service Hook 发送记录分页'),
});

// --------------- Types ---------------

export type DescribeServiceHookLogsInput = z.infer<typeof DescribeServiceHookLogsInputSchema>;
export type DescribeServiceHookLogsOutput = z.infer<typeof DescribeServiceHookLogsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeServiceHookLogsInput, DescribeServiceHookLogsOutput> = {
  action: 'DescribeServiceHookLogs',
  method: 'POST',
  inputSchema: DescribeServiceHookLogsInputSchema,
  outputSchema: DescribeServiceHookLogsOutputSchema,
};

// --------------- Action ---------------

/** Service Hook 发送记录分页查询 */
export const DescribeServiceHookLogs = (
  client: CodingClient,
  params: DescribeServiceHookLogsInput,
): Promise<Either<SdkError, DescribeServiceHookLogsOutput>> =>
  executeAction(client.config, spec, params);
