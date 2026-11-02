import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactPropertySchema } from './schemas';

// --------------- Schema ---------------

/** 制品属性列表查询 - 请求参数 */
export const DescribeArtifactPropertiesInputSchema = z.object({
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品属性列表查询 - 响应数据 */
export const DescribeArtifactPropertiesOutputSchema = z.object({
  /** 制品属性列表 */
  InstanceSet: z.array(ArtifactPropertySchema).describe('制品属性列表'),
});

// --------------- Types ---------------

export type DescribeArtifactPropertiesInput = z.infer<typeof DescribeArtifactPropertiesInputSchema>;
export type DescribeArtifactPropertiesOutput = z.infer<
  typeof DescribeArtifactPropertiesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactPropertiesInput, DescribeArtifactPropertiesOutput> = {
  action: 'DescribeArtifactProperties',
  method: 'POST',
  inputSchema: DescribeArtifactPropertiesInputSchema,
  outputSchema: DescribeArtifactPropertiesOutputSchema,
};

// --------------- Action ---------------

/** 指定制品版本的制品属性列表查询 */
export const DescribeArtifactProperties = (
  client: CodingClient,
  params: DescribeArtifactPropertiesInput,
): Promise<Either<SdkError, DescribeArtifactPropertiesOutput>> =>
  executeAction(client.config, spec, params);
