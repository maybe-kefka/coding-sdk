import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 获取代码仓库信息 - 请求参数 */
export const DescribeGitDepotInputSchema = z.object({
  /** 仓库Id */
  DepotId: z.number().int().describe('仓库Id'),
  /** 仓库路径，与仓库ID二选一 */
  DepotPath: z.string().optional().describe('仓库路径，与仓库ID二选一'),
});

/** 获取代码仓库信息 - 响应数据 */
export const DescribeGitDepotOutputSchema = z.object({
  /** 根据代码仓库id获取代码仓库信息 */
  Depot: DepotInfoSchema.describe('根据代码仓库id获取代码仓库信息'),
});

// --------------- Types ---------------

export type DescribeGitDepotInput = z.infer<typeof DescribeGitDepotInputSchema>;
export type DescribeGitDepotOutput = z.infer<typeof DescribeGitDepotOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeGitDepotInput, DescribeGitDepotOutput> = {
  action: 'DescribeGitDepot',
  method: 'POST',
  inputSchema: DescribeGitDepotInputSchema,
  outputSchema: DescribeGitDepotOutputSchema,
};

// --------------- Action ---------------

/** 根据代码仓库id获取代码仓库信息 */
export const DescribeGitDepot = (
  client: CodingClient,
  params: DescribeGitDepotInput,
): Promise<Either<SdkError, DescribeGitDepotOutput>> => executeAction(client.config, spec, params);
