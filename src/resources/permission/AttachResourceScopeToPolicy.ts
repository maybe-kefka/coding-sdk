import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ResourceInfoOfPolicyScopeSchema } from './schemas';

// --------------- Schema ---------------

/** 权限组添加可用的资源 - 请求参数 */
export const AttachResourceScopeToPolicyInputSchema = z.object({
  /** 权限组 ID */
  PolicyId: z.number().int().describe('权限组 ID'),
  /** 添加的资源 */
  ResourceInfos: z.array(ResourceInfoOfPolicyScopeSchema).describe('添加的资源'),
});

/** 权限组添加可用的资源 - 响应数据 */
export const AttachResourceScopeToPolicyOutputSchema = z.object({});

// --------------- Types ---------------

export type AttachResourceScopeToPolicyInput = z.infer<
  typeof AttachResourceScopeToPolicyInputSchema
>;
export type AttachResourceScopeToPolicyOutput = z.infer<
  typeof AttachResourceScopeToPolicyOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<AttachResourceScopeToPolicyInput, AttachResourceScopeToPolicyOutput> = {
  action: 'AttachResourceScopeToPolicy',
  method: 'POST',
  inputSchema: AttachResourceScopeToPolicyInputSchema,
  outputSchema: AttachResourceScopeToPolicyOutputSchema,
};

// --------------- Action ---------------

/** 为指定权限组添加可用的资源，原有其它资源不受影响，若已存在的资源不再进行追加 */
export const AttachResourceScopeToPolicy = (
  client: CodingClient,
  params: AttachResourceScopeToPolicyInput,
): Promise<Either<SdkError, AttachResourceScopeToPolicyOutput>> =>
  executeAction(client.config, spec, params);
