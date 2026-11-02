import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 导出任务状态 - 请求参数 */
export const DocumentJobStatusInputSchema = z.object({
  /** JobId */
  JobId: z.string().describe('JobId'),
});

/** 导出任务状态 - 响应数据 */
export const DocumentJobStatusOutputSchema = z.object({
  /** 任务ID */
  JobId: z.string().describe('任务ID'),
  /** 任务状态 */
  Status: z.string().describe('任务状态'),
  /** 处理进度 */
  ProcessRate: z.string().describe('处理进度'),
  /** 结果数据（COS中文件下载签名地址,地址有效期30分钟，30分钟后失效） */
  Result: z.string().describe('结果数据（COS中文件下载签名地址,地址有效期30分钟，30分钟后失效）'),
});

// --------------- Types ---------------

export type DocumentJobStatusInput = z.infer<typeof DocumentJobStatusInputSchema>;
export type DocumentJobStatusOutput = z.infer<typeof DocumentJobStatusOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DocumentJobStatusInput, DocumentJobStatusOutput> = {
  action: 'DocumentJobStatus',
  method: 'POST',
  inputSchema: DocumentJobStatusInputSchema,
  outputSchema: DocumentJobStatusOutputSchema,
};

// --------------- Action ---------------

/** 导出任务状态 */
export const DocumentJobStatus = (
  client: CodingClient,
  params: DocumentJobStatusInput,
): Promise<Either<SdkError, DocumentJobStatusOutput>> => executeAction(client.config, spec, params);
