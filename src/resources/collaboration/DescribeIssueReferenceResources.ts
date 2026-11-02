import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ResourceReferenceSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项的引用资源列表 - 请求参数 */
export const DescribeIssueReferenceResourcesInputSchema = z.object({
  /** 查询的目标事项的code */
  IssueCode: z.number().int().describe('查询的目标事项的code'),
  /** 查询的事项所在的项目ID */
  ProjectId: z.number().int().describe('查询的事项所在的项目ID'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 查询事项的引用资源列表 - 响应数据 */
export const DescribeIssueReferenceResourcesOutputSchema = z.object({
  /** 事项引用的资源列表 */
  Data: z.array(ResourceReferenceSchema).optional().describe('事项引用的资源列表'),
});

// --------------- Types ---------------

export type DescribeIssueReferenceResourcesInput = z.infer<
  typeof DescribeIssueReferenceResourcesInputSchema
>;
export type DescribeIssueReferenceResourcesOutput = z.infer<
  typeof DescribeIssueReferenceResourcesOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeIssueReferenceResourcesInput,
  DescribeIssueReferenceResourcesOutput
> = {
  action: 'DescribeIssueReferenceResources',
  method: 'POST',
  inputSchema: DescribeIssueReferenceResourcesInputSchema,
  outputSchema: DescribeIssueReferenceResourcesOutputSchema,
};

// --------------- Action ---------------

/** 查询事项的引用资源列表 */
export const DescribeIssueReferenceResources = (
  client: CodingClient,
  params: DescribeIssueReferenceResourcesInput,
): Promise<Either<SdkError, DescribeIssueReferenceResourcesOutput>> =>
  executeAction(client.config, spec, params);
