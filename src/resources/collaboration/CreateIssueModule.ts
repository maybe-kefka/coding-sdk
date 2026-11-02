import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueModuleSchema } from './schemas';

// --------------- Schema ---------------

/** 创建事项模块 - 请求参数 */
export const CreateIssueModuleInputSchema = z.object({
  /** 模块名称 */
  Name: z.string().describe('模块名称'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 创建事项模块 - 响应数据 */
export const CreateIssueModuleOutputSchema = z.object({
  /** 模块信息 */
  IssueModule: IssueModuleSchema.optional().describe('模块信息'),
});

// --------------- Types ---------------

export type CreateIssueModuleInput = z.infer<typeof CreateIssueModuleInputSchema>;
export type CreateIssueModuleOutput = z.infer<typeof CreateIssueModuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateIssueModuleInput, CreateIssueModuleOutput> = {
  action: 'CreateIssueModule',
  method: 'POST',
  inputSchema: CreateIssueModuleInputSchema,
  outputSchema: CreateIssueModuleOutputSchema,
};

// --------------- Action ---------------

/** 创建事项模块 */
export const CreateIssueModule = (
  client: CodingClient,
  params: CreateIssueModuleInput,
): Promise<Either<SdkError, CreateIssueModuleOutput>> => executeAction(client.config, spec, params);
