import { z } from 'zod/v4';

// --------------- AgentMachine ---------------

/** AgentMachine 结构 */
export const AgentMachineSchema = z
  .object({
    /** 堡垒机 id */
    Id: z.number().int().describe('堡垒机 id'),
    /** 堡垒机名称 */
    Name: z.string().describe('堡垒机名称'),
    /** 堡垒机状态 */
    Status: z.string().describe('堡垒机状态'),
  })
  .describe('AgentMachine 结构');

export type AgentMachine = z.infer<typeof AgentMachineSchema>;

// --------------- AgentMachineSecret ---------------

/** 堡垒机安装 Secret */
export const AgentMachineSecretSchema = z
  .object({
    /** Secret 值 */
    Secret: z.string().nullable().describe('Secret 值'),
  })
  .describe('堡垒机安装 Secret');

export type AgentMachineSecret = z.infer<typeof AgentMachineSecretSchema>;

// --------------- CdApplication ---------------

/** CdApplication 结构 */
export const CdApplicationSchema = z
  .object({
    /** 应用名称 */
    Name: z.string().describe('应用名称'),
  })
  .describe('CdApplication 结构');

export type CdApplication = z.infer<typeof CdApplicationSchema>;

// --------------- CdDeployCount ---------------

/** CdDeployCount 结构 */
export const CdDeployCountSchema = z
  .object({
    /** 成功发布次数 */
    SucceedCount: z.number().int().describe('成功发布次数'),
    /** 发布总次数 */
    TotalCount: z.number().int().describe('发布总次数'),
  })
  .describe('CdDeployCount 结构');

export type CdDeployCount = z.infer<typeof CdDeployCountSchema>;

// --------------- CdDeployCountDetail ---------------

/** CdDeployCountDetail 结构 */
export const CdDeployCountDetailSchema = z
  .object({
    /** 应用名称 */
    Application: z.string().describe('应用名称'),
    /** 应用发布次数统计 */
    CdDeployCount: CdDeployCountSchema.describe('应用发布次数统计'),
  })
  .describe('CdDeployCountDetail 结构');

export type CdDeployCountDetail = z.infer<typeof CdDeployCountDetailSchema>;

// --------------- CdDeployOpenApiHostServerInstance ---------------

/** 主机组部署详情 */
export const CdDeployOpenApiHostServerInstanceSchema = z
  .object({
    /** 部署状态 succeed:成功 failed:失败 running:运行中 */
    Status: z.string().describe('部署状态 succeed:成功 failed:失败 running:运行中'),
    /** 主机IP */
    HumanReadableName: z.string().describe('主机IP'),
    /** 部署账号 */
    Account: z.string().describe('部署账号'),
    /** 部署时间 */
    DeployedTime: z.number().int().describe('部署时间'),
    /** 主机组名称 */
    Zone: z.string().describe('主机组名称'),
    /** 云主机类型 主机组部署默认为 hostserver */
    CloudProvider: z.string().describe('云主机类型 主机组部署默认为 hostserver'),
    /** 主机IP */
    Ip: z.string().describe('主机IP'),
    /** 主机组名称 */
    Region: z.string().describe('主机组名称'),
    /** 云主机类型 主机组部署默认为 hostserver */
    ProviderType: z.string().describe('云主机类型 主机组部署默认为 hostserver'),
    /** 该主机部署主键 */
    Name: z.string().describe('该主机部署主键'),
  })
  .describe('主机组部署详情');

export type CdDeployOpenApiHostServerInstance = z.infer<
  typeof CdDeployOpenApiHostServerInstanceSchema
>;

// --------------- CdDeployTime ---------------

/** CdDeployTime 结构 */
export const CdDeployTimeSchema = z
  .object({
    /** 发布时长（单位秒） */
    DeployTime: z.number().int().describe('发布时长（单位秒）'),
    /** 发布总次数 */
    TotalCount: z.number().int().describe('发布总次数'),
  })
  .describe('CdDeployTime 结构');

export type CdDeployTime = z.infer<typeof CdDeployTimeSchema>;

// --------------- CdDeployTimeDetail ---------------

