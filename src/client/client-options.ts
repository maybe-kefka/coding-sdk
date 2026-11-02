import type { Credentials } from '../core/auth';

/** 用户传入的客户端配置选项 */
interface ClientOptions {
  /** 团队 API 地址，如 https://<team>.coding.net/open-api */
  readonly baseUrl: string;
  /** 认证凭据，支持个人令牌、OAuth、项目令牌三种方式 */
  readonly credentials: Credentials;
  /** 请求超时毫秒数，默认 15000 */
  readonly timeoutMs?: number;
  /** 额外的全局请求头 */
  readonly defaultHeaders?: Readonly<Record<string, string>>;
}

export type { ClientOptions };
