import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 团队成员锁定 - 请求参数 */
export const ModifyTeamMemberLockedInputSchema = z.object({
  /** 用户Id */
  UserId: z.number().int().describe('用户Id'),
});

/** 团队成员锁定 - 响应数据 */
export const ModifyTeamMemberLockedOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyTeamMemberLockedInput = z.infer<typeof ModifyTeamMemberLockedInputSchema>;
export type ModifyTeamMemberLockedOutput = z.infer<typeof ModifyTeamMemberLockedOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyTeamMemberLockedInput, ModifyTeamMemberLockedOutput> = {
  action: 'ModifyTeamMemberLocked',
  method: 'POST',
  inputSchema: ModifyTeamMemberLockedInputSchema,
  outputSchema: ModifyTeamMemberLockedOutputSchema,
};

// --------------- Action ---------------

/** 通过用户 ID 团队成员锁定 */
export const ModifyTeamMemberLocked = (
  client: CodingClient,
  params: ModifyTeamMemberLockedInput,
): Promise<Either<SdkError, ModifyTeamMemberLockedOutput>> =>
  executeAction(client.config, spec, params);
