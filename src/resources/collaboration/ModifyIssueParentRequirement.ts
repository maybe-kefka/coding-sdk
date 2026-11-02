import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 修改事项父需求 - 请求参数 */
export const ModifyIssueParentRequirementInputSchema = z.object({
  /** 事项 Code */
  IssueCode: z.number().int().describe('事项 Code'),
  /** 父事项 Code */
  ParentIssueCode: z.number().int().describe('父事项 Code'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** 修改事项父需求 - 响应数据 */
export const ModifyIssueParentRequirementOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyIssueParentRequirementInput = z.infer<
  typeof ModifyIssueParentRequirementInputSchema
>;
export type ModifyIssueParentRequirementOutput = z.infer<
  typeof ModifyIssueParentRequirementOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyIssueParentRequirementInput, ModifyIssueParentRequirementOutput> = {
  action: 'ModifyIssueParentRequirement',
  method: 'POST',
  inputSchema: ModifyIssueParentRequirementInputSchema,
  outputSchema: ModifyIssueParentRequirementOutputSchema,
};

// --------------- Action ---------------

/** 修改事项父需求 */
export const ModifyIssueParentRequirement = (
  client: CodingClient,
  params: ModifyIssueParentRequirementInput,
): Promise<Either<SdkError, ModifyIssueParentRequirementOutput>> =>
  executeAction(client.config, spec, params);
