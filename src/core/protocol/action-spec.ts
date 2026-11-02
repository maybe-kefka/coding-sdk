import type { ZodType } from 'zod/v4';

/** 接口规格 —— 描述一个 CODING API 接口的请求和响应 schema */
interface ActionSpec<Input, Output> {
  readonly action: string;
  readonly method: 'POST';
  readonly inputSchema: ZodType<Input>;
  readonly outputSchema: ZodType<Output>;
}

export type { ActionSpec };
