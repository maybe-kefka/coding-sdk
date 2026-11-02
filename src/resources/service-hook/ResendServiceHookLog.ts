import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ServiceHookResendServiceHookResultSchema } from './schemas';

// --------------- Schema ---------------

/** Service Hook 重发 - 请求参数 */
export const ResendServiceHookLogInputSchema = z.object({
  /** logId */
  ServiceHookLogId: z.string().describe('logId'),
});

/** Service Hook 重发 - 响应数据 */
export const ResendServiceHookLogOutputSchema = z.object({
  /** 触发结果 */
  Data: ServiceHookResendServiceHookResultSchema.describe('触发结果'),
});

// --------------- Types ---------------

export type ResendServiceHookLogInput = z.infer<typeof ResendServiceHookLogInputSchema>;
export type ResendServiceHookLogOutput = z.infer<typeof ResendServiceHookLogOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ResendServiceHookLogInput, ResendServiceHookLogOutput> = {
  action: 'ResendServiceHookLog',
  method: 'POST',
  inputSchema: ResendServiceHookLogInputSchema,
  outputSchema: ResendServiceHookLogOutputSchema,
};

// --------------- Action ---------------

/** Service Hook 重发 */
export const ResendServiceHookLog = (
  client: CodingClient,
  params: ResendServiceHookLogInput,
): Promise<Either<SdkError, ResendServiceHookLogOutput>> =>
  executeAction(client.config, spec, params);
