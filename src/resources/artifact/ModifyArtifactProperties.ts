import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactPropertyBeanSchema } from './schemas';

// --------------- Schema ---------------

/** 制品属性修改 - 请求参数 */
export const ModifyArtifactPropertiesInputSchema = z.object({
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

/** 制品属性修改 - 响应数据 */
export const ModifyArtifactPropertiesOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyArtifactPropertiesInput = z.infer<typeof ModifyArtifactPropertiesInputSchema>;
export type ModifyArtifactPropertiesOutput = z.infer<typeof ModifyArtifactPropertiesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyArtifactPropertiesInput, ModifyArtifactPropertiesOutput> = {
  action: 'ModifyArtifactProperties',
  method: 'POST',
  inputSchema: ModifyArtifactPropertiesInputSchema,
  outputSchema: ModifyArtifactPropertiesOutputSchema,
};

// --------------- Action ---------------

/** 指定版本制品的制品属性修改 */
export const ModifyArtifactProperties = (
  client: CodingClient,
  params: ModifyArtifactPropertiesInput,
): Promise<Either<SdkError, ModifyArtifactPropertiesOutput>> =>
  executeAction(client.config, spec, params);
