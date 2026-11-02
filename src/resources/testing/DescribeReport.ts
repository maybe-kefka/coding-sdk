import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ReportDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试报告详情 - 请求参数 */
export const DescribeReportInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试报告 ID */
  ReportId: z.number().int().describe('测试报告 ID'),
});

/** 测试报告详情 - 响应数据 */
export const DescribeReportOutputSchema = z.object({
  /** 测试报告信息 */
  Data: ReportDataSchema.describe('测试报告信息'),
});

// --------------- Types ---------------

export type DescribeReportInput = z.infer<typeof DescribeReportInputSchema>;
export type DescribeReportOutput = z.infer<typeof DescribeReportOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeReportInput, DescribeReportOutput> = {
  action: 'DescribeReport',
  method: 'POST',
  inputSchema: DescribeReportInputSchema,
  outputSchema: DescribeReportOutputSchema,
};

// --------------- Action ---------------

/** 测试报告详情 */
export const DescribeReport = (
  client: CodingClient,
  params: DescribeReportInput,
): Promise<Either<SdkError, DescribeReportOutput>> => executeAction(client.config, spec, params);
