import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除部署公钥 - 请求参数 */
export const DeleteGitDeployKeyInputSchema = z.object({
  /** SSH Key Id */
  DeployKeyId: z.number().int().describe('SSH Key Id'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
});

/** 删除部署公钥 - 响应数据 */
export const DeleteGitDeployKeyOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteGitDeployKeyInput = z.infer<typeof DeleteGitDeployKeyInputSchema>;
export type DeleteGitDeployKeyOutput = z.infer<typeof DeleteGitDeployKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteGitDeployKeyInput, DeleteGitDeployKeyOutput> = {
  action: 'DeleteGitDeployKey',
  method: 'POST',
  inputSchema: DeleteGitDeployKeyInputSchema,
  outputSchema: DeleteGitDeployKeyOutputSchema,
};

// --------------- Action ---------------

/** 删除部署公钥 */
export const DeleteGitDeployKey = (
  client: CodingClient,
  params: DeleteGitDeployKeyInput,
): Promise<Either<SdkError, DeleteGitDeployKeyOutput>> =>
  executeAction(client.config, spec, params);
