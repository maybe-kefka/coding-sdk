import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { OpenApiReleaseSchema } from './schemas';

// --------------- Schema ---------------

/** 修改版本 - 请求参数 */
export const ModifyReleaseInputSchema = z.object({
  /** 修改之后的处理人ID */
  Assignee: z.number().int().optional().describe('修改之后的处理人ID'),
  /** 需要删除的版本已关联的迭代的列表 */
  DelIterationCodes: z
    .array(z.number().int())
    .optional()
    .describe('需要删除的版本已关联的迭代的列表'),
  /** 需要删除的标签的ID列表 */
  DelLabelIds: z.array(z.number().int()).optional().describe('需要删除的标签的ID列表'),
  /** 修改之后的版本描述 */
  Description: z.string().optional().describe('修改之后的版本描述'),
  /** 版本关联的迭代code列表 */
  IterationCodes: z.array(z.number().int()).optional().describe('版本关联的迭代code列表'),
  /** 需要添加的标签的ID列表 */
  LabelIds: z.array(z.number().int()).optional().describe('需要添加的标签的ID列表'),
  /** 修改之后的版本名 */
  Name: z.string().optional().describe('修改之后的版本名'),
  /** 项目名称  */
  ProjectName: z.string().describe('项目名称 '),
  /** 页面上版本ID */
  ReleaseCode: z.number().int().describe('页面上版本ID'),
  /** 修改之后的版本发布日期 */
  ReleaseDate: z.string().optional().describe('修改之后的版本发布日期'),
  /** 修改之后的版本开始日期 */
  StartDate: z.string().optional().describe('修改之后的版本开始日期'),
  /** 修改之后的状态ID */
  StatusId: z.number().int().optional().describe('修改之后的状态ID'),
});

/** 修改版本 - 响应数据 */
export const ModifyReleaseOutputSchema = z.object({
  /** 版本信息 */
  Release: OpenApiReleaseSchema.optional().describe('版本信息'),
});

// --------------- Types ---------------

export type ModifyReleaseInput = z.infer<typeof ModifyReleaseInputSchema>;
export type ModifyReleaseOutput = z.infer<typeof ModifyReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyReleaseInput, ModifyReleaseOutput> = {
  action: 'ModifyRelease',
  method: 'POST',
  inputSchema: ModifyReleaseInputSchema,
  outputSchema: ModifyReleaseOutputSchema,
};

// --------------- Action ---------------

/** 修改版本 */
export const ModifyRelease = (
  client: CodingClient,
  params: ModifyReleaseInput,
): Promise<Either<SdkError, ModifyReleaseOutput>> => executeAction(client.config, spec, params);
