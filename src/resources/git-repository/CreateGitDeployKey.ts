import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 新建部署公钥 - 请求参数 */
export const CreateGitDeployKeyInputSchema = z.object({
  /** 是否授予写入权限 */
  AllowWrite: z.boolean().describe('是否授予写入权限'),
  /** SSH key */
  Content: z.string().describe('SSH key'),
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 过期时间，不填则为永不过期 */
  ExpirationDate: z.string().optional().describe('过期时间，不填则为永不过期'),
  /** 部署公钥标题 */
  Title: z.string().describe('部署公钥标题'),
});

/** 新建部署公钥 - 响应数据 */
export const CreateGitDeployKeyOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateGitDeployKeyInput = z.infer<typeof CreateGitDeployKeyInputSchema>;
export type CreateGitDeployKeyOutput = z.infer<typeof CreateGitDeployKeyOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitDeployKeyInput, CreateGitDeployKeyOutput> = {
  action: 'CreateGitDeployKey',
  method: 'POST',
  inputSchema: CreateGitDeployKeyInputSchema,
  outputSchema: CreateGitDeployKeyOutputSchema,
};

// --------------- Action ---------------

/** 新建部署公钥 */
export const CreateGitDeployKey = (
  client: CodingClient,
  params: CreateGitDeployKeyInput,
): Promise<Either<SdkError, CreateGitDeployKeyOutput>> =>
  executeAction(client.config, spec, params);
