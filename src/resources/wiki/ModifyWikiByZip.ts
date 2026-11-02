import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 通过zip包更新wiki - 请求参数 */
export const ModifyWikiByZipInputSchema = z.object({
  /** 验证文件的token */
  AuthToken: z.string().describe('验证文件的token'),
  /** 文件名 */
  FileName: z.string().describe('文件名'),
  /** wiki的Iid */
  Iid: z.number().int().describe('wiki的Iid'),
  /** 上传文件的uuid名称 b5d0d8e0-3aca-11eb-8673-a9b6d94ca755.png */
  Key: z.string().describe('上传文件的uuid名称 b5d0d8e0-3aca-11eb-8673-a9b6d94ca755.png'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 获取token的时间 */
  Time: z.number().int().describe('获取token的时间'),
});

/** 通过zip包更新wiki - 响应数据 */
export const ModifyWikiByZipOutputSchema = z.object({
  /** zip上传wiki 的任务id */
  JobId: z.string().describe('zip上传wiki 的任务id'),
});

// --------------- Types ---------------

export type ModifyWikiByZipInput = z.infer<typeof ModifyWikiByZipInputSchema>;
export type ModifyWikiByZipOutput = z.infer<typeof ModifyWikiByZipOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyWikiByZipInput, ModifyWikiByZipOutput> = {
  action: 'ModifyWikiByZip',
  method: 'POST',
  inputSchema: ModifyWikiByZipInputSchema,
  outputSchema: ModifyWikiByZipOutputSchema,
};

// --------------- Action ---------------

/** 通过zip包更新wiki */
export const ModifyWikiByZip = (
  client: CodingClient,
  params: ModifyWikiByZipInput,
): Promise<Either<SdkError, ModifyWikiByZipOutput>> => executeAction(client.config, spec, params);
