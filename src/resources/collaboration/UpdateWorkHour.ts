import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改工时 - 请求参数 */
export const UpdateWorkHourInputSchema = z.object({
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
  /** 事项code */
  IssueCode: z.number().int().describe('事项code'),
  /** 花费工时 */
  SpendHour: z.number().describe('花费工时'),
  /** 工时描述 */
  WorkingDesc: z.string().optional().describe('工时描述'),
  /** 工时日志id */
  LogId: z.number().int().describe('工时日志id'),
  /** 删除工时描述（默认false） */
  ResetWorkingDesc: z.boolean().optional().default(false).describe('删除工时描述'),
});

/** 修改工时 - 响应数据 */
export const UpdateWorkHourOutputSchema = z.object({});

// --------------- Types ---------------

export type UpdateWorkHourInput = z.infer<typeof UpdateWorkHourInputSchema>;
export type UpdateWorkHourOutput = z.infer<typeof UpdateWorkHourOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<UpdateWorkHourInput, UpdateWorkHourOutput> = {
  action: 'UpdateWorkHour',
  method: 'POST',
  inputSchema: UpdateWorkHourInputSchema,
  outputSchema: UpdateWorkHourOutputSchema,
};

// --------------- Action ---------------

/** 修改工时 */
export const UpdateWorkHour = (
  client: CodingClient,
  params: UpdateWorkHourInput,
): Promise<Either<SdkError, UpdateWorkHourOutput>> => executeAction(client.config, spec, params);
