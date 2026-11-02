import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeCdDeployTrendByApplicationsResponseDataSchema } from './schemas';

// --------------- Schema ---------------

/** 发布趋势-根据应用名列表获取 - 请求参数 */
export const DescribeCdDeployTrendByApplicationsInputSchema = z.object({
  /** 应用名列表 */
  Application: z.array(z.string()).describe('应用名列表'),
  /** 结束时间（格式：yyyy-MM-dd HH:mm:ss） */
  EndAt: z.string().describe('结束时间（格式：yyyy-MM-dd HH:mm:ss）'),
  /** 开始时间（格式：yyyy-MM-dd HH:mm:ss） */
  StartAt: z.string().describe('开始时间（格式：yyyy-MM-dd HH:mm:ss）'),
});

/** 发布趋势-根据应用名列表获取 - 响应数据 */
export const DescribeCdDeployTrendByApplicationsOutputSchema = z.object({
  /** 发布趋势统计数据 */
  Data: DescribeCdDeployTrendByApplicationsResponseDataSchema.describe('发布趋势统计数据'),
});

// --------------- Types ---------------

export type DescribeCdDeployTrendByApplicationsInput = z.infer<
  typeof DescribeCdDeployTrendByApplicationsInputSchema
>;
export type DescribeCdDeployTrendByApplicationsOutput = z.infer<
  typeof DescribeCdDeployTrendByApplicationsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCdDeployTrendByApplicationsInput,
  DescribeCdDeployTrendByApplicationsOutput
> = {
  action: 'DescribeCdDeployTrendByApplications',
  method: 'POST',
  inputSchema: DescribeCdDeployTrendByApplicationsInputSchema,
  outputSchema: DescribeCdDeployTrendByApplicationsOutputSchema,
};

// --------------- Action ---------------

/** 发布趋势-根据应用名列表获取 */
export const DescribeCdDeployTrendByApplications = (
  client: CodingClient,
  params: DescribeCdDeployTrendByApplicationsInput,
): Promise<Either<SdkError, DescribeCdDeployTrendByApplicationsOutput>> =>
  executeAction(client.config, spec, params);
