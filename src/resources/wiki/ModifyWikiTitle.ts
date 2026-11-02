import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiDataSchema } from './schemas';

// --------------- Schema ---------------

/** Wiki 标题更新 - 请求参数 */
export const ModifyWikiTitleInputSchema = z.object({
  /** wiki 编号 */
  Iid: z.number().int().describe('wiki 编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** wiki 标题 */
  Title: z.string().describe('wiki 标题'),
});

/** Wiki 标题更新 - 响应数据 */
export const ModifyWikiTitleOutputSchema = z.object({
  /** Wiki详情 */
  Data: WikiDataSchema.describe('Wiki详情'),
});

// --------------- Types ---------------

export type ModifyWikiTitleInput = z.infer<typeof ModifyWikiTitleInputSchema>;
export type ModifyWikiTitleOutput = z.infer<typeof ModifyWikiTitleOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyWikiTitleInput, ModifyWikiTitleOutput> = {
  action: 'ModifyWikiTitle',
  method: 'POST',
  inputSchema: ModifyWikiTitleInputSchema,
  outputSchema: ModifyWikiTitleOutputSchema,
};

// --------------- Action ---------------

/** Wiki 标题更新 */
export const ModifyWikiTitle = (
  client: CodingClient,
  params: ModifyWikiTitleInput,
): Promise<Either<SdkError, ModifyWikiTitleOutput>> => executeAction(client.config, spec, params);
