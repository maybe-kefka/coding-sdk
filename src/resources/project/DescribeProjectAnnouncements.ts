import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectAnnouncementProjectAnnouncementSchema } from './schemas';

// --------------- Schema ---------------

/** 项目公告列表查询 - 请求参数 */
export const DescribeProjectAnnouncementsInputSchema = z.object({
  /** 每页数量 */
  PageSize: z.number().int().describe('每页数量'),
  /** 页数 */
  PageNumber: z.number().int().describe('页数'),
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
});

/** 项目公告列表查询 - 响应数据 */
export const DescribeProjectAnnouncementsOutputSchema = z.object({
  /** 公告总数 */
  TotalCount: z.number().int().describe('公告总数'),
  /** 每页数量 */
  PageSize: z.number().int().describe('每页数量'),
  /** 页数 */
  PageNumber: z.number().int().describe('页数'),
  /** 公告列表 */
  List: z.array(ProjectAnnouncementProjectAnnouncementSchema).describe('公告列表'),
});

// --------------- Types ---------------

export type DescribeProjectAnnouncementsInput = z.infer<
  typeof DescribeProjectAnnouncementsInputSchema
>;
export type DescribeProjectAnnouncementsOutput = z.infer<
  typeof DescribeProjectAnnouncementsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectAnnouncementsInput, DescribeProjectAnnouncementsOutput> = {
  action: 'DescribeProjectAnnouncements',
  method: 'POST',
  inputSchema: DescribeProjectAnnouncementsInputSchema,
  outputSchema: DescribeProjectAnnouncementsOutputSchema,
};

// --------------- Action ---------------

/** 项目公告列表查询 */
export const DescribeProjectAnnouncements = (
  client: CodingClient,
  params: DescribeProjectAnnouncementsInput,
): Promise<Either<SdkError, DescribeProjectAnnouncementsOutput>> =>
  executeAction(client.config, spec, params);
