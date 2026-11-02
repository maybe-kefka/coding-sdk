import type { Credentials } from './credentials';

/**
 * 构建认证请求头
 * @description
 * 根据凭据类型生成对应的 Authorization 头：
 * - 个人令牌：`Bearer <token>`
 * - OAuth：`Bearer <accessToken>`
 * - 项目令牌：`Basic <base64(username:password)>`
 */
const buildAuthHeaders = (credentials: Credentials): Record<string, string> => {
  switch (credentials.type) {
    case 'personalToken':
      return { Authorization: `Bearer ${credentials.token}` };
    case 'oauth':
      return { Authorization: `Bearer ${credentials.accessToken}` };
    case 'projectToken':
      return { Authorization: `Basic ${btoa(`${credentials.username}:${credentials.password}`)}` };
  }
};

export { buildAuthHeaders };