/** CdDeployTimeDetail 结构 */
export const CdDeployTimeDetailSchema = z
  .object({
    /** 应用名称 */
    Application: z.string().describe('应用名称'),
    /** 应用发布时长统计 */
    CdDeployTime: CdDeployTimeSchema.describe('应用发布时长统计'),
  })
  .describe('CdDeployTimeDetail 结构');

export type CdDeployTimeDetail = z.infer<typeof CdDeployTimeDetailSchema>;

// --------------- CdDeployTrend ---------------

/** CdDeployTrend 结构 */
export const CdDeployTrendSchema = z
  .object({
    /** 发布日期 */
    Date: z.string().describe('发布日期'),
    /** 成功发布次数 */
    SucceedCount: z.number().int().describe('成功发布次数'),
    /** 发布总次数 */
    TotalCount: z.number().int().describe('发布总次数'),
  })
  .describe('CdDeployTrend 结构');

export type CdDeployTrend = z.infer<typeof CdDeployTrendSchema>;

// --------------- CdDeployTrendDetail ---------------

/** CdDeployTrendDetail 结构 */
export const CdDeployTrendDetailSchema = z
  .object({
    /** 应用名称 */
    Application: z.string().describe('应用名称'),
    /** 应用发布趋势统计 */
    CdDeployTrend: z.array(CdDeployTrendSchema).describe('应用发布趋势统计'),
    /** 成功发布次数 */
    SuccessCount: z.number().int().describe('成功发布次数'),
    /** 发布总次数 */
    TotalCount: z.number().int().describe('发布总次数'),
  })
  .describe('CdDeployTrendDetail 结构');

export type CdDeployTrendDetail = z.infer<typeof CdDeployTrendDetailSchema>;

// --------------- CdDeployTrendTotal ---------------

/** CdDeployTrendTotal 结构 */
export const CdDeployTrendTotalSchema = z
  .object({
    /** 应用发布趋势统计 */
    CdDeployTrend: z.array(CdDeployTrendSchema).describe('应用发布趋势统计'),
    /** 成功发布次数 */
    SuccessCount: z.number().int().describe('成功发布次数'),
    /** 发布总次数 */
    TotalCount: z.number().int().describe('发布总次数'),
  })
  .describe('CdDeployTrendTotal 结构');

export type CdDeployTrendTotal = z.infer<typeof CdDeployTrendTotalSchema>;

// --------------- KubeConfigForm ---------------

/** KubeConfigForm 结构 */
export const KubeConfigFormSchema = z
  .object({
    /** 指定访问集群 KubeConfig 文件的上下文 */
    ClusterContext: z.string().describe('指定访问集群 KubeConfig 文件的上下文'),
    /** 是否接受非认证证书（是：true；否：false） */
    InsecureSkipTLSVerify: z.boolean().describe('是否接受非认证证书（是：true；否：false）'),
    /** 访问集群的 KubeConfig 文件（YAML 格式，Base64 编码），添加时必填，修改时可不填 */
    KubeConfig: z
      .string()
      .nullable()
      .describe('访问集群的 KubeConfig 文件（YAML 格式，Base64 编码），添加时必填，修改时可不填'),
    /** 是否允许持续部署管理集群已有资源（是：false；否：true） */
    OnlySpinnakerManaged: z
      .boolean()
      .describe('是否允许持续部署管理集群已有资源（是：false；否：true）'),
  })
  .describe('KubeConfigForm 结构');

export type KubeConfigForm = z.infer<typeof KubeConfigFormSchema>;

// --------------- ServiceAccountForm ---------------

/** ServiceAccountForm 结构 */
export const ServiceAccountFormSchema = z
  .object({
    /** 是否接受非认证证书（是：true；否：false） */
    InsecureSkipTLSVerify: z.boolean().describe('是否接受非认证证书（是：true；否：false）'),
    /** 是否允许持续部署管理集群已有资源（是：false；否：true） */
    OnlySpinnakerManaged: z
      .boolean()
      .describe('是否允许持续部署管理集群已有资源（是：false；否：true）'),
    /** ServiceAccount 关联的 Secret（YAML 格式，Base64 编码），添加时必填，修改时可不填 */
    Secret: z
      .string()
      .nullable()
      .describe('ServiceAccount 关联的 Secret（YAML 格式，Base64 编码），添加时必填，修改时可不填'),
    /** API Server URL */
    Server: z.string().describe('API Server URL'),
  })
  .describe('ServiceAccountForm 结构');

