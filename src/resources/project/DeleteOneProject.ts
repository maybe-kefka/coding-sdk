import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 单个项目删除 - 请求参数 */
export const DeleteOneProjectInputSchema = z.object({
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
});

/** 单个项目删除 - 响应数据 */
export const DeleteOneProjectOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteOneProjectInput = z.infer<typeof DeleteOneProjectInputSchema>;
export type DeleteOneProjectOutput = z.infer<typeof DeleteOneProjectOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteOneProjectInput, DeleteOneProjectOutput> = {
  action: 'DeleteOneProject',
  method: 'POST',
  inputSchema: DeleteOneProjectInputSchema,
  outputSchema: DeleteOneProjectOutputSchema,
};

// --------------- Action ---------------

/** 单个项目删除 */
export const DeleteOneProject = (
  client: CodingClient,
  params: DeleteOneProjectInput,
): Promise<Either<SdkError, DeleteOneProjectOutput>> => executeAction(client.config, spec, params);
