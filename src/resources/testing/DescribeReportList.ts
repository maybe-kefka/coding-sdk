import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ReportsLittleDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试报告列表 - 请求参数 */
export const DescribeReportListInputSchema = z.object({
  /** 创建时间 */
  EndAt: z.string().optional().describe('创建时间'),
  /** 报告名称关键词 */
  Keyword: z.string().optional().describe('报告名称关键词'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 创建时间 */
  StartAt: z.string().optional().describe('创建时间'),
  /** 报告状态：CREATING 创建中，AVAILABLE 可用，UNAVAILABLE 不可用 */
  Status: z
    .string()
    .optional()
    .describe('报告状态：CREATING 创建中，AVAILABLE 可用，UNAVAILABLE 不可用'),
});

/** 测试报告列表 - 响应数据 */
export const DescribeReportListOutputSchema = z.object({
  /** 测试报告信息 */
  Data: ReportsLittleDataSchema.describe('测试报告信息'),
});

// --------------- Types ---------------

export type DescribeReportListInput = z.infer<typeof DescribeReportListInputSchema>;
export type DescribeReportListOutput = z.infer<typeof DescribeReportListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeReportListInput, DescribeReportListOutput> = {
  action: 'DescribeReportList',
  method: 'POST',
  inputSchema: DescribeReportListInputSchema,
  outputSchema: DescribeReportListOutputSchema,
};

// --------------- Action ---------------

/** 测试报告列表 */
export const DescribeReportList = (
  client: CodingClient,
  params: DescribeReportListInput,
): Promise<Either<SdkError, DescribeReportListOutput>> =>
  executeAction(client.config, spec, params);
