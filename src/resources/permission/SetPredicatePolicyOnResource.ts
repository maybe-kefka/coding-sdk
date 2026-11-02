import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 资源权限判定策略设置 - 请求参数 */
export const SetPredicatePolicyOnResourceInputSchema = z.object({
  /** 资源信息 */
  Resource: ResourceInfoSchema.describe('资源信息'),
  /** SELF_PARENT // 同时使用父级资源+当前资源 SELF_NONE  // 只使用当前消息 NONE_PARENT  // 只使用父级资源 */
  ResourcePredicatePolicy: z
    .string()
    .describe(
      'SELF_PARENT // 同时使用父级资源+当前资源 SELF_NONE  // 只使用当前消息 NONE_PARENT  // 只使用父级资源',
    ),
});

/** 资源权限判定策略设置 - 响应数据 */
export const SetPredicatePolicyOnResourceOutputSchema = z.object({});

// --------------- Types ---------------

export type SetPredicatePolicyOnResourceInput = z.infer<
  typeof SetPredicatePolicyOnResourceInputSchema
>;
export type SetPredicatePolicyOnResourceOutput = z.infer<
  typeof SetPredicatePolicyOnResourceOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<SetPredicatePolicyOnResourceInput, SetPredicatePolicyOnResourceOutput> = {
  action: 'SetPredicatePolicyOnResource',
  method: 'POST',
  inputSchema: SetPredicatePolicyOnResourceInputSchema,
  outputSchema: SetPredicatePolicyOnResourceOutputSchema,
};

// --------------- Action ---------------

/** 资源权限判定策略设置 */
export const SetPredicatePolicyOnResource = (
  client: CodingClient,
  params: SetPredicatePolicyOnResourceInput,
): Promise<Either<SdkError, SetPredicatePolicyOnResourceOutput>> =>
  executeAction(client.config, spec, params);
