import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Service Hook 事件开关 - 请求参数 */
export const EnabledServiceHookInputSchema = z.object({
  /** 是否开启 */
  Enabled: z.boolean().describe('是否开启'),
  /** Service Hook 编号 */
  Id: z.array(z.string()).describe('Service Hook 编号'),
  /** 项目或者研发空间编号 */
  ProjectId: z.number().int().describe('项目或者研发空间编号'),
  /** 目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT */
  TargetType: z.string().describe('目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT'),
});

/** Service Hook 事件开关 - 响应数据 */
export const EnabledServiceHookOutputSchema = z.object({
  /** 是否操作成功 */
  Succeed: z.boolean().describe('是否操作成功'),
});

// --------------- Types ---------------

export type EnabledServiceHookInput = z.infer<typeof EnabledServiceHookInputSchema>;
export type EnabledServiceHookOutput = z.infer<typeof EnabledServiceHookOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<EnabledServiceHookInput, EnabledServiceHookOutput> = {
  action: 'EnabledServiceHook',
  method: 'POST',
  inputSchema: EnabledServiceHookInputSchema,
  outputSchema: EnabledServiceHookOutputSchema,
};

// --------------- Action ---------------

/** Service Hook 事件开关 */
export const EnabledServiceHook = (
  client: CodingClient,
  params: EnabledServiceHookInput,
): Promise<Either<SdkError, EnabledServiceHookOutput>> =>
  executeAction(client.config, spec, params);
