import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';

// --------------- Schema ---------------

/** 团队成员删除 - 请求参数 */
export const DeleteTeamMemberInputSchema = z.object({
  /** 用户Id */
  UserId: z.number().int().describe('用户Id'),
});

/** 团队成员删除 - 响应数据 */
export const DeleteTeamMemberOutputSchema = z.object({});

// --------------- Types ---------------

export type DeleteTeamMemberInput = z.infer<typeof DeleteTeamMemberInputSchema>;
export type DeleteTeamMemberOutput = z.infer<typeof DeleteTeamMemberOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DeleteTeamMemberInput, DeleteTeamMemberOutput> = {
  action: 'DeleteTeamMember',
  method: 'POST',
  inputSchema: DeleteTeamMemberInputSchema,
  outputSchema: DeleteTeamMemberOutputSchema,
};

// --------------- Action ---------------

/** 团队成员删除 */
export const DeleteTeamMember = (
  client: CodingClient,
  params: DeleteTeamMemberInput,
): Promise<Either<SdkError, DeleteTeamMemberOutput>> => executeAction(client.config, spec, params);
