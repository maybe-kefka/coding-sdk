import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdAgentMachinesResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 堡垒机列表获取 - 请求参数 */
export const DescribeCdAgentMachinesInputSchema = z.object({
  /** 检索关键字 */
  Keyword: z.string().optional().describe('检索关键字'),
  /** 页码（默认为 1） */
  PageNumber: z.number().int().optional().describe('页码（默认为 1）'),
  /** 每页条数（默认为 10，最大值为 500） */
  PageSize: z.number().int().optional().describe('每页条数（默认为 10，最大值为 500）'),
});

/** CD 堡垒机列表获取 - 响应数据 */
export const DescribeCdAgentMachinesOutputSchema = z.object({
  /** 堡垒机列表数据 */
  Data: DescribeCdAgentMachinesResponseDataSchema.describe('堡垒机列表数据'),
});

// --------------- Types ---------------

export type DescribeCdAgentMachinesInput = z.infer<typeof DescribeCdAgentMachinesInputSchema>;
export type DescribeCdAgentMachinesOutput = z.infer<typeof DescribeCdAgentMachinesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdAgentMachinesInput, DescribeCdAgentMachinesOutput> = {
  action: 'DescribeCdAgentMachines',
  method: 'POST',
  inputSchema: DescribeCdAgentMachinesInputSchema,
  outputSchema: DescribeCdAgentMachinesOutputSchema,
};

// --------------- Action ---------------

/** CD 堡垒机列表获取 */
export const DescribeCdAgentMachines = (
  client: CodingClient,
  params: DescribeCdAgentMachinesInput,
): Promise<Either<SdkError, DescribeCdAgentMachinesOutput>> =>
  executeAction(client.config, spec, params);
