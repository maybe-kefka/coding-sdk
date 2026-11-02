import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 制品属性删除 - 请求参数 */
export const DeleteArtifactPropertiesInputSchema = z.object({
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 属性名称列表（ 以 ‘coding.’ 作为属性名称开头的属性，将不可删除） */
  PropertyNameSet: z
    .array(z.string())
    .describe('属性名称列表（ 以 ‘coding.’ 作为属性名称开头的属性，将不可删除）'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品属性删除 - 响应数据 */
export const DeleteArtifactPropertiesOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteArtifactPropertiesInput = z.infer<typeof DeleteArtifactPropertiesInputSchema>;
export type DeleteArtifactPropertiesOutput = z.infer<typeof DeleteArtifactPropertiesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteArtifactPropertiesInput, DeleteArtifactPropertiesOutput> = {
  action: 'DeleteArtifactProperties',
  method: 'POST',
  inputSchema: DeleteArtifactPropertiesInputSchema,
  outputSchema: DeleteArtifactPropertiesOutputSchema,
};

// --------------- Action ---------------

/** 删除指定版本制品的指定制品属性 */
export const DeleteArtifactProperties = (
  client: CodingClient,
  params: DeleteArtifactPropertiesInput,
): Promise<Either<SdkError, DeleteArtifactPropertiesOutput>> =>
  executeAction(client.config, spec, params);
