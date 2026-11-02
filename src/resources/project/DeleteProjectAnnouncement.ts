import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 项目公告删除 - 请求参数 */
export const DeleteProjectAnnouncementInputSchema = z.object({
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
  /** 要删除的公告ID列表 */
  Id: z.array(z.number().int()).describe('要删除的公告ID列表'),
});

/** 项目公告删除 - 响应数据 */
export const DeleteProjectAnnouncementOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteProjectAnnouncementInput = z.infer<typeof DeleteProjectAnnouncementInputSchema>;
export type DeleteProjectAnnouncementOutput = z.infer<typeof DeleteProjectAnnouncementOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteProjectAnnouncementInput, DeleteProjectAnnouncementOutput> = {
  action: 'DeleteProjectAnnouncement',
  method: 'POST',
  inputSchema: DeleteProjectAnnouncementInputSchema,
  outputSchema: DeleteProjectAnnouncementOutputSchema,
};

// --------------- Action ---------------

/** 项目公告删除 */
export const DeleteProjectAnnouncement = (
  client: CodingClient,
  params: DeleteProjectAnnouncementInput,
): Promise<Either<SdkError, DeleteProjectAnnouncementOutput>> =>
  executeAction(client.config, spec, params);
