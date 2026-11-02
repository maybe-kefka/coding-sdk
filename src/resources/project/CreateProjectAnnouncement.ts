import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectAnnouncementProjectAnnouncementSchema } from './schemas';

// --------------- Schema ---------------

/** 项目公告创建 - 请求参数 */
export const CreateProjectAnnouncementInputSchema = z.object({
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
  /** 公告内容 */
  Content: z.string().describe('公告内容'),
});

/** 项目公告创建 - 响应数据 */
export const CreateProjectAnnouncementOutputSchema = z.object({
  /** 公告信息 */
  ProjectAnnouncement: ProjectAnnouncementProjectAnnouncementSchema.describe('公告信息'),
});

// --------------- Types ---------------

export type CreateProjectAnnouncementInput = z.infer<typeof CreateProjectAnnouncementInputSchema>;
export type CreateProjectAnnouncementOutput = z.infer<typeof CreateProjectAnnouncementOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateProjectAnnouncementInput, CreateProjectAnnouncementOutput> = {
  action: 'CreateProjectAnnouncement',
  method: 'POST',
  inputSchema: CreateProjectAnnouncementInputSchema,
  outputSchema: CreateProjectAnnouncementOutputSchema,
};

// --------------- Action ---------------

/** 项目公告创建 */
export const CreateProjectAnnouncement = (
  client: CodingClient,
  params: CreateProjectAnnouncementInput,
): Promise<Either<SdkError, CreateProjectAnnouncementOutput>> =>
  executeAction(client.config, spec, params);
