import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GrepLineDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询代码片段详细列表 - 请求参数 */
export const DescribeCodeSearchInputSchema = z.object({
  /** 分支名称 */
  BranchName: z.string().describe('分支名称'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 文件路径（如需查询某个路径下的代码片段，需要输入此参数） */
  FilePath: z
    .string()
    .optional()
    .describe('文件路径（如需查询某个路径下的代码片段，需要输入此参数）'),
  /** 查询代码片段关键字 */
  KeyWord: z.string().describe('查询代码片段关键字'),
  /** 页码数量 */
  PageNumber: z.number().int().describe('页码数量'),
  /** 页码大小 */
  PageSize: z.number().int().describe('页码大小'),
});

/** 查询代码片段详细列表 - 响应数据 */
export const DescribeCodeSearchOutputSchema = z.object({
  /** 仓库信息详情列表 */
  Data: GrepLineDataSchema.describe('仓库信息详情列表'),
});

// --------------- Types ---------------

export type DescribeCodeSearchInput = z.infer<typeof DescribeCodeSearchInputSchema>;
export type DescribeCodeSearchOutput = z.infer<typeof DescribeCodeSearchOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodeSearchInput, DescribeCodeSearchOutput> = {
  action: 'DescribeCodeSearch',
  method: 'POST',
  inputSchema: DescribeCodeSearchInputSchema,
  outputSchema: DescribeCodeSearchOutputSchema,
};

// --------------- Action ---------------

/** 查询代码片段详细列表 */
export const DescribeCodeSearch = (
  client: CodingClient,
  params: DescribeCodeSearchInput,
): Promise<Either<SdkError, DescribeCodeSearchOutput>> =>
  executeAction(client.config, spec, params);
