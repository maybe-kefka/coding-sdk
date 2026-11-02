import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 创建代码仓库 - 请求参数 */
export const CreateGitDepotInputSchema = z.object({
  /** 仓库名称 */
  DepotName: z.string().describe('仓库名称'),
  /** 仓库的描述信息 */
  Description: z.string().optional().describe('仓库的描述信息'),
  /** 项目id */
  ProjectId: z.number().int().describe('项目id'),
  /** 仓库是否允许公开访问 */
  Shared: z.boolean().optional().describe('仓库是否允许公开访问'),
});

/** 创建代码仓库 - 响应数据 */
export const CreateGitDepotOutputSchema = z.object({
  /** 创建的仓库id */
  DepotId: z.number().int().describe('创建的仓库id'),
});

// --------------- Types ---------------

export type CreateGitDepotInput = z.infer<typeof CreateGitDepotInputSchema>;
export type CreateGitDepotOutput = z.infer<typeof CreateGitDepotOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateGitDepotInput, CreateGitDepotOutput> = {
  action: 'CreateGitDepot',
  method: 'POST',
  inputSchema: CreateGitDepotInputSchema,
  outputSchema: CreateGitDepotOutputSchema,
};

// --------------- Action ---------------

/** 创建代码仓库 */
export const CreateGitDepot = (
  client: CodingClient,
  params: CreateGitDepotInput,
): Promise<Either<SdkError, CreateGitDepotOutput>> => executeAction(client.config, spec, params);
