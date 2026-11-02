import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CodingCIJobEnvSchema, TriggerCodingCIBuildDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建触发 - 请求参数 */
export const TriggerCodingCIBuildInputSchema = z.object({
  /** 构建计划 Id */
  JobId: z.number().int().describe('构建计划 Id'),
  /** 构建附加的环境变量 */
  ParamList: z.array(CodingCIJobEnvSchema).optional().describe('构建附加的环境变量'),
  /** 可重入字符串 */
  Reentrant: z.string().optional().describe('可重入字符串'),
  /** 分支名或 CommitId，当为构建计划的 DepotType 为 NONE 是可不传 */
  Revision: z
    .string()
    .optional()
    .describe('分支名或 CommitId，当为构建计划的 DepotType 为 NONE 是可不传'),
});

/** 构建触发 - 响应数据 */
export const TriggerCodingCIBuildOutputSchema = z.object({
  /** 构建信息 */
  Data: TriggerCodingCIBuildDataSchema.describe('构建信息'),
});

// --------------- Types ---------------

export type TriggerCodingCIBuildInput = z.infer<typeof TriggerCodingCIBuildInputSchema>;
export type TriggerCodingCIBuildOutput = z.infer<typeof TriggerCodingCIBuildOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<TriggerCodingCIBuildInput, TriggerCodingCIBuildOutput> = {
  action: 'TriggerCodingCIBuild',
  method: 'POST',
  inputSchema: TriggerCodingCIBuildInputSchema,
  outputSchema: TriggerCodingCIBuildOutputSchema,
};

// --------------- Action ---------------

/** 构建触发 */
export const TriggerCodingCIBuild = (
  client: CodingClient,
  params: TriggerCodingCIBuildInput,
): Promise<Either<SdkError, TriggerCodingCIBuildOutput>> =>
  executeAction(client.config, spec, params);
