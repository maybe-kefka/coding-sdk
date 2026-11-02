import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CurrentUserSchema } from './schemas';

// --------------- Schema ---------------

/** 当前用户信息查询 - 请求参数 */
export const DescribeCodingCurrentUserInputSchema = z.object({});

/** 当前用户信息查询 - 响应数据 */
export const DescribeCodingCurrentUserOutputSchema = z.object({
  /** 当前用户信息 */
  User: CurrentUserSchema.nullable().describe('当前用户信息'),
});

// --------------- Types ---------------

export type DescribeCodingCurrentUserInput = z.infer<typeof DescribeCodingCurrentUserInputSchema>;
export type DescribeCodingCurrentUserOutput = z.infer<typeof DescribeCodingCurrentUserOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCurrentUserInput, DescribeCodingCurrentUserOutput> = {
  action: 'DescribeCodingCurrentUser',
  method: 'POST',
  inputSchema: DescribeCodingCurrentUserInputSchema,
  outputSchema: DescribeCodingCurrentUserOutputSchema,
};

// --------------- Action ---------------

/** 当前用户信息查询 */
export const DescribeCodingCurrentUser = (
  client: CodingClient,
  params: DescribeCodingCurrentUserInput,
): Promise<Either<SdkError, DescribeCodingCurrentUserOutput>> =>
  executeAction(client.config, spec, params);
