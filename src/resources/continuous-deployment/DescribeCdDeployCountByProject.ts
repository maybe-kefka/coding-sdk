import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdDeployCountByProjectResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 关联应用的发布次数获取（指定项目名） - 请求参数 */
export const DescribeCdDeployCountByProjectInputSchema = z.object({
  /** 结束时间（格式：yyyy-MM-dd HH:mm:ss） */
  EndAt: z.string().describe('结束时间（格式：yyyy-MM-dd HH:mm:ss）'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 开始时间（格式：yyyy-MM-dd HH:mm:ss） */
  StartAt: z.string().describe('开始时间（格式：yyyy-MM-dd HH:mm:ss）'),
});

/** 关联应用的发布次数获取（指定项目名） - 响应数据 */
export const DescribeCdDeployCountByProjectOutputSchema = z.object({
  /** 发布次数统计数据 */
  Data: DescribeCdDeployCountByProjectResponseDataSchema.describe('发布次数统计数据'),
});

// --------------- Types ---------------

export type DescribeCdDeployCountByProjectInput = z.infer<
  typeof DescribeCdDeployCountByProjectInputSchema
>;
export type DescribeCdDeployCountByProjectOutput = z.infer<
  typeof DescribeCdDeployCountByProjectOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeCdDeployCountByProjectInput, DescribeCdDeployCountByProjectOutput> =
  {
    action: 'DescribeCdDeployCountByProject',
    method: 'POST',
    inputSchema: DescribeCdDeployCountByProjectInputSchema,
    outputSchema: DescribeCdDeployCountByProjectOutputSchema,
  };

// --------------- Action ---------------

/** 关联应用的发布次数获取（指定项目名） */
export const DescribeCdDeployCountByProject = (
  client: CodingClient,
  params: DescribeCdDeployCountByProjectInput,
): Promise<Either<SdkError, DescribeCdDeployCountByProjectOutput>> =>
  executeAction(client.config, spec, params);
