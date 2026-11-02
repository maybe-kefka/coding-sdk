import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Wiki 通过zip包上传 - 请求参数 */
export const CreateWikiByZipInputSchema = z.object({
  /** 验证文件的token */
  AuthToken: z.string().describe('验证文件的token'),
  /** 文件名 */
  FileName: z.string().describe('文件名'),
  /** 上传文件的uuid名称 b5d0d8e0-3aca-11eb-8673-a9b6d94ca755.png */
  Key: z.string().describe('上传文件的uuid名称 b5d0d8e0-3aca-11eb-8673-a9b6d94ca755.png'),
  /** 父级iid */
  ParentIid: z.number().int().describe('父级iid'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 获取token的时间 */
  Time: z.number().int().describe('获取token的时间'),
});

/** Wiki 通过zip包上传 - 响应数据 */
export const CreateWikiByZipOutputSchema = z.object({
  /** zip上传wiki 的任务id */
  JobId: z.string().describe('zip上传wiki 的任务id'),
});

// --------------- Types ---------------

export type CreateWikiByZipInput = z.infer<typeof CreateWikiByZipInputSchema>;
export type CreateWikiByZipOutput = z.infer<typeof CreateWikiByZipOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateWikiByZipInput, CreateWikiByZipOutput> = {
  action: 'CreateWikiByZip',
  method: 'POST',
  inputSchema: CreateWikiByZipInputSchema,
  outputSchema: CreateWikiByZipOutputSchema,
};

// --------------- Action ---------------

/** 通过zip包上传wiki */
export const CreateWikiByZip = (
  client: CodingClient,
  params: CreateWikiByZipInput,
): Promise<Either<SdkError, CreateWikiByZipOutput>> => executeAction(client.config, spec, params);
