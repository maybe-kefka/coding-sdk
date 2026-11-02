import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改事项描述 - 请求参数 */
export const ModifyIssueDescriptionInputSchema = z.object({
  /** 事项描述 */
  Description: z.string().describe('事项描述'),
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 修改事项描述 - 响应数据 */
export const ModifyIssueDescriptionOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyIssueDescriptionInput = z.infer<typeof ModifyIssueDescriptionInputSchema>;
export type ModifyIssueDescriptionOutput = z.infer<typeof ModifyIssueDescriptionOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyIssueDescriptionInput, ModifyIssueDescriptionOutput> = {
  action: 'ModifyIssueDescription',
  method: 'POST',
  inputSchema: ModifyIssueDescriptionInputSchema,
  outputSchema: ModifyIssueDescriptionOutputSchema,
};

// --------------- Action ---------------

/** 修改事项描述 */
export const ModifyIssueDescription = (
  client: CodingClient,
  params: ModifyIssueDescriptionInput,
): Promise<Either<SdkError, ModifyIssueDescriptionOutput>> =>
  executeAction(client.config, spec, params);
