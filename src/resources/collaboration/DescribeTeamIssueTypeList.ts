import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueTypeDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询企业事项类型列表 - 请求参数 */
export const DescribeTeamIssueTypeListInputSchema = z.object({});

/** 查询企业事项类型列表 - 响应数据 */
export const DescribeTeamIssueTypeListOutputSchema = z.object({
  /** 事项类型列表 */
  IssueTypes: z.array(IssueTypeDetailSchema).describe('事项类型列表'),
});

// --------------- Types ---------------

export type DescribeTeamIssueTypeListInput = z.infer<typeof DescribeTeamIssueTypeListInputSchema>;
export type DescribeTeamIssueTypeListOutput = z.infer<typeof DescribeTeamIssueTypeListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamIssueTypeListInput, DescribeTeamIssueTypeListOutput> = {
  action: 'DescribeTeamIssueTypeList',
  method: 'POST',
  inputSchema: DescribeTeamIssueTypeListInputSchema,
  outputSchema: DescribeTeamIssueTypeListOutputSchema,
};

// --------------- Action ---------------

/** 查询企业事项类型列表 */
export const DescribeTeamIssueTypeList = (
  client: CodingClient,
  params: DescribeTeamIssueTypeListInput,
): Promise<Either<SdkError, DescribeTeamIssueTypeListOutput>> =>
  executeAction(client.config, spec, params);
