import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 绑定 CD 应用到项目 - 请求参数 */
export const BindCdApplicationToProjectInputSchema = z.object({
  /** CD 应用名 */
  Application: z.string().describe('CD 应用名'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 绑定 CD 应用到项目 - 响应数据 */
export const BindCdApplicationToProjectOutputSchema = z.object({});

// --------------- Types ---------------

export type BindCdApplicationToProjectInput = z.infer<typeof BindCdApplicationToProjectInputSchema>;
export type BindCdApplicationToProjectOutput = z.infer<
  typeof BindCdApplicationToProjectOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<BindCdApplicationToProjectInput, BindCdApplicationToProjectOutput> = {
  action: 'BindCdApplicationToProject',
  method: 'POST',
  inputSchema: BindCdApplicationToProjectInputSchema,
  outputSchema: BindCdApplicationToProjectOutputSchema,
};

// --------------- Action ---------------

/** 绑定 CD 应用到项目 */
export const BindCdApplicationToProject = (
  client: CodingClient,
  params: BindCdApplicationToProjectInput,
): Promise<Either<SdkError, BindCdApplicationToProjectOutput>> =>
  executeAction(client.config, spec, params);
