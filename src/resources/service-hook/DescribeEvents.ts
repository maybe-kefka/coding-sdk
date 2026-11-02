import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ServiceHookEventSchema } from './schemas';

// --------------- Schema ---------------

/** 查询 Service Hook 事件列表 - 请求参数 */
export const DescribeEventsInputSchema = z.object({});

/** 查询 Service Hook 事件列表 - 响应数据 */
export const DescribeEventsOutputSchema = z.object({
  /** 事件列表 */
  Event: z.array(ServiceHookEventSchema).describe('事件列表'),
});

// --------------- Types ---------------

export type DescribeEventsInput = z.infer<typeof DescribeEventsInputSchema>;
export type DescribeEventsOutput = z.infer<typeof DescribeEventsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeEventsInput, DescribeEventsOutput> = {
  action: 'DescribeEvents',
  method: 'POST',
  inputSchema: DescribeEventsInputSchema,
  outputSchema: DescribeEventsOutputSchema,
};

// --------------- Action ---------------

/** 查询 Service Hook 事件列表，返回事件英文标识、事件中文名、事件分组英文标识、事件分组中文名 */
export const DescribeEvents = (
  client: CodingClient,
  params: DescribeEventsInput,
): Promise<Either<SdkError, DescribeEventsOutput>> => executeAction(client.config, spec, params);
