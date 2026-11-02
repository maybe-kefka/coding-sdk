import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除标签保护规则 - 请求参数 */
export const DeleteGitProtectedTagRuleInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 保护规则 */
  Rule: z.string().describe('保护规则'),
});

/** 删除标签保护规则 - 响应数据 */
export const DeleteGitProtectedTagRuleOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitProtectedTagRuleInput = z.infer<typeof DeleteGitProtectedTagRuleInputSchema>;
export type DeleteGitProtectedTagRuleOutput = z.infer<typeof DeleteGitProtectedTagRuleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitProtectedTagRuleInput, DeleteGitProtectedTagRuleOutput> = {
  action: 'DeleteGitProtectedTagRule',
  method: 'POST',
  inputSchema: DeleteGitProtectedTagRuleInputSchema,
  outputSchema: DeleteGitProtectedTagRuleOutputSchema,
};

// --------------- Action ---------------

/** 删除标签保护规则 */
export const DeleteGitProtectedTagRule = (
  client: CodingClient,
  params: DeleteGitProtectedTagRuleInput,
): Promise<Either<SdkError, DeleteGitProtectedTagRuleOutput>> =>
  executeAction(client.config, spec, params);
