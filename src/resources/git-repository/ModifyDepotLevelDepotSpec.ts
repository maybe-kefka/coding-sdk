import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotSpecDepotLevelParamSchema, DepotSpecDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 修改、新增仓库级别的仓库规范 - 请求参数 */
export const ModifyDepotLevelDepotSpecInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 修改、新增仓库级别的仓库规范参数 */
  Param: DepotSpecDepotLevelParamSchema.describe('修改、新增仓库级别的仓库规范参数'),
});

/** 修改、新增仓库级别的仓库规范 - 响应数据 */
export const ModifyDepotLevelDepotSpecOutputSchema = z.object({
  /** 仓库规范详细信息 */
  Detail: DepotSpecDetailSchema.nullable().describe('仓库规范详细信息'),
});

// --------------- Types ---------------

export type ModifyDepotLevelDepotSpecInput = z.infer<typeof ModifyDepotLevelDepotSpecInputSchema>;
export type ModifyDepotLevelDepotSpecOutput = z.infer<typeof ModifyDepotLevelDepotSpecOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyDepotLevelDepotSpecInput, ModifyDepotLevelDepotSpecOutput> = {
  action: 'ModifyDepotLevelDepotSpec',
  method: 'POST',
  inputSchema: ModifyDepotLevelDepotSpecInputSchema,
  outputSchema: ModifyDepotLevelDepotSpecOutputSchema,
};

// --------------- Action ---------------

/** 修改、新增仓库级别的仓库规范 */
export const ModifyDepotLevelDepotSpec = (
  client: CodingClient,
  params: ModifyDepotLevelDepotSpecInput,
): Promise<Either<SdkError, ModifyDepotLevelDepotSpecOutput>> =>
  executeAction(client.config, spec, params);
