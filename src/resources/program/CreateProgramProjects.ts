import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProgramProgramSchema } from './schemas';

// --------------- Schema ---------------

/** 项目集中添加项目 - 请求参数 */
export const CreateProgramProjectsInputSchema = z.object({
  /** 项目集 ID */
  ProgramId: z.number().int().describe('项目集 ID'),
  /** 项目 ID */
  ProjectId: z.array(z.number().int()).describe('项目 ID'),
});

/** 项目集中添加项目 - 响应数据 */
export const CreateProgramProjectsOutputSchema = z.object({
  Data: z.array(ProgramProgramSchema),
});

// --------------- Types ---------------

export type CreateProgramProjectsInput = z.infer<typeof CreateProgramProjectsInputSchema>;
export type CreateProgramProjectsOutput = z.infer<typeof CreateProgramProjectsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProgramProjectsInput, CreateProgramProjectsOutput> = {
  action: 'CreateProgramProjects',
  method: 'POST',
  inputSchema: CreateProgramProjectsInputSchema,
  outputSchema: CreateProgramProjectsOutputSchema,
};

// --------------- Action ---------------

/** 项目集中添加项目 */
export const CreateProgramProjects = (
  client: CodingClient,
  params: CreateProgramProjectsInput,
): Promise<Either<SdkError, CreateProgramProjectsOutput>> =>
  executeAction(client.config, spec, params);
