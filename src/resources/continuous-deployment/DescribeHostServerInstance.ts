import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CdDeployOpenApiHostServerInstanceSchema } from './schemas';

// --------------- Schema ---------------

/** CD 主机组部署详情获取 - 请求参数 */
export const DescribeHostServerInstanceInputSchema = z.object({
  /** 部署账号 从 DescribeCdPipeline 获取 */
  Account: z.string().describe('部署账号 从 DescribeCdPipeline 获取'),
  /** 主机组名称 从 DescribeCdPipeline 获取 */
  ServerGroupName: z.string().describe('主机组名称 从 DescribeCdPipeline 获取'),
});

/** CD 主机组部署详情获取 - 响应数据 */
export const DescribeHostServerInstanceOutputSchema = z.object({
  /** 主机组部署列表 */
  Data: z.array(CdDeployOpenApiHostServerInstanceSchema).describe('主机组部署列表'),
});

// --------------- Types ---------------

export type DescribeHostServerInstanceInput = z.infer<typeof DescribeHostServerInstanceInputSchema>;
export type DescribeHostServerInstanceOutput = z.infer<
  typeof DescribeHostServerInstanceOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeHostServerInstanceInput, DescribeHostServerInstanceOutput> = {
  action: 'DescribeHostServerInstance',
  method: 'POST',
  inputSchema: DescribeHostServerInstanceInputSchema,
  outputSchema: DescribeHostServerInstanceOutputSchema,
};

// --------------- Action ---------------

/** CD 主机组部署详情获取 */
export const DescribeHostServerInstance = (
  client: CodingClient,
  params: DescribeHostServerInstanceInput,
): Promise<Either<SdkError, DescribeHostServerInstanceOutput>> =>
  executeAction(client.config, spec, params);
