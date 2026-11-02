import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** Wiki 父级修改 - 请求参数 */
export const ModifyWikiOrderInputSchema = z.object({
  /** 在第几层级之后 */
  After: z.number().int().optional().describe('在第几层级之后'),
  /** 在第几层级之前 */
  Before: z.number().int().optional().describe('在第几层级之前'),
  /** 是否检查权限,默认false */
  Forced: z.boolean().optional().describe('是否检查权限,默认false'),
  /** wiki Iid */
  Iid: z.number().int().describe('wiki Iid'),
  /** 父级 Iid */
  ParentIid: z.number().int().describe('父级 Iid'),
  /** 项目名称 */
  ProjectName: z.string().describe('项目名称'),
});

/** Wiki 父级修改 - 响应数据 */
export const ModifyWikiOrderOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyWikiOrderInput = z.infer<typeof ModifyWikiOrderInputSchema>;
export type ModifyWikiOrderOutput = z.infer<typeof ModifyWikiOrderOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyWikiOrderInput, ModifyWikiOrderOutput> = {
  action: 'ModifyWikiOrder',
  method: 'POST',
  inputSchema: ModifyWikiOrderInputSchema,
  outputSchema: ModifyWikiOrderOutputSchema,
};

// --------------- Action ---------------

/** 修改wiki父级 */
export const ModifyWikiOrder = (
  client: CodingClient,
  params: ModifyWikiOrderInput,
): Promise<Either<SdkError, ModifyWikiOrderOutput>> => executeAction(client.config, spec, params);
