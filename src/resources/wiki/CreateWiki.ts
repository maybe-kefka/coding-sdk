import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { WikiDataSchema } from './schemas';

// --------------- Schema ---------------

/** Wiki创建 - 请求参数 */
export const CreateWikiInputSchema = z.object({
  /** Wiki内容 */
  Content: z.string().describe('Wiki内容'),
  /** 备注 */
  Msg: z.string().optional().describe('备注'),
  /** 父级iid */
  ParentIid: z.number().int().describe('父级iid'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** Wiki标题 */
  Title: z.string().describe('Wiki标题'),
});

/** Wiki创建 - 响应数据 */
export const CreateWikiOutputSchema = z.object({
  /** Wiki详细数据 */
  Data: WikiDataSchema.describe('Wiki详细数据'),
});

// --------------- Types ---------------

export type CreateWikiInput = z.infer<typeof CreateWikiInputSchema>;
export type CreateWikiOutput = z.infer<typeof CreateWikiOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateWikiInput, CreateWikiOutput> = {
  action: 'CreateWiki',
  method: 'POST',
  inputSchema: CreateWikiInputSchema,
  outputSchema: CreateWikiOutputSchema,
};

// --------------- Action ---------------

/** Wiki创建 */
export const CreateWiki = (
  client: CodingClient,
  params: CreateWikiInput,
): Promise<Either<SdkError, CreateWikiOutput>> => executeAction(client.config, spec, params);
