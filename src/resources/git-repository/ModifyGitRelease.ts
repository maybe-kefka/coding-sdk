import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改仓库版本 - 请求参数 */
export const ModifyGitReleaseInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径 */
  DepotPath: z.string().optional().describe('仓库路径'),
  /** 描述 */
  Description: z.string().optional().describe('描述'),
  /** 是否预发布 */
  Pre: z.boolean().optional().describe('是否预发布'),
  /** 项目下仓库版本唯一标识符 */
  ReleaseId: z.number().int().describe('项目下仓库版本唯一标识符'),
  /** 标签名称 */
  TagName: z.string().describe('标签名称'),
  /** 标题 */
  Title: z.string().optional().describe('标题'),
});

/** 修改仓库版本 - 响应数据 */
export const ModifyGitReleaseOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyGitReleaseInput = z.infer<typeof ModifyGitReleaseInputSchema>;
export type ModifyGitReleaseOutput = z.infer<typeof ModifyGitReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyGitReleaseInput, ModifyGitReleaseOutput> = {
  action: 'ModifyGitRelease',
  method: 'POST',
  inputSchema: ModifyGitReleaseInputSchema,
  outputSchema: ModifyGitReleaseOutputSchema,
};

// --------------- Action ---------------

/** 修改仓库版本信息 */
export const ModifyGitRelease = (
  client: CodingClient,
  params: ModifyGitReleaseInput,
): Promise<Either<SdkError, ModifyGitReleaseOutput>> => executeAction(client.config, spec, params);
