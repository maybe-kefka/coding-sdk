import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { OpenApiReleaseSchema } from './schemas';

// --------------- Schema ---------------

/** 版本详情 - 请求参数 */
export const DescribeReleaseInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 版本code */
  ReleaseCode: z.number().int().describe('版本code'),
});

/** 版本详情 - 响应数据 */
export const DescribeReleaseOutputSchema = z.object({
  /** 版本信息 */
  Release: OpenApiReleaseSchema.optional().describe('版本信息'),
});

// --------------- Types ---------------

export type DescribeReleaseInput = z.infer<typeof DescribeReleaseInputSchema>;
export type DescribeReleaseOutput = z.infer<typeof DescribeReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeReleaseInput, DescribeReleaseOutput> = {
  action: 'DescribeRelease',
  method: 'POST',
  inputSchema: DescribeReleaseInputSchema,
  outputSchema: DescribeReleaseOutputSchema,
};

// --------------- Action ---------------

/** 版本详情 */
export const DescribeRelease = (
  client: CodingClient,
  params: DescribeReleaseInput,
): Promise<Either<SdkError, DescribeReleaseOutput>> => executeAction(client.config, spec, params);
