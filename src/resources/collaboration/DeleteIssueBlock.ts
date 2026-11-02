import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除前置事项 - 请求参数 */
export const DeleteIssueBlockInputSchema = z.object({
  /** 前置事项 Code */
  BlockIssueCode: z.number().int().describe('前置事项 Code'),
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 删除前置事项 - 响应数据 */
export const DeleteIssueBlockOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteIssueBlockInput = z.infer<typeof DeleteIssueBlockInputSchema>;
export type DeleteIssueBlockOutput = z.infer<typeof DeleteIssueBlockOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteIssueBlockInput, DeleteIssueBlockOutput> = {
  action: 'DeleteIssueBlock',
  method: 'POST',
  inputSchema: DeleteIssueBlockInputSchema,
  outputSchema: DeleteIssueBlockOutputSchema,
};

// --------------- Action ---------------

/** 删除前置事项 */
export const DeleteIssueBlock = (
  client: CodingClient,
  params: DeleteIssueBlockInput,
): Promise<Either<SdkError, DeleteIssueBlockOutput>> => executeAction(client.config, spec, params);