export type ServiceAccountForm = z.infer<typeof ServiceAccountFormSchema>;

// --------------- TKEConfigForm ---------------

/** TKEConfigForm 结构 */
export const TKEConfigFormSchema = z
  .object({
    /** TKE 集群 ID */
    ClusterId: z.string().describe('TKE 集群 ID'),
    /** 将为选择的每个命名空间自动生成用于访问 CODING Docker 仓库的凭据（ImagePullSecrets） */
    Namespaces: z
      .array(z.string())
      .nullable()
      .describe(
        '将为选择的每个命名空间自动生成用于访问 CODING Docker 仓库的凭据（ImagePullSecrets）',
      ),
    /** 是否允许持续部署管理集群已有资源（是：false；否：true） */
    OnlySpinnakerManaged: z
      .boolean()
      .describe('是否允许持续部署管理集群已有资源（是：false；否：true）'),
    /** TKE 地域 */
    Region: z.string().describe('TKE 地域'),
  })
  .describe('TKEConfigForm 结构');

export type TKEConfigForm = z.infer<typeof TKEConfigFormSchema>;

// --------------- TencentCloudAccountForm ---------------

/** TencentCloudAccountForm 结构 */
export const TencentCloudAccountFormSchema = z
  .object({
    /** CVM 地域 */
    Regions: z.array(z.string()).nullable().describe('CVM 地域'),
    /** 腾讯云 API 密钥 ID */
    SecretId: z.string().nullable().describe('腾讯云 API 密钥 ID'),
    /** 腾讯云 API 密钥 Key */
    SecretKey: z.string().nullable().optional().describe('腾讯云 API 密钥 Key'),
  })
  .describe('TencentCloudAccountForm 结构');

export type TencentCloudAccountForm = z.infer<typeof TencentCloudAccountFormSchema>;

// --------------- CloudAccountCredential ---------------

/** CloudAccountCredential 结构 */
export const CloudAccountCredentialSchema = z
  .object({
    /** KubeConfig 认证方式的凭据 */
    KubeConfig: KubeConfigFormSchema.nullable().describe('KubeConfig 认证方式的凭据'),
    /** KUBERNETES 类型云账号认证方式（可选值：KUBE_CONFIG、SERVICE_ACCOUNT、TKE），TENCENT 类型云账号可不填 */
    KubernetesType: z
      .string()
      .nullable()
      .describe(
        'KUBERNETES 类型云账号认证方式（可选值：KUBE_CONFIG、SERVICE_ACCOUNT、TKE），TENCENT 类型云账号可不填',
      ),
    /** ServiceAccount 认证方式的凭据 */
    ServiceAccount: ServiceAccountFormSchema.nullable().describe('ServiceAccount 认证方式的凭据'),
    /** TKE 集群的配置 */
    TKEConfig: TKEConfigFormSchema.nullable().describe('TKE 集群的配置'),
    /** 腾讯云账号的凭据 */
    TencentCloudAccount: TencentCloudAccountFormSchema.nullable().describe('腾讯云账号的凭据'),
  })
  .describe('CloudAccountCredential 结构');

export type CloudAccountCredential = z.infer<typeof CloudAccountCredentialSchema>;

// --------------- CloudAccount ---------------

/** CloudAccount 结构 */
export const CloudAccountSchema = z
  .object({
    /** 云账号类型 */
    CloudProvider: z.string().describe('云账号类型'),
    /** 云账号凭据 */
    Credential: CloudAccountCredentialSchema.describe('云账号凭据'),
    /** 云账号状态错误信息 */
    ErrorMessage: z.string().nullable().describe('云账号状态错误信息'),
    /** 云账号 ID */
    Id: z.number().int().describe('云账号 ID'),
    /** 云账号名称 */
    Name: z.string().describe('云账号名称'),
    /** 云账号状态 */
    Status: z.string().describe('云账号状态'),
  })
  .describe('CloudAccount 结构');

