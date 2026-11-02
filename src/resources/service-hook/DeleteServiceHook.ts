import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Service Hook 删除 - 请求参数 */
export const DeleteServiceHookInputSchema = z.object({
  /** Service Hook 编号 */
  Id: z.array(z.string()).describe('Service Hook 编号'),
  /** 项目编号或者研发空间编号 */
  ProjectId: z.number().int().describe('项目编号或者研发空间编号'),
  /** 目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT */
  TargetType: z
    .string()
    .optional()
    .describe('目标数据类型：PROJECT,SPACE_NODE,PROGRAM,默认PROJECT'),
});

/** Service Hook 删除 - 响应数据 */
export const DeleteServiceHookOutputSchema = z.object({
  /** 是否操作成功 */
  Succeed: z.boolean().describe('是否操作成功'),
});

// --------------- Types ---------------

export type DeleteServiceHookInput = z.infer<typeof DeleteServiceHookInputSchema>;
export type DeleteServiceHookOutput = z.infer<typeof DeleteServiceHookOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteServiceHookInput, DeleteServiceHookOutput> = {
  action: 'DeleteServiceHook',
  method: 'POST',
  inputSchema: DeleteServiceHookInputSchema,
  outputSchema: DeleteServiceHookOutputSchema,
};

// --------------- Action ---------------

/** Service Hook 删除 */
export const DeleteServiceHook = (
  client: CodingClient,
  params: DeleteServiceHookInput,
): Promise<Either<SdkError, DeleteServiceHookOutput>> => executeAction(client.config, spec, params);
