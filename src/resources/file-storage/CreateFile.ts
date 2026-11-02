import { z } from 'zod/v4';
import type { ActionSpec } from '../../core/protocol';
import type { CodingClient } from '../../client';
import type { Either } from 'fp-ts/Either';
import type { SdkError } from '../../core/error';
import { executeAction } from '../../core/protocol';
import { ApiFileFileSchema } from './schemas';

// --------------- Schema ---------------

/** 文件创建 - 请求参数 */
export const CreateFileInputSchema = z.object({
  /** 获取预签名URL接口返回的 AuthToken */
  AuthToken: z.string().describe('获取预签名URL接口返回的 AuthToken'),
  /** 获取预签名URL接口返回的 StorageKey */
  StorageKey: z.string().describe('获取预签名URL接口返回的 StorageKey'),
});

/** 文件创建 - 响应数据 */
export const CreateFileOutputSchema = z.object({
  /** 文件信息 */
  Data: ApiFileFileSchema.describe('文件信息'),
});

// --------------- Types ---------------

export type CreateFileInput = z.infer<typeof CreateFileInputSchema>;
export type CreateFileOutput = z.infer<typeof CreateFileOutputSchema>;

// --------------- Spec ---------------

const spec: ActionSpec<CreateFileInput, CreateFileOutput> = {
  action: 'CreateFile',
  method: 'POST',
  inputSchema: CreateFileInputSchema,
  outputSchema: CreateFileOutputSchema,
};

// --------------- Action ---------------

