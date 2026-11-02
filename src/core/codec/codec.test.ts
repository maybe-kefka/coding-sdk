import { describe, expect, it } from 'vitest';
import { z } from 'zod/v4';

import { isLeft } from 'fp-ts/Either';
import { safeParse } from './codec';

describe('safeParse', () => {
  it('解码失败时应在 message 中输出字段路径，并保留 issues 明细', () => {
    const schema = z.object({
      MergeRequestInfo: z.object({
        Author: z.object({
          GlobalKey: z.string(),
        }),
      }),
    });

    const result = safeParse(
      schema,
      {
        MergeRequestInfo: {
          Author: {
            GlobalKey: null,
          },
        },
      },
      {
        action: 'DescribeMergeRequest',
      },
    );

    expect(isLeft(result)).toBe(true);

    if (!isLeft(result)) {
      return;
    }

    expect(result.left._tag).toBe('DecodeError');
    expect(result.left.message).toContain('字段 MergeRequestInfo.Author.GlobalKey');
    expect(result.left.issues).toEqual([
      {
        path: ['MergeRequestInfo', 'Author', 'GlobalKey'],
        pathText: 'MergeRequestInfo.Author.GlobalKey',
        code: 'invalid_type',
        message: 'Invalid input: expected string, received null',
      },
    ]);
  });
});
