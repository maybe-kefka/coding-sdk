import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactChecksumSchema } from './schemas';

// --------------- Schema ---------------

/** 制品Checksum列表查询 - 请求参数 */
export const DescribeArtifactChecksumsInputSchema = z.object({
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
});

/** 制品Checksum列表查询 - 响应数据 */
export const DescribeArtifactChecksumsOutputSchema = z.object({
  /** 制品Checksum列表 */
  InstanceSet: z.array(ArtifactChecksumSchema).describe('制品Checksum列表'),
});

// --------------- Types ---------------

export type DescribeArtifactChecksumsInput = z.infer<typeof DescribeArtifactChecksumsInputSchema>;
export type DescribeArtifactChecksumsOutput = z.infer<typeof DescribeArtifactChecksumsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactChecksumsInput, DescribeArtifactChecksumsOutput> = {
  action: 'DescribeArtifactChecksums',
  method: 'POST',
  inputSchema: DescribeArtifactChecksumsInputSchema,
  outputSchema: DescribeArtifactChecksumsOutputSchema,
};

// --------------- Action ---------------

/** 制品Checksum列表查询 */
export const DescribeArtifactChecksums = (
  client: CodingClient,
  params: DescribeArtifactChecksumsInput,
): Promise<Either<SdkError, DescribeArtifactChecksumsOutput>> =>
  executeAction(client.config, spec, params);
