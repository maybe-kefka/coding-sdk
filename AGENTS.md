# coding-sdk

## 项目概览

`coding-sdk` 是 CODING 标准 OpenAPI 的函数式 TypeScript SDK。CODING 项目已结项，本包是**冻结快照**：17 个资源模块、428 个 Action 是最终接口集合，不再维护 OpenAPI 文档同步、Redocly 校验或代码生成流程。

本包提供：

- 轻量 `CodingClient`（仅缓存配置）、三种鉴权凭据、原生 `fetch` Transport、CODING 响应信封解包与错误模型
- 428 个冻结的类型安全 Action，每个 Action 是 `Action(client, params)` 独立函数
- 供 MCP 等运行时目录消费者使用的 `executeRawAction`
- 完整的 OAuth 授权辅助流程（`buildAuthorizeUrl` / `exchangeAccessToken` / `refreshAccessToken`）
- 全链路 `Either<SdkError, T>` 函数式错误边界，不抛出可恢复异常

定开 `/delivery/api/openapi/...` 接口不属于本包范围。

## 技术栈

- **运行时**：node@26（ESM，`"type": "module"`）
- **包管理器**：npm
- **语言**：TypeScript strict 模式，`tsc --noEmit` 类型检查（无编译产物，源码直接发布）
- **运行时依赖**：fp-ts（^2.16.11，`Either` 错误边界）、zod v4（^4.4.2，Schema 驱动）
- **HTTP**：原生 `fetch` + `AbortController` 超时，无第三方 HTTP 客户端
- **测试**：vitest（^4.1.10）

注意：**不使用 bun**。本包所有脚本均为 `tsc` / `vitest` / `node` 原生命令，通过 npm 执行。旧文档中的 bun 描述已过时。

## 目录结构

```text
src/
├── index.ts            默认入口，仅 re-export client 与 core
├── client/             ClientOptions、ClientConfig、CodingClient（轻量，仅缓存配置）
├── core/
│   ├── auth/           凭据工厂（personalToken/oauth/projectToken）、buildAuthHeaders、OAuth 流程
│   ├── codec/          safeParse：Zod 校验 → Either<DecodeError, T>（含字段路径错误信息）
│   ├── envelope/       unwrapEnvelope：解包 CODING 响应信封（Response/RequestId/Error）
│   ├── error/          SdkError 判别联合与各错误构造器
│   ├── protocol/       ActionSpec、buildRequest、executeAction、executeRawAction
│   └── transport/      Transport 类型、createFetchTransport
└── resources/          冻结的 17 模块 428 个 Action + shared 共享 schema
scripts/

```

`src/resources` 下每个模块目录包含：

- 每个 Action 一个 `.ts` 文件（`DescribeIssue.ts`）
- `index.ts`（re-export 全部 Action + `./schemas`）
- `schemas.ts`（共享 schema，`<Action>InputSchema`/`<Action>OutputSchema` 与业务 Schema 定义）
- `shared/` 无 Action，仅共享 Schema

`src/client/**/*.ts`、`src/core/**/*.ts`、`src/index.ts` 由默认 `tsconfig.json` 检查；`src/resources/**/*.ts` 由 `tsconfig.snapshot.json` 单独检查。

## 常用命令

```bash
# 默认类型检查（client + core + index，不含 resources 冻结快照）

npm run build

# 运行测试（vitest）
npm test

# 全量快照类型检查（仅修改冻结资源时运行，较重）
npm run typecheck:snapshot

```

## 公共入口

默认入口保持轻量，只导出 client 与 core：

```ts
import { createCodingClient, personalToken } from 'coding-sdk';
```

不要将资源 re-export 到默认入口，否则任何客户端或错误类型导入都会加载完整 Zod 类型图。

稳定子路径（由 package.json `exports` 定义）：

