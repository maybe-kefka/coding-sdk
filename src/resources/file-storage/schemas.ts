import { z } from 'zod/v4';

// --------------- ApiFileFile ---------------

export const ApiFileFileSchema = z.object({
  /** 文件ID */
  Id: z.number().int().describe('文件ID'),
  /** 文件名 */
  Name: z.string().describe('文件名'),
});

export type ApiFileFile = z.infer<typeof ApiFileFileSchema>;

// --------------- ApiFileFolder ---------------

export const ApiFileFolderSchema = z.object({
  /** 文件夹ID */
  Id: z.number().int().describe('文件夹ID'),
  /** 文件夹名 */
  Name: z.string().describe('文件夹名'),
});

export type ApiFileFolder = z.infer<typeof ApiFileFolderSchema>;

// --------------- ApiFilePreSignUploadUrlData ---------------

export const ApiFilePreSignUploadUrlDataSchema = z.object({
  /** token信息 */
  AuthToken: z.string().describe('token信息'),
  /** 请求头信息 */
  Headers: z.string().describe('请求头信息'),
  /** 文件存储的key信息 */
  StorageKey: z.string().describe('文件存储的key信息'),
  /** 上传链接 */
  UploadLink: z.string().describe('上传链接'),
});

export type ApiFilePreSignUploadUrlData = z.infer<typeof ApiFilePreSignUploadUrlDataSchema>;
