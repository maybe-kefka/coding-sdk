import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 批量规划迭代 - 请求参数 */
export const PlanIterationIssueInputSchema = z.object({
  /** 需要规划的事项编号列表 */
  IssueCode: z.array(z.number().int()).describe('需要规划的事项编号列表'),
  /** 迭代编号，将事项移出迭代请传 0 */
  IterationCode: z.number().int().describe('迭代编号，将事项移出迭代请传 0'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 单个事项移动模式，即未规划的子事项的迭代跟随传入的事项一同规划，否则仅规划传入的事项 */
  SingleMode: z
    .boolean()
    .optional()
    .describe(
      '单个事项移动模式，即未规划的子事项的迭代跟随传入的事项一同规划，否则仅规划传入的事项',
    ),
});

/** 批量规划迭代 - 响应数据 */
export const PlanIterationIssueOutputSchema = z.object({});

// --------------- Types ---------------

export type PlanIterationIssueInput = z.infer<typeof PlanIterationIssueInputSchema>;
export type PlanIterationIssueOutput = z.infer<typeof PlanIterationIssueOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<PlanIterationIssueInput, PlanIterationIssueOutput> = {
  action: 'PlanIterationIssue',
  method: 'POST',
  inputSchema: PlanIterationIssueInputSchema,
  outputSchema: PlanIterationIssueOutputSchema,
};

// --------------- Action ---------------

/** 批量规划迭代 */
export const PlanIterationIssue = (
  client: CodingClient,
  params: PlanIterationIssueInput,
): Promise<Either<SdkError, PlanIterationIssueOutput>> =>
  executeAction(client.config, spec, params);
