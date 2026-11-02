import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiDataSchema } from './schemas';

// --------------- Schema ---------------

/** Wiki 更新 - 请求参数 */
export const ModifyWikiInputSchema = z.object({
  /** 内容 */
  Content: z.string().describe('内容'),
  /** wiki编号 */
  Iid: z.number().int().describe('wiki编号'),
  /** 备注 */
  Msg: z.string().optional().describe('备注'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 标题 */
  Title: z.string().describe('标题'),
});

/** Wiki 更新 - 响应数据 */
export const ModifyWikiOutputSchema = z.object({
  /** Wiki详情 */
  Data: WikiDataSchema.describe('Wiki详情'),
});

// --------------- Types ---------------

export type ModifyWikiInput = z.infer<typeof ModifyWikiInputSchema>;
export type ModifyWikiOutput = z.infer<typeof ModifyWikiOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyWikiInput, ModifyWikiOutput> = {
  action: 'ModifyWiki',
  method: 'POST',
  inputSchema: ModifyWikiInputSchema,
  outputSchema: ModifyWikiOutputSchema,
};

// --------------- Action ---------------

/** 更新Wiki */
export const ModifyWiki = (
  client: CodingClient,
  params: ModifyWikiInput,
): Promise<Either<SdkError, ModifyWikiOutput>> => executeAction(client.config, spec, params);
