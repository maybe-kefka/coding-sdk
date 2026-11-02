import type { ActionSpec } from './action-spec';
import type { ClientConfig } from '../../client/client-config';
import type { Either } from 'fp-ts/Either';
import { right, left, isLeft } from 'fp-ts/Either';
import type { SdkError } from '../error';
import { decodeError, transportError } from '../error';
import type { TransportRequest, Transport } from '../transport';
import { createFetchTransport } from '../transport';
import { buildAuthHeaders } from '../auth';
import { unwrapEnvelope } from '../envelope';
import { safeParse } from '../codec';

/** 构建 CODING API 请求 */
const buildRequest = (config: ClientConfig, action: string, body: unknown): TransportRequest => ({
  method: 'POST',
  // CODING API 要求 Action 放在 query 参数中
  url: `${config.baseUrl}?Action=${action}`,
  headers: {
    'Content-Type': 'application/json',
    ...buildAuthHeaders(config.credentials),
    ...config.defaultHeaders,
  },
  body: JSON.stringify(body),
  timeoutMs: config.timeoutMs,
});

/**
 * 执行 API 请求的完整协议流程
 * @description
 * 完整流程：
 * 1. 校验输入参数（inputSchema）
 * 2. 构建并发送 HTTP 请求
 * 3. 解析 JSON 响应
 * 4. 解包信封（检查 Response.Error）
 * 5. 校验/解码输出数据（outputSchema）
 *
 * 全链路不抛出异常，所有错误通过 Result 传递。
 * transport 参数可选，用于测试时注入 mock。
 */
const executeAction = async <Input, Output>(
  config: ClientConfig,
  spec: ActionSpec<Input, Output>,
  input: Input,
  transport?: Transport,
): Promise<Either<SdkError, Output>> => {
  // 1. 校验输入参数
  const inputResult = safeParse(spec.inputSchema, input, { action: spec.action });
  if (isLeft(inputResult)) return inputResult;

  const rawResult = await executeRawAction(config, spec.action, inputResult.right, transport);
  if (isLeft(rawResult)) return rawResult;

  // 2. 校验/解码输出
  return safeParse(spec.outputSchema, rawResult.right, { action: spec.action });
};

/**
 * 调用冻结目录中的标准 CODING OpenAPI Action。
 *
 * 该入口用于 action 名称在运行时确定的场景（例如 MCP generic call）。
 * 它仍负责传输、JSON 解析和 CODING 响应信封错误映射，但不会加载或执行
 * 428 个资源 Action 的 Zod 类型图。
 */
const executeRawAction = async (
  config: ClientConfig,
  action: string,
  input: unknown,
  transport?: Transport,
): Promise<Either<SdkError, unknown>> => {
  const request = buildRequest(config, action, input);
  const send = transport ?? createFetchTransport();
  const transportResult = await send(request);
  if (isLeft(transportResult)) return transportResult;

  // 解析 JSON
  const response = transportResult.right;
  let json: unknown;
  try {
    json = JSON.parse(response.bodyText);
  } catch {
    return left(decodeError('响应 JSON 解析失败', response.bodyText, action));
  }

  // 解包信封
  const envelopeResult = unwrapEnvelope(json, action);
  if (isLeft(envelopeResult)) return envelopeResult;

  return right(envelopeResult.right.data);
};

export { buildRequest, executeAction, executeRawAction };