- `coding-sdk/client`
- `coding-sdk/core`
- `coding-sdk/errors`
- `coding-sdk/transport`
- `coding-sdk/<resource-module>`（17 个模块子路径）
- `coding-sdk/actions/<module>/<Action>`（单 Action 入口，性能敏感场景优先）
- `coding-sdk/schemas/<module>`（共享资源 Schema）
- `coding-sdk/all`（显式全量入口，仅用于确实需要动态枚举全部导出的工具）

## 架构与核心设计

### 调用链

类型安全 Action：

```text
Action(client, params)
  -> executeAction(client.config, spec, params)
  -> 输入 Zod 校验（inputSchema）
  -> executeRawAction
  -> buildRequest（Action 放在 query：POST {baseUrl}?Action=<action>）
  -> Transport（原生 fetch + AbortController 超时）
  -> JSON 解析
  -> unwrapEnvelope（检查 Response.Error / RequestId）
  -> 输出 Zod 校验（outputSchema）
  -> Either<SdkError, Output>
```

`ActionSpec<Input, Output>` 是接口规格（`action`、`method: 'POST'`、`inputSchema`、`outputSchema`），每个 Action 文件底部构造一份 spec 并 `executeAction`。

### executeRawAction

```ts
const executeRawAction = (
  config: ClientConfig,
  action: string,          // Action 名称运行时确定
  input: unknown,
  transport?: Transport,   // 可选，测试时注入 mock
): Promise<Either<SdkError, unknown>>
```

用于 MCP generic call 等场景。它仍处理传输、JSON 解析和 CODING 信封错误映射，但**不加载 428 个资源的 Zod 类型图**，返回 `unknown`。外部数据通过 Zod、类型守卫或判别联合收窄，不使用 TypeScript 类型断言（`as const` 除外）。

### 冻结资源约定

- `src/resources` 视为 vendor snapshot，默认不参与核心 `build`（需 `typecheck:snapshot` 单独检查）。
- 不批量重写、不重新生成、不根据外部文档同步。
- 业务修复尽量局限在 client/core 或明确的单个 Action。
- 确需修改冻结 Action 时，使用现有 Zod v4 结构，并运行 `npm run typecheck:snapshot`。

### 错误模型

`SdkError` 为判别联合（`_tag` 区分）：

- `TransportError` —— 网络不可达、超时等传输层错误
- `ApiError` —— CODING API 返回的业务错误（`Error.Code` / `Error.Message` / `RequestId` / `action`）
- `DecodeError` —— JSON 解析失败或 schema 校验失败（含字段路径 `issues`）
- `AuthError` —— 认证相关错误

所有预期失败返回 `Either<SdkError, T>`（fp-ts），配合构造器 `transportError` / `apiError` / `decodeError` / `authError` 使用。

### 鉴权

`CredentialsSchema` 为 Zod discriminated union（`type` 字段）：

- `personalToken(token)` → `Authorization: Bearer <token>`
- `oauth(accessToken)` → `Authorization: Bearer <accessToken>`
- `projectToken(username, password)` → `Authorization: Basic <base64(username:password)>`

OAuth 辅助（`buildAuthorizeUrl` / `exchangeAccessToken` / `refreshAccessToken`）直接使用原生 `fetch`，不经 Transport，snake_case → camelCase 由 Zod `.transform()` 完成。

## 开发约定与注意事项

- 运行测试使用 `npm test`（vitest），修改 core 后同步检查测试。
- 默认入口仍只导出 client/core；动态调用使用 `executeRawAction`，不要导入全量资源。
- 业务调用优先使用单 Action（`coding-sdk/actions/<module>/<Action>`）或模块子路径。
- 修改 core 后同步检查核心类型与测试。
- 修改冻结资源时才运行 `npm run typecheck:snapshot`。
- `btoa`（Basic 认证）、`fetch`、`URLSearchParams` 依赖 Node.js 26 全局能力，不额外引入 polyfill。
- 模块 Action 数为实际文件数：共 428 个（collaboration 66、git-repository 152 等），README 表中部分模块计数可能过时，以目录文件为准。
