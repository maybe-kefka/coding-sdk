import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Wiki 移至回收站 - 请求参数 */
export const DeleteWikiInputSchema = z.object({
  /** wiki编号 */
  Iid: z.number().int().describe('wiki编号'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** Wiki 移至回收站 - 响应数据 */
export const DeleteWikiOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteWikiInput = z.infer<typeof DeleteWikiInputSchema>;
export type DeleteWikiOutput = z.infer<typeof DeleteWikiOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteWikiInput, DeleteWikiOutput> = {
  action: 'DeleteWiki',
  method: 'POST',
  inputSchema: DeleteWikiInputSchema,
  outputSchema: DeleteWikiOutputSchema,
};

// --------------- Action ---------------

/** 删除Wiki至回收站 */
export const DeleteWiki = (
  client: CodingClient,
  params: DeleteWikiInput,
): Promise<Either<SdkError, DeleteWikiOutput>> => executeAction(client.config, spec, params);
