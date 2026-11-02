import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ReportLittleDataSchema } from './schemas';

// --------------- Schema ---------------

/** 测试报告创建 - 请求参数 */
export const CreateReportInputSchema = z.object({
  /** 附件 ID 数组：来自“生成附件预上传信息”接口 */
  AttachmentIds: z
    .array(z.number().int())
    .optional()
    .describe('附件 ID 数组：来自“生成附件预上传信息”接口'),
  /** 测试报告标题 */
  Name: z.string().describe('测试报告标题'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
  /** 测试计划 ID 数组 */
  RunIds: z.array(z.number().int()).describe('测试计划 ID 数组'),
});

/** 测试报告创建 - 响应数据 */
export const CreateReportOutputSchema = z.object({
  /** 测试报告信息 */
  Data: ReportLittleDataSchema.nullable().describe('测试报告信息'),
});

// --------------- Types ---------------

export type CreateReportInput = z.infer<typeof CreateReportInputSchema>;
export type CreateReportOutput = z.infer<typeof CreateReportOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateReportInput, CreateReportOutput> = {
  action: 'CreateReport',
  method: 'POST',
  inputSchema: CreateReportInputSchema,
  outputSchema: CreateReportOutputSchema,
};

// --------------- Action ---------------

/** 创建测试报告 */
export const CreateReport = (
  client: CodingClient,
  params: CreateReportInput,
): Promise<Either<SdkError, CreateReportOutput>> => executeAction(client.config, spec, params);
