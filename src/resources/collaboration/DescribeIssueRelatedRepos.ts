import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueRelatedDepotSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项关联的代码仓库信息 - 请求参数 */
export const DescribeIssueRelatedReposInputSchema = z.object({
  /** 事项code */
  IssueCode: z.number().int().describe('事项code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询事项关联的代码仓库信息 - 响应数据 */
export const DescribeIssueRelatedReposOutputSchema = z.object({
  /** 事项关联的仓库信息 */
  IssueRelatedDepot: z.array(IssueRelatedDepotSchema).optional().describe('事项关联的仓库信息'),
});

// --------------- Types ---------------

export type DescribeIssueRelatedReposInput = z.infer<typeof DescribeIssueRelatedReposInputSchema>;
export type DescribeIssueRelatedReposOutput = z.infer<typeof DescribeIssueRelatedReposOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueRelatedReposInput, DescribeIssueRelatedReposOutput> = {
  action: 'DescribeIssueRelatedRepos',
  method: 'POST',
  inputSchema: DescribeIssueRelatedReposInputSchema,
  outputSchema: DescribeIssueRelatedReposOutputSchema,
};

// --------------- Action ---------------

/** 查询事项关联的代码仓库信息 */
export const DescribeIssueRelatedRepos = (
  client: CodingClient,
  params: DescribeIssueRelatedReposInput,
): Promise<Either<SdkError, DescribeIssueRelatedReposOutput>> =>
  executeAction(client.config, spec, params);
