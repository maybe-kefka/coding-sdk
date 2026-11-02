import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 项目信息修改 - 请求参数 */
export const ModifyProjectInputSchema = z.object({
  /** 项目描述 */
  Description: z.string().optional().describe('项目描述'),
  /** 项目名称 */
  DisplayName: z.string().describe('项目名称'),
  /** 结束时间 */
  EndDate: z.string().optional().describe('结束时间'),
  /** 项目标识 */
  Name: z.string().describe('项目标识'),
  /** 项目编号 */
  ProjectId: z.number().int().describe('项目编号'),
  /** 开始时间 */
  StartDate: z.string().optional().describe('开始时间'),
});

/** 项目信息修改 - 响应数据 */
export const ModifyProjectOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyProjectInput = z.infer<typeof ModifyProjectInputSchema>;
export type ModifyProjectOutput = z.infer<typeof ModifyProjectOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyProjectInput, ModifyProjectOutput> = {
  action: 'ModifyProject',
  method: 'POST',
  inputSchema: ModifyProjectInputSchema,
  outputSchema: ModifyProjectOutputSchema,
};

// --------------- Action ---------------

/** 项目信息修改 */
export const ModifyProject = (
  client: CodingClient,
  params: ModifyProjectInput,
): Promise<Either<SdkError, ModifyProjectOutput>> => executeAction(client.config, spec, params);
