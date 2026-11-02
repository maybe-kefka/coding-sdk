import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { TeamDataSchema } from './schemas';

// --------------- Schema ---------------

/** 团队信息查询 - 请求参数 */
export const DescribeTeamInputSchema = z.object({});

/** 团队信息查询 - 响应数据 */
export const DescribeTeamOutputSchema = z.object({
  /** 团队信息 */
  Data: TeamDataSchema.describe('团队信息'),
});

// --------------- Types ---------------

export type DescribeTeamInput = z.infer<typeof DescribeTeamInputSchema>;
export type DescribeTeamOutput = z.infer<typeof DescribeTeamOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeTeamInput, DescribeTeamOutput> = {
  action: 'DescribeTeam',
  method: 'POST',
  inputSchema: DescribeTeamInputSchema,
  outputSchema: DescribeTeamOutputSchema,
};

// --------------- Action ---------------

/** 团队信息查询 */
export const DescribeTeam = (
  client: CodingClient,
  params: DescribeTeamInput,
): Promise<Either<SdkError, DescribeTeamOutput>> => executeAction(client.config, spec, params);
