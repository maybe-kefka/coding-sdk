import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdDeployTimeByApplicationsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 发布时长-根据应用名列表获取 - 请求参数 */
export const DescribeCdDeployTimeByApplicationsInputSchema = z.object({
  /** 应用名列表 */
  Application: z.array(z.string()).describe('应用名列表'),
  /** 结束时间（格式：yyyy-MM-dd HH:mm:ss） */
  EndAt: z.string().describe('结束时间（格式：yyyy-MM-dd HH:mm:ss）'),
  /** 开始时间（格式：yyyy-MM-dd HH:mm:ss） */
  StartAt: z.string().describe('开始时间（格式：yyyy-MM-dd HH:mm:ss）'),
});

/** 发布时长-根据应用名列表获取 - 响应数据 */
export const DescribeCdDeployTimeByApplicationsOutputSchema = z.object({
  /** 发布时长统计数据 */
  Data: DescribeCdDeployTimeByApplicationsResponseDataSchema.describe('发布时长统计数据'),
});

// --------------- Types ---------------

export type DescribeCdDeployTimeByApplicationsInput = z.infer<
  typeof DescribeCdDeployTimeByApplicationsInputSchema
>;
export type DescribeCdDeployTimeByApplicationsOutput = z.infer<
  typeof DescribeCdDeployTimeByApplicationsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCdDeployTimeByApplicationsInput,
  DescribeCdDeployTimeByApplicationsOutput
> = {
  action: 'DescribeCdDeployTimeByApplications',
  method: 'POST',
  inputSchema: DescribeCdDeployTimeByApplicationsInputSchema,
  outputSchema: DescribeCdDeployTimeByApplicationsOutputSchema,
};

// --------------- Action ---------------

/** 发布时长-根据应用名列表获取 */
export const DescribeCdDeployTimeByApplications = (
  client: CodingClient,
  params: DescribeCdDeployTimeByApplicationsInput,
): Promise<Either<SdkError, DescribeCdDeployTimeByApplicationsOutput>> =>
  executeAction(client.config, spec, params);
