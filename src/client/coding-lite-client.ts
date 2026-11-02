import type { ClientOptions } from './client-options';
import type { ClientConfig } from './client-config';

/** 轻量级客户端 —— 仅缓存配置，配合独立函数使用 */
interface CodingClient {
  readonly config: ClientConfig;
}

/** 解析用户选项为完整配置 */
const resolveConfig = (options: ClientOptions): ClientConfig => ({
  baseUrl: options.baseUrl,
  credentials: options.credentials,
  timeoutMs: options.timeoutMs ?? 15_000,
  defaultHeaders: options.defaultHeaders ?? {},
});

/** 创建轻量级客户端 */
const createCodingClient = (options: ClientOptions): CodingClient => ({
  config: resolveConfig(options),
});

export type { CodingClient };
export { createCodingClient, resolveConfig };
