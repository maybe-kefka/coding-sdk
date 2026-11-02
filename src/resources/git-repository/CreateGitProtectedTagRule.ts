import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 创建标签保护规则 - 请求参数 */
export const CreateGitProtectedTagRuleInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
  /** 保护规则 */
  Rule: z.string().describe('保护规则'),
});

/** 创建标签保护规则 - 响应数据 */
export const CreateGitProtectedTagRuleOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateGitProtectedTagRuleInput = z.infer<typeof CreateGitProtectedTagRuleInputSchema>;
export type CreateGitProtectedTagRuleOutput = z.infer<typeof CreateGitProtectedTagRuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitProtectedTagRuleInput, CreateGitProtectedTagRuleOutput> = {
  action: 'CreateGitProtectedTagRule',
  method: 'POST',
  inputSchema: CreateGitProtectedTagRuleInputSchema,
  outputSchema: CreateGitProtectedTagRuleOutputSchema,
};

// --------------- Action ---------------

/** 创建标签保护规则 */
export const CreateGitProtectedTagRule = (
  client: CodingClient,
  params: CreateGitProtectedTagRuleInput,
): Promise<Either<SdkError, CreateGitProtectedTagRuleOutput>> =>
  executeAction(client.config, spec, params);
