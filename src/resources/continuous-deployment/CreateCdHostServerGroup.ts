import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CreateCdHostServerGroupResponseDataSchema, HostServerGroupLabelSchema } from './schemas';

// --------------- Schema ---------------

/** CD 主机组添加 - 请求参数 */
export const CreateCdHostServerGroupInputSchema = z.object({
  /** 堡垒机 ID */
  AgentMachineId: z.number().int().describe('堡垒机 ID'),
  /** SSH 认证方式（可选值：PUBLIC_KEY、PASSWORD） */
  AuthMethod: z.string().describe('SSH 认证方式（可选值：PUBLIC_KEY、PASSWORD）'),
  /** 主机组名称 */
  DisplayName: z.string().describe('主机组名称'),
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

/** CD 主机组添加 - 响应数据 */
export const CreateCdHostServerGroupOutputSchema = z.object({
  /** 主机组数据 */
  Data: CreateCdHostServerGroupResponseDataSchema.describe('主机组数据'),
});

// --------------- Types ---------------

export type CreateCdHostServerGroupInput = z.infer<typeof CreateCdHostServerGroupInputSchema>;
export type CreateCdHostServerGroupOutput = z.infer<typeof CreateCdHostServerGroupOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCdHostServerGroupInput, CreateCdHostServerGroupOutput> = {
  action: 'CreateCdHostServerGroup',
  method: 'POST',
  inputSchema: CreateCdHostServerGroupInputSchema,
  outputSchema: CreateCdHostServerGroupOutputSchema,
};

// --------------- Action ---------------

/** CD 主机组添加 */
export const CreateCdHostServerGroup = (
  client: CodingClient,
  params: CreateCdHostServerGroupInput,
): Promise<Either<SdkError, CreateCdHostServerGroupOutput>> =>
  executeAction(client.config, spec, params);
