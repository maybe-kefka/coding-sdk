import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectLabelLabelsSchema } from './schemas';

// --------------- Schema ---------------

/** 项目标签创建 - 请求参数 */
export const CreateProjectLabelInputSchema = z.object({
  /** 项目ID */
  ProjectId: z.number().int().describe('项目ID'),
  /** 标签名 */
  Name: z.string().describe('标签名'),
  /** 颜色 */
  Color: z.string().describe('颜色'),
});

/** 项目标签创建 - 响应数据 */
export const CreateProjectLabelOutputSchema = z.object({
  /** 创建的标签 */
  Label: ProjectLabelLabelsSchema.describe('创建的标签'),
});

// --------------- Types ---------------

export type CreateProjectLabelInput = z.infer<typeof CreateProjectLabelInputSchema>;
export type CreateProjectLabelOutput = z.infer<typeof CreateProjectLabelOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProjectLabelInput, CreateProjectLabelOutput> = {
  action: 'CreateProjectLabel',
  method: 'POST',
  inputSchema: CreateProjectLabelInputSchema,
  outputSchema: CreateProjectLabelOutputSchema,
};

// --------------- Action ---------------

/** 项目标签创建 */
export const CreateProjectLabel = (
  client: CodingClient,
  params: CreateProjectLabelInput,
): Promise<Either<SdkError, CreateProjectLabelOutput>> =>
  executeAction(client.config, spec, params);
