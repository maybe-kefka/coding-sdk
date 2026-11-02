import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  CIJobEnvSchema,
  CodingCIJobCachePathSchema,
  CodingCIJobScheduleSchema,
  CreateCodingCIJobDataSchema,
} from './schemas';

// --------------- Schema ---------------

/** 构建计划创建 - 请求参数 */
export const CreateCodingCIJobInputSchema = z.object({
  /** 不管构建成功还是失败总是通知的用户 */
  AlwaysUserIdList: z
    .array(z.number().int())
    .optional()
    .describe('不管构建成功还是失败总是通知的用户'),
  /** 自动取消相同 MR */
  AutoCancelSameMergeRequest: z.boolean().describe('自动取消相同 MR'),
  /** 自动取消相同版本 */
  AutoCancelSameRevision: z.boolean().describe('自动取消相同版本'),
  /** hookType 为 CUSTOME 时须指定 */
  BranchRegex: z.string().optional().describe('hookType 为 CUSTOME 时须指定'),
  /** hookType 为 DEFAULT 时须指定 */
  BranchSelector: z.string().optional().describe('hookType 为 DEFAULT 时须指定'),
  /** 仅构建失败时要通知的用户 */
  BuildFailUserIdList: z.array(z.number().int()).optional().describe('仅构建失败时要通知的用户'),
  /** 任务缓存目录配置 */
  CachePathList: z.array(CodingCIJobCachePathSchema).optional().describe('任务缓存目录配置'),
  /** 仓库 ID */
  DepotId: z.number().int().describe('仓库 ID'),
  /** 仓库类型 CODING_OTHER_PROJ,CODING,TGIT,GITHUB,GITLAB,GITLAB_PRIVATE,GITEE,COMMON_GIT_REPO,NONE */
  DepotType: z
    .string()
    .describe(
      '仓库类型 CODING_OTHER_PROJ,CODING,TGIT,GITHUB,GITLAB,GITLAB_PRIVATE,GITEE,COMMON_GIT_REPO,NONE',
    ),
  /** 环境变量配置 */
  EnvList: z.array(CIJobEnvSchema).optional().describe('环境变量配置'),
  /** 执行方式 CVM | STATIC | AGENT */
  ExecuteIn: z.string().describe('执行方式 CVM | STATIC | AGENT'),
  /** 自定义构建节点池 ID，ExecuteIn 为 AGENT 必填 */
  ExecutedAgentPoolId: z
    .number()
    .int()
    .optional()
    .describe('自定义构建节点池 ID，ExecuteIn 为 AGENT 必填'),
  /** 代码更新触发匹配规则 DEFAULT,TAG,BRANCH,CUSTOM */
  HookType: z.string().describe('代码更新触发匹配规则 DEFAULT,TAG,BRANCH,CUSTOM'),
  /** STATIC，SCM 从代码库读取 */
  JenkinsFileFromType: z.string().describe('STATIC，SCM 从代码库读取'),
  /** JenkinsFileFromType 为 SCM 必填 */
  JenkinsFilePath: z.string().optional().describe('JenkinsFileFromType 为 SCM 必填'),
  /** JenkinsFileFromType 为 STATIC 必填 */
  JenkinsFileStaticContent: z.string().optional().describe('JenkinsFileFromType 为 STATIC 必填'),
  /** 构建计划来源 TKE TCB */
  JobFromType: z.string().describe('构建计划来源 TKE TCB'),
  /** 构建计划名称 */
  Name: z.string().describe('构建计划名称'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 针对 CRON triggerMethod 的 schedule 规则配置, 暂只用于添加 */
  ScheduleList: z
    .array(CodingCIJobScheduleSchema)
    .optional()
    .describe('针对 CRON triggerMethod 的 schedule 规则配置, 暂只用于添加'),
  /** REF_CHANGE 代码更新触发     CRON = 1 定时触发     MR_CHANGE  MR变动触发 */
  TriggerMethodList: z
    .array(z.string())
    .optional()
    .describe('REF_CHANGE 代码更新触发     CRON = 1 定时触发     MR_CHANGE  MR变动触发'),
  /** 构建结果通知触发者机制 ALWAYS -总是通知; BUILD_FAIL -仅构建失败时通知; */
  TriggerRemind: z
    .string()
    .optional()
    .describe('构建结果通知触发者机制 ALWAYS -总是通知; BUILD_FAIL -仅构建失败时通知;'),
});

/** 构建计划创建 - 响应数据 */
export const CreateCodingCIJobOutputSchema = z.object({
  /** 创建构建计划返回结构 */
  Data: CreateCodingCIJobDataSchema.describe('创建构建计划返回结构'),
});

// --------------- Types ---------------

export type CreateCodingCIJobInput = z.infer<typeof CreateCodingCIJobInputSchema>;
export type CreateCodingCIJobOutput = z.infer<typeof CreateCodingCIJobOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateCodingCIJobInput, CreateCodingCIJobOutput> = {
  action: 'CreateCodingCIJob',
  method: 'POST',
  inputSchema: CreateCodingCIJobInputSchema,
  outputSchema: CreateCodingCIJobOutputSchema,
};

// --------------- Action ---------------

/** 创建构建计划 */
export const CreateCodingCIJob = (
  client: CodingClient,
  params: CreateCodingCIJobInput,
): Promise<Either<SdkError, CreateCodingCIJobOutput>> => executeAction(client.config, spec, params);
