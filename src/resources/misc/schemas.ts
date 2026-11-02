import { z } from 'zod/v4';

// --------------- PinyinPinyinArray ---------------

export const PinyinPinyinArraySchema = z.object({
  /** 拼音列表 */
  Value: z.array(z.string()).describe('拼音列表'),
});

export type PinyinPinyinArray = z.infer<typeof PinyinPinyinArraySchema>;

// --------------- PinyinPinyinResult ---------------

export const PinyinPinyinResultSchema = z.object({
  /** 拼音分词列表 */
  Array: z.array(PinyinPinyinArraySchema).describe('拼音分词列表'),
  /** 拼音 */
  Value: z.array(z.string()).describe('拼音'),
});

export type PinyinPinyinResult = z.infer<typeof PinyinPinyinResultSchema>;
