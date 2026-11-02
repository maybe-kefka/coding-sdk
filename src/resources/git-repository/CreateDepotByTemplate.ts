import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { DepotInfoSchema } from './schemas';

// --------------- Schema ---------------

/** 根据模板创建仓库 - 请求参数 */
export const CreateDepotByTemplateInputSchema = z.object({
  /** 仓库名 */
  DepotName: z.string().describe('仓库名'),
  /** 仓库描述 */
  Description: z.string().optional().describe('仓库描述'),
  /** 项目Id */
  ProjectId: z.number().int().describe('项目Id'),
  /** 仓库模板。目前支持：Spring, Ruby on Rails，Ruby Sinatra，Node.js，Android，Python，Hexo，Jekyll。对应模板参数分别为：SPRING,ROR,SINATRA,NODEJS,ANDROID,FLASK,CLOUD_API_HEXO,CLOUD_API_JEKYLL。如果设置了自定义模版，可以传入自定义模版的仓库Id */
  Template: z
    .string()
    .describe(
      '仓库模板。目前支持：Spring, Ruby on Rails，Ruby Sinatra，Node.js，Android，Python，Hexo，Jekyll。对应模板参数分别为：SPRING,ROR,SINATRA,NODEJS,ANDROID,FLASK,CLOUD_API_HEXO,CLOUD_API_JEKYLL。如果设置了自定义模版，可以传入自定义模版的仓库Id',
    ),
});

/** 根据模板创建仓库 - 响应数据 */
export const CreateDepotByTemplateOutputSchema = z.object({
  /** 仓库数据 */
  DepotInfo: DepotInfoSchema.describe('仓库数据'),
});

// --------------- Types ---------------

export type CreateDepotByTemplateInput = z.infer<typeof CreateDepotByTemplateInputSchema>;
export type CreateDepotByTemplateOutput = z.infer<typeof CreateDepotByTemplateOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateDepotByTemplateInput, CreateDepotByTemplateOutput> = {
  action: 'CreateDepotByTemplate',
  method: 'POST',
  inputSchema: CreateDepotByTemplateInputSchema,
  outputSchema: CreateDepotByTemplateOutputSchema,
};

// --------------- Action ---------------

/** 根据模板创建仓库 */
export const CreateDepotByTemplate = (
  client: CodingClient,
  params: CreateDepotByTemplateInput,
): Promise<Either<SdkError, CreateDepotByTemplateOutput>> =>
  executeAction(client.config, spec, params);
