import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ArtifactsOpenApiArtifactCreditsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 制品授信清单列表查询 - 请求参数 */
export const DescribeArtifactCreditListInputSchema = z.object({});

/** 制品授信清单列表查询 - 响应数据 */
export const DescribeArtifactCreditListOutputSchema = z.object({
  /** 授信清单列表 */
  InstanceSet: z.array(ArtifactsOpenApiArtifactCreditsDataSchema).describe('授信清单列表'),
});

// --------------- Types ---------------

export type DescribeArtifactCreditListInput = z.infer<typeof DescribeArtifactCreditListInputSchema>;
export type DescribeArtifactCreditListOutput = z.infer<
  typeof DescribeArtifactCreditListOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeArtifactCreditListInput, DescribeArtifactCreditListOutput> = {
  action: 'DescribeArtifactCreditList',
  method: 'POST',
  inputSchema: DescribeArtifactCreditListInputSchema,
  outputSchema: DescribeArtifactCreditListOutputSchema,
};

// --------------- Action ---------------

/** 制品授信清单列表查询 */
export const DescribeArtifactCreditList = (
  client: CodingClient,
  params: DescribeArtifactCreditListInput,
): Promise<Either<SdkError, DescribeArtifactCreditListOutput>> =>
  executeAction(client.config, spec, params);
