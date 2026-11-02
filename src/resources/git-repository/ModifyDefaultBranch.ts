import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改仓库默认分支 - 请求参数 */
export const ModifyDefaultBranchInputSchema = z.object({
  /** 分支名 */
  BranchName: z.string().describe('分支名'),
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
});

/** 修改仓库默认分支 - 响应数据 */
export const ModifyDefaultBranchOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDefaultBranchInput = z.infer<typeof ModifyDefaultBranchInputSchema>;
export type ModifyDefaultBranchOutput = z.infer<typeof ModifyDefaultBranchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDefaultBranchInput, ModifyDefaultBranchOutput> = {
  action: 'ModifyDefaultBranch',
  method: 'POST',
  inputSchema: ModifyDefaultBranchInputSchema,
  outputSchema: ModifyDefaultBranchOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库默认分支 */
export const ModifyDefaultBranch = (
  client: CodingClient,
  params: ModifyDefaultBranchInput,
): Promise<Either<SdkError, ModifyDefaultBranchOutput>> =>
  executeAction(client.config, spec, params);
