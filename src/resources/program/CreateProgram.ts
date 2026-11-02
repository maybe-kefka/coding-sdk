import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProgramProgramSchema } from './schemas';

// --------------- Schema ---------------

/** 项目集创建 - 请求参数 */
export const CreateProgramInputSchema = z.object({
  /** 描述信息 */
  Description: z.string().describe('描述信息'),
  /** 展示名 */
  DisplayName: z.string().describe('展示名'),
  /** 截止时间 */
  EndDate: z.string().describe('截止时间'),
  /** 项目集名 */
  Name: z.string().describe('项目集名'),
  /** 开始时间 */
  StartDate: z.string().describe('开始时间'),
  /** 已有工作流项目集 Id */
  WorkflowProgramId: z.string().optional().describe('已有工作流项目集 Id'),
});

/** 项目集创建 - 响应数据 */
export const CreateProgramOutputSchema = z.object({
  /** 项目集信息 */
  Data: ProgramProgramSchema.describe('项目集信息'),
});

// --------------- Types ---------------

export type CreateProgramInput = z.infer<typeof CreateProgramInputSchema>;
export type CreateProgramOutput = z.infer<typeof CreateProgramOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProgramInput, CreateProgramOutput> = {
  action: 'CreateProgram',
  method: 'POST',
  inputSchema: CreateProgramInputSchema,
  outputSchema: CreateProgramOutputSchema,
};

// --------------- Action ---------------

/** 项目集创建 */
export const CreateProgram = (
  client: CodingClient,
  params: CreateProgramInput,
): Promise<Either<SdkError, CreateProgramOutput>> => executeAction(client.config, spec, params);
