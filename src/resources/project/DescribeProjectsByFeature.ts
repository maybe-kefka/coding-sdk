import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 项目查询（通过一级菜单名） - 请求参数 */
export const DescribeProjectsByFeatureInputSchema = z.object({
  /** 一级菜单名称 */
  MenuName: z.string().describe('一级菜单名称'),
});

/** 项目查询（通过一级菜单名） - 响应数据 */
export const DescribeProjectsByFeatureOutputSchema = z.object({
  /** 项目id */
  ProjectId: z.array(z.number().int()).nullable().describe('项目id'),
});

// --------------- Types ---------------

export type DescribeProjectsByFeatureInput = z.infer<typeof DescribeProjectsByFeatureInputSchema>;
export type DescribeProjectsByFeatureOutput = z.infer<typeof DescribeProjectsByFeatureOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProjectsByFeatureInput, DescribeProjectsByFeatureOutput> = {
  action: 'DescribeProjectsByFeature',
  method: 'POST',
  inputSchema: DescribeProjectsByFeatureInputSchema,
  outputSchema: DescribeProjectsByFeatureOutputSchema,
};

// --------------- Action ---------------

/** 项目查询（通过一级菜单名查询开启某个模块的项目） */
export const DescribeProjectsByFeature = (
  client: CodingClient,
  params: DescribeProjectsByFeatureInput,
): Promise<Either<SdkError, DescribeProjectsByFeatureOutput>> =>
  executeAction(client.config, spec, params);
