import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { GitCommitSchema, GitFileSchema } from './schemas';

// --------------- Schema ---------------

/** Git仓库创建二进制文件 - 请求参数 */
export const CreateBinaryFilesInputSchema = z.object({
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 目标分支名，如果想上传至源分支，值与源分支名一致 */
  DestRef: z.string().optional().describe('目标分支名，如果想上传至源分支，值与源分支名一致'),
  /** 文件信息，其中Path需带上文件名，例如：/data/ReadMe.md。 Content为文件字节流进行Base64编码后的字符串。 */
  GitFiles: z
    .array(GitFileSchema)
    .describe(
      '文件信息，其中Path需带上文件名，例如：/data/ReadMe.md。 Content为文件字节流进行Base64编码后的字符串。',
    ),
  /** 源分支最后一次提交sha */
  LastCommitSha: z.string().describe('源分支最后一次提交sha'),
  /** 提交信息 */
  Message: z.string().describe('提交信息'),
  /** 源分支名 */
  SrcRef: z.string().describe('源分支名'),
});

/** Git仓库创建二进制文件 - 响应数据 */
export const CreateBinaryFilesOutputSchema = z.object({
  /** 提交信息 */
  GitCommit: GitCommitSchema.describe('提交信息'),
});

// --------------- Types ---------------

export type CreateBinaryFilesInput = z.infer<typeof CreateBinaryFilesInputSchema>;
export type CreateBinaryFilesOutput = z.infer<typeof CreateBinaryFilesOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateBinaryFilesInput, CreateBinaryFilesOutput> = {
  action: 'CreateBinaryFiles',
  method: 'POST',
  inputSchema: CreateBinaryFilesInputSchema,
  outputSchema: CreateBinaryFilesOutputSchema,
};

// --------------- Action ---------------

/** Git仓库创建二进制文件，文件总大小不能超过10Mb */
export const CreateBinaryFiles = (
  client: CodingClient,
  params: CreateBinaryFilesInput,
): Promise<Either<SdkError, CreateBinaryFilesOutput>> => executeAction(client.config, spec, params);
