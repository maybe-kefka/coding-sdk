import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiListDataSchema } from './schemas';

// --------------- Schema ---------------

/** Wiki 列表详情获取 - 请求参数 */
export const DescribeWikiListInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** Wiki 列表详情获取 - 响应数据 */
export const DescribeWikiListOutputSchema = z.object({
  /** wiki列表数据 */
  Data: z.array(WikiListDataSchema).describe('wiki列表数据'),
});

// --------------- Types ---------------

export type DescribeWikiListInput = z.infer<typeof DescribeWikiListInputSchema>;
export type DescribeWikiListOutput = z.infer<typeof DescribeWikiListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeWikiListInput, DescribeWikiListOutput> = {
  action: 'DescribeWikiList',
  method: 'POST',
  inputSchema: DescribeWikiListInputSchema,
  outputSchema: DescribeWikiListOutputSchema,
};

// --------------- Action ---------------

/** 获取Wiki列表详情 */
export const DescribeWikiList = (
  client: CodingClient,
  params: DescribeWikiListInput,
): Promise<Either<SdkError, DescribeWikiListOutput>> => executeAction(client.config, spec, params);
