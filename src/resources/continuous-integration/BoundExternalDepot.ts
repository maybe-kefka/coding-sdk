import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 外部仓库关联 - 请求参数 */
export const BoundExternalDepotInputSchema = z.object({
  /** 当授权类型为USERNAME_PASSWORD时，填入和当前仓库用户名密码关联的凭证UUID */
  CredentialUUID: z
    .string()
    .optional()
    .describe('当授权类型为USERNAME_PASSWORD时，填入和当前仓库用户名密码关联的凭证UUID'),
  /** 如果是跨项目代码仓库，则此字段必填，为源代码仓库id */
  DepotId: z
    .number()
    .int()
    .optional()
    .describe('如果是跨项目代码仓库，则此字段必填，为源代码仓库id'),
  /** 仓库类型 */
  DepotType: z.string().describe('仓库类型'),
  /** 外部仓库标识 */
  ExternalDepotAddress: z.string().describe('外部仓库标识'),
  /** 如果是跨项目代码仓库，则需要填入“CODING_PERSONAL_CREDENTIAL”，其他外部仓库填入“OAUTH” */
  GrantType: z
    .string()
    .optional()
    .describe(
      '如果是跨项目代码仓库，则需要填入“CODING_PERSONAL_CREDENTIAL”，其他外部仓库填入“OAUTH”',
    ),
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
  /** 当授权类型为USERNAME_PASSWORD时，填入外部仓库http格式的仓库地址 */
  RepoUrl: z
    .string()
    .optional()
    .describe('当授权类型为USERNAME_PASSWORD时，填入外部仓库http格式的仓库地址'),
  /** 是否开启 WebHook 一般都填写 true */
  WebHook: z.boolean().describe('是否开启 WebHook 一般都填写 true'),
});

/** 外部仓库关联 - 响应数据 */
export const BoundExternalDepotOutputSchema = z.object({});

// --------------- Types ---------------

export type BoundExternalDepotInput = z.infer<typeof BoundExternalDepotInputSchema>;
export type BoundExternalDepotOutput = z.infer<typeof BoundExternalDepotOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<BoundExternalDepotInput, BoundExternalDepotOutput> = {
  action: 'BoundExternalDepot',
  method: 'POST',
  inputSchema: BoundExternalDepotInputSchema,
  outputSchema: BoundExternalDepotOutputSchema,
};

// --------------- Action ---------------

/** 关联外部仓库 */
export const BoundExternalDepot = (
  client: CodingClient,
  params: BoundExternalDepotInput,
): Promise<Either<SdkError, BoundExternalDepotOutput>> =>
  executeAction(client.config, spec, params);
