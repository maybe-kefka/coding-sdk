import type { Either } from 'fp-ts/Either';
import { right, left } from 'fp-ts/Either';
import { transportError, type TransportError } from '../error';

interface TransportRequest {
  readonly method: 'POST';
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body?: string;
  readonly timeoutMs?: number;
}

interface TransportResponse {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly bodyText: string;
}

/** 传输函数类型 —— 发送请求并返回原始响应 */
type Transport = (request: TransportRequest) => Promise<Either<TransportError, TransportResponse>>;

/**
 * 创建基于 fetch 的 Transport 实现
 * @description
 * 使用原生 fetch API 发送请求。
 * 通过 AbortController 实现超时控制。
 * 所有网络异常和超时均映射为 TransportError，不抛出异常。
 */
const createFetchTransport = (): Transport => async (request) => {
  const controller = new AbortController();
  const timeoutId = request.timeoutMs
    ? setTimeout(() => controller.abort(), request.timeoutMs)
    : undefined;

  try {
    const response = await fetch(request.url, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      signal: controller.signal,
    });

    const bodyText = await response.text();

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    return right({ status: response.status, headers, bodyText });
  } catch (cause) {
    if (cause instanceof DOMException && cause.name === 'AbortError') {
      return left(transportError(`请求超时（${request.timeoutMs}ms）`, cause));
    }
    return left(transportError('网络请求失败', cause));
  } finally {
    if (timeoutId !== undefined) clearTimeout(timeoutId);
  }
};

export type { TransportRequest, TransportResponse, Transport };
export { createFetchTransport };
