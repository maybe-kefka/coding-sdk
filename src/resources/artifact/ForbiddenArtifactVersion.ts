import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 制品版本下载 禁止、解禁 - 请求参数 */
export const ForbiddenArtifactVersionInputSchema = z.object({
  /** FORBIDDEN 禁止下载，UNFORBIDDEN 解除禁止下载 */
  ForbiddenAction: z.string().describe('FORBIDDEN 禁止下载，UNFORBIDDEN 解除禁止下载'),
  /** 禁止下载说明 */
  ForbiddenNote: z.string().optional().describe('禁止下载说明'),
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品版本下载 禁止、解禁 - 响应数据 */
export const ForbiddenArtifactVersionOutputSchema = z.object({});

// --------------- Types ---------------

export type ForbiddenArtifactVersionInput = z.infer<typeof ForbiddenArtifactVersionInputSchema>;
export type ForbiddenArtifactVersionOutput = z.infer<typeof ForbiddenArtifactVersionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ForbiddenArtifactVersionInput, ForbiddenArtifactVersionOutput> = {
  action: 'ForbiddenArtifactVersion',
  method: 'POST',
  inputSchema: ForbiddenArtifactVersionInputSchema,
  outputSchema: ForbiddenArtifactVersionOutputSchema,
};

// --------------- Action ---------------

/** 制品版本下载 禁止、解禁 */
export const ForbiddenArtifactVersion = (
  client: CodingClient,
  params: ForbiddenArtifactVersionInput,
): Promise<Either<SdkError, ForbiddenArtifactVersionOutput>> =>
  executeAction(client.config, spec, params);
