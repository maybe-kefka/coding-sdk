import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProgramDataSchema } from './schemas';

// --------------- Schema ---------------

/** 项目集列表查询 - 请求参数 */
export const DescribeProgramsInputSchema = z.object({
  /** 关键字搜索：项目名 */
  Keyword: z.string().optional().describe('关键字搜索：项目名'),
  /** 请求页数 */
  PageNumber: z.number().int().describe('请求页数'),
  /** 请求条数 */
  PageSize: z.number().int().describe('请求条数'),
});

/** 项目集列表查询 - 响应数据 */
export const DescribeProgramsOutputSchema = z.object({
  /** 项目集数据 */
  Data: ProgramDataSchema.describe('项目集数据'),
});

// --------------- Types ---------------

export type DescribeProgramsInput = z.infer<typeof DescribeProgramsInputSchema>;
export type DescribeProgramsOutput = z.infer<typeof DescribeProgramsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProgramsInput, DescribeProgramsOutput> = {
  action: 'DescribePrograms',
  method: 'POST',
  inputSchema: DescribeProgramsInputSchema,
  outputSchema: DescribeProgramsOutputSchema,
};

// --------------- Action ---------------

/** 项目集列表查询 */
export const DescribePrograms = (
  client: CodingClient,
  params: DescribeProgramsInput,
): Promise<Either<SdkError, DescribeProgramsOutput>> => executeAction(client.config, spec, params);