export type CloudAccount = z.infer<typeof CloudAccountSchema>;

// --------------- CreateCdCloudAccountResponseData ---------------

/** CreateCdCloudAccountResponseData 结构 */
export const CreateCdCloudAccountResponseDataSchema = z
  .object({
    /** 云账号信息 */
    CloudAccount: CloudAccountSchema.describe('云账号信息'),
  })
  .describe('CreateCdCloudAccountResponseData 结构');

export type CreateCdCloudAccountResponseData = z.infer<
  typeof CreateCdCloudAccountResponseDataSchema
>;

// --------------- HostServerGroup ---------------

/** HostServerGroup 结构 */
export const HostServerGroupSchema = z
  .object({
    /** 主机组云账号 */
    Account: z.string().describe('主机组云账号'),
    /** 堡垒机 */
    AgentMachine: AgentMachineSchema.describe('堡垒机'),
    /** 主机组名称 */
    DisplayName: z.string().describe('主机组名称'),
    /** 主机组 id */
    Id: z.number().int().describe('主机组 id'),
  })
  .describe('HostServerGroup 结构');

export type HostServerGroup = z.infer<typeof HostServerGroupSchema>;

// --------------- CreateCdHostServerGroupResponseData ---------------

/** CreateCdHostServerGroupResponseData 结构 */
export const CreateCdHostServerGroupResponseDataSchema = z
  .object({
    /** 主机组数据 */
    HostServerGroup: HostServerGroupSchema.describe('主机组数据'),
  })
  .describe('CreateCdHostServerGroupResponseData 结构');

export type CreateCdHostServerGroupResponseData = z.infer<
  typeof CreateCdHostServerGroupResponseDataSchema
>;

// --------------- CreateCdPipelineResponseData ---------------

/** CreateCdPipelineResponseData 结构 */
export const CreateCdPipelineResponseDataSchema = z
  .object({
    /** 任务执行记录 ID */
    TaskExecutionId: z.string().describe('任务执行记录 ID'),
    /** 任务执行记录引用 */
    TaskExecutionRef: z.string().describe('任务执行记录引用'),
  })
  .describe('CreateCdPipelineResponseData 结构');

export type CreateCdPipelineResponseData = z.infer<typeof CreateCdPipelineResponseDataSchema>;

// --------------- CreateCdTaskResponseData ---------------

/** CreateCdTaskResponseData 结构 */
export const CreateCdTaskResponseDataSchema = z
  .object({
    /** 任务执行记录 ID */
    TaskExecutionId: z.string().describe('任务执行记录 ID'),
    /** 任务执行记录引用 */
    TaskExecutionRef: z.string().describe('任务执行记录引用'),
  })
  .describe('CreateCdTaskResponseData 结构');

export type CreateCdTaskResponseData = z.infer<typeof CreateCdTaskResponseDataSchema>;

// --------------- DescribeCdAgentMachinesResponseData ---------------

