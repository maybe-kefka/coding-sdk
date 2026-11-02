import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DeployKeyInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 查询某仓库下的部署公钥列表 - 请求参数 */
export const DescribeGitDepotDeployKeysInputSchema = z.object({
  /** 仓库 Id */
  DepotId: z.number().int().describe('仓库 Id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 查询某仓库下的部署公钥列表 - 响应数据 */
export const DescribeGitDepotDeployKeysOutputSchema = z.object({
  /** 部署公钥列表 */
  Keys: z.array(DeployKeyInfoSchema).describe('部署公钥列表'),
});

// --------------- Types ---------------

export type DescribeGitDepotDeployKeysInput = z.infer<typeof DescribeGitDepotDeployKeysInputSchema>;
export type DescribeGitDepotDeployKeysOutput = z.infer<
  typeof DescribeGitDepotDeployKeysOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitDepotDeployKeysInput, DescribeGitDepotDeployKeysOutput> = {
  action: 'DescribeGitDepotDeployKeys',
  method: 'POST',
  inputSchema: DescribeGitDepotDeployKeysInputSchema,
  outputSchema: DescribeGitDepotDeployKeysOutputSchema,
};

// --------------- Action ---------------

/** 查询某仓库下的部署公钥列表 */
export const DescribeGitDepotDeployKeys = (
  client: CodingClient,
  params: DescribeGitDepotDeployKeysInput,
): Promise<Either<SdkError, DescribeGitDepotDeployKeysOutput>> =>
  executeAction(client.config, spec, params);
