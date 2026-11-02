import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TokenSchema } from './schemas';

// --------------- Schema ---------------

/** 上传文件的Token获取 - 请求参数 */
export const CreateUploadTokenInputSchema = z.object({
  /** 文件名 */
  FileName: z.string().describe('文件名'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 上传文件的Token获取 - 响应数据 */
export const CreateUploadTokenOutputSchema = z.object({
  /** Token信息 */
  Token: TokenSchema.describe('Token信息'),
});

// --------------- Types ---------------

export type CreateUploadTokenInput = z.infer<typeof CreateUploadTokenInputSchema>;
export type CreateUploadTokenOutput = z.infer<typeof CreateUploadTokenOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateUploadTokenInput, CreateUploadTokenOutput> = {
  action: 'CreateUploadToken',
  method: 'POST',
  inputSchema: CreateUploadTokenInputSchema,
  outputSchema: CreateUploadTokenOutputSchema,
};

// --------------- Action ---------------

/** 获取上传文件的Token，成功后使用uploadLink 上传文件(ex:https://coding-net-test-self-1257242599.cos.ap-shanghai.myqcloud.com/b5d0d8e0-3aca-11eb-8673-a9b6d94ca755.png) */
export const CreateUploadToken = (
  client: CodingClient,
  params: CreateUploadTokenInput,
): Promise<Either<SdkError, CreateUploadTokenOutput>> => executeAction(client.config, spec, params);