/** DescribeCdAgentMachinesResponseData 结构 */
export const DescribeCdAgentMachinesResponseDataSchema = z
  .object({
    /** 堡垒机列表 */
    AgentMachines: z.array(AgentMachineSchema).describe('堡垒机列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 总共页数 */
    TotalPage: z.number().int().describe('总共页数'),
    /** 总共条数 */
    TotalRow: z.number().int().describe('总共条数'),
  })
  .describe('DescribeCdAgentMachinesResponseData 结构');

export type DescribeCdAgentMachinesResponseData = z.infer<
  typeof DescribeCdAgentMachinesResponseDataSchema
>;

// --------------- DescribeCdApplicationResponseData ---------------

/** DescribeCdApplicationResponseData 结构 */
export const DescribeCdApplicationResponseDataSchema = z
  .object({
    /** 应用 JSON 配置 */
    ApplicationJsonContent: z.string().describe('应用 JSON 配置'),
  })
  .describe('DescribeCdApplicationResponseData 结构');

export type DescribeCdApplicationResponseData = z.infer<
  typeof DescribeCdApplicationResponseDataSchema
>;

// --------------- DescribeCdApplicationsByProjectResponseData ---------------

/** DescribeCdApplicationsByProjectResponseData 结构 */
export const DescribeCdApplicationsByProjectResponseDataSchema = z
  .object({
    /** CD 应用列表 */
    Applications: z.array(CdApplicationSchema).describe('CD 应用列表'),
  })
  .describe('DescribeCdApplicationsByProjectResponseData 结构');

export type DescribeCdApplicationsByProjectResponseData = z.infer<
  typeof DescribeCdApplicationsByProjectResponseDataSchema
>;

// --------------- DescribeCdApplicationsResponseData ---------------

/** DescribeCdApplicationsResponseData 结构 */
export const DescribeCdApplicationsResponseDataSchema = z
  .object({
    /** CD 应用列表 */
    Applications: z.array(CdApplicationSchema).describe('CD 应用列表'),
  })
  .describe('DescribeCdApplicationsResponseData 结构');

export type DescribeCdApplicationsResponseData = z.infer<
  typeof DescribeCdApplicationsResponseDataSchema
>;

// --------------- DescribeCdCloudAccountsResponseData ---------------

/** DescribeCdCloudAccountsResponseData 结构 */
export const DescribeCdCloudAccountsResponseDataSchema = z
  .object({
    /** 云账号列表 */
    CloudAccounts: z.array(CloudAccountSchema).describe('云账号列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.string().describe('每页条数'),
    /** 总共页数 */
    TotalPage: z.string().describe('总共页数'),
    /** 	总共条数 */
    TotalRow: z.string().describe('	总共条数'),
  })
  .describe('DescribeCdCloudAccountsResponseData 结构');

export type DescribeCdCloudAccountsResponseData = z.infer<
  typeof DescribeCdCloudAccountsResponseDataSchema
>;

// --------------- DescribeCdDeployCountByApplicationsResponseData ---------------

/** DescribeCdDeployCountByApplicationsResponseData 结构 */
export const DescribeCdDeployCountByApplicationsResponseDataSchema = z
  .object({
    /** 各应用发布次数详情 */
    Details: z.array(CdDeployCountDetailSchema).describe('各应用发布次数详情'),
    /** 结束时间 */
    EndDate: z.string().describe('结束时间'),
    /** 开始时间 */
    StartDate: z.string().describe('开始时间'),
    /** 所有应用发布次数合计 */
    Total: CdDeployCountSchema.describe('所有应用发布次数合计'),
  })
  .describe('DescribeCdDeployCountByApplicationsResponseData 结构');

export type DescribeCdDeployCountByApplicationsResponseData = z.infer<
  typeof DescribeCdDeployCountByApplicationsResponseDataSchema
>;

// --------------- DescribeCdDeployCountByProjectResponseData ---------------

/** DescribeCdDeployCountByProjectResponseData 结构 */
export const DescribeCdDeployCountByProjectResponseDataSchema = z
  .object({
    /** 各应用发布次数详情 */
    Details: z.array(CdDeployCountDetailSchema).describe('各应用发布次数详情'),
    /** 结束时间 */
    EndDate: z.string().describe('结束时间'),
    /** 开始时间 */
    StartDate: z.string().describe('开始时间'),
    /** 所有应用发布次数合计 */
    Total: CdDeployCountSchema.describe('所有应用发布次数合计'),
  })
  .describe('DescribeCdDeployCountByProjectResponseData 结构');

export type DescribeCdDeployCountByProjectResponseData = z.infer<
  typeof DescribeCdDeployCountByProjectResponseDataSchema
>;

// --------------- DescribeCdDeployTimeByApplicationsResponseData ---------------

/** DescribeCdDeployTimeByApplicationsResponseData 结构 */
export const DescribeCdDeployTimeByApplicationsResponseDataSchema = z
  .object({
    /** 各应用发布时长详情 */
    Details: z.array(CdDeployTimeDetailSchema).describe('各应用发布时长详情'),
    /** 结束时间 */
    EndDate: z.string().describe('结束时间'),
    /** 开始时间 */
    StartDate: z.string().describe('开始时间'),
    /** 所有应用发布时长合计 */
    Total: CdDeployTimeSchema.describe('所有应用发布时长合计'),
  })
  .describe('DescribeCdDeployTimeByApplicationsResponseData 结构');

export type DescribeCdDeployTimeByApplicationsResponseData = z.infer<
  typeof DescribeCdDeployTimeByApplicationsResponseDataSchema
>;

// --------------- DescribeCdDeployTimeByProjectResponseData ---------------

/** DescribeCdDeployTimeByProjectResponseData 结构 */
export const DescribeCdDeployTimeByProjectResponseDataSchema = z
  .object({
    /** 各应用发布时长详情 */
    Details: z.array(CdDeployTimeDetailSchema).describe('各应用发布时长详情'),
    /** 结束时间 */
    EndDate: z.string().describe('结束时间'),
    /** 开始时间 */
    StartDate: z.string().describe('开始时间'),
    /** 所有应用发布时长合计 */
    Total: CdDeployTimeSchema.describe('所有应用发布时长合计'),
  })
  .describe('DescribeCdDeployTimeByProjectResponseData 结构');

export type DescribeCdDeployTimeByProjectResponseData = z.infer<
  typeof DescribeCdDeployTimeByProjectResponseDataSchema
>;

// --------------- DescribeCdDeployTrendByApplicationsResponseData ---------------

/** DescribeCdDeployTrendByApplicationsResponseData 结构 */
export const DescribeCdDeployTrendByApplicationsResponseDataSchema = z
  .object({
    /** 各应用发布趋势详情 */
    Details: z.array(CdDeployTrendDetailSchema).describe('各应用发布趋势详情'),
    /** 结束时间 */
    EndDate: z.string().describe('结束时间'),
    /** 开始时间 */
    StartDate: z.string().describe('开始时间'),
    /** 所有应用发布趋势合计 */
    Total: CdDeployTrendTotalSchema.describe('所有应用发布趋势合计'),
  })
  .describe('DescribeCdDeployTrendByApplicationsResponseData 结构');

export type DescribeCdDeployTrendByApplicationsResponseData = z.infer<
  typeof DescribeCdDeployTrendByApplicationsResponseDataSchema
>;

// --------------- DescribeCdDeployTrendByProjectResponseData ---------------

/** DescribeCdDeployTrendByProjectResponseData 结构 */
export const DescribeCdDeployTrendByProjectResponseDataSchema = z
  .object({
    /** 各应用发布趋势详情 */
    Details: z.array(CdDeployTrendDetailSchema).describe('各应用发布趋势详情'),
    /** 结束时间 */
    EndDate: z.string().describe('结束时间'),
    /** 开始时间 */
    StartDate: z.string().describe('开始时间'),
    /** 所有应用发布趋势合计 */
    Total: CdDeployTrendTotalSchema.describe('所有应用发布趋势合计'),
  })
  .describe('DescribeCdDeployTrendByProjectResponseData 结构');

export type DescribeCdDeployTrendByProjectResponseData = z.infer<
  typeof DescribeCdDeployTrendByProjectResponseDataSchema
>;

// --------------- HostServerGroupLabel ---------------

/** HostServerGroupLabel 结构 */
export const HostServerGroupLabelSchema = z
  .object({
    /** 主机组标签键 */
    Key: z.string().describe('主机组标签键'),
    /** 主机组标签值 */
    Value: z.string().describe('主机组标签值'),
  })
  .describe('HostServerGroupLabel 结构');

export type HostServerGroupLabel = z.infer<typeof HostServerGroupLabelSchema>;

// --------------- HostServerGroupDetail ---------------

/** HostServerGroupDetail 结构 */
export const HostServerGroupDetailSchema = z
  .object({
    /** 主机组云账号 */
    Account: z.string().describe('主机组云账号'),
    /** 堡垒机 */
    AgentMachine: AgentMachineSchema.describe('堡垒机'),
    /** SSH 认证方式 */
    AuthMethod: z.string().describe('SSH 认证方式'),
    /** 主机组名称 */
    DisplayName: z.string().describe('主机组名称'),
    /** 主机组 id */
    Id: z.number().int().describe('主机组 id'),
    /** 实例 IP 列表 */
    Ips: z.array(z.string()).describe('实例 IP 列表'),
    /** 主机组标签 */
    Labels: z.array(HostServerGroupLabelSchema).describe('主机组标签'),
    /** SSH 端口 */
    Port: z.number().int().describe('SSH 端口'),
    /** SSH 用户名 */
    UserName: z.string().describe('SSH 用户名'),
  })
  .describe('HostServerGroupDetail 结构');

export type HostServerGroupDetail = z.infer<typeof HostServerGroupDetailSchema>;

// --------------- DescribeCdHostServerGroupResponseData ---------------

/** DescribeCdHostServerGroupResponseData 结构 */
export const DescribeCdHostServerGroupResponseDataSchema = z
  .object({
    /** 主机组详情数据 */
    HostServerGroup: HostServerGroupDetailSchema.describe('主机组详情数据'),
  })
  .describe('DescribeCdHostServerGroupResponseData 结构');

export type DescribeCdHostServerGroupResponseData = z.infer<
  typeof DescribeCdHostServerGroupResponseDataSchema
>;

// --------------- DescribeCdHostServerGroupsResponseData ---------------

/** DescribeCdHostServerGroupsResponseData 结构 */
export const DescribeCdHostServerGroupsResponseDataSchema = z
  .object({
    /** 主机组列表 */
    HostServerGroups: z.array(HostServerGroupSchema).describe('主机组列表'),
    /** 页码 */
    PageNumber: z.number().int().describe('页码'),
    /** 每页条数 */
    PageSize: z.number().int().describe('每页条数'),
    /** 总共页数 */
    TotalPage: z.number().int().describe('总共页数'),
    /** 总共条数 */
    TotalRow: z.number().int().describe('总共条数'),
  })
  .describe('DescribeCdHostServerGroupsResponseData 结构');

export type DescribeCdHostServerGroupsResponseData = z.infer<
  typeof DescribeCdHostServerGroupsResponseDataSchema
>;

// --------------- PipelineConfig ---------------

/** PipelineConfig 结构 */
export const PipelineConfigSchema = z
  .object({
    /** 部署流程 ID */
    Id: z.string().describe('部署流程 ID'),
    /** 部署流程 JSON 配置 */
    JsonContent: z.string().describe('部署流程 JSON 配置'),
    /** 部署流程名称 */
    Name: z.string().describe('部署流程名称'),
  })
  .describe('PipelineConfig 结构');

export type PipelineConfig = z.infer<typeof PipelineConfigSchema>;

// --------------- DescribeCdPipelineConfigResponseData ---------------

/** DescribeCdPipelineConfigResponseData 结构 */
export const DescribeCdPipelineConfigResponseDataSchema = z
  .object({
    /** 部署流程 JSON 配置 */
    PipelineConfig: PipelineConfigSchema.describe('部署流程 JSON 配置'),
  })
  .describe('DescribeCdPipelineConfigResponseData 结构');

export type DescribeCdPipelineConfigResponseData = z.infer<
  typeof DescribeCdPipelineConfigResponseDataSchema
>;

// --------------- DescribeCdPipelineConfigsResponseData ---------------

/** DescribeCdPipelineConfigsResponseData 结构 */
export const DescribeCdPipelineConfigsResponseDataSchema = z
  .object({
    /** 部署流程 JSON 配置列表 */
    PipelineConfigs: z.array(PipelineConfigSchema).describe('部署流程 JSON 配置列表'),
  })
  .describe('DescribeCdPipelineConfigsResponseData 结构');

export type DescribeCdPipelineConfigsResponseData = z.infer<
  typeof DescribeCdPipelineConfigsResponseDataSchema
>;

// --------------- DescribeCdPipelineResponseData ---------------

/** DescribeCdPipelineResponseData 结构 */
export const DescribeCdPipelineResponseDataSchema = z
  .object({
    /** 应用名 */
    Application: z.string().describe('应用名'),
    /** 部署流程 ID */
    PipelineConfigId: z.string().describe('部署流程 ID'),
    /** 部署流程执行记录 JSON */
    PipelineExecutionJsonContent: z.string().describe('部署流程执行记录 JSON'),
    /** 部署流程执行状态 */
    PipelineExecutionStatus: z.string().describe('部署流程执行状态'),
    /** 部署流程名称 */
    PipelineName: z.string().describe('部署流程名称'),
  })
  .describe('DescribeCdPipelineResponseData 结构');

export type DescribeCdPipelineResponseData = z.infer<typeof DescribeCdPipelineResponseDataSchema>;

// --------------- DescribeCdTaskResponseData ---------------

/** DescribeCdTaskResponseData 结构 */
export const DescribeCdTaskResponseDataSchema = z
  .object({
    /** 应用名 */
    Application: z.string().describe('应用名'),
    /** CD 任务执行记录 */
    TaskExecutionJsonContent: z.string().describe('CD 任务执行记录'),
    /** 任务执行状态 */
    TaskExecutionStatus: z.string().describe('任务执行状态'),
  })
  .describe('DescribeCdTaskResponseData 结构');

export type DescribeCdTaskResponseData = z.infer<typeof DescribeCdTaskResponseDataSchema>;

// --------------- ModifyCdCloudAccountResponseData ---------------

/** ModifyCdCloudAccountResponseData 结构 */
export const ModifyCdCloudAccountResponseDataSchema = z
  .object({
    /** 云账号信息 */
    CloudAccount: CloudAccountSchema.describe('云账号信息'),
  })
  .describe('ModifyCdCloudAccountResponseData 结构');

export type ModifyCdCloudAccountResponseData = z.infer<
  typeof ModifyCdCloudAccountResponseDataSchema
>;

// --------------- ModifyCdHostServerGroupResponseData ---------------

/** ModifyCdHostServerGroupResponseData 结构 */
export const ModifyCdHostServerGroupResponseDataSchema = z
  .object({
    /** 主机组数据 */
    HostServerGroup: HostServerGroupSchema.describe('主机组数据'),
  })
  .describe('ModifyCdHostServerGroupResponseData 结构');

export type ModifyCdHostServerGroupResponseData = z.infer<
  typeof ModifyCdHostServerGroupResponseDataSchema
>;

// --------------- ModifyCdPipelineResponseData ---------------

/** ModifyCdPipelineResponseData 结构 */
export const ModifyCdPipelineResponseDataSchema = z
  .object({
    /** 任务执行记录 ID */
    TaskExecutionId: z.string().describe('任务执行记录 ID'),
    /** 任务执行记录引用 */
    TaskExecutionRef: z.string().describe('任务执行记录引用'),
  })
  .describe('ModifyCdPipelineResponseData 结构');

export type ModifyCdPipelineResponseData = z.infer<typeof ModifyCdPipelineResponseDataSchema>;

// --------------- PipelineIdIndex ---------------

/** PipelineIdIndex 结构 */
export const PipelineIdIndexSchema = z
  .object({
    /** 排序索引 */
    Index: z.number().int().describe('排序索引'),
    /** 部署流程 ID */
    PipelineId: z.string().describe('部署流程 ID'),
  })
  .describe('PipelineIdIndex 结构');

export type PipelineIdIndex = z.infer<typeof PipelineIdIndexSchema>;

// --------------- ReorderCdPipelinesResponseData ---------------

/** ReorderCdPipelinesResponseData 结构 */
export const ReorderCdPipelinesResponseDataSchema = z
  .object({
    /** 任务执行记录 JSON */
    TaskExecutionJsonContent: z.string().describe('任务执行记录 JSON'),
    /** 任务执行状态 */
    TaskExecutionStatus: z.string().describe('任务执行状态'),
  })
  .describe('ReorderCdPipelinesResponseData 结构');

export type ReorderCdPipelinesResponseData = z.infer<typeof ReorderCdPipelinesResponseDataSchema>;

// --------------- TriggerCdPipelineResponseData ---------------

/** TriggerCdPipelineResponseData 结构 */
export const TriggerCdPipelineResponseDataSchema = z
  .object({
    /** 部署流程执行记录 ID */
    PipelineExecutionId: z.string().describe('部署流程执行记录 ID'),
    /** 部署流程执行记录引用 */
    PipelineExecutionRef: z.string().describe('部署流程执行记录引用'),
  })
  .describe('TriggerCdPipelineResponseData 结构');

export type TriggerCdPipelineResponseData = z.infer<typeof TriggerCdPipelineResponseDataSchema>;
