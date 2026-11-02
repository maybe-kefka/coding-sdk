import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 制品版本发布 - 请求参数 */
export const ReleaseArtifactVersionInputSchema = z.object({
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品版本发布 - 响应数据 */
export const ReleaseArtifactVersionOutputSchema = z.object({});

// --------------- Types ---------------

export type ReleaseArtifactVersionInput = z.infer<typeof ReleaseArtifactVersionInputSchema>;
export type ReleaseArtifactVersionOutput = z.infer<typeof ReleaseArtifactVersionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ReleaseArtifactVersionInput, ReleaseArtifactVersionOutput> = {
  action: 'ReleaseArtifactVersion',
  method: 'POST',
  inputSchema: ReleaseArtifactVersionInputSchema,
  outputSchema: ReleaseArtifactVersionOutputSchema,
};

// --------------- Action ---------------

/** 将指定版本的制品的发布状态调整为已发布 */
export const ReleaseArtifactVersion = (
  client: CodingClient,
  params: ReleaseArtifactVersionInput,
): Promise<Either<SdkError, ReleaseArtifactVersionOutput>> =>
  executeAction(client.config, spec, params);
