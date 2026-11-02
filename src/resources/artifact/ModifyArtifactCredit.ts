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

/** 制品授信清单修改 - 请求参数 */
export const ModifyArtifactCreditInputSchema = z.object({
  /** 授信清单范围 */
  Ranges: z.array(ArtifactsOpenApiCreateArtifactCreditsRangeDataSchema).describe('授信清单范围'),
  /** 是否启用 */
  Enabled: z.boolean().describe('是否启用'),
  /** 授信清单ID */
  Id: z.number().int().describe('授信清单ID'),
  /** 授信清单规则 */
  Rules: z.array(ArtifactsOpenApiArtifactCreditsRuleDataSchema).describe('授信清单规则'),
  /** 授信清单名称 */
  Name: z.string().describe('授信清单名称'),
});

/** 制品授信清单修改 - 响应数据 */
export const ModifyArtifactCreditOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyArtifactCreditInput = z.infer<typeof ModifyArtifactCreditInputSchema>;
export type ModifyArtifactCreditOutput = z.infer<typeof ModifyArtifactCreditOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyArtifactCreditInput, ModifyArtifactCreditOutput> = {
  action: 'ModifyArtifactCredit',
  method: 'POST',
  inputSchema: ModifyArtifactCreditInputSchema,
  outputSchema: ModifyArtifactCreditOutputSchema,
};

// --------------- Action ---------------

/** 制品授信清单修改 */
export const ModifyArtifactCredit = (
  client: CodingClient,
  params: ModifyArtifactCreditInput,
): Promise<Either<SdkError, ModifyArtifactCreditOutput>> =>
  executeAction(client.config, spec, params);
