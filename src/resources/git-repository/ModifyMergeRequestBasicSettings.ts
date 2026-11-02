import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改合并请求基础设置 - 请求参数 */
export const ModifyMergeRequestBasicSettingsInputSchema = z.object({
  /** 合并请求源分支有新提交时是否自动取消合并授权 */
  CancelMrGrantAfterPushSrc: z.boolean().describe('合并请求源分支有新提交时是否自动取消合并授权'),
  /** 是否默认以 Fast-Forward 模式合并 */
  DefaultFastForwardMerge: z.boolean().describe('是否默认以 Fast-Forward 模式合并'),
  /** 合并请求默认分支 */
  DefaultTargetBranch: z.string().optional().describe('合并请求默认分支'),
  /** 是否默认删除源分支 */
  DeleteSrcBranchAfterMerged: z.boolean().describe('是否默认删除源分支'),
  /** 仓库路径，格式：<team>/<project>/<depot> */
  DepotPath: z.string().describe('仓库路径，格式：<team>/<project>/<depot>'),
  /** 是否开启状态检查 */
  DepotStatusCheckRequired: z.boolean().describe('是否开启状态检查'),
  /** 合并前是否必须获得所有评审者的允许合并 */
  MrCheckAllReviewersAllow: z.boolean().describe('合并前是否必须获得所有评审者的允许合并'),
  /** 合并请求选择方式no_squash:默认直接合并default_squash:默认Squash合并 force_squash:只能Squash合并 */
  SquashOnMerge: z
    .string()
    .optional()
    .describe(
      '合并请求选择方式no_squash:默认直接合并default_squash:默认Squash合并 force_squash:只能Squash合并',
    ),
});

/** 修改合并请求基础设置 - 响应数据 */
export const ModifyMergeRequestBasicSettingsOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyMergeRequestBasicSettingsInput = z.infer<
  typeof ModifyMergeRequestBasicSettingsInputSchema
>;
export type ModifyMergeRequestBasicSettingsOutput = z.infer<
  typeof ModifyMergeRequestBasicSettingsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  ModifyMergeRequestBasicSettingsInput,
  ModifyMergeRequestBasicSettingsOutput
> = {
  action: 'ModifyMergeRequestBasicSettings',
  method: 'POST',
  inputSchema: ModifyMergeRequestBasicSettingsInputSchema,
  outputSchema: ModifyMergeRequestBasicSettingsOutputSchema,
};

// --------------- Action ---------------

/** 修改合并请求基础设置 */
export const ModifyMergeRequestBasicSettings = (
  client: CodingClient,
  params: ModifyMergeRequestBasicSettingsInput,
): Promise<Either<SdkError, ModifyMergeRequestBasicSettingsOutput>> =>
  executeAction(client.config, spec, params);
