import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 启动导出任务 - 请求参数 */
export const DocumentJobStartInputSchema = z.object({
  /** JobId */
  JobId: z.string().describe('JobId'),
});

/** 启动导出任务 - 响应数据 */
export const DocumentJobStartOutputSchema = z.object({});

// --------------- Types ---------------

export type DocumentJobStartInput = z.infer<typeof DocumentJobStartInputSchema>;
export type DocumentJobStartOutput = z.infer<typeof DocumentJobStartOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DocumentJobStartInput, DocumentJobStartOutput> = {
  action: 'DocumentJobStart',
  method: 'POST',
  inputSchema: DocumentJobStartInputSchema,
  outputSchema: DocumentJobStartOutputSchema,
};

// --------------- Action ---------------

/** 启动导出任务 */
export const DocumentJobStart = (
  client: CodingClient,
  params: DocumentJobStartInput,
): Promise<Either<SdkError, DocumentJobStartOutput>> => executeAction(client.config, spec, params);
