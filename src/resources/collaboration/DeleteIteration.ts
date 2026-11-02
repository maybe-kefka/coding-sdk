import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除迭代 - 请求参数 */
export const DeleteIterationInputSchema = z.object({
  /** 迭代编号 */
  IterationCode: z.number().int().describe('迭代编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 删除迭代 - 响应数据 */
export const DeleteIterationOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteIterationInput = z.infer<typeof DeleteIterationInputSchema>;
export type DeleteIterationOutput = z.infer<typeof DeleteIterationOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteIterationInput, DeleteIterationOutput> = {
  action: 'DeleteIteration',
  method: 'POST',
  inputSchema: DeleteIterationInputSchema,
  outputSchema: DeleteIterationOutputSchema,
};

// --------------- Action ---------------

/** 删除迭代 */
export const DeleteIteration = (
  client: CodingClient,
  params: DeleteIterationInput,
): Promise<Either<SdkError, DeleteIterationOutput>> => executeAction(client.config, spec, params);
