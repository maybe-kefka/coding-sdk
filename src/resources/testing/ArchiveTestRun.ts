import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RunDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试计划归档 - 请求参数 */
export const ArchiveTestRunInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 计划 ID */
  RunId: z.number().int().describe('计划 ID'),
});

/** 测试计划归档 - 响应数据 */
export const ArchiveTestRunOutputSchema = z.object({
  /** 测试计划信息 */
  Data: RunDataSchema.nullable().describe('测试计划信息'),
});

// --------------- Types ---------------

export type ArchiveTestRunInput = z.infer<typeof ArchiveTestRunInputSchema>;
export type ArchiveTestRunOutput = z.infer<typeof ArchiveTestRunOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ArchiveTestRunInput, ArchiveTestRunOutput> = {
  action: 'ArchiveTestRun',
  method: 'POST',
  inputSchema: ArchiveTestRunInputSchema,
  outputSchema: ArchiveTestRunOutputSchema,
};

// --------------- Action ---------------

/** 测试计划归档 */
export const ArchiveTestRun = (
  client: CodingClient,
  params: ArchiveTestRunInput,
): Promise<Either<SdkError, ArchiveTestRunOutput>> => executeAction(client.config, spec, params);
