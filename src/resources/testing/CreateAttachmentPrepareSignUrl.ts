import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { AttachmentPrepareDataSchema } from './schemas';

// --------------- Schema ---------------

/** 附件预上传信息生成 - 请求参数 */
export const CreateAttachmentPrepareSignUrlInputSchema = z.object({
  /** 文件名 */
  FileName: z.string().describe('文件名'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 附件预上传信息生成 - 响应数据 */
export const CreateAttachmentPrepareSignUrlOutputSchema = z.object({
  /** 附件预上传信息 */
  Data: AttachmentPrepareDataSchema.nullable().describe('附件预上传信息'),
});

// --------------- Types ---------------

export type CreateAttachmentPrepareSignUrlInput = z.infer<
  typeof CreateAttachmentPrepareSignUrlInputSchema
>;
export type CreateAttachmentPrepareSignUrlOutput = z.infer<
  typeof CreateAttachmentPrepareSignUrlOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateAttachmentPrepareSignUrlInput, CreateAttachmentPrepareSignUrlOutput> =
  {
    action: 'CreateAttachmentPrepareSignUrl',
    method: 'POST',
    inputSchema: CreateAttachmentPrepareSignUrlInputSchema,
    outputSchema: CreateAttachmentPrepareSignUrlOutputSchema,
  };

// --------------- Action ---------------

/** 生成附件预上传信息 */
export const CreateAttachmentPrepareSignUrl = (
  client: CodingClient,
  params: CreateAttachmentPrepareSignUrlInput,
): Promise<Either<SdkError, CreateAttachmentPrepareSignUrlOutput>> =>
  executeAction(client.config, spec, params);
