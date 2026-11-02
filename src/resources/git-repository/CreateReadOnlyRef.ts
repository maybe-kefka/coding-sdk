import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 创建只读分支 - 请求参数 */
export const CreateReadOnlyRefInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 分支名称 */
  RefName: z.string().describe('分支名称'),
});

/** 创建只读分支 - 响应数据 */
export const CreateReadOnlyRefOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateReadOnlyRefInput = z.infer<typeof CreateReadOnlyRefInputSchema>;
export type CreateReadOnlyRefOutput = z.infer<typeof CreateReadOnlyRefOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateReadOnlyRefInput, CreateReadOnlyRefOutput> = {
  action: 'CreateReadOnlyRef',
  method: 'POST',
  inputSchema: CreateReadOnlyRefInputSchema,
  outputSchema: CreateReadOnlyRefOutputSchema,
};

// --------------- Action ---------------

/** 创建只读分支 */
export const CreateReadOnlyRef = (
  client: CodingClient,
  params: CreateReadOnlyRefInput,
): Promise<Either<SdkError, CreateReadOnlyRefOutput>> => executeAction(client.config, spec, params);
