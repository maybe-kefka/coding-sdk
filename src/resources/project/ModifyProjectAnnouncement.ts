import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProjectAnnouncementProjectAnnouncementSchema } from './schemas';

// --------------- Schema ---------------

/** 项目公告更新 - 请求参数 */
export const ModifyProjectAnnouncementInputSchema = z.object({
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
  /** 公告内容 */
  Content: z.string().describe('公告内容'),
  /** 公告id */
  Id: z.number().int().describe('公告id'),
});

/** 项目公告更新 - 响应数据 */
export const ModifyProjectAnnouncementOutputSchema = z.object({
  /** 公告信息 */
  ProjectAnnouncement: ProjectAnnouncementProjectAnnouncementSchema.describe('公告信息'),
});

// --------------- Types ---------------

export type ModifyProjectAnnouncementInput = z.infer<typeof ModifyProjectAnnouncementInputSchema>;
export type ModifyProjectAnnouncementOutput = z.infer<typeof ModifyProjectAnnouncementOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyProjectAnnouncementInput, ModifyProjectAnnouncementOutput> = {
  action: 'ModifyProjectAnnouncement',
  method: 'POST',
  inputSchema: ModifyProjectAnnouncementInputSchema,
  outputSchema: ModifyProjectAnnouncementOutputSchema,
};

// --------------- Action ---------------

/** 项目公告更新 */
export const ModifyProjectAnnouncement = (
  client: CodingClient,
  params: ModifyProjectAnnouncementInput,
): Promise<Either<SdkError, ModifyProjectAnnouncementOutput>> =>
  executeAction(client.config, spec, params);
