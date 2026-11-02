import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 测试报告删除 - 请求参数 */
export const DeleteReportInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试报告 ID */
  ReportId: z.number().int().describe('测试报告 ID'),
});

/** 测试报告删除 - 响应数据 */
export const DeleteReportOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteReportInput = z.infer<typeof DeleteReportInputSchema>;
export type DeleteReportOutput = z.infer<typeof DeleteReportOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteReportInput, DeleteReportOutput> = {
  action: 'DeleteReport',
  method: 'POST',
  inputSchema: DeleteReportInputSchema,
  outputSchema: DeleteReportOutputSchema,
};

// --------------- Action ---------------

/** 测试报告删除 */
export const DeleteReport = (
  client: CodingClient,
  params: DeleteReportInput,
): Promise<Either<SdkError, DeleteReportOutput>> => executeAction(client.config, spec, params);
