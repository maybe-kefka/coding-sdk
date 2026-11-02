import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除工时日志 - 请求参数 */
export const DeleteIssueWorkHoursInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 是否将该工时日志的使用工时归还到剩余工时，默认：false */
  RollbackRemainingHours: z
    .boolean()
    .describe('是否将该工时日志的使用工时归还到剩余工时，默认：false'),
  /** 工时日志 Id */
  WorkHourLogId: z.number().int().describe('工时日志 Id'),
});

/** 删除工时日志 - 响应数据 */
export const DeleteIssueWorkHoursOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteIssueWorkHoursInput = z.infer<typeof DeleteIssueWorkHoursInputSchema>;
export type DeleteIssueWorkHoursOutput = z.infer<typeof DeleteIssueWorkHoursOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteIssueWorkHoursInput, DeleteIssueWorkHoursOutput> = {
  action: 'DeleteIssueWorkHours',
  method: 'POST',
  inputSchema: DeleteIssueWorkHoursInputSchema,
  outputSchema: DeleteIssueWorkHoursOutputSchema,
};

// --------------- Action ---------------

/** 删除工时日志 */
export const DeleteIssueWorkHours = (
  client: CodingClient,
  params: DeleteIssueWorkHoursInput,
): Promise<Either<SdkError, DeleteIssueWorkHoursOutput>> =>
  executeAction(client.config, spec, params);
