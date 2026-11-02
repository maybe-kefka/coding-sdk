import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 需求取消关联缺陷 - 请求参数 */
export const DeleteRequirementDefectRelationInputSchema = z.object({
  /** 缺陷 Code */
  DefectCode: z.number().int().describe('缺陷 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 需求 Code */
  RequirementCode: z.number().int().describe('需求 Code'),
});

/** 需求取消关联缺陷 - 响应数据 */
export const DeleteRequirementDefectRelationOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteRequirementDefectRelationInput = z.infer<
  typeof DeleteRequirementDefectRelationInputSchema
>;
export type DeleteRequirementDefectRelationOutput = z.infer<
  typeof DeleteRequirementDefectRelationOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DeleteRequirementDefectRelationInput,
  DeleteRequirementDefectRelationOutput
> = {
  action: 'DeleteRequirementDefectRelation',
  method: 'POST',
  inputSchema: DeleteRequirementDefectRelationInputSchema,
  outputSchema: DeleteRequirementDefectRelationOutputSchema,
};

// --------------- Action ---------------

/** 需求取消关联缺陷 */
export const DeleteRequirementDefectRelation = (
  client: CodingClient,
  params: DeleteRequirementDefectRelationInput,
): Promise<Either<SdkError, DeleteRequirementDefectRelationOutput>> =>
  executeAction(client.config, spec, params);
