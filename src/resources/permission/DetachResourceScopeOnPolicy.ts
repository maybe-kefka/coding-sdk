import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ResourceInfoOfPolicyScopeSchema } from './schemas';

// --------------- Schema ---------------

/** 权限组可用资源删除 - 请求参数 */
export const DetachResourceScopeOnPolicyInputSchema = z.object({
  /** 权限组 ID */
  PolicyId: z.number().int().describe('权限组 ID'),
  /** 删除的资源 */
  ResourceInfos: z.array(ResourceInfoOfPolicyScopeSchema).describe('删除的资源'),
});

/** 权限组可用资源删除 - 响应数据 */
export const DetachResourceScopeOnPolicyOutputSchema = z.object({});

// --------------- Types ---------------

export type DetachResourceScopeOnPolicyInput = z.infer<
  typeof DetachResourceScopeOnPolicyInputSchema
>;
export type DetachResourceScopeOnPolicyOutput = z.infer<
  typeof DetachResourceScopeOnPolicyOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DetachResourceScopeOnPolicyInput, DetachResourceScopeOnPolicyOutput> = {
  action: 'DetachResourceScopeOnPolicy',
  method: 'POST',
  inputSchema: DetachResourceScopeOnPolicyInputSchema,
  outputSchema: DetachResourceScopeOnPolicyOutputSchema,
};

// --------------- Action ---------------

/** 权限组可用资源删除，只删除参数指定的资源，已有的其它资源不受影响 */
export const DetachResourceScopeOnPolicy = (
  client: CodingClient,
  params: DetachResourceScopeOnPolicyInput,
): Promise<Either<SdkError, DetachResourceScopeOnPolicyOutput>> =>
  executeAction(client.config, spec, params);
