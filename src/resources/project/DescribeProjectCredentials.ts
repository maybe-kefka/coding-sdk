import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DescribeProjectCredentialsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 项目凭据列表查询 - 请求参数 */
export const DescribeProjectCredentialsInputSchema = z.object({
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
});

/** 项目凭据列表查询 - 响应数据 */
export const DescribeProjectCredentialsOutputSchema = z.object({
  /** 获取凭据列表 */
  Data: DescribeProjectCredentialsDataSchema.describe('获取凭据列表'),
});

// --------------- Types ---------------

export type DescribeProjectCredentialsInput = z.infer<typeof DescribeProjectCredentialsInputSchema>;
export type DescribeProjectCredentialsOutput = z.infer<
  typeof DescribeProjectCredentialsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectCredentialsInput, DescribeProjectCredentialsOutput> = {
  action: 'DescribeProjectCredentials',
  method: 'POST',
  inputSchema: DescribeProjectCredentialsInputSchema,
  outputSchema: DescribeProjectCredentialsOutputSchema,
};

// --------------- Action ---------------

/** 项目凭据列表查询 */
export const DescribeProjectCredentials = (
  client: CodingClient,
  params: DescribeProjectCredentialsInput,
): Promise<Either<SdkError, DescribeProjectCredentialsOutput>> =>
  executeAction(client.config, spec, params);
