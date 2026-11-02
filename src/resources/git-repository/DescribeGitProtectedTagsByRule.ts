import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitTagSchema } from './schemas';

// --------------- Schema ---------------

/** 根据标签保护规则查询受保护的标签列表 - 请求参数 */
export const DescribeGitProtectedTagsByRuleInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 保护规则 */
  Rule: z.string().describe('保护规则'),
});

/** 根据标签保护规则查询受保护的标签列表 - 响应数据 */
export const DescribeGitProtectedTagsByRuleOutputSchema = z.object({
  /** 标签列表 */
  GitTags: z.array(GitTagSchema).describe('标签列表'),
});

// --------------- Types ---------------

export type DescribeGitProtectedTagsByRuleInput = z.infer<
  typeof DescribeGitProtectedTagsByRuleInputSchema
>;
export type DescribeGitProtectedTagsByRuleOutput = z.infer<
  typeof DescribeGitProtectedTagsByRuleOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitProtectedTagsByRuleInput, DescribeGitProtectedTagsByRuleOutput> =
  {
    action: 'DescribeGitProtectedTagsByRule',
    method: 'POST',
    inputSchema: DescribeGitProtectedTagsByRuleInputSchema,
    outputSchema: DescribeGitProtectedTagsByRuleOutputSchema,
  };

// --------------- Action ---------------

/** 根据标签保护规则查询受保护的标签列表 */
export const DescribeGitProtectedTagsByRule = (
  client: CodingClient,
  params: DescribeGitProtectedTagsByRuleInput,
): Promise<Either<SdkError, DescribeGitProtectedTagsByRuleOutput>> =>
  executeAction(client.config, spec, params);
