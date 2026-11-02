import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactFilterRuleSchema, TeamArtifactPageSchema } from './schemas';

// --------------- Schema ---------------

/** 制品列表查询 - 请求参数 */
export const DescribeTeamArtifactsInputSchema = z.object({
  /** 页码，默认：1 */
  PageNumber: z.number().int().optional().describe('页码，默认：1'),
  /** 每页展示数量，默认：10 */
  PageSize: z.number().int().optional().describe('每页展示数量，默认：10'),
  /** 筛选规则（数组之间筛选关系为and，数组之内筛选关系为or） */
  Rule: ArtifactFilterRuleSchema.optional().describe(
    '筛选规则（数组之间筛选关系为and，数组之内筛选关系为or）',
  ),
});

/** 制品列表查询 - 响应数据 */
export const DescribeTeamArtifactsOutputSchema = z.object({
  /** 分页列表 */
  Data: TeamArtifactPageSchema.describe('分页列表'),
});

// --------------- Types ---------------

export type DescribeTeamArtifactsInput = z.infer<typeof DescribeTeamArtifactsInputSchema>;
export type DescribeTeamArtifactsOutput = z.infer<typeof DescribeTeamArtifactsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamArtifactsInput, DescribeTeamArtifactsOutput> = {
  action: 'DescribeTeamArtifacts',
  method: 'POST',
  inputSchema: DescribeTeamArtifactsInputSchema,
  outputSchema: DescribeTeamArtifactsOutputSchema,
};

// --------------- Action ---------------

/** 制品列表查询 */
export const DescribeTeamArtifacts = (
  client: CodingClient,
  params: DescribeTeamArtifactsInput,
): Promise<Either<SdkError, DescribeTeamArtifactsOutput>> =>
  executeAction(client.config, spec, params);
