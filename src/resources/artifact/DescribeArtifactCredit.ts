import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactsOpenApiArtifactCreditsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 通过授信清单ID查询制品授信清单详情 - 请求参数 */
export const DescribeArtifactCreditInputSchema = z.object({
  /** 授信清单ID */
  ArtifactCreditId: z.number().int().describe('授信清单ID'),
});

/** 通过授信清单ID查询制品授信清单详情 - 响应数据 */
export const DescribeArtifactCreditOutputSchema = z.object({
  /** 授信清单详情 */
  ArtifactCredit: ArtifactsOpenApiArtifactCreditsDataSchema.describe('授信清单详情'),
});

// --------------- Types ---------------

export type DescribeArtifactCreditInput = z.infer<typeof DescribeArtifactCreditInputSchema>;
export type DescribeArtifactCreditOutput = z.infer<typeof DescribeArtifactCreditOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactCreditInput, DescribeArtifactCreditOutput> = {
  action: 'DescribeArtifactCredit',
  method: 'POST',
  inputSchema: DescribeArtifactCreditInputSchema,
  outputSchema: DescribeArtifactCreditOutputSchema,
};

// --------------- Action ---------------

/** 通过授信清单ID查询制品授信清单详情 */
export const DescribeArtifactCredit = (
  client: CodingClient,
  params: DescribeArtifactCreditInput,
): Promise<Either<SdkError, DescribeArtifactCreditOutput>> =>
  executeAction(client.config, spec, params);
