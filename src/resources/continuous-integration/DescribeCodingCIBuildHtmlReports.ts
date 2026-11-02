import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { BuildDescribeCodingCIBuildHtmlReportsDataSchema } from './schemas';

// --------------- Schema ---------------

/** 构建任务网页报告查询 - 请求参数 */
export const DescribeCodingCIBuildHtmlReportsInputSchema = z.object({
  /** 构建 ID */
  BuildId: z.number().int().describe('构建 ID'),
});

/** 构建任务网页报告查询 - 响应数据 */
export const DescribeCodingCIBuildHtmlReportsOutputSchema = z.object({
  /** 构建报告信息 */
  Data: BuildDescribeCodingCIBuildHtmlReportsDataSchema.describe('构建报告信息'),
});

// --------------- Types ---------------

export type DescribeCodingCIBuildHtmlReportsInput = z.infer<
  typeof DescribeCodingCIBuildHtmlReportsInputSchema
>;
export type DescribeCodingCIBuildHtmlReportsOutput = z.infer<
  typeof DescribeCodingCIBuildHtmlReportsOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeCodingCIBuildHtmlReportsInput,
  DescribeCodingCIBuildHtmlReportsOutput
> = {
  action: 'DescribeCodingCIBuildHtmlReports',
  method: 'POST',
  inputSchema: DescribeCodingCIBuildHtmlReportsInputSchema,
  outputSchema: DescribeCodingCIBuildHtmlReportsOutputSchema,
};

// --------------- Action ---------------

/** 构建任务网页报告查询 */
export const DescribeCodingCIBuildHtmlReports = (
  client: CodingClient,
  params: DescribeCodingCIBuildHtmlReportsInput,
): Promise<Either<SdkError, DescribeCodingCIBuildHtmlReportsOutput>> =>
  executeAction(client.config, spec, params);
