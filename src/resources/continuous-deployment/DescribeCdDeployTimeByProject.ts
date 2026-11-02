import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdDeployTimeByProjectResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 关联应用的发布时长-根据项目名获取 - 请求参数 */
export const DescribeCdDeployTimeByProjectInputSchema = z.object({
  /** 结束时间（格式：yyyy-MM-dd HH:mm:ss） */
  EndAt: z.string().describe('结束时间（格式：yyyy-MM-dd HH:mm:ss）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 开始时间（格式：yyyy-MM-dd HH:mm:ss） */
  StartAt: z.string().describe('开始时间（格式：yyyy-MM-dd HH:mm:ss）'),
});

/** 关联应用的发布时长-根据项目名获取 - 响应数据 */
export const DescribeCdDeployTimeByProjectOutputSchema = z.object({
  /** 发布时长统计数据 */
  Data: DescribeCdDeployTimeByProjectResponseDataSchema.describe('发布时长统计数据'),
});

// --------------- Types ---------------

export type DescribeCdDeployTimeByProjectInput = z.infer<
  typeof DescribeCdDeployTimeByProjectInputSchema
>;
export type DescribeCdDeployTimeByProjectOutput = z.infer<
  typeof DescribeCdDeployTimeByProjectOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdDeployTimeByProjectInput, DescribeCdDeployTimeByProjectOutput> = {
  action: 'DescribeCdDeployTimeByProject',
  method: 'POST',
  inputSchema: DescribeCdDeployTimeByProjectInputSchema,
  outputSchema: DescribeCdDeployTimeByProjectOutputSchema,
};

// --------------- Action ---------------

/** 关联应用的发布时长-根据项目名获取 */
export const DescribeCdDeployTimeByProject = (
  client: CodingClient,
  params: DescribeCdDeployTimeByProjectInput,
): Promise<Either<SdkError, DescribeCdDeployTimeByProjectOutput>> =>
  executeAction(client.config, spec, params);
