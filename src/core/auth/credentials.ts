import { z } from 'zod/v4';

/** 个人访问令牌凭据 */
const PersonalTokenCredentialsSchema = z
  .object({
    type: z.literal('personalToken').describe('type 字段'),
    token: z.string().describe('token 字段'),
  })
  .describe('PersonalTokenCredentialsSchema 结构定义');

/** OAuth 凭据 */
const OAuthCredentialsSchema = z
  .object({
    type: z.literal('oauth').describe('type 字段'),
    accessToken: z.string().describe('accessToken 字段'),
  })
  .describe('OAuthCredentialsSchema 结构定义');

/** 项目令牌凭据 */
const ProjectTokenCredentialsSchema = z
  .object({
    type: z.literal('projectToken').describe('type 字段'),
    username: z.string().describe('username 字段'),
    password: z.string().describe('password 字段'),
  })
  .describe('ProjectTokenCredentialsSchema 结构定义');

/** 凭据联合类型 —— 支持 CODING 三种鉴权方式 */
const CredentialsSchema = z
  .discriminatedUnion('type', [
    PersonalTokenCredentialsSchema,
    OAuthCredentialsSchema,
    ProjectTokenCredentialsSchema,
  ])
  .describe('CredentialsSchema 结构定义');

type PersonalTokenCredentials = z.infer<typeof PersonalTokenCredentialsSchema>;
type OAuthCredentials = z.infer<typeof OAuthCredentialsSchema>;
type ProjectTokenCredentials = z.infer<typeof ProjectTokenCredentialsSchema>;
type Credentials = z.infer<typeof CredentialsSchema>;

/** 创建个人访问令牌凭据 */
const personalToken = (token: string): PersonalTokenCredentials => ({
  type: 'personalToken',
  token,
});

/** 创建 OAuth 凭据 */
const oauth = (accessToken: string): OAuthCredentials => ({
  type: 'oauth',
  accessToken,
});

/** 创建项目令牌凭据 */
const projectToken = (username: string, password: string): ProjectTokenCredentials => ({
  type: 'projectToken',
  username,
  password,
});

export type { PersonalTokenCredentials, OAuthCredentials, ProjectTokenCredentials, Credentials };
export {
  PersonalTokenCredentialsSchema,
  OAuthCredentialsSchema,
  ProjectTokenCredentialsSchema,
  CredentialsSchema,
  personalToken,
  oauth,
  projectToken,
};
