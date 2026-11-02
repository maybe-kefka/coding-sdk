import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 删除事项 - 请求参数 */
export const DeleteIssueInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 事项类型，可不填 */
  IssueType: z.string().optional().describe('事项类型，可不填'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 删除事项 - 响应数据 */
export const DeleteIssueOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteIssueInput = z.infer<typeof DeleteIssueInputSchema>;
export type DeleteIssueOutput = z.infer<typeof DeleteIssueOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteIssueInput, DeleteIssueOutput> = {
  action: 'DeleteIssue',
  method: 'POST',
  inputSchema: DeleteIssueInputSchema,
  outputSchema: DeleteIssueOutputSchema,
};

// --------------- Action ---------------

/** 删除事项 */
export const DeleteIssue = (
  client: CodingClient,
  params: DeleteIssueInput,
): Promise<Either<SdkError, DeleteIssueOutput>> => executeAction(client.config, spec, params);
