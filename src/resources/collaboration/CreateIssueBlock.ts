import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 添加前置事项 - 请求参数 */
export const CreateIssueBlockInputSchema = z.object({
  /** 前置事项 Code */
  BlockIssueCode: z.number().int().describe('前置事项 Code'),
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 添加前置事项 - 响应数据 */
export const CreateIssueBlockOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateIssueBlockInput = z.infer<typeof CreateIssueBlockInputSchema>;
export type CreateIssueBlockOutput = z.infer<typeof CreateIssueBlockOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateIssueBlockInput, CreateIssueBlockOutput> = {
  action: 'CreateIssueBlock',
  method: 'POST',
  inputSchema: CreateIssueBlockInputSchema,
  outputSchema: CreateIssueBlockOutputSchema,
};

// --------------- Action ---------------

/** 添加前置事项 */
export const CreateIssueBlock = (
  client: CodingClient,
  params: CreateIssueBlockInput,
): Promise<Either<SdkError, CreateIssueBlockOutput>> => executeAction(client.config, spec, params);
