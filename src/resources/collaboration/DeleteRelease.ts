import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除版本 - 请求参数 */
export const DeleteReleaseInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 版本code */
  ReleaseCode: z.number().int().describe('版本code'),
});

/** 删除版本 - 响应数据 */
export const DeleteReleaseOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteReleaseInput = z.infer<typeof DeleteReleaseInputSchema>;
export type DeleteReleaseOutput = z.infer<typeof DeleteReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteReleaseInput, DeleteReleaseOutput> = {
  action: 'DeleteRelease',
  method: 'POST',
  inputSchema: DeleteReleaseInputSchema,
  outputSchema: DeleteReleaseOutputSchema,
};

// --------------- Action ---------------

/** 删除版本 */
export const DeleteRelease = (
  client: CodingClient,
  params: DeleteReleaseInput,
): Promise<Either<SdkError, DeleteReleaseOutput>> => executeAction(client.config, spec, params);
