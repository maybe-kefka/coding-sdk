import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactPropertyBeanSchema } from './schemas';

// --------------- Schema ---------------

/** 制品属性新增（指定版本） - 请求参数 */
export const CreateArtifactPropertiesInputSchema = z.object({
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 属性列表 */
  PropertySet: z.array(ArtifactPropertyBeanSchema).describe('属性列表'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品属性新增（指定版本） - 响应数据 */
export const CreateArtifactPropertiesOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateArtifactPropertiesInput = z.infer<typeof CreateArtifactPropertiesInputSchema>;
export type CreateArtifactPropertiesOutput = z.infer<typeof CreateArtifactPropertiesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateArtifactPropertiesInput, CreateArtifactPropertiesOutput> = {
  action: 'CreateArtifactProperties',
  method: 'POST',
  inputSchema: CreateArtifactPropertiesInputSchema,
  outputSchema: CreateArtifactPropertiesOutputSchema,
};

// --------------- Action ---------------

/** 制品属性新增（指定版本） */
export const CreateArtifactProperties = (
  client: CodingClient,
  params: CreateArtifactPropertiesInput,
): Promise<Either<SdkError, CreateArtifactPropertiesOutput>> =>
  executeAction(client.config, spec, params);
