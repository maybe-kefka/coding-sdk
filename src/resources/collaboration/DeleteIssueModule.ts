import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除事项模块 - 请求参数 */
export const DeleteIssueModuleInputSchema = z.object({
  /** 模块ID */
  ModuleId: z.number().int().describe('模块ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 删除事项模块 - 响应数据 */
export const DeleteIssueModuleOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteIssueModuleInput = z.infer<typeof DeleteIssueModuleInputSchema>;
export type DeleteIssueModuleOutput = z.infer<typeof DeleteIssueModuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteIssueModuleInput, DeleteIssueModuleOutput> = {
  action: 'DeleteIssueModule',
  method: 'POST',
  inputSchema: DeleteIssueModuleInputSchema,
  outputSchema: DeleteIssueModuleOutputSchema,
};

// --------------- Action ---------------

/** 删除事项模块 */
export const DeleteIssueModule = (
  client: CodingClient,
  params: DeleteIssueModuleInput,
): Promise<Either<SdkError, DeleteIssueModuleOutput>> => executeAction(client.config, spec, params);
