import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { PinyinPinyinResultSchema } from './schemas';

// --------------- Schema ---------------

/** 汉字转拼音 - 请求参数 */
export const DescribePinyinInputSchema = z.object({
  /** 多音字 */
  Heteronym: z.boolean().describe('多音字'),
  /** 风格 */
  Style: z.string().describe('风格'),
  /** 汉字 */
  Value: z.string().describe('汉字'),
});

/** 汉字转拼音 - 响应数据 */
export const DescribePinyinOutputSchema = z.object({
  /** 返回结果 */
  Data: PinyinPinyinResultSchema.describe('返回结果'),
});

// --------------- Types ---------------

export type DescribePinyinInput = z.infer<typeof DescribePinyinInputSchema>;
export type DescribePinyinOutput = z.infer<typeof DescribePinyinOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<DescribePinyinInput, DescribePinyinOutput> = {
  action: 'DescribePinyin',
  method: 'POST',
  inputSchema: DescribePinyinInputSchema,
  outputSchema: DescribePinyinOutputSchema,
};

// --------------- Action ---------------

/** 汉字转拼音 */
export const DescribePinyin = (
  client: CodingClient,
  params: DescribePinyinInput,
): Promise<Either<SdkError, DescribePinyinOutput>> => executeAction(client.config, spec, params);