/** "    文件上传        1. 获取预签名URL          Action： 固定为 DescribePreSignUploadUrl   ProjectName: 项目名称   ContentType: 内容类型，和web端的文件上传时content-type是一样的。可以参考web端上传文件时，Http Header: Content-Type   FolderType :文件夹类型，0: 常规文件夹, 1:隐藏文件夹。 如果是用于项目协同上传附件的场景，配置为1；如果是上传到文件网盘则配置为0。   FolderId:  若上传项目协同附件场景时，不需要配置或默认为0即可。若用于上传到文件网盘，可以设置文件夹ID, 用于文件存放位置，ID值通过  open api 【创建文件夹】获取。   FileName: 保存的文件名。     POST https://e.coding.net/open-api   Accept: application/json   Authorization: token 79dfe***     {       "Action":"DescribePreSignUploadUrl",       "ProjectName":"zhishiguanli",       "FolderId":0,       "FolderType":1,       "FileName": "20220727_1.csv",       "ContentType": "image/jpeg"     }      响应数据:   UploadLink: 上传文件的URL   StorageKey: 上传到存储的文件路径   AuthToken: 用于校验身份数据的token，后续接口中使用   headers: 上传时需要的token信息          ```     {       "Response": {         "RequestId": "99b1fbfb-8477-44b3-b19f-35acbcdbdf77",         "Data": {           "UploadLink": "https://coding-net-production-file-1257242599.cos.ap-shanghai.myqcloud.com/c69883ec-4ae6-45eb-a28d-b73dcfa83d02.csv?sign=q-sign-algorithm%3Dsha1%26q-ak%3DAKID7B14xvfnJxWtNpV95c1sAqIwms4_GnHMa-eCuULWfvXWTqp0qv8czbirX1BlXEXd%26q-sign-time%3D1661352589%3B1661354389%26q-key-time%3D1661352589%3B1661354389%26q-header-list%3Dhost%26q-url-param-list%3D%26q-signature%3D337c3118dd1385d33f5ada4c0492755ac7d00419",           "StorageKey": "c69883ec-4ae6-45eb-a28d-b73dcfa83d02.csv",           "Headers": "{\"x-cos-security-token\":\"0ZVlbeAyb6cqcbI2HcZg75xppfMACLPac9f0c5517a5d13d9731b0adb708c2ecdhK1-UdtMEqc-XpsQW5v1bB1BGeHXMlwutOM24SaUfX6lSP531QDfVrKJzLl8-NpCgKZfUE_-_Pg29lfqSvWpbd0D-4pENoBL5IDhkXO1RmmDncvxbwm_aMGRMlPL3YwQEyjPGv8KJ36ZUDm1k5ERnKYf2_OllQtoW5lSeRRnvCQUd7cAvvzSIl6WD-VxXJ2N9jX5Z_bh6B9zFXtCWjr0is550-QaLSM32V0NP0wPV4bBy9PwNLA32gxhsf24dfUZZsBZZVF67lfFGWgcK7SuZRrE_QPiEd9L4et-4KxBj4pXsAxCTWmATrcAonNq6xJ-\"}",           "AuthToken": "819321faa15086676c9c474b8823d6ce67aa4ec907a4e8a37fa396f990bd610c"         }       }     }     ```                         2. 上传文件CreateFile     这个步骤需要客户端自己完成。     上传URL 可以参考 项目协同中描述内容中的上传文件的 COS URL。          2.1 COS上传   参考脚本如下:   #!/bin/bash          file=本地文件路径     storageKey=返回的StorageKey     url=https://域名/${storageKey}               # 腾讯云COS上传 curl, 注意Authorization值为sign参数，经过urldecode转化后的值。x-cos-security-token 使用 响应中的Headers中返回的值，          curl -X PUT "${url}" \     -H \'Authorization:q-sign-algorithm=sha1&q-ak=AKIDr0xilQrTFEUhvpLvJ9Ro3Ds_REhKTtYv-dXFbNBY8w1aDZR7rpUNPq6hXn_SdANN&q-sign-time=1661351394;1661353194&q-key-time=1661351394;1661353194&q-header-list=host&q-url-param-list=&q-signature=2574959eebb2ddf7dd5e6e19f30126c7a63cec58\' \     -H \'x-cos-security-token:0ZVlbeAyb6cqcbI2HcZg75xppfMACLPaba476ee7278aba618b8794dcf090c81fhK1-UdtMEqc-XpsQW5v1bHRl8XcitKZd-0CGmDfln5OqFJigfAursov8MRS8h_abNT0Bns7F7D5tN26wXra6oBlvhxZ4wU11Zk2peuDXq4eWSUWOCtvf-3IaxoCs2KEwMtSFcds1byn_00Zj2YxG8ajHQrVT6Gtry9PW3ULfNe-YPpWaX_XArXpoyjWuaXpBjIFvEhR5sB0gGSTtyXhf9S6wWJAisNlwvOls5xAdnNRHJWyt8Td_f-Lc6yYIXV-aD9ZoGyl5NEQcxEip7GQRtb-p8QD9MG_rfYsJiQ0blMGQQGzexo7YHRhRTws6dlXU\' \     -H \'user-agent:tencentcloud-cos-postman\' \     -H \'cosclientagent:cos_mc_v4\' \     -H \'cosclientip:219.136.173.47\' -T "${file}"                    2.2 minio上传     minio 上传脚本DEMO如下：     bucket=file-storage     file=\'～/Downloads/测试简单格式1.md (2).zip\'          # 测试导入1.zip          storageKey=c5318506-8807-4612-9ad8-d751c863983d.zip     s3_key=***     s3_secret=***     host=minio.nh51daup.dev.coding.io          resource="/${bucket}/${storageKey}"          # content_type="application/octet-stream"          content_type="application/zip"     date=`date -R`     _signature="PUT\n\n${content_type}\n${date}\n${resource}"     signature=`echo -en ${_signature} | openssl sha1 -hmac ${s3_secret} -binary | base64`          # minio文件上传 curl 命令          curl -X PUT -T "${file}" \   -H "Host: ${host}" \   -H "Date: ${date}" \   -H "Content-Type: ${content_type}" \   -H "Authorization: AWS ${s3_key}:${signature}" \     http://${host}${resource}          3. 保存文件   StorageKey: 获取预签名URL接口返回的 StorageKey   AuthToken: 获取预签名URL接口返回的 AuthToken          POST https://e.coding.net/open-api   Accept: application/json   Authorization: token 79dfe1d**ab          {       "Action":"CreateFile",       "StorageKey": "2bdb7eea-57b4-495d-a5d0-67446822cea5.csv",       "AuthToken": "76ee1e30ef6df0552f0bd939f1f0359510d60d1806028f5c64fa31c116cf3f22"     }         响应数据格式:   Id: 保存后的文件ID。   Name: 保存后的文件名称          ```     {       "Response": {         "RequestId": "9958d6b7-ead6-4674-9ae8-21cd3054282b",         "Data": {           "Id": 28909581,           "Name": "20220727_1.csv"         }       }     }     ```                    4. 创建事项DEMO     更详细参数说明参考open api文档   ProjectName: 项目名称     Name： 事项名称   FileIds: 数组类型，CreateFile 后响应的ID列表               POST https://e.coding.net/open-api   Accept: application/json   Authorization: token 79dfe1d9e53a2**e0ddc57ab          ```     {       "Action":"CreateIssue",       "ProjectName":"zhishiguanli",       "Type":"DEFECT",       "Name":"需求清221101",       "Priority":"0",       "FileIds":[28909581]     }     ```               4.1 项目协同需求描述图片同步方案          ## 方案一          需求系统在通过 OpenAPI 写入 CODING 需求时，通过正则方式提取所有图片，调用 CODING OpenAPI 上传图片到文件网盘，再替换需求内图片地址。     方案前提：     需求系统展示需求数据来源客户需求系统。     具体步骤：          1. 需求系统创建或更新图片时，调用 COIDNG 项目协同创建或编辑 OpenAPI     2. 获取需求系统需求描述     3. 正则提取图片地址     4. 调用 CODING OpenAPI 上传图片到文件网盘，获取到文件 ID     5. 通过文件 ID 和项目 ID 拼接成 CODING 图片相对地址，/api/project/{projectId}/files/{imageFileId}/imagePreview     6. 保存到 CODING 系统前，通过字符替换原图片地址为/api/project/{projectId}/files/{imageFileId}/imagePreview     7. 完成          ## 方案二          CODING 侧在项目协同 OpenAPI 创建或者编辑需求时，将外站图片地址转存（或者不过滤）。          ## 结论          方案一，无需依赖 CODING 更新，可直接开始。     方案二，需要依赖 CODING 更新，正在评估预计时间。          5. 创建文件夹     该接口可用于文件网盘中创建文件夹。   ProjectName: 项目名称   FoldName: 文件夹名称   ParentId: 父文件夹ID,如果是根路径，传 0。     POST https://e.coding.net/open-api   Accept: application/json   Authorization: token 79dfe1d9**a6e0ddc57ab          ```     {       "Action":"CreateFolder",       "ProjectName":"zhishiguanli",       "FoldName": "Hello-sub-test-1",       "ParentId": 0     }     ```          响应：          ```     {       "Response": {         "RequestId": "e48d9d36-7473-4fac-b005-6fdc46afa69f",         "Data": {           "Id": 28909737,           "Name": "Hello-sub-test-1"         }       }     }     ```      " */
export const CreateFile = (
  client: CodingClient,
  params: CreateFileInput,
): Promise<Either<SdkError, CreateFileOutput>> => executeAction(client.config, spec, params);
