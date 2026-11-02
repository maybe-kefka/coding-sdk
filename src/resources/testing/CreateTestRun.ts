import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { RunDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试计划创建 - 请求参数 */
export const CreateTestRunInputSchema = z.object({
  /** 处理人 ID */
  AssignedToId: z.number().int().optional().describe('处理人 ID'),
  /** 包含的用例 ID 列表，IncludeAll=false 必填 */
  Cases: z.array(z.number().int()).optional().describe('包含的用例 ID 列表，IncludeAll=false 必填'),
  /** 环境标识 */
  ConfigEnvironmentId: z.number().int().optional().describe('环境标识'),
  /** 描述 */
  Description: z.string().optional().describe('描述'),
  /** 执行类型：1-手动执行 2-自动化流水线执行 */
  ExecuteType: z.number().int().optional().describe('执行类型：1-手动执行 2-自动化流水线执行'),
  /** 项目代码库 ID */
  GitDepotId: z.number().int().optional().describe('项目代码库 ID'),
  /** 发布版本 ID */
  GitReleaseId: z.number().int().optional().describe('发布版本 ID'),
  /** 是否包含全部用例 */
  IncludeAll: z.boolean().describe('是否包含全部用例'),
  /** 标题 */
  Name: z.string().describe('标题'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 分组 ID */
  SectionId: z.number().int().optional().describe('分组 ID'),
});

/** 测试计划创建 - 响应数据 */
export const CreateTestRunOutputSchema = z.object({
  /** 测试计划信息 */
  Data: RunDataSchema.nullable().describe('测试计划信息'),
});

// --------------- Types ---------------

export type CreateTestRunInput = z.infer<typeof CreateTestRunInputSchema>;
export type CreateTestRunOutput = z.infer<typeof CreateTestRunOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateTestRunInput, CreateTestRunOutput> = {
  action: 'CreateTestRun',
  method: 'POST',
  inputSchema: CreateTestRunInputSchema,
  outputSchema: CreateTestRunOutputSchema,
};

// --------------- Action ---------------

/** 测试计划创建 */
export const CreateTestRun = (
  client: CodingClient,
  params: CreateTestRunInput,
): Promise<Either<SdkError, CreateTestRunOutput>> => executeAction(client.config, spec, params);
