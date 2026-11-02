import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 制品文件临时下载链接获取 - 请求参数 */
export const DescribeArtifactFileDownloadUrlInputSchema = z.object({
  /** 文件名称 */
  FileName: z.string().describe('文件名称'),
  /** 包名 */
  Package: z.string().describe('包名'),
  /** 版本号 */
  PackageVersion: z.string().describe('版本号'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 仓库名 */
  Repository: z.string().describe('仓库名'),
  /** 下载链接超时时间（单位：秒），默认：300 */
  Timeout: z.number().int().optional().describe('下载链接超时时间（单位：秒），默认：300'),
});

/** 制品文件临时下载链接获取 - 响应数据 */
export const DescribeArtifactFileDownloadUrlOutputSchema = z.object({
  /** 临时下载链接 */
  Url: z.string().describe('临时下载链接'),
});

// --------------- Types ---------------

export type DescribeArtifactFileDownloadUrlInput = z.infer<
  typeof DescribeArtifactFileDownloadUrlInputSchema
>;
export type DescribeArtifactFileDownloadUrlOutput = z.infer<
  typeof DescribeArtifactFileDownloadUrlOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeArtifactFileDownloadUrlInput,
  DescribeArtifactFileDownloadUrlOutput
> = {
  action: 'DescribeArtifactFileDownloadUrl',
  method: 'POST',
  inputSchema: DescribeArtifactFileDownloadUrlInputSchema,
  outputSchema: DescribeArtifactFileDownloadUrlOutputSchema,
};

// --------------- Action ---------------

/** 制品文件临时下载链接获取 */
export const DescribeArtifactFileDownloadUrl = (
  client: CodingClient,
  params: DescribeArtifactFileDownloadUrlInput,
): Promise<Either<SdkError, DescribeArtifactFileDownloadUrlOutput>> =>
  executeAction(client.config, spec, params);
