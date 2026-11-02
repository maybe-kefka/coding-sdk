import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ResourceReferenceResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 被引用资源列表查询 - 请求参数 */
export const DescribeResourceReferencesCitedInputSchema = z.object({
  /** 所属主体类型： 1项目、2团队 */
  ScopeType: z.number().int().describe('所属主体类型： 1项目、2团队'),
  /** 资源 ID */
  ResourceCode: z.string().describe('资源 ID'),
  /** 所属主体 ID */
  ScopeId: z.number().int().describe('所属主体 ID'),
});

/** 被引用资源列表查询 - 响应数据 */
export const DescribeResourceReferencesCitedOutputSchema = z.object({
  /** 资源列表 */
  Resource: z.array(ResourceReferenceResourceInfoSchema).describe('资源列表'),
});

// --------------- Types ---------------

export type DescribeResourceReferencesCitedInput = z.infer<
  typeof DescribeResourceReferencesCitedInputSchema
>;
export type DescribeResourceReferencesCitedOutput = z.infer<
  typeof DescribeResourceReferencesCitedOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeResourceReferencesCitedInput,
  DescribeResourceReferencesCitedOutput
> = {
  action: 'DescribeResourceReferencesCited',
  method: 'POST',
  inputSchema: DescribeResourceReferencesCitedInputSchema,
  outputSchema: DescribeResourceReferencesCitedOutputSchema,
};

// --------------- Action ---------------

/** 被引用资源列表查询 */
export const DescribeResourceReferencesCited = (
  client: CodingClient,
  params: DescribeResourceReferencesCitedInput,
): Promise<Either<SdkError, DescribeResourceReferencesCitedOutput>> =>
  executeAction(client.config, spec, params);
