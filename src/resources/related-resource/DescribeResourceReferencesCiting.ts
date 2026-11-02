import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ResourceReferenceResourceInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 引用资源列表查询 - 请求参数 */
export const DescribeResourceReferencesCitingInputSchema = z.object({
  /** 所属主体类型： 1项目、2团队 */
  ScopeType: z.number().int().describe('所属主体类型： 1项目、2团队'),
  /** 资源 ID */
  ResourceCode: z.string().describe('资源 ID'),
  /** 所属主体 ID */
  ScopeId: z.number().int().describe('所属主体 ID'),
});

/** 引用资源列表查询 - 响应数据 */
export const DescribeResourceReferencesCitingOutputSchema = z.object({
  /** 资源引用列表 */
  Resource: z.array(ResourceReferenceResourceInfoSchema).describe('资源引用列表'),
});

// --------------- Types ---------------

export type DescribeResourceReferencesCitingInput = z.infer<
  typeof DescribeResourceReferencesCitingInputSchema
>;
export type DescribeResourceReferencesCitingOutput = z.infer<
  typeof DescribeResourceReferencesCitingOutputSchema
>;

// --------------- Spec ---------------

const spec: ActionSpec<
  DescribeResourceReferencesCitingInput,
  DescribeResourceReferencesCitingOutput
> = {
  action: 'DescribeResourceReferencesCiting',
  method: 'POST',
  inputSchema: DescribeResourceReferencesCitingInputSchema,
  outputSchema: DescribeResourceReferencesCitingOutputSchema,
};

// --------------- Action ---------------

/** 引用资源列表查询 */
export const DescribeResourceReferencesCiting = (
  client: CodingClient,
  params: DescribeResourceReferencesCitingInput,
): Promise<Either<SdkError, DescribeResourceReferencesCitingOutput>> =>
  executeAction(client.config, spec, params);
