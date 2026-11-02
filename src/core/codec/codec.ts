import type { ZodIssue, ZodType } from 'zod/v4';
import type { Either } from 'fp-ts/Either';
import { right, left } from 'fp-ts/Either';
import { decodeError, type DecodeError } from '../error';

const normalizeDecodeIssuePath = (
  path: ReadonlyArray<PropertyKey>,
): ReadonlyArray<string | number> =>
  path.map((segment) => {
    if (typeof segment === 'number' || typeof segment === 'string') {
      return segment;
    }

    return String(segment);
  });

const formatDecodeIssuePath = (path: ReadonlyArray<string | number>) => {
  if (path.length === 0) {
    return '根节点';
  }

  return path.reduce<string>((accumulator, segment) => {
    if (typeof segment === 'number') {
      return `${accumulator}[${segment}]`;
    }

    return accumulator.length === 0 ? segment : `${accumulator}.${segment}`;
  }, '');
};

const toDecodeIssue = (issue: ZodIssue) => {
  const path = normalizeDecodeIssuePath(issue.path);

  return {
    path,
    pathText: formatDecodeIssuePath(path),
    code: issue.code,
    message: issue.message,
  };
};

const buildDecodeErrorMessage = (issues: ReadonlyArray<ReturnType<typeof toDecodeIssue>>) =>
  issues.map((issue) => `字段 ${issue.pathText}：${issue.message}`).join('; ');

/**
 * 安全解码，不抛出异常
 * @description
 * 使用 zod schema 对值进行校验和解码。
 * 校验失败时返回 DecodeError 而非抛出异常。
 */
const safeParse = <T>(
  schema: ZodType<T>,
  value: unknown,
  context?: { readonly action?: string },
): Either<DecodeError, T> => {
  const result = schema.safeParse(value);
  if (result.success) {
    return right(result.data);
  }
  const issues = result.error.issues.map(toDecodeIssue);
  return left(
    decodeError(`响应解码失败：${buildDecodeErrorMessage(issues)}`, value, context?.action, issues),
  );
};

export { safeParse };
