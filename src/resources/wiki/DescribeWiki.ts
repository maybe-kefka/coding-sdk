import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiDataSchema } from './schemas';

// --------------- Schema ---------------

/** Wiki 详情获取 - 请求参数 */
export const DescribeWikiInputSchema = z.object({
  /** wiki编号 */
  Iid: z.number().int().describe('wiki编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 版本号 */
  VersionId: z.number().int().describe('版本号'),
});

/** Wiki 详情获取 - 响应数据 */
export const DescribeWikiOutputSchema = z.object({
  /** Wiki的具体信息 */
  Data: WikiDataSchema.describe('Wiki的具体信息'),
});

// --------------- Types ---------------

export type DescribeWikiInput = z.infer<typeof DescribeWikiInputSchema>;
export type DescribeWikiOutput = z.infer<typeof DescribeWikiOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeWikiInput, DescribeWikiOutput> = {
  action: 'DescribeWiki',
  method: 'POST',
  inputSchema: DescribeWikiInputSchema,
  outputSchema: DescribeWikiOutputSchema,
};

// --------------- Action ---------------

/** 获取Wiki详情 */
export const DescribeWiki = (
  client: CodingClient,
  params: DescribeWikiInput,
): Promise<Either<SdkError, DescribeWikiOutput>> => executeAction(client.config, spec, params);
