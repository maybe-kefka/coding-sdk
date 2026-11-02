import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 批量创建标签保护规则 - 请求参数 */
export const CreateGitProtectedTagRulesInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 保护规则列表 */
  Rule: z.array(z.string()).describe('保护规则列表'),
});

/** 批量创建标签保护规则 - 响应数据 */
export const CreateGitProtectedTagRulesOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateGitProtectedTagRulesInput = z.infer<typeof CreateGitProtectedTagRulesInputSchema>;
export type CreateGitProtectedTagRulesOutput = z.infer<
  typeof CreateGitProtectedTagRulesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitProtectedTagRulesInput, CreateGitProtectedTagRulesOutput> = {
  action: 'CreateGitProtectedTagRules',
  method: 'POST',
  inputSchema: CreateGitProtectedTagRulesInputSchema,
  outputSchema: CreateGitProtectedTagRulesOutputSchema,
};

// --------------- Action ---------------

/** 批量创建标签保护规则 */
export const CreateGitProtectedTagRules = (
  client: CodingClient,
  params: CreateGitProtectedTagRulesInput,
): Promise<Either<SdkError, CreateGitProtectedTagRulesOutput>> =>
  executeAction(client.config, spec, params);
