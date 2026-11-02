import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  ArtifactsOpenApiArtifactCreditsRuleDataSchema,
  ArtifactsOpenApiCreateArtifactCreditsRangeDataSchema,
} from './schemas';

// --------------- Schema ---------------

/** 制品授信清单创建 - 请求参数 */
export const CreateArtifactCreditInputSchema = z.object({
  /** 授信清单适用范围 */
  Ranges: z
    .array(ArtifactsOpenApiCreateArtifactCreditsRangeDataSchema)
    .describe('授信清单适用范围'),
  /** 是否启用 */
  Enabled: z.boolean().describe('是否启用'),
  /** 授信规则 */
  Rules: z.array(ArtifactsOpenApiArtifactCreditsRuleDataSchema).describe('授信规则'),
  /** 授信清单名称 */
  Name: z.string().describe('授信清单名称'),
});

/** 制品授信清单创建 - 响应数据 */
export const CreateArtifactCreditOutputSchema = z.object({
  /** 授信清单ID */
  ArtifactCreditId: z.string().describe('授信清单ID'),
});

// --------------- Types ---------------

export type CreateArtifactCreditInput = z.infer<typeof CreateArtifactCreditInputSchema>;
export type CreateArtifactCreditOutput = z.infer<typeof CreateArtifactCreditOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateArtifactCreditInput, CreateArtifactCreditOutput> = {
  action: 'CreateArtifactCredit',
  method: 'POST',
  inputSchema: CreateArtifactCreditInputSchema,
  outputSchema: CreateArtifactCreditOutputSchema,
};

// --------------- Action ---------------

/** 制品授信清单创建 */
export const CreateArtifactCredit = (
  client: CodingClient,
  params: CreateArtifactCreditInput,
): Promise<Either<SdkError, CreateArtifactCreditOutput>> =>
  executeAction(client.config, spec, params);
