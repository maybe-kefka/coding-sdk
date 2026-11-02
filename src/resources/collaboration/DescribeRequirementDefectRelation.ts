import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { IssueSimpleDataSchema } from './schemas';

// --------------- Schema ---------------

/** 查询需求关联缺陷列表 - 请求参数 */
export const DescribeRequirementDefectRelationInputSchema = z.object({
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 需求 Code */
  RequirementCode: z.number().int().describe('需求 Code'),
});

/** 查询需求关联缺陷列表 - 响应数据 */
export const DescribeRequirementDefectRelationOutputSchema = z.object({
  /** 缺陷列表 */
  Issues: z.array(IssueSimpleDataSchema).describe('缺陷列表'),
});

// --------------- Types ---------------

export type DescribeRequirementDefectRelationInput = z.infer<
  typeof DescribeRequirementDefectRelationInputSchema
>;
export type DescribeRequirementDefectRelationOutput = z.infer<
  typeof DescribeRequirementDefectRelationOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeRequirementDefectRelationInput,
  DescribeRequirementDefectRelationOutput
> = {
  action: 'DescribeRequirementDefectRelation',
  method: 'POST',
  inputSchema: DescribeRequirementDefectRelationInputSchema,
  outputSchema: DescribeRequirementDefectRelationOutputSchema,
};

// --------------- Action ---------------

/** 查询需求关联缺陷列表 */
export const DescribeRequirementDefectRelation = (
  client: CodingClient,
  params: DescribeRequirementDefectRelationInput,
): Promise<Either<SdkError, DescribeRequirementDefectRelationOutput>> =>
  executeAction(client.config, spec, params);
