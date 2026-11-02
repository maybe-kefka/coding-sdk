import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdApplicationsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 应用列表获取 - 请求参数 */
export const DescribeCdApplicationsInputSchema = z.object({});

/** CD 应用列表获取 - 响应数据 */
export const DescribeCdApplicationsOutputSchema = z.object({
  /** CD 应用列表 */
  Data: DescribeCdApplicationsResponseDataSchema.describe('CD 应用列表'),
});

// --------------- Types ---------------

export type DescribeCdApplicationsInput = z.infer<typeof DescribeCdApplicationsInputSchema>;
export type DescribeCdApplicationsOutput = z.infer<typeof DescribeCdApplicationsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdApplicationsInput, DescribeCdApplicationsOutput> = {
  action: 'DescribeCdApplications',
  method: 'POST',
  inputSchema: DescribeCdApplicationsInputSchema,
  outputSchema: DescribeCdApplicationsOutputSchema,
};

// --------------- Action ---------------

/** CD 应用列表获取 */
export const DescribeCdApplications = (
  client: CodingClient,
  params: DescribeCdApplicationsInput,
): Promise<Either<SdkError, DescribeCdApplicationsOutput>> =>
  executeAction(client.config, spec, params);
