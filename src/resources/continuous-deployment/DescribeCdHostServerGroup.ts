import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdHostServerGroupResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 主机组获取 - 请求参数 */
export const DescribeCdHostServerGroupInputSchema = z.object({
  /** 主机组 ID */
  Id: z.number().int().describe('主机组 ID'),
});

/** CD 主机组获取 - 响应数据 */
export const DescribeCdHostServerGroupOutputSchema = z.object({
  /** 主机组详情数据 */
  Data: DescribeCdHostServerGroupResponseDataSchema.describe('主机组详情数据'),
});

// --------------- Types ---------------

export type DescribeCdHostServerGroupInput = z.infer<typeof DescribeCdHostServerGroupInputSchema>;
export type DescribeCdHostServerGroupOutput = z.infer<typeof DescribeCdHostServerGroupOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdHostServerGroupInput, DescribeCdHostServerGroupOutput> = {
  action: 'DescribeCdHostServerGroup',
  method: 'POST',
  inputSchema: DescribeCdHostServerGroupInputSchema,
  outputSchema: DescribeCdHostServerGroupOutputSchema,
};

// --------------- Action ---------------

/** CD 主机组获取 */
export const DescribeCdHostServerGroup = (
  client: CodingClient,
  params: DescribeCdHostServerGroupInput,
): Promise<Either<SdkError, DescribeCdHostServerGroupOutput>> =>
  executeAction(client.config, spec, params);
