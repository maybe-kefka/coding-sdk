import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CIJobEnvSchema } from './schemas';

// --------------- Schema ---------------

/** 获取构建计划环境变量 - 请求参数 */
export const DescribeCodingCIBuildEnvsInputSchema = z.object({
  /** 构建ID */
  BuildId: z.number().int().describe('构建ID'),
  /** SYSTEM（系统内置环境变量） Param（触发构建输入环境变量） Env（构建计划填写环境变量） */
  Type: z
    .string()
    .describe(
      'SYSTEM（系统内置环境变量） Param（触发构建输入环境变量） Env（构建计划填写环境变量）',
    ),
});

/** 获取构建计划环境变量 - 响应数据 */
export const DescribeCodingCIBuildEnvsOutputSchema = z.object({
  /** 环境变量列表 */
  EnvList: z.array(CIJobEnvSchema).nullable().describe('环境变量列表'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildEnvsInput = z.infer<typeof DescribeCodingCIBuildEnvsInputSchema>;
export type DescribeCodingCIBuildEnvsOutput = z.infer<typeof DescribeCodingCIBuildEnvsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCodingCIBuildEnvsInput, DescribeCodingCIBuildEnvsOutput> = {
  action: 'DescribeCodingCIBuildEnvs',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildEnvsInputSchema,
  outputSchema: DescribeCodingCIBuildEnvsOutputSchema,
};

// --------------- Action ---------------

/** 获取构建计划环境变量 */
export const DescribeCodingCIBuildEnvs = (
  client: CodingClient,
  params: DescribeCodingCIBuildEnvsInput,
): Promise<Either<SdkError, DescribeCodingCIBuildEnvsOutput>> =>
  executeAction(client.config, spec, params);
