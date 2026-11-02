import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { AgentMachineSecretSchema } from './schemas';

// --------------- Schema ---------------

/** 堡垒机安装 Secret - 请求参数 */
export const DescribeAgentSecretInputSchema = z.object({});

/** 堡垒机安装 Secret - 响应数据 */
export const DescribeAgentSecretOutputSchema = z.object({
  /** Secret 值 */
  Data: AgentMachineSecretSchema.describe('Secret 值'),
});

// --------------- Types ---------------

export type DescribeAgentSecretInput = z.infer<typeof DescribeAgentSecretInputSchema>;
export type DescribeAgentSecretOutput = z.infer<typeof DescribeAgentSecretOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeAgentSecretInput, DescribeAgentSecretOutput> = {
  action: 'DescribeAgentSecret',
  method: 'POST',
  inputSchema: DescribeAgentSecretInputSchema,
  outputSchema: DescribeAgentSecretOutputSchema,
};

// --------------- Action ---------------

/** 在堡垒机上安装 CD 客户端必要的 Secret 凭据参数 */
export const DescribeAgentSecret = (
  client: CodingClient,
  params: DescribeAgentSecretInput,
): Promise<Either<SdkError, DescribeAgentSecretOutput>> =>
  executeAction(client.config, spec, params);
