import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdDeployCountByApplicationsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 发布次数-根据应用名列表获取 - 请求参数 */
export const DescribeCdDeployCountByApplicationsInputSchema = z.object({
  /** 应用名列表 */
  Application: z.array(z.string()).describe('应用名列表'),
  /** 结束时间（格式：yyyy-MM-dd HH:mm:ss） */
  EndAt: z.string().describe('结束时间（格式：yyyy-MM-dd HH:mm:ss）'),
  /** 开始时间（格式：yyyy-MM-dd HH:mm:ss） */
  StartAt: z.string().describe('开始时间（格式：yyyy-MM-dd HH:mm:ss）'),
});

/** 发布次数-根据应用名列表获取 - 响应数据 */
export const DescribeCdDeployCountByApplicationsOutputSchema = z.object({
  /** 发布次数统计数据 */
  Data: DescribeCdDeployCountByApplicationsResponseDataSchema.describe('发布次数统计数据'),
});

// --------------- Types ---------------

export type DescribeCdDeployCountByApplicationsInput = z.infer<
  typeof DescribeCdDeployCountByApplicationsInputSchema
>;
export type DescribeCdDeployCountByApplicationsOutput = z.infer<
  typeof DescribeCdDeployCountByApplicationsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCdDeployCountByApplicationsInput,
  DescribeCdDeployCountByApplicationsOutput
> = {
  action: 'DescribeCdDeployCountByApplications',
  method: 'POST',
  inputSchema: DescribeCdDeployCountByApplicationsInputSchema,
  outputSchema: DescribeCdDeployCountByApplicationsOutputSchema,
};

// --------------- Action ---------------

/** 根据应用名列表获取发布次数 */
export const DescribeCdDeployCountByApplications = (
  client: CodingClient,
  params: DescribeCdDeployCountByApplicationsInput,
): Promise<Either<SdkError, DescribeCdDeployCountByApplicationsOutput>> =>
  executeAction(client.config, spec, params);
