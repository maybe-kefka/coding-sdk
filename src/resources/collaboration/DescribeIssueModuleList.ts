import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueModuleSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项模块列表 - 请求参数 */
export const DescribeIssueModuleListInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询事项模块列表 - 响应数据 */
export const DescribeIssueModuleListOutputSchema = z.object({
  /** 模块列表 */
  IssueModules: z.array(IssueModuleSchema).optional().describe('模块列表'),
});

// --------------- Types ---------------

export type DescribeIssueModuleListInput = z.infer<typeof DescribeIssueModuleListInputSchema>;
export type DescribeIssueModuleListOutput = z.infer<typeof DescribeIssueModuleListOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueModuleListInput, DescribeIssueModuleListOutput> = {
  action: 'DescribeIssueModuleList',
  method: 'POST',
  inputSchema: DescribeIssueModuleListInputSchema,
  outputSchema: DescribeIssueModuleListOutputSchema,
};

// --------------- Action ---------------

/** 查询事项模块列表 */
export const DescribeIssueModuleList = (
  client: CodingClient,
  params: DescribeIssueModuleListInput,
): Promise<Either<SdkError, DescribeIssueModuleListOutput>> =>
  executeAction(client.config, spec, params);
