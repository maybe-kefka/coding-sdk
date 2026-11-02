import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueModuleSchema } from './schemas';

// --------------- Schema ---------------

/** 更新事项模块 - 请求参数 */
export const UpdateIssueModuleInputSchema = z.object({
  /** 模块名称 */
  Name: z.string().describe('模块名称'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 模块ID */
  ModuleId: z.number().int().describe('模块ID'),
});

/** 更新事项模块 - 响应数据 */
export const UpdateIssueModuleOutputSchema = z.object({
  /** 模块信息 */
  IssueModule: IssueModuleSchema.optional().describe('模块信息'),
});

// --------------- Types ---------------

export type UpdateIssueModuleInput = z.infer<typeof UpdateIssueModuleInputSchema>;
export type UpdateIssueModuleOutput = z.infer<typeof UpdateIssueModuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<UpdateIssueModuleInput, UpdateIssueModuleOutput> = {
  action: 'UpdateIssueModule',
  method: 'POST',
  inputSchema: UpdateIssueModuleInputSchema,
  outputSchema: UpdateIssueModuleOutputSchema,
};

// --------------- Action ---------------

/** 更新事项模块 */
export const UpdateIssueModule = (
  client: CodingClient,
  params: UpdateIssueModuleInput,
): Promise<Either<SdkError, UpdateIssueModuleOutput>> => executeAction(client.config, spec, params);
