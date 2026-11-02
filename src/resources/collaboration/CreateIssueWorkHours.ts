import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 登记工时 - 请求参数 */
export const CreateIssueWorkHoursInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 剩余工时 */
  RemainingHour: z.number().describe('剩余工时'),
  /** 使用工时 */
  SpendHour: z.number().describe('使用工时'),
  /** 开始时间戳 */
  StartAt: z.number().int().describe('开始时间戳'),
  /** 工作描述 */
  WorkingDesc: z.string().optional().describe('工作描述'),
});

/** 登记工时 - 响应数据 */
export const CreateIssueWorkHoursOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateIssueWorkHoursInput = z.infer<typeof CreateIssueWorkHoursInputSchema>;
export type CreateIssueWorkHoursOutput = z.infer<typeof CreateIssueWorkHoursOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateIssueWorkHoursInput, CreateIssueWorkHoursOutput> = {
  action: 'CreateIssueWorkHours',
  method: 'POST',
  inputSchema: CreateIssueWorkHoursInputSchema,
  outputSchema: CreateIssueWorkHoursOutputSchema,
};

// --------------- Action ---------------

/** 登记工时 */
export const CreateIssueWorkHours = (
  client: CodingClient,
  params: CreateIssueWorkHoursInput,
): Promise<Either<SdkError, CreateIssueWorkHoursOutput>> =>
  executeAction(client.config, spec, params);
