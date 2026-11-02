import { z } from 'zod/v4';
import type { Either } from 'fp-ts/Either';
import { right, left } from 'fp-ts/Either';
import type { SdkError } from '../error';
import { transportError } from '../error';
import { safeParse } from '../codec';

/** 构建授权 URL 的参数 */
const OAuthAuthorizeParamsSchema = z
  .object({
    /** 团队域名前缀 */
    team: z.string().describe('team 字段'),
    /** 应用 Client ID */
    clientId: z.string().describe('clientId 字段'),
    /** 回调地址 */
    redirectUri: z.string().describe('redirectUri 字段'),
    /** 授权范围，多个权限以逗号分隔，如 user:profile:ro,project:profile:rw */
    scope: z.string().describe('scope 字段'),
    /** 业务状态码，原封不动传递回去 */
    state: z.string().optional().describe('state 字段'),
  })
  .describe('OAuthAuthorizeParamsSchema 结构定义');

/** 交换 access_token 的参数 */
const ExchangeTokenParamsSchema = z
  .object({
    /** 团队域名前缀 */
    team: z.string().describe('team 字段'),
    /** 应用 Client ID */
    clientId: z.string().describe('clientId 字段'),
    /** 应用 Client Secret */
    clientSecret: z.string().describe('clientSecret 字段'),
    /** 授权码 */
    code: z.string().describe('code 字段'),
  })
  .describe('ExchangeTokenParamsSchema 结构定义');

/** 刷新 access_token 的参数 */
const RefreshTokenParamsSchema = z
  .object({
    /** 团队域名前缀 */
    team: z.string().describe('team 字段'),
    /** 应用 Client ID */
    clientId: z.string().describe('clientId 字段'),
    /** 应用 Client Secret */
    clientSecret: z.string().describe('clientSecret 字段'),
    /** 刷新令牌 */
    refreshToken: z.string().describe('refreshToken 字段'),
  })
  .describe('RefreshTokenParamsSchema 结构定义');

/** CODING OAuth token 响应（snake_case → camelCase 映射） */
const OAuthTokenResponseSchema = z
  .object({
    access_token: z.string().describe('access_token 字段'),
    refresh_token: z.string().describe('refresh_token 字段'),
    expires_in: z.string().describe('expires_in 字段'),
    token_type: z.string().describe('token_type 字段'),
    team: z.string().describe('team 字段'),
    scope: z.string().describe('scope 字段'),
  })
  .transform((raw) => ({
    accessToken: raw.access_token,
    refreshToken: raw.refresh_token,
    expiresIn: raw.expires_in,
    tokenType: raw.token_type,
    team: raw.team,
    scope: raw.scope,
  }))
  .describe('OAuthTokenResponseSchema 结构定义');

type OAuthAuthorizeParams = z.infer<typeof OAuthAuthorizeParamsSchema>;
type ExchangeTokenParams = z.infer<typeof ExchangeTokenParamsSchema>;
type RefreshTokenParams = z.infer<typeof RefreshTokenParamsSchema>;
type OAuthTokenResponse = z.infer<typeof OAuthTokenResponseSchema>;

/**
 * 构建 OAuth 授权跳转 URL
 * @description
 * 生成引导用户至 CODING 授权页面的完整 URL。
 * 用户授权后，浏览器将带着授权码（code）跳转至回调地址。
 */
const buildAuthorizeUrl = (params: OAuthAuthorizeParams): string => {
  const query = new URLSearchParams({
    client_id: params.clientId,
    redirect_uri: params.redirectUri,
    response_type: 'code',
    scope: params.scope,
  });
  if (params.state !== undefined) {
    query.set('state', params.state);
  }
  return `https://${params.team}.coding.net/oauth_authorize.html?${query.toString()}`;
};

/** 发送 OAuth token 请求的内部方法 */
const requestToken = async (
  team: string,
  body: URLSearchParams,
): Promise<Either<SdkError, OAuthTokenResponse>> => {
  let response: Response;
  try {
    response = await fetch(`https://${team}.coding.net/api/oauth/access_token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });
  } catch (cause) {
    return left(transportError('OAuth 请求失败', cause));
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    return left(transportError('OAuth 响应解析失败'));
  }

  return safeParse(OAuthTokenResponseSchema, json, { action: 'OAuth' });
};

/**
 * 用授权码交换 access_token
 * @description
 * 获取授权码（code）后，调用此方法向 CODING 交换 access_token。
 * 每个 code 仅能使用一次，且有效期仅 5 分钟。
 */
const exchangeAccessToken = (
  params: ExchangeTokenParams,
): Promise<Either<SdkError, OAuthTokenResponse>> =>
  requestToken(
    params.team,
    new URLSearchParams({
      client_id: params.clientId,
      client_secret: params.clientSecret,
      grant_type: 'authorization_code',
      code: params.code,
    }),
  );

/**
 * 用 refresh_token 刷新 access_token
 * @description
 * 调用后即使原 access_token 未过期也将失效。
 * refresh_token 有效期 90 天。
 */
const refreshAccessToken = (
  params: RefreshTokenParams,
): Promise<Either<SdkError, OAuthTokenResponse>> =>
  requestToken(
    params.team,
    new URLSearchParams({
      client_id: params.clientId,
      client_secret: params.clientSecret,
      grant_type: 'refresh_token',
      refresh_token: params.refreshToken,
    }),
  );

export type { OAuthAuthorizeParams, ExchangeTokenParams, RefreshTokenParams, OAuthTokenResponse };
export {
  OAuthAuthorizeParamsSchema,
  ExchangeTokenParamsSchema,
  RefreshTokenParamsSchema,
  OAuthTokenResponseSchema,
  buildAuthorizeUrl,
  exchangeAccessToken,
  refreshAccessToken,
};
