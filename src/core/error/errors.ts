/** 传输层错误（网络不可达、超时等） */
interface TransportError {
  readonly _tag: 'TransportError';
  readonly message: string;
  readonly cause?: unknown;
}

/** API 业务错误（CODING 返回的 Error 字段） */
interface ApiError {
  readonly _tag: 'ApiError';
  readonly code: string;
  readonly message: string;
  readonly requestId?: string;
  readonly action?: string;
}

/** 解码失败条目 */
interface DecodeIssue {
  readonly path: ReadonlyArray<string | number>;
  readonly pathText: string;
  readonly code: string;
  readonly message: string;
}

/** 响应解码错误（JSON 解析失败、schema 校验失败） */
interface DecodeError {
  readonly _tag: 'DecodeError';
  readonly message: string;
  readonly raw?: unknown;
  readonly action?: string;
  readonly issues?: ReadonlyArray<DecodeIssue>;
}

/** 认证错误 */
interface AuthError {
  readonly _tag: 'AuthError';
  readonly message: string;
}

/** SDK 错误联合类型 */
type SdkError = TransportError | ApiError | DecodeError | AuthError;

/** 构造传输层错误 */
const transportError = (message: string, cause?: unknown): TransportError => ({
  _tag: 'TransportError',
  message,
  cause,
});

/** 构造 API 业务错误 */
const apiError = (params: {
  readonly code: string;
  readonly message: string;
  readonly requestId?: string;
  readonly action?: string;
}): ApiError => ({
  _tag: 'ApiError',
  ...params,
});

/** 构造解码错误 */
const decodeError = (
  message: string,
  raw?: unknown,
  action?: string,
  issues?: ReadonlyArray<DecodeIssue>,
): DecodeError => ({
  _tag: 'DecodeError',
  message,
  raw,
  action,
  issues,
});

/** 构造认证错误 */
const authError = (message: string): AuthError => ({
  _tag: 'AuthError',
  message,
});

export type { TransportError, ApiError, DecodeError, DecodeIssue, AuthError, SdkError };
export { transportError, apiError, decodeError, authError };
