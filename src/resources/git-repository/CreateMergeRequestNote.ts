import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { MergeRequestDiffNoteFormSchema, MergeRequestNoteSchema } from './schemas';

// --------------- Schema ---------------

/** 创建合并请求评论 - 请求参数 */
export const CreateMergeRequestNoteInputSchema = z.object({
  /** 行评论内容 */
  Content: z.string().describe('行评论内容'),
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 创建Diff信息行评论表单 */
  Form: MergeRequestDiffNoteFormSchema.optional().describe('创建Diff信息行评论表单'),
  /** 合并请求的Iid */
  MergeId: z.number().int().describe('合并请求的Iid'),
  /** 行评论的父亲Id */
  ParentId: z.number().int().describe('行评论的父亲Id'),
});

/** 创建合并请求评论 - 响应数据 */
export const CreateMergeRequestNoteOutputSchema = z.object({
  /** 行评论内容 */
  Note: MergeRequestNoteSchema.describe('行评论内容'),
});

// --------------- Types ---------------

export type CreateMergeRequestNoteInput = z.infer<typeof CreateMergeRequestNoteInputSchema>;
export type CreateMergeRequestNoteOutput = z.infer<typeof CreateMergeRequestNoteOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateMergeRequestNoteInput, CreateMergeRequestNoteOutput> = {
  action: 'CreateMergeRequestNote',
  method: 'POST',
  inputSchema: CreateMergeRequestNoteInputSchema,
  outputSchema: CreateMergeRequestNoteOutputSchema,
};

// --------------- Action ---------------

/** 创建合并请求行评论和改动文件diff行评论 */
export const CreateMergeRequestNote = (
  client: CodingClient,
  params: CreateMergeRequestNoteInput,
): Promise<Either<SdkError, CreateMergeRequestNoteOutput>> =>
  executeAction(client.config, spec, params);
