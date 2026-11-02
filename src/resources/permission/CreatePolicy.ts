import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PolicyDocumentSchema } from './schemas';

// --------------- Schema ---------------

/** 权限组创建 - 请求参数 */
export const CreatePolicyInputSchema = z.object({
  /** 显示名称 */
  Alias: z.string().describe('显示名称'),
  /** 描述 */
  Description: z.string().optional().describe('描述'),
  /** 名称 */
  Name: z.string().describe('名称'),
  /** 授权语句 */
  PolicyDocument: PolicyDocumentSchema.describe('授权语句'),
  /** 权限组类型：IDENTITY | RESOURCE */
  PolicyType: z.string().describe('权限组类型：IDENTITY | RESOURCE'),
  /** 适用的资源类型 */
  ResourceType: z.array(z.string()).describe('适用的资源类型'),
});

/** 权限组创建 - 响应数据 */
export const CreatePolicyOutputSchema = z.object({
  /** 权限组 ID */
  PolicyId: z.number().int().describe('权限组 ID'),
});

// --------------- Types ---------------

export type CreatePolicyInput = z.infer<typeof CreatePolicyInputSchema>;
export type CreatePolicyOutput = z.infer<typeof CreatePolicyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreatePolicyInput, CreatePolicyOutput> = {
  action: 'CreatePolicy',
  method: 'POST',
  inputSchema: CreatePolicyInputSchema,
  outputSchema: CreatePolicyOutputSchema,
};

// --------------- Action ---------------

/** 权限组创建 */
export const CreatePolicy = (
  client: CodingClient,
  params: CreatePolicyInput,
): Promise<Either<SdkError, CreatePolicyOutput>> => executeAction(client.config, spec, params);
