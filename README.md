# coding-sdk

CODING OpenAPI TypeScript SDK —— 函数式风格，支持三种鉴权方式，提供完整的 OAuth 授权流程辅助工具。

## 安装

```bash
npm install coding-sdk
```

## 快速开始

### 使用个人访问令牌

最常用的方式。在 CODING【个人账户设置】>【访问令牌】中创建。

```ts
import { createCodingClient, personalToken } from 'coding-sdk';

const client = createCodingClient({
  baseUrl: 'https://my-team.coding.net/open-api',
  credentials: personalToken('你的个人访问令牌'),
});
```

### 使用 OAuth 凭据

适用于第三方应用，用户授权后获取 access_token。

```ts
import { createCodingClient, oauth } from 'coding-sdk';

const client = createCodingClient({
  baseUrl: 'https://my-team.coding.net/open-api',
  credentials: oauth('用户授权获取的 access_token'),
});
```

### 使用项目令牌

适用于 CI/CD 或项目级自动化场景。在 CODING【项目设置】>【开发者选项】>【项目令牌】中创建。

```ts
import { createCodingClient, projectToken } from 'coding-sdk';

const client = createCodingClient({
  baseUrl: 'https://my-team.coding.net/open-api',
  credentials: projectToken('令牌用户名', '令牌密码'),
});
```

## 客户端模式

### 普通客户端（`createCodingClient`）

仅缓存配置，配合独立的 Action 函数使用。适合只调用少量接口、需要 tree-shaking 的场景。

```ts
import { createCodingClient, personalToken } from 'coding-sdk';
import { DescribeIssueList } from 'coding-sdk/collaboration';

const client = createCodingClient({
  baseUrl: 'https://my-team.coding.net/open-api',
  credentials: personalToken('your-token'),
});

// 独立函数调用：Action(client, params)
const result = await DescribeIssueList(client, {
  ProjectName: 'my-project',
  IssueType: 'REQUIREMENT',
});
```

## 配置选项

```ts
import { createCodingClient, personalToken } from 'coding-sdk';

const client = createCodingClient({
  // 必填：团队 API 地址
  baseUrl: 'https://my-team.coding.net/open-api',

  // 必填：认证凭据（三选一）
  credentials: personalToken('your-token'),

  // 可选：请求超时毫秒数（默认 15000）
  timeoutMs: 30_000,

  // 可选：额外的全局请求头
  defaultHeaders: {
    'X-Custom-Header': 'value',
  },
});
```

## OAuth 授权流程

SDK 提供完整的 OAuth 2.0 授权流程辅助工具，适用于第三方应用集成场景。

### 1. 构建授权 URL，引导用户授权

```ts
import { buildAuthorizeUrl } from 'coding-sdk';

const authorizeUrl = buildAuthorizeUrl({
  team: 'my-team',
  clientId: '你的应用 Client ID',
  redirectUri: 'https://your-app.com/callback',
  scope: 'user:profile:ro,project:profile:rw',
  state: 'optional-state-value', // 可选，回调时原封不动传回
});

// 将用户重定向至此 URL
// → https://my-team.coding.net/oauth_authorize.html?client_id=...&redirect_uri=...&response_type=code&scope=...
```

### 2. 用户授权后，用授权码交换 access_token

用户在 CODING 授权页面确认后，浏览器会带着 `code` 参数跳转至回调地址。

```ts
import { exchangeAccessToken } from 'coding-sdk';

const result = await exchangeAccessToken({
  team: 'my-team',
  clientId: '你的应用 Client ID',
  clientSecret: '你的应用 Client Secret',
  code: '从回调 URL 中获取的授权码',
});

if (result.ok) {
  const { accessToken, refreshToken, expiresIn, scope } = result.value;
  console.log('access_token:', accessToken);
  console.log('有效期（秒）:', expiresIn);
  // 使用 accessToken 创建客户端
} else {
  console.error('交换失败:', result.error);
}
```

### 3. 刷新 access_token

access_token 过期后可用 refresh_token 刷新。注意：刷新后原 access_token 立即失效。

```ts
import { refreshAccessToken } from 'coding-sdk';

const result = await refreshAccessToken({
  team: 'my-team',
  clientId: '你的应用 Client ID',
  clientSecret: '你的应用 Client Secret',
  refreshToken: '之前获取的 refresh_token',
});

if (result.ok) {
  const { accessToken, refreshToken: newRefreshToken } = result.value;
  // 保存新的 accessToken 和 refreshToken
}
```

### 4. 完整流程：从授权到调用 API

