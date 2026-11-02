import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 制品仓库创建 - 请求参数 */
export const CreateArtifactRepositoryInputSchema = z.object({
  /** 仓库权限范围:1-项目内;2-团队内;3-公开，默认：1-项目内 */
  AccessLevel: z
    .number()
    .int()
    .optional()
    .describe('仓库权限范围:1-项目内;2-团队内;3-公开，默认：1-项目内'),
  /** 是否开启代理，仅支持当 Type 为 3-maven;4-npm; 5-PyPI;7-composer;10-cocoapods 时可为 true，默认：false */
  AllowProxy: z
    .boolean()
    .optional()
    .describe(
      '是否开启代理，仅支持当 Type 为 3-maven;4-npm; 5-PyPI;7-composer;10-cocoapods 时可为 true，默认：false',
    ),
  /** 仓库描述信息 */
  Description: z.string().optional().describe('仓库描述信息'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名称 */
  RepositoryName: z.string().describe('仓库名称'),
  /** 仓库类型:1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm */
  Type: z
    .number()
    .int()
    .describe(
      '仓库类型:1-generic;2-docker;3-maven;4-npm;5-pypi;6-helm;7-composer;8-nuget;9-conan;10-cocoapods;11-rpm',
    ),
});

/** 制品仓库创建 - 响应数据 */
export const CreateArtifactRepositoryOutputSchema = z.object({
  /** 创建成功的仓库 ID */
  Id: z.number().int().describe('创建成功的仓库 ID'),
});

// --------------- Types ---------------

export type CreateArtifactRepositoryInput = z.infer<typeof CreateArtifactRepositoryInputSchema>;
export type CreateArtifactRepositoryOutput = z.infer<typeof CreateArtifactRepositoryOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateArtifactRepositoryInput, CreateArtifactRepositoryOutput> = {
  action: 'CreateArtifactRepository',
  method: 'POST',
  inputSchema: CreateArtifactRepositoryInputSchema,
  outputSchema: CreateArtifactRepositoryOutputSchema,
};

// --------------- Action ---------------

/** 制品仓库创建 */
export const CreateArtifactRepository = (
  client: CodingClient,
  params: CreateArtifactRepositoryInput,
): Promise<Either<SdkError, CreateArtifactRepositoryOutput>> =>
  executeAction(client.config, spec, params);
