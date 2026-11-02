import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 项目标签删除 - 请求参数 */
export const DeleteProjectLabelInputSchema = z.object({
  /** 项目ID */
  ProjectId: z.number().int().describe('项目ID'),
  /** 标签Id */
  LabelId: z.number().int().describe('标签Id'),
});

/** 项目标签删除 - 响应数据 */
export const DeleteProjectLabelOutputSchema = z.object({
  /** 是否操作成功 */
  Succeed: z.boolean().optional().describe('是否操作成功'),
});

// --------------- Types ---------------

export type DeleteProjectLabelInput = z.infer<typeof DeleteProjectLabelInputSchema>;
export type DeleteProjectLabelOutput = z.infer<typeof DeleteProjectLabelOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteProjectLabelInput, DeleteProjectLabelOutput> = {
  action: 'DeleteProjectLabel',
  method: 'POST',
  inputSchema: DeleteProjectLabelInputSchema,
  outputSchema: DeleteProjectLabelOutputSchema,
};

// --------------- Action ---------------

/** 项目标签删除 */
export const DeleteProjectLabel = (
  client: CodingClient,
  params: DeleteProjectLabelInput,
): Promise<Either<SdkError, DeleteProjectLabelOutput>> =>
  executeAction(client.config, spec, params);
