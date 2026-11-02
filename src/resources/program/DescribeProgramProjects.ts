import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ProgramSchema } from './schemas';

// --------------- Schema ---------------

/** 项目集下项目列表查询 - 请求参数 */
export const DescribeProgramProjectsInputSchema = z.object({
  /** 项目集 ID */
  ProgramId: z.number().int().describe('项目集 ID'),
});

/** 项目集下项目列表查询 - 响应数据 */
export const DescribeProgramProjectsOutputSchema = z.object({
  /** 项目集下项目列表数据 */
  Data: z.array(ProgramSchema).describe('项目集下项目列表数据'),
});

// --------------- Types ---------------

export type DescribeProgramProjectsInput = z.infer<typeof DescribeProgramProjectsInputSchema>;
export type DescribeProgramProjectsOutput = z.infer<typeof DescribeProgramProjectsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeProgramProjectsInput, DescribeProgramProjectsOutput> = {
  action: 'DescribeProgramProjects',
  method: 'POST',
  inputSchema: DescribeProgramProjectsInputSchema,
  outputSchema: DescribeProgramProjectsOutputSchema,
};

// --------------- Action ---------------

/** 项目集下项目列表查询 */
export const DescribeProgramProjects = (
  client: CodingClient,
  params: DescribeProgramProjectsInput,
): Promise<Either<SdkError, DescribeProgramProjectsOutput>> =>
  executeAction(client.config, spec, params);
