import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectLabelLabelsSchema } from './schemas';

// --------------- Schema ---------------

/** 项目标签修改 - 请求参数 */
export const ModifyProjectLabelInputSchema = z.object({
  /** 项目ID */
  ProjectId: z.number().int().describe('项目ID'),
  /** 标签Id */
  LabelId: z.number().int().describe('标签Id'),
  /** 标签名 */
  Name: z.string().describe('标签名'),
  /** 颜色 */
  Color: z.string().describe('颜色'),
});

/** 项目标签修改 - 响应数据 */
export const ModifyProjectLabelOutputSchema = z.object({
  /** 创建的标签 */
  Label: ProjectLabelLabelsSchema.describe('创建的标签'),
});

// --------------- Types ---------------

export type ModifyProjectLabelInput = z.infer<typeof ModifyProjectLabelInputSchema>;
export type ModifyProjectLabelOutput = z.infer<typeof ModifyProjectLabelOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyProjectLabelInput, ModifyProjectLabelOutput> = {
  action: 'ModifyProjectLabel',
  method: 'POST',
  inputSchema: ModifyProjectLabelInputSchema,
  outputSchema: ModifyProjectLabelOutputSchema,
};

// --------------- Action ---------------

/** 项目标签修改 */
export const ModifyProjectLabel = (
  client: CodingClient,
  params: ModifyProjectLabelInput,
): Promise<Either<SdkError, ModifyProjectLabelOutput>> =>
  executeAction(client.config, spec, params);
