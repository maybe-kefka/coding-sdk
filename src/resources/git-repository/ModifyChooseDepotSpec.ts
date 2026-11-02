import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotSpecDetailSchema } from './schemas';

// --------------- Schema ---------------

/** 使用、取消使用仓库规范 - 请求参数 */
export const ModifyChooseDepotSpecInputSchema = z.object({
  /** 仓库路径 */
  DepotPath: z.string().describe('仓库路径'),
  /** 选择的仓库规范名字（不使用仓库规范时，填空字符串） */
  DepotSpecName: z.string().describe('选择的仓库规范名字（不使用仓库规范时，填空字符串）'),
});

/** 使用、取消使用仓库规范 - 响应数据 */
export const ModifyChooseDepotSpecOutputSchema = z.object({
  /** 仓库规范详细信息 */
  Detail: DepotSpecDetailSchema.describe('仓库规范详细信息'),
});

// --------------- Types ---------------

export type ModifyChooseDepotSpecInput = z.infer<typeof ModifyChooseDepotSpecInputSchema>;
export type ModifyChooseDepotSpecOutput = z.infer<typeof ModifyChooseDepotSpecOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyChooseDepotSpecInput, ModifyChooseDepotSpecOutput> = {
  action: 'ModifyChooseDepotSpec',
  method: 'POST',
  inputSchema: ModifyChooseDepotSpecInputSchema,
  outputSchema: ModifyChooseDepotSpecOutputSchema,
};

// --------------- Action ---------------

/** 使用、取消使用仓库规范 */
export const ModifyChooseDepotSpec = (
  client: CodingClient,
  params: ModifyChooseDepotSpecInput,
): Promise<Either<SdkError, ModifyChooseDepotSpecOutput>> =>
  executeAction(client.config, spec, params);
