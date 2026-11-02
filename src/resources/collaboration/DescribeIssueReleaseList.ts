import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { OpenApiReleaseSchema } from './schemas';

// --------------- Schema ---------------

/** 获取某个事项加入的所有版本 - 请求参数 */
export const DescribeIssueReleaseListInputSchema = z.object({
  /** 事项code */
  IssueCode: z.number().int().describe('事项code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 获取某个事项加入的所有版本 - 响应数据 */
export const DescribeIssueReleaseListOutputSchema = z.object({
  /** 版本列表 */
  ReleaseList: z.array(OpenApiReleaseSchema).optional().describe('版本列表'),
});

// --------------- Types ---------------

export type DescribeIssueReleaseListInput = z.infer<typeof DescribeIssueReleaseListInputSchema>;
export type DescribeIssueReleaseListOutput = z.infer<typeof DescribeIssueReleaseListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueReleaseListInput, DescribeIssueReleaseListOutput> = {
  action: 'DescribeIssueReleaseList',
  method: 'POST',
  inputSchema: DescribeIssueReleaseListInputSchema,
  outputSchema: DescribeIssueReleaseListOutputSchema,
};

// --------------- Action ---------------

/** 获取某个事项加入的所有版本 */
export const DescribeIssueReleaseList = (
  client: CodingClient,
  params: DescribeIssueReleaseListInput,
): Promise<Either<SdkError, DescribeIssueReleaseListOutput>> =>
  executeAction(client.config, spec, params);
