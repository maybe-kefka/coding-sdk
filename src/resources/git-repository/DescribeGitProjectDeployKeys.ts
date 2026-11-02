import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DeployKeyInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 查询某项目下的部署公钥列表 - 请求参数 */
export const DescribeGitProjectDeployKeysInputSchema = z.object({
  /** 项目 Id */
  ProjectId: z.number().int().describe('项目 Id'),
});

/** 查询某项目下的部署公钥列表 - 响应数据 */
export const DescribeGitProjectDeployKeysOutputSchema = z.object({
  /** 部署公钥列表 */
  Keys: z.array(DeployKeyInfoSchema).describe('部署公钥列表'),
});

// --------------- Types ---------------

export type DescribeGitProjectDeployKeysInput = z.infer<
  typeof DescribeGitProjectDeployKeysInputSchema
>;
export type DescribeGitProjectDeployKeysOutput = z.infer<
  typeof DescribeGitProjectDeployKeysOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitProjectDeployKeysInput, DescribeGitProjectDeployKeysOutput> = {
  action: 'DescribeGitProjectDeployKeys',
  method: 'POST',
  inputSchema: DescribeGitProjectDeployKeysInputSchema,
  outputSchema: DescribeGitProjectDeployKeysOutputSchema,
};

// --------------- Action ---------------

/** 查询某项目下的部署公钥列表 */
export const DescribeGitProjectDeployKeys = (
  client: CodingClient,
  params: DescribeGitProjectDeployKeysInput,
): Promise<Either<SdkError, DescribeGitProjectDeployKeysOutput>> =>
  executeAction(client.config, spec, params);
