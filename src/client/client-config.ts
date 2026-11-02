import type { Credentials } from '../core/auth';

/** 内部解析后的完整客户端配置，所有字段均为必填 */
interface ClientConfig {
  readonly baseUrl: string;
  readonly credentials: Credentials;
  readonly timeoutMs: number;
  readonly defaultHeaders: Readonly<Record<string, string>>;
}

export type { ClientConfig };
