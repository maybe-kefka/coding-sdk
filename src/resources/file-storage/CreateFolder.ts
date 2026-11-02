import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiFileFolderSchema } from './schemas';

// --------------- Schema ---------------

/** 文件夹创建 - 请求参数 */
export const CreateFolderInputSchema = z.object({
  /** 文件夹名 */
  FoldName: z.string().describe('文件夹名'),
  /** 父文件夹ID */
  ParentId: z.number().int().describe('父文件夹ID'),
  /** 项目名 */
  ProjectName: z.string().describe('项目名'),
});

/** 文件夹创建 - 响应数据 */
export const CreateFolderOutputSchema = z.object({
  /** 文件夹信息 */
  Data: ApiFileFolderSchema.describe('文件夹信息'),
});

// --------------- Types ---------------

export type CreateFolderInput = z.infer<typeof CreateFolderInputSchema>;
export type CreateFolderOutput = z.infer<typeof CreateFolderOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateFolderInput, CreateFolderOutput> = {
  action: 'CreateFolder',
  method: 'POST',
  inputSchema: CreateFolderInputSchema,
  outputSchema: CreateFolderOutputSchema,
};

// --------------- Action ---------------

/** 文件夹创建 */
export const CreateFolder = (
  client: CodingClient,
  params: CreateFolderInput,
): Promise<Either<SdkError, CreateFolderOutput>> => executeAction(client.config, spec, params);
