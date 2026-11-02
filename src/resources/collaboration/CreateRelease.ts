import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { OpenApiReleaseSchema } from './schemas';

// --------------- Schema ---------------

/** 创建版本 - 请求参数 */
export const CreateReleaseInputSchema = z.object({
  /** 版本处理人ID */
  Assignee: z.number().int().optional().describe('版本处理人ID'),
  /** 版本描述 */
  Description: z.string().optional().describe('版本描述'),
  /** 关联迭代code列表 */
  IterationCodes: z.array(z.number().int()).optional().describe('关联迭代code列表'),
  /** 标签ID列表 */
  LabelIds: z.array(z.number().int()).optional().describe('标签ID列表'),
  /** 版本名称 */
  Name: z.string().describe('版本名称'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 版本发布日期 */
  ReleaseDate: z.string().optional().describe('版本发布日期'),
  /** 版本开始时间 */
  StartDate: z.string().optional().describe('版本开始时间'),
});

/** 创建版本 - 响应数据 */
export const CreateReleaseOutputSchema = z.object({
  /** 版本信息 */
  Release: OpenApiReleaseSchema.optional().describe('版本信息'),
});

// --------------- Types ---------------

export type CreateReleaseInput = z.infer<typeof CreateReleaseInputSchema>;
export type CreateReleaseOutput = z.infer<typeof CreateReleaseOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateReleaseInput, CreateReleaseOutput> = {
  action: 'CreateRelease',
  method: 'POST',
  inputSchema: CreateReleaseInputSchema,
  outputSchema: CreateReleaseOutputSchema,
};

// --------------- Action ---------------

/** 创建版本 */
export const CreateRelease = (
  client: CodingClient,
  params: CreateReleaseInput,
): Promise<Either<SdkError, CreateReleaseOutput>> => executeAction(client.config, spec, params);
