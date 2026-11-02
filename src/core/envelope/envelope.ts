import type { Either } from 'fp-ts/Either';
import { right, left } from 'fp-ts/Either';
import { apiError, decodeError, type ApiError, type DecodeError } from '../error';

/**
 * 解包 CODING API 响应信封
 * @description
 * 从原始 JSON 中提取 Response 字段，检查是否包含 Error。
 * 成功时返回 Response 内层数据和 RequestId，
 * 失败时返回 ApiError 或 DecodeError。
 */
const unwrapEnvelope = (
  raw: unknown,
  action: string,
): Either<ApiError | DecodeError, { readonly data: unknown; readonly requestId?: string }> => {
  if (!raw || typeof raw !== 'object' || !('Response' in raw)) {
    return left(decodeError('响应格式无效：缺少 Response 字段', raw, action));
  }

  const response = raw.Response;
  if (!response || typeof response !== 'object') {
    return left(decodeError('响应格式无效：Response 不是对象', raw, action));
  }

  const requestId =
    'RequestId' in response && typeof response.RequestId === 'string'
      ? response.RequestId
      : undefined;
  const error = 'Error' in response ? response.Error : undefined;
  if (
    typeof error === 'object' &&
    error !== null &&
    'Code' in error &&
    typeof error.Code === 'string' &&
    'Message' in error &&
    typeof error.Message === 'string'
  ) {
    return left(
      apiError({
        code: error.Code,
        message: error.Message,
        requestId,
        action,
      }),
    );
  }

  // 从 Response 中去除 RequestId 和 Error，剩余部分作为 data
  const data = Object.fromEntries(
    Object.entries(response).filter(([key]) => key !== 'RequestId' && key !== 'Error'),
  );
  return right({ data, requestId });
};

export { unwrapEnvelope };
