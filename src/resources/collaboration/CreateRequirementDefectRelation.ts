import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 需求关联缺陷 - 请求参数 */
export const CreateRequirementDefectRelationInputSchema = z.object({
  /** 缺陷 Code */
  DefectCode: z.number().int().describe('缺陷 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 需求 Code */
  RequirementCode: z.number().int().describe('需求 Code'),
});

/** 需求关联缺陷 - 响应数据 */
export const CreateRequirementDefectRelationOutputSchema = z.object({});

// --------------- Types ---------------

export type CreateRequirementDefectRelationInput = z.infer<
  typeof CreateRequirementDefectRelationInputSchema
>;
export type CreateRequirementDefectRelationOutput = z.infer<
  typeof CreateRequirementDefectRelationOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  CreateRequirementDefectRelationInput,
  CreateRequirementDefectRelationOutput
> = {
  action: 'CreateRequirementDefectRelation',
  method: 'POST',
  inputSchema: CreateRequirementDefectRelationInputSchema,
  outputSchema: CreateRequirementDefectRelationOutputSchema,
};

// --------------- Action ---------------

/** 需求关联缺陷 */
export const CreateRequirementDefectRelation = (
  client: CodingClient,
  params: CreateRequirementDefectRelationInput,
): Promise<Either<SdkError, CreateRequirementDefectRelationOutput>> =>
  executeAction(client.config, spec, params);
