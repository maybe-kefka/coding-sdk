import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Service Hook 测试 - 请求参数 */
export const PingServiceHookInputSchema = z.object({
  /** Service Hook 编号 */
  Id: z.array(z.string()).describe('Service Hook 编号'),
  /** 项目编号或者研发空间标号 */
  ProjectId: z.number().int().describe('项目编号或者研发空间标号'),
  /** 目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT */
  TargetType: z
    .string()
    .optional()
    .describe('目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT'),
});

/** Service Hook 测试 - 响应数据 */
export const PingServiceHookOutputSchema = z.object({
  /** 是否操作成功 */
  Succeed: z.boolean().describe('是否操作成功'),
});

// --------------- Types ---------------

export type PingServiceHookInput = z.infer<typeof PingServiceHookInputSchema>;
export type PingServiceHookOutput = z.infer<typeof PingServiceHookOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<PingServiceHookInput, PingServiceHookOutput> = {
  action: 'PingServiceHook',
  method: 'POST',
  inputSchema: PingServiceHookInputSchema,
  outputSchema: PingServiceHookOutputSchema,
};

// --------------- Action ---------------

/** Service Hook 测试 */
export const PingServiceHook = (
  client: CodingClient,
  params: PingServiceHookInput,
): Promise<Either<SdkError, PingServiceHookOutput>> => executeAction(client.config, spec, params);
