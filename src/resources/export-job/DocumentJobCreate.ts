import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 导出事项任务创建(团队管理员或项目管理员可调用) - 请求参数 */
export const DocumentJobCreateInputSchema = z.object({
  /** 事件类型:PAGE_EXPORT_TO_ZIP_MD */
  Event: z.string().describe('事件类型:PAGE_EXPORT_TO_ZIP_MD'),
  /** JSON 字符串，包含 belongType（project|team|program）、belongId */
  EventBody: z.string().describe('JSON 字符串，包含 belongType（project|team|program）、belongId'),
});

/** 导出事项任务创建(团队管理员或项目管理员可调用) - 响应数据 */
export const DocumentJobCreateOutputSchema = z.object({
  /** 任务id */
  JobId: z.string().describe('任务id'),
});

// --------------- Types ---------------

export type DocumentJobCreateInput = z.infer<typeof DocumentJobCreateInputSchema>;
export type DocumentJobCreateOutput = z.infer<typeof DocumentJobCreateOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DocumentJobCreateInput, DocumentJobCreateOutput> = {
  action: 'DocumentJobCreate',
  method: 'POST',
  inputSchema: DocumentJobCreateInputSchema,
  outputSchema: DocumentJobCreateOutputSchema,
};

// --------------- Action ---------------

/** 导出事项任务创建(团队管理员或项目管理员可调用) */
export const DocumentJobCreate = (
  client: CodingClient,
  params: DocumentJobCreateInput,
): Promise<Either<SdkError, DocumentJobCreateOutput>> => executeAction(client.config, spec, params);
