import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import {
  CodingCIJobCachePathSchema,
  CodingCIJobEnvSchema,
  CodingCIJobScheduleSchema,
} from './schemas';

// --------------- Schema ---------------

/** 构建计划修改 - 请求参数 */
export const ModifyCodingCIJobInputSchema = z.object({
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
  /** 仓库类型 CODING,TGIT,GITHUB,GITLAB,GITLAB_PRIVATE,GITEE,NONE */
  DepotType: z.string().describe('仓库类型 CODING,TGIT,GITHUB,GITLAB,GITLAB_PRIVATE,GITEE,NONE'),
  /** 环境变量配置 */
  EnvList: z.array(CodingCIJobEnvSchema).optional().describe('环境变量配置'),
  /** 执行方式 CVM | STATIC */
  ExecuteIn: z.string().describe('执行方式 CVM | STATIC'),
  /** 自定义构建节点池 ID，ExecuteIn 为 AGENT 必填 */
  ExecutedAgentPoolId: z
    .number()
    .int()
    .optional()
    .describe('自定义构建节点池 ID，ExecuteIn 为 AGENT 必填'),
  /** 代码更新触发匹配规则 */
  HookType: z.string().describe('代码更新触发匹配规则'),
  /** 构建计划 ID */
  Id: z.number().int().describe('构建计划 ID'),
  /** STATIC，SCM 从代码库读取 */
  JenkinsFileFromType: z.string().describe('STATIC，SCM 从代码库读取'),
  /** JenkinsFileFromType 为 SCM 必填 */
  JenkinsFilePath: z.string().optional().describe('JenkinsFileFromType 为 SCM 必填'),
  /** JenkinsFileFromType 为 STATIC 必填 */
  JenkinsFileStaticContent: z.string().optional().describe('JenkinsFileFromType 为 STATIC 必填'),
  /** 构建计划来源 TKE TCB */
  JobFromType: z.string().describe('构建计划来源 TKE TCB'),
  /** 构建计划名称 */
  Name: z.string().optional().describe('构建计划名称'),
  /** 项目 ID */
  ProjectId: z.number().int().describe('项目 ID'),
  /** 针对 CRON triggerMethod 的 schedule 规则配置, 暂只用于添加 */
  ScheduleList: z
    .array(CodingCIJobScheduleSchema)
    .optional()
    .describe('针对 CRON triggerMethod 的 schedule 规则配置, 暂只用于添加'),
  /** REF_CHANGE 代码更新触发     CRON = 1 定时触发     MR_CHANGE  MR变动触发 TKE 对接他们传空数组老是有问题，遂改成非必填 */
  TriggerMethodList: z
    .array(z.string())
    .optional()
    .describe(
      'REF_CHANGE 代码更新触发     CRON = 1 定时触发     MR_CHANGE  MR变动触发 TKE 对接他们传空数组老是有问题，遂改成非必填',
    ),
  /** 构建结果通知触发者机制 ALWAYS -总是通知; BUILD_FAIL -仅构建失败时通知; */
  TriggerRemind: z
    .string()
    .describe('构建结果通知触发者机制 ALWAYS -总是通知; BUILD_FAIL -仅构建失败时通知;'),
});

/** 构建计划修改 - 响应数据 */
export const ModifyCodingCIJobOutputSchema = z.object({});

// --------------- Types ---------------

export type ModifyCodingCIJobInput = z.infer<typeof ModifyCodingCIJobInputSchema>;
export type ModifyCodingCIJobOutput = z.infer<typeof ModifyCodingCIJobOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<ModifyCodingCIJobInput, ModifyCodingCIJobOutput> = {
  action: 'ModifyCodingCIJob',
  method: 'POST',
  inputSchema: ModifyCodingCIJobInputSchema,
  outputSchema: ModifyCodingCIJobOutputSchema,
};

// --------------- Action ---------------

/** 构建计划修改 */
export const ModifyCodingCIJob = (
  client: CodingClient,
  params: ModifyCodingCIJobInput,
): Promise<Either<SdkError, ModifyCodingCIJobOutput>> => executeAction(client.config, spec, params);
