import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 团队成员解锁 - 请求参数 */
export const ModifyTeamMemberUnlockedInputSchema = z.object({
  /** 用户Id */
  UserId: z.number().int().describe('用户Id'),
});

/** 团队成员解锁 - 响应数据 */
export const ModifyTeamMemberUnlockedOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyTeamMemberUnlockedInput = z.infer<typeof ModifyTeamMemberUnlockedInputSchema>;
export type ModifyTeamMemberUnlockedOutput = z.infer<typeof ModifyTeamMemberUnlockedOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyTeamMemberUnlockedInput, ModifyTeamMemberUnlockedOutput> = {
  action: 'ModifyTeamMemberUnlocked',
  method: 'POST',
  inputSchema: ModifyTeamMemberUnlockedInputSchema,
  outputSchema: ModifyTeamMemberUnlockedOutputSchema,
};

// --------------- Action ---------------

/** 通过用户 ID 解锁团队成员 */
export const ModifyTeamMemberUnlocked = (
  client: CodingClient,
  params: ModifyTeamMemberUnlockedInput,
): Promise<Either<SdkError, ModifyTeamMemberUnlockedOutput>> =>
  executeAction(client.config, spec, params);
