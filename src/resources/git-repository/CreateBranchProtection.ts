import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 新增代码保护规则 - 请求参数 */
export const CreateBranchProtectionInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 保护规则 */
  Rule: z.string().describe('保护规则'),
});

/** 新增代码保护规则 - 响应数据 */
export const CreateBranchProtectionOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateBranchProtectionInput = z.infer<typeof CreateBranchProtectionInputSchema>;
export type CreateBranchProtectionOutput = z.infer<typeof CreateBranchProtectionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateBranchProtectionInput, CreateBranchProtectionOutput> = {
  action: 'CreateBranchProtection',
  method: 'POST',
  inputSchema: CreateBranchProtectionInputSchema,
  outputSchema: CreateBranchProtectionOutputSchema,
};

// --------------- Action ---------------

/** 新增代码保护规则 */
export const CreateBranchProtection = (
  client: CodingClient,
  params: CreateBranchProtectionInput,
): Promise<Either<SdkError, CreateBranchProtectionOutput>> =>
  executeAction(client.config, spec, params);
