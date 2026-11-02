import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 查询事项详情 - 请求参数 */
export const DescribeIssueInputSchema = z.object({
  /** 事项编号 */
  IssueCode: z.number().int().describe('事项编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 是否查询描述中图片的下载地址 */
  ShowImageOutUrl: z.boolean().optional().describe('是否查询描述中图片的下载地址'),
});

/** 查询事项详情 - 响应数据 */
export const DescribeIssueOutputSchema = z.object({
  /** 事项的具体信息 */
  Issue: IssueDetailSchema.describe('事项的具体信息'),
});

// --------------- Types ---------------

export type DescribeIssueInput = z.infer<typeof DescribeIssueInputSchema>;
export type DescribeIssueOutput = z.infer<typeof DescribeIssueOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeIssueInput, DescribeIssueOutput> = {
  action: 'DescribeIssue',
  method: 'POST',
  inputSchema: DescribeIssueInputSchema,
  outputSchema: DescribeIssueOutputSchema,
};

// --------------- Action ---------------

/** 查询事项详情 */
export const DescribeIssue = (
  client: CodingClient,
  params: DescribeIssueInput,
): Promise<Either<SdkError, DescribeIssueOutput>> => executeAction(client.config, spec, params);
