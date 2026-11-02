import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PolicyDocumentSchema } from './schemas';

// --------------- Schema ---------------

/** 权限组修改 - 请求参数 */
export const ModifyPolicyInputSchema = z.object({
  /** 显示名称 */
  Alias: z.string().optional().describe('显示名称'),
  /** 描述 */
  Description: z.string().optional().describe('描述'),
  /** 权限组 ID */
  Id: z.number().int().describe('权限组 ID'),
  /** 名称 */
  Name: z.string().optional().describe('名称'),
  /** 授权语句 */
  PolicyDocument: PolicyDocumentSchema.describe('授权语句'),
  /** 适用的资源类型 */
  ResourceType: z.array(z.string()).describe('适用的资源类型'),
});

/** 权限组修改 - 响应数据 */
export const ModifyPolicyOutputSchema = z.object({
  /** 权限组 ID */
  PolicyId: z.number().int().describe('权限组 ID'),
});

// --------------- Types ---------------

export type ModifyPolicyInput = z.infer<typeof ModifyPolicyInputSchema>;
export type ModifyPolicyOutput = z.infer<typeof ModifyPolicyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyPolicyInput, ModifyPolicyOutput> = {
  action: 'ModifyPolicy',
  method: 'POST',
  inputSchema: ModifyPolicyInputSchema,
  outputSchema: ModifyPolicyOutputSchema,
};

// --------------- Action ---------------

/** 权限组修改 */
export const ModifyPolicy = (
  client: CodingClient,
  params: ModifyPolicyInput,
): Promise<Either<SdkError, ModifyPolicyOutput>> => executeAction(client.config, spec, params);
