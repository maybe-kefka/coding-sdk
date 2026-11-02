import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdDeployTrendByProjectResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 关联应用的发布趋势-根据项目名获取 - 请求参数 */
export const DescribeCdDeployTrendByProjectInputSchema = z.object({
  /** 结束时间（格式：yyyy-MM-dd HH:mm:ss） */
  EndAt: z.string().describe('结束时间（格式：yyyy-MM-dd HH:mm:ss）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 开始时间（格式：yyyy-MM-dd HH:mm:ss） */
  StartAt: z.string().describe('开始时间（格式：yyyy-MM-dd HH:mm:ss）'),
});

/** 关联应用的发布趋势-根据项目名获取 - 响应数据 */
export const DescribeCdDeployTrendByProjectOutputSchema = z.object({
  /** 发布趋势统计数据 */
  Data: DescribeCdDeployTrendByProjectResponseDataSchema.describe('发布趋势统计数据'),
});

// --------------- Types ---------------

export type DescribeCdDeployTrendByProjectInput = z.infer<
  typeof DescribeCdDeployTrendByProjectInputSchema
>;
export type DescribeCdDeployTrendByProjectOutput = z.infer<
  typeof DescribeCdDeployTrendByProjectOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdDeployTrendByProjectInput, DescribeCdDeployTrendByProjectOutput> =
  {
    action: 'DescribeCdDeployTrendByProject',
    method: 'POST',
    inputSchema: DescribeCdDeployTrendByProjectInputSchema,
    outputSchema: DescribeCdDeployTrendByProjectOutputSchema,
  };

// --------------- Action ---------------

/** 关联应用的发布趋势-根据项目名获取 */
export const DescribeCdDeployTrendByProject = (
  client: CodingClient,
  params: DescribeCdDeployTrendByProjectInput,
): Promise<Either<SdkError, DescribeCdDeployTrendByProjectOutput>> =>
  executeAction(client.config, spec, params);
