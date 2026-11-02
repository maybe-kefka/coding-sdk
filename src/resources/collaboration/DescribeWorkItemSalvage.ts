import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询 事项分解信息 - 请求参数 */
export const DescribeWorkItemSalvageInputSchema = z.object({
  /** 事项code */
  IssueCode: z.number().int().describe('事项code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 事项展示图片对外路径 */
  ShowImageOutUrl: z.boolean().optional().describe('事项展示图片对外路径'),
});

/** 查询 事项分解信息 - 响应数据 */
export const DescribeWorkItemSalvageOutputSchema = z.object({
  /** 事项关联的项目集工作项列表 */
  OpenApiIssueDetail: z.array(IssueDetailSchema).optional().describe('事项关联的项目集工作项列表'),
});

// --------------- Types ---------------

export type DescribeWorkItemSalvageInput = z.infer<typeof DescribeWorkItemSalvageInputSchema>;
export type DescribeWorkItemSalvageOutput = z.infer<typeof DescribeWorkItemSalvageOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeWorkItemSalvageInput, DescribeWorkItemSalvageOutput> = {
  action: 'DescribeWorkItemSalvage',
  method: 'POST',
  inputSchema: DescribeWorkItemSalvageInputSchema,
  outputSchema: DescribeWorkItemSalvageOutputSchema,
};

// --------------- Action ---------------

/** 查询 事项分解信息 */
export const DescribeWorkItemSalvage = (
  client: CodingClient,
  params: DescribeWorkItemSalvageInput,
): Promise<Either<SdkError, DescribeWorkItemSalvageOutput>> =>
  executeAction(client.config, spec, params);
