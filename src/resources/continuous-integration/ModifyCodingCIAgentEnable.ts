import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 自定义构建节点启用、禁用 - 请求参数 */
export const ModifyCodingCIAgentEnableInputSchema = z.object({
  /** 节点池 ID */
  PoolId: z.number().int().describe('节点池 ID'),
  /** 是否启用：启用true、禁用false */
  Enable: z.boolean().describe('是否启用：启用true、禁用false'),
  /** 节点ID */
  Id: z.number().int().describe('节点ID'),
});

/** 自定义构建节点启用、禁用 - 响应数据 */
export const ModifyCodingCIAgentEnableOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyCodingCIAgentEnableInput = z.infer<typeof ModifyCodingCIAgentEnableInputSchema>;
export type ModifyCodingCIAgentEnableOutput = z.infer<typeof ModifyCodingCIAgentEnableOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyCodingCIAgentEnableInput, ModifyCodingCIAgentEnableOutput> = {
  action: 'ModifyCodingCIAgentEnable',
  method: 'POST',
  inputSchema: ModifyCodingCIAgentEnableInputSchema,
  outputSchema: ModifyCodingCIAgentEnableOutputSchema,
};

// --------------- Action ---------------

/** 自定义构建节点启用、禁用 */
export const ModifyCodingCIAgentEnable = (
  client: CodingClient,
  params: ModifyCodingCIAgentEnableInput,
): Promise<Either<SdkError, ModifyCodingCIAgentEnableOutput>> =>
  executeAction(client.config, spec, params);
