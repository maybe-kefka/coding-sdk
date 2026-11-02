import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ServiceHookSchema } from './schemas';

// --------------- Schema ---------------

/** Service Hook 查询 - 请求参数 */
export const DescribeServiceHookInputSchema = z.object({
  /** service-hook-id */
  Id: z.string().describe('service-hook-id'),
  /** 项目或者研发空间id */
  ProjectId: z.number().int().describe('项目或者研发空间id'),
  /** 目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT */
  TargetType: z
    .string()
    .optional()
    .describe('目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT'),
});

/** Service Hook 查询 - 响应数据 */
export const DescribeServiceHookOutputSchema = z.object({
  /** {} */
  ServiceHook: ServiceHookSchema.describe('{}'),
});

// --------------- Types ---------------

export type DescribeServiceHookInput = z.infer<typeof DescribeServiceHookInputSchema>;
export type DescribeServiceHookOutput = z.infer<typeof DescribeServiceHookOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeServiceHookInput, DescribeServiceHookOutput> = {
  action: 'DescribeServiceHook',
  method: 'POST',
  inputSchema: DescribeServiceHookInputSchema,
  outputSchema: DescribeServiceHookOutputSchema,
};

// --------------- Action ---------------

/** Service Hook 查询 */
export const DescribeServiceHook = (
  client: CodingClient,
  params: DescribeServiceHookInput,
): Promise<Either<SdkError, DescribeServiceHookOutput>> =>
  executeAction(client.config, spec, params);
