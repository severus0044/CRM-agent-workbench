# 架构说明

客户经营工作台是一套自托管、多租户的 CRM。应用、数据、渠道和 Agent 执行共用一套权限与审计边界。

## 应用层

- **Next.js 16 App Router + React 19**：页面、Server Actions 和 Route Handlers 在同一个仓库。
- **Tailwind CSS 4**：设计令牌在 `app/globals.css`，组件使用统一的暖色主题变量。
- **代理层**：`proxy.ts` 负责会话刷新、路由保护和重定向。
- **多租户**：组织隔离贯穿数据库、权限判断、查询和界面导航。

## 数据与鉴权

- **Supabase Postgres**：联系人、商机、销售漏斗、任务、会话、知识库、Agent 运行和审计记录。
- **RLS**：所有租户相关表通过策略限制在组织范围内；服务端使用 `getUser()` 校验身份。
- **Supabase Auth**：邮箱登录、邀请、MFA、恢复码和密码重置。
- **Supabase Storage**：附件、导入文件和导出产物。

## Agent 执行

- **模型适配**：通过 Vercel AI SDK 接入 OpenAI、Anthropic、Google 或兼容接口；组织级凭据加密保存。
- **工具端口**：Agent 只能通过受控工具读取或修改 CRM，不直接持有数据库连接。
- **治理**：权限、预算、只读/可写模式、人工确认和运行事件都在应用内完成。
- **Worker**：`workers/agent-worker` 可独立部署消费队列；也可以设置 `AGENT_DISPATCH_CONSUMER=native` 在 Next 进程内消费。

## 可选模块

- **Redis / Upstash**：队列、限流和短时状态。
- **WhatsApp / WAHA**：会话收件箱和渠道连接；未配置时不主动外发。
- **Google Calendar、Nuvemshop、Webhook、语音**：按需接入，缺少凭据时对应入口保持不可用。

## 部署边界

- Vercel + Supabase 适合先跑通完整应用。
- 自有服务器可以使用 `pnpm build` + `pnpm start`，并按需运行 worker。
- Dockerfile 和 compose 文件保留在仓库中，供需要容器化部署的团队使用。
