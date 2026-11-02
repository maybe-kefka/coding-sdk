import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询团队成员待交接事项列表 - 请求参数 */
export const DescribeUserHandoverIssuesInputSchema = z.object({
  /** 用户ID */
  WillDeleteUserId: z.number().int().describe('用户ID'),
});

/** 查询团队成员待交接事项列表 - 响应数据 */
export const DescribeUserHandoverIssuesOutputSchema = z.object({
  /** 待交接事项 */
  Issues: z.array(IssueDetailSchema).optional().describe('待交接事项'),
});

// --------------- Types ---------------

export type DescribeUserHandoverIssuesInput = z.infer<typeof DescribeUserHandoverIssuesInputSchema>;
export type DescribeUserHandoverIssuesOutput = z.infer<
  typeof DescribeUserHandoverIssuesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeUserHandoverIssuesInput, DescribeUserHandoverIssuesOutput> = {
  action: 'DescribeUserHandoverIssues',
  method: 'POST',
  inputSchema: DescribeUserHandoverIssuesInputSchema,
  outputSchema: DescribeUserHandoverIssuesOutputSchema,
};

// --------------- Action ---------------

/** 查询团队成员待交接事项列表 */
export const DescribeUserHandoverIssues = (
  client: CodingClient,
  params: DescribeUserHandoverIssuesInput,
): Promise<Either<SdkError, DescribeUserHandoverIssuesOutput>> =>
  executeAction(client.config, spec, params);
