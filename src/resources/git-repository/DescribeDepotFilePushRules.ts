import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitFilePushRuleSchema } from './schemas';

// --------------- Schema ---------------

/** 查询 git 仓库文件推送规则 - 请求参数 */
export const DescribeDepotFilePushRulesInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
});

/** 查询 git 仓库文件推送规则 - 响应数据 */
export const DescribeDepotFilePushRulesOutputSchema = z.object({
  /** git 仓库文件推送规则列表 */
  GitFilePushRule: z.array(GitFilePushRuleSchema).nullable().describe('git 仓库文件推送规则列表'),
});

// --------------- Types ---------------

export type DescribeDepotFilePushRulesInput = z.infer<typeof DescribeDepotFilePushRulesInputSchema>;
export type DescribeDepotFilePushRulesOutput = z.infer<
  typeof DescribeDepotFilePushRulesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeDepotFilePushRulesInput, DescribeDepotFilePushRulesOutput> = {
  action: 'DescribeDepotFilePushRules',
  method: 'POST',
  inputSchema: DescribeDepotFilePushRulesInputSchema,
  outputSchema: DescribeDepotFilePushRulesOutputSchema,
};

// --------------- Action ---------------

/** 查询 git 仓库文件推送规则 */
export const DescribeDepotFilePushRules = (
  client: CodingClient,
  params: DescribeDepotFilePushRulesInput,
): Promise<Either<SdkError, DescribeDepotFilePushRulesOutput>> =>
  executeAction(client.config, spec, params);
