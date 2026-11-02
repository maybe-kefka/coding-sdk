import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotSpecSchema } from './schemas';

// --------------- Schema ---------------

/** 查询仓库规范列表 - 请求参数 */
export const DescribeDepotSpecsInputSchema = z.object({});

/** 查询仓库规范列表 - 响应数据 */
export const DescribeDepotSpecsOutputSchema = z.object({
  /** 仓库规范列表 */
  DepotSpecs: z.array(DepotSpecSchema).nullable().describe('仓库规范列表'),
});

// --------------- Types ---------------

export type DescribeDepotSpecsInput = z.infer<typeof DescribeDepotSpecsInputSchema>;
export type DescribeDepotSpecsOutput = z.infer<typeof DescribeDepotSpecsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotSpecsInput, DescribeDepotSpecsOutput> = {
  action: 'DescribeDepotSpecs',
  method: 'POST',
  inputSchema: DescribeDepotSpecsInputSchema,
  outputSchema: DescribeDepotSpecsOutputSchema,
};

// --------------- Action ---------------

/** 查询仓库规范列表 */
export const DescribeDepotSpecs = (
  client: CodingClient,
  params: DescribeDepotSpecsInput,
): Promise<Either<SdkError, DescribeDepotSpecsOutput>> =>
  executeAction(client.config, spec, params);
