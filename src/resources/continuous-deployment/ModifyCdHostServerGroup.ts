import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { HostServerGroupLabelSchema, ModifyCdHostServerGroupResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** CD 主机组修改 - 请求参数 */
export const ModifyCdHostServerGroupInputSchema = z.object({
  /** 堡垒机 ID */
  AgentMachineId: z.number().int().describe('堡垒机 ID'),
  /** SSH 认证方式（可选值：PUBLIC_KEY、PASSWORD） */
  AuthMethod: z.string().describe('SSH 认证方式（可选值：PUBLIC_KEY、PASSWORD）'),
  /** 主机组名称 */
  DisplayName: z.string().describe('主机组名称'),
  /** 主机组 ID */
  Id: z.number().int().describe('主机组 ID'),
  /** 实例 IP 列表 */
  Ips: z.array(z.string()).describe('实例 IP 列表'),
  /** 主机组标签 */
  Labels: z.array(HostServerGroupLabelSchema).optional().describe('主机组标签'),
  /** SSH 密码 */
  Password: z.string().optional().describe('SSH 密码'),
  /** SSH 端口 */
  Port: z.number().int().describe('SSH 端口'),
  /** SSH 用户名 */
  UserName: z.string().describe('SSH 用户名'),
});

/** CD 主机组修改 - 响应数据 */
export const ModifyCdHostServerGroupOutputSchema = z.object({
  /** 主机组数据 */
  Data: ModifyCdHostServerGroupResponseDataSchema.describe('主机组数据'),
});

// --------------- Types ---------------

export type ModifyCdHostServerGroupInput = z.infer<typeof ModifyCdHostServerGroupInputSchema>;
export type ModifyCdHostServerGroupOutput = z.infer<typeof ModifyCdHostServerGroupOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyCdHostServerGroupInput, ModifyCdHostServerGroupOutput> = {
  action: 'ModifyCdHostServerGroup',
  method: 'POST',
  inputSchema: ModifyCdHostServerGroupInputSchema,
  outputSchema: ModifyCdHostServerGroupOutputSchema,
};

// --------------- Action ---------------

/** CD 主机组修改 */
export const ModifyCdHostServerGroup = (
  client: CodingClient,
  params: ModifyCdHostServerGroupInput,
): Promise<Either<SdkError, ModifyCdHostServerGroupOutput>> =>
  executeAction(client.config, spec, params);
