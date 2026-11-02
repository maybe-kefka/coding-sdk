import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectAnnouncementProjectAnnouncementSchema } from './schemas';

// --------------- Schema ---------------

/** 项目公告查询 - 请求参数 */
export const DescribeProjectAnnouncementInputSchema = z.object({
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
  /** 公告ID */
  Id: z.number().int().describe('公告ID'),
});

/** 项目公告查询 - 响应数据 */
export const DescribeProjectAnnouncementOutputSchema = z.object({
  /** 公告信息 */
  ProjectAnnouncement: ProjectAnnouncementProjectAnnouncementSchema.describe('公告信息'),
});

// --------------- Types ---------------

export type DescribeProjectAnnouncementInput = z.infer<
  typeof DescribeProjectAnnouncementInputSchema
>;
export type DescribeProjectAnnouncementOutput = z.infer<
  typeof DescribeProjectAnnouncementOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectAnnouncementInput, DescribeProjectAnnouncementOutput> = {
  action: 'DescribeProjectAnnouncement',
  method: 'POST',
  inputSchema: DescribeProjectAnnouncementInputSchema,
  outputSchema: DescribeProjectAnnouncementOutputSchema,
};

// --------------- Action ---------------

/** 项目公告查询 */
export const DescribeProjectAnnouncement = (
  client: CodingClient,
  params: DescribeProjectAnnouncementInput,
): Promise<Either<SdkError, DescribeProjectAnnouncementOutput>> =>
  executeAction(client.config, spec, params);
