import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiFilePreSignUploadUrlDataSchema } from './schemas';

// --------------- Schema ---------------

/** 预签名URL获取 - 请求参数 */
export const DescribePreSignUploadUrlInputSchema = z.object({
  /** 内容类型，和web端的文件上传时content-type是一样的 */
  ContentType: z.string().describe('内容类型，和web端的文件上传时content-type是一样的'),
  /** 文件名 */
  FileName: z.string().describe('文件名'),
  /** 若上传项目协同附件场景时，不需要配置或默认为0即可。若用于上传到文件网盘，可以设置文件夹ID, 用于文件存放位置，ID值通过open api【创建文件夹】获取 */
  FolderId: z
    .number()
    .int()
    .describe(
      '若上传项目协同附件场景时，不需要配置或默认为0即可。若用于上传到文件网盘，可以设置文件夹ID, 用于文件存放位置，ID值通过open api【创建文件夹】获取',
    ),
  /** 文件夹类型，0: 常规文件夹, 1:隐藏文件夹。 如果是用于项目协同上传附件的场景，配置为1；如果是上传到文件网盘则配置为0。 */
  FolderType: z
    .number()
    .int()
    .describe(
      '文件夹类型，0: 常规文件夹, 1:隐藏文件夹。 如果是用于项目协同上传附件的场景，配置为1；如果是上传到文件网盘则配置为0。',
    ),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 预签名URL获取 - 响应数据 */
export const DescribePreSignUploadUrlOutputSchema = z.object({
  /** 上传信息 */
  Data: ApiFilePreSignUploadUrlDataSchema.describe('上传信息'),
});

// --------------- Types ---------------

export type DescribePreSignUploadUrlInput = z.infer<typeof DescribePreSignUploadUrlInputSchema>;
export type DescribePreSignUploadUrlOutput = z.infer<typeof DescribePreSignUploadUrlOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribePreSignUploadUrlInput, DescribePreSignUploadUrlOutput> = {
  action: 'DescribePreSignUploadUrl',
  method: 'POST',
  inputSchema: DescribePreSignUploadUrlInputSchema,
  outputSchema: DescribePreSignUploadUrlOutputSchema,
};

// --------------- Action ---------------

/** 预签名信息获取，上传文件 */
export const DescribePreSignUploadUrl = (
  client: CodingClient,
  params: DescribePreSignUploadUrlInput,
): Promise<Either<SdkError, DescribePreSignUploadUrlOutput>> =>
  executeAction(client.config, spec, params);
