import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { CommitNoteSchema } from './schemas';

// --------------- Schema ---------------

/** 根据请求列表批量查询相关 commit note - 请求参数 */
export const DescribeNotesByCommitsInputSchema = z.object({
  /** 请求sha值列表 */
  Commits: z.array(z.string()).describe('请求sha值列表'),
  /** 仓库id */
  DepotId: z.number().int().describe('仓库id'),
  /** 仓库路径，DepotId与DepotPath二选一即可 */
  DepotPath: z.string().optional().describe('仓库路径，DepotId与DepotPath二选一即可'),
  /** 查询的ref地址 */
  NoteRef: z.string().describe('查询的ref地址'),
});

/** 根据请求列表批量查询相关 commit note - 响应数据 */
export const DescribeNotesByCommitsOutputSchema = z.object({
  /** commit notes 集合 */
  Notes: z.array(CommitNoteSchema).describe('commit notes 集合'),
});

// --------------- Types ---------------

export type DescribeNotesByCommitsInput = z.infer<typeof DescribeNotesByCommitsInputSchema>;
export type DescribeNotesByCommitsOutput = z.infer<typeof DescribeNotesByCommitsOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribeNotesByCommitsInput, DescribeNotesByCommitsOutput> = {
  action: 'DescribeNotesByCommits',
  method: 'POST',
  inputSchema: DescribeNotesByCommitsInputSchema,
  outputSchema: DescribeNotesByCommitsOutputSchema,
};

// --------------- Action ---------------

/** 获取提交的note信息 */
export const DescribeNotesByCommits = (
  client: CodingClient,
  params: DescribeNotesByCommitsInput,
): Promise<Either<SdkError, DescribeNotesByCommitsOutput>> =>
  executeAction(client.config, spec, params);