```ts
import {
  buildAuthorizeUrl,
  exchangeAccessToken,
  createCodingClient,
  oauth,
} from 'coding-sdk';
import { DescribeCodingCurrentUser } from 'coding-sdk/team';

// 步骤 1：生成授权 URL，引导用户跳转
const url = buildAuthorizeUrl({
  team: 'my-team',
  clientId: 'your-client-id',
  redirectUri: 'https://your-app.com/callback',
  scope: 'user:profile:ro',
});

// 步骤 2：用户授权后，在回调中拿到 code，交换 token
const tokenResult = await exchangeAccessToken({
  team: 'my-team',
  clientId: 'your-client-id',
  clientSecret: 'your-client-secret',
  code: 'callback-code',
});

if (!tokenResult.ok) {
  throw new Error(`OAuth 失败: ${tokenResult.error.message}`);
}

// 步骤 3：用 access_token 创建客户端，调用 API
const client = createCodingClient({
  baseUrl: 'https://my-team.coding.net/open-api',
  credentials: oauth(tokenResult.value.accessToken),
});

const user = await DescribeCodingCurrentUser(client, {});
```

## 可用资源

SDK 提供冻结的 17 个资源模块，共 428 个 Action，按功能分组：

| 模块                      | 说明           | Action 数 |
| ------------------------- | -------------- | --------- |
| `artifact`                | 制品管理       | 19        |
| `collaboration`           | 协作（事项等） | 66        |
| `continuous-deployment`   | 持续部署       | 33        |
| `continuous-integration`  | 持续集成       | 24        |
| `export-job`              | 导出任务       | 3         |
| `file-storage`            | 文件存储       | 3         |
| `git-repository`          | Git 仓库       | 152       |
| `misc`                    | 杂项           | 1         |
| `organization-and-member` | 组织与成员     | 16        |
| `permission`              | 权限           | 25        |
| `program`                 | 项目集         | 6         |
| `project`                 | 项目           | 25        |
| `related-resource`        | 关联资源       | 2         |
| `service-hook`            | 服务钩子       | 10        |
| `team`                    | 团队           | 2         |
| `testing`                 | 测试管理       | 29        |
| `wiki`                    | 知识管理       | 12        |

导入示例：

```ts
import { DescribeTeam } from 'coding-sdk/team';
import { DescribeProject } from 'coding-sdk/project';
import { DescribeGitRepository } from 'coding-sdk/git-repository';
```

## 错误处理

所有 API 调用返回 `Either<SdkError, T>` 类型，不抛出可恢复异常。

```ts
import { isRight, isLeft } from 'fp-ts/Either';
// import { DescribeIssueList } from 'coding-sdk/collaboration';

// const result = await DescribeIssueList(client, { ProjectName: 'my-project' });

// 方式一：直接判断 _tag 字段
// if (result._tag === 'Right') {
//   console.log(result.right); // 成功数据
// } else {
//   console.error(result.left._tag, result.left.message);
// }

// 方式二：使用辅助函数
// if (isLeft(result)) {
//   switch (result.left._tag) {
//     case 'TransportError':  // 网络不可达、超时
//     case 'ApiError':        // CODING 返回的业务错误
//     case 'DecodeError':     // 响应解码失败
//     case 'AuthError':       // 认证错误
//   }
// }
```

### 错误类型

| 类型             | 说明                             |
| ---------------- | -------------------------------- |
| `TransportError` | 网络不可达、请求超时等传输层错误 |
| `ApiError`       | CODING API 返回的业务错误        |
| `DecodeError`    | 响应 JSON 解析或 schema 校验失败 |
| `AuthError`      | 认证相关错误                     |

## 凭据工厂函数

提供三个工厂函数，简化凭据创建：

```ts
import { personalToken, oauth, projectToken } from 'coding-sdk';

// 个人访问令牌 → Authorization: Bearer <token>
const cred1 = personalToken('your-personal-token');

// OAuth → Authorization: Bearer <accessToken>
const cred2 = oauth('your-access-token');

// 项目令牌 → Authorization: Basic <base64(username:password)>
const cred3 = projectToken('token-username', 'token-password');
```

## 冻结快照

CODING 项目已经结项，本包的 17 个模块、428 个 Action 是最终快照。不再维护
OpenAPI 文档同步、Redocly 校验或代码生成流程。

默认入口只导出轻量 client/core。业务代码应使用模块子路径；性能敏感的工具可使用
`coding-sdk/actions/<module>/<Action>` 单 Action 入口。

```bash

npm run build               # 核心类型检查
npm run typecheck:snapshot  # 仅在修改冻结资源时执行
```

## 技术栈

- **运行时**：node@26（ESM，`"type": "module"`）
- **包管理器**：npm
- **语言**：TypeScript（strict 模式）
- **测试**：vitest
- **运行时依赖**：[zod](https://zod.dev/) v4、fp-ts
- **HTTP**：原生 `fetch`，无第三方 HTTP 客户端
- **编程范式**：函数式编程，错误通过 `Either<SdkError, T>` 建模
