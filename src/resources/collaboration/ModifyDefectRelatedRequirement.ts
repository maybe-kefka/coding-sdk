import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改缺陷所属的需求 - 请求参数 */
export const ModifyDefectRelatedRequirementInputSchema = z.object({
  /** 缺陷 Code */
  DefectCode: z.number().int().describe('缺陷 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 需求 Code */
  RequirementCode: z.number().int().describe('需求 Code'),
});

/** 修改缺陷所属的需求 - 响应数据 */
export const ModifyDefectRelatedRequirementOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyDefectRelatedRequirementInput = z.infer<
  typeof ModifyDefectRelatedRequirementInputSchema
>;
export type ModifyDefectRelatedRequirementOutput = z.infer<
  typeof ModifyDefectRelatedRequirementOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDefectRelatedRequirementInput, ModifyDefectRelatedRequirementOutput> =
  {
    action: 'ModifyDefectRelatedRequirement',
    method: 'POST',
    inputSchema: ModifyDefectRelatedRequirementInputSchema,
    outputSchema: ModifyDefectRelatedRequirementOutputSchema,
  };

// --------------- Action ---------------

/** 修改缺陷所属的需求 */
export const ModifyDefectRelatedRequirement = (
  client: CodingClient,
  params: ModifyDefectRelatedRequirementInput,
): Promise<Either<SdkError, ModifyDefectRelatedRequirementOutput>> =>
  executeAction(client.config, spec, params);
