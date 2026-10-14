<p align="center">
  <img src="docs/brand/icon-256.png" width="88" height="88" alt="CRM-agent-workbench" />
</p>

<h1 align="center">CRM-agent-workbench</h1>

<p align="center">
  把客户、商机、会话、任务和 Agent 执行放进同一个工作区的 CRM。<br />
  Next.js + Supabase，自托管部署，数据、模型密钥和渠道凭据都由你掌握。
</p>

![今日概览](docs/screenshots/home-desktop.png)

CRM-agent-workbench 不是一个只展示报表的看板。打开工作区后，你看到的是今天该推进的商机、等待回复的会话、已经逾期的任务，以及 Agent 在上一步读到了什么、准备改什么、需要谁确认。每个动作都落回联系人、商机、会话和审计记录，不另建一套“AI 侧”的数据。

## 工作区一览

| 区域 | 主要对象 | 可以完成的事 |
| --- | --- | --- |
| 今日概览 | 会话、商机、任务、Agent 运行 | 看清今天优先处理什么，跳到对应工作区 |
| 会话收件箱 | WhatsApp 会话、联系人、商机 | 分配、回复、暂停自动回复、写内部备注、推进下一步 |
| 销售漏斗 | 漏斗、阶段、商机、联系人 | 拖动阶段、维护金额与负责人、查看风险和时间线 |
| Agent 工作台 | 内置 Agent、CRM 对象、运行记录 | 读取上下文、提出动作、人工确认、保留执行轨迹 |
| 风险雷达 | 降温商机、逾期跟进、未读会话 | 按金额和紧急度排序，直接进入处理动作 |
| 客户与团队 | 联系人、标签、任务、日程、成员 | 维护客户资料、分工、权限和跟进计划 |

## 功能体验

### 01 · 今日概览：先处理最影响本周收入的事

![今日概览](docs/screenshots/home-desktop.png)

首页按“今天要做的动作”组织，而不是按数据库表组织。顶部给出开放会话、开放商机、待办任务和 Agent 运行四个数字；下面直接列出三条优先事项，每条都带有阶段、金额、负责人和下一次跟进时间，点“查看”会进入对应的风险雷达、日程或收件箱。

- **今日优先**：按截止时间和商机阶段排序，只保留最接近承诺的三件事；每条都显示当前阶段、金额、负责人和下一步动作。
- **客户信号**：风险商机、逾期任务、未读会话各自成卡，右侧直接给出“雷达 / 任务 / 收件箱”入口，不用先猜问题在哪。
- **Agent 执行**：把“读取 CRM 上下文 → 提出业务动作 → 等待人工确认”三步摊开，当前停在哪一步一目了然。
- **漏斗温度**：新客户、已联系、方案沟通、已成交四列同时显示商机数量和金额，点击进入完整漏斗。
- **工作区脉搏**：右上角常驻在途商机、待处理任务、Agent 运行和逾期任务，打开页面先知道今天有没有失控的项目。

从首页点进任意一条记录，都会落到对应的商机、会话或任务，而不是跳到另一套独立报表。完整的处理路径是：首页 → 销售漏斗 → 会话收件箱 → Agent 工作台 → 风险雷达；一条客户线索从会话进入商机、被 Agent 读取、再由人确认下一步，全程都在同一套记录里。

### 02 · 会话收件箱：聊天、客户资料和下一步在同一个屏幕

![会话收件箱](docs/screenshots/inbox-desktop.png)

收件箱是三栏结构：左边是会话队列，中间是消息线程，右边是当前联系人和商机的 CRM 侧栏。回复客户时不需要另开联系人页面查资料，也不会在切换标签时丢掉上下文。

- **队列与筛选**：按姓名、电话或最后一条消息搜索；按 WhatsApp 号码、标签、负责人和状态筛选；支持键盘快捷键和批量操作。
- **会话归属**：把会话分配给自己或同事；转接时保留原负责人和队列位置；需要人工接管时暂停自动回复，处理完再恢复。
- **回复工具**：文本、媒体、已审核模板、快速回复和内部备注。备注只留在团队侧，不会发给客户。
- **CRM 侧栏**：当前联系人、商机阶段、金额、标签、最近活动和下一位跟进人都在右侧；可以直接改阶段、加标签、创建任务或安排下一次联系。
- **审计与交接**：分配、暂停、转接、发送和阶段变更都写入记录。会话被其他人接手时，后来的人能看到之前发生了什么。

### 03 · 销售漏斗：拖动阶段，金额和风险同步变化

![销售漏斗](docs/screenshots/kanban-desktop.png)

销售漏斗不是一张静态图。每个阶段是一列，卡片上带联系人、金额、负责人、下一次动作和风险标记；拖动卡片会更新商机阶段，列头和顶部汇总同步重算。

- **阶段管理**：新客户、已联系、方案沟通、已成交等阶段可以按团队流程配置；每列显示商机数量和金额合计。
- **卡片信息**：商机标题、联系人、金额、负责人、阶段停留时间、下一次跟进和风险原因都在卡片正面，不用点开才能判断优先级。
- **商机档案**：打开卡片可以看到联系人、会话、任务、活动时间线、字段变更和关联的 Agent 运行。
- **推进动作**：创建跟进任务、安排日程、发送方案、记录赢单或输单原因；输单原因会进入后续分析。
- **人工确认**：Agent 提出的字段修改、阶段推进或外发动作，会先出现在商机侧栏，确认后才写入。

### 04 · Agent 工作台：先读上下文，再提动作，最后等人确认

![Agent 工作台](docs/screenshots/workbench-desktop.png)

工作台把一次 Agent 运行拆成可检查的步骤，而不是只给一个聊天框。左侧选择内置 Agent 和本次要处理的 CRM 对象，中间输入任务，右侧查看它读到的上下文、准备执行的动作和最终结果。

- **选择范围**：可以指定一个联系人或商机，也可以让 Agent 在一个明确的查询范围内工作；范围之外的对象不会被读取。
- **读取上下文**：联系人资料、会话、商机、任务、知识库片段和客户记忆会带着来源进入上下文，缺什么会直接说明。
- **提出动作**：Agent 先给出计划和拟执行的工具调用；读取类工具可以自动执行，写入、外发和不可逆动作进入待确认状态。
- **人工确认**：确认面板展示字段前后值、目标对象、影响范围和关联证据。拒绝或修改都不会污染原始数据。
- **执行轨迹**：每一步工具调用、耗时、结果和错误都保留在运行记录里；可以从历史运行回到对应的商机和会话。
- **成本与权限**：组织级模型凭据、预算、只读/可写模式和工具白名单在 Agent 之外控制，不依赖提示词自律。

### 05 · 风险雷达：把“最近没动静”变成可执行的清单

![风险雷达](docs/screenshots/radar-desktop.png)

风险雷达按金额、阶段停留时间和跟进逾期时间排序，帮助团队先处理最可能丢单的商机。

- **降温商机**：长时间没有新活动、下一次跟进已过期或阶段停留异常的项目会被标出来，并给出建议动作。
- **逾期任务**：按负责人和逾期天数聚合，点进去可以直接改期、转交或完成。
- **未读会话**：等待回复时间过长的会话单独列出，避免商机在聊天窗口里冷掉。
- **金额影响**：每张风险卡都带预计金额，团队可以按“可能损失多少钱”而不是“谁最吵”排优先级。

### 06 · 移动端：在手机上完成最常用的动作

<p>
  <img src="docs/screenshots/home-mobile.png" alt="移动端今日概览" width="300" />
  <img src="docs/screenshots/workbench-mobile.png" alt="移动端 Agent 工作台" width="300" />
</p>

移动端保留今日概览、会话收件箱、任务和 Agent 工作台的核心路径。侧栏收进抽屉，卡片改为单列，表格在窄屏下切换为可横向滚动的列表；工作台输入区固定在底部，查看上下文和确认动作仍然可用。桌面端和移动端共用同一套权限、数据和审计记录。

## 客户、任务与团队

- **联系人**：姓名、电话、邮箱、公司、标签、来源、负责人、自定义字段和完整活动时间线。
- **任务与日程**：把跟进动作挂到联系人或商机上，设置负责人、截止时间和提醒；逾期任务会进入风险雷达和今日概览。
- **团队与权限**：组织隔离、管理员/成员角色、邀请成员、分配负责人和查看范围。成员只能看到自己有权访问的组织数据。
- **知识与记忆**：组织知识源、客户确认事实和可追溯引用。Agent 的回答可以回到具体材料，而不是只给结论。
- **审计**：登录、权限、商机字段、会话分配、Agent 工具调用和外发动作都有记录，方便交接和排查。
- **渠道**：WhatsApp（WAHA）会话进入统一收件箱；Webhook、Google Calendar、Nuvemshop 等模块按需启用，没有凭据时不会主动外发。

## 技术架构

| 层 | 选型 | 说明 |
| --- | --- | --- |
| 前端 | Next.js 16、React 19、TypeScript、Tailwind CSS 4 | App Router；桌面与移动端共用组件和权限判断 |
| 数据 | Supabase Postgres、Auth、Storage、RLS | 租户数据通过行级策略隔离；登录、邀请、MFA 和恢复码在 Supabase Auth 内完成 |
| 队列 | Upstash Redis | Agent 事件、限流和短时状态 |
| Agent | Vercel AI SDK、OpenAI / Anthropic / Google / 兼容接口 | 模型只是执行链的一环；工具端口、预算、审批和事件流在应用内 |
| Worker | `workers/agent-worker` 或 Next 进程内消费者 | 可独立部署，也可用 `AGENT_DISPATCH_CONSUMER=native` 简化部署 |
| 测试 | Vitest、Playwright | 单元、数据库、浏览器和关键回归 |

## 快速开始

完整应用需要 Supabase 和 Redis。下面这条路径适合本地开发和一台自己的服务器，首次跑通大约 15 分钟。

### 1. 安装依赖

需要 Node.js 22 或更新版本，以及 pnpm 9.x（仓库锁定 `pnpm@9.15.9`）。

```bash
corepack enable
corepack prepare pnpm@9.15.9 --activate
pnpm install --frozen-lockfile
```

没有 Corepack 时：

```bash
npx pnpm@9.15.9 install --frozen-lockfile
```

### 2. 配置环境变量

```bash
cp .env.example .env.local
```

Windows PowerShell：

```powershell
Copy-Item .env.example .env.local
```

至少填写下面这些值：

| 变量 | 从哪里获取 |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase → Project Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API（只放服务端） |
| `SUPABASE_DB_URL` | Supabase → Project Settings → Database → Connection string → URI |
| `UPSTASH_REDIS_REST_URL` | Upstash → Redis → REST API |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash → Redis → REST API |
| `NEXT_PUBLIC_APP_URL` | 本地 `http://localhost:3000`，线上填正式域名 |
| `AI_CRED_AES_KEY` | 32 字节 Base64 |
| `INTERNAL_SECRET` | 32 字节以上随机字符串 |
| `CPF_ENCRYPTION_KEY` | 随机字符串 |
| `WAHA_BYO_ENCRYPTION_KEY` | 随机字符串 |

生成密钥：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

`AI_CRED_AES_KEY` 使用第一条命令的输出；其余密钥使用第二条命令的输出。暂时不接 WhatsApp 时，`WAHA_API_BASE_URL`、`WAHA_API_KEY`、`WAHA_WEBHOOK_BASE_URL` 可以填占位值让进程启动，不要打开渠道连接。

### 3. 初始化数据库

```bash
pnpm db:init
```

脚本会启用 `vector`、`citext`、`pg_trgm`，然后应用 `supabase/baseline.sql`。这是新数据库的唯一初始化入口，不要用 `supabase db push` 代替。如果数据库已有 `public.organizations`，脚本会跳过，不会覆盖现有数据。

`SUPABASE_DB_URL` 建议使用 Supabase 控制台的 **Session pooler**（端口 5432）或 **Direct connection**。事务模式连接串（端口 6543，通常带 `pgbouncer=true`）在部分项目上会限制建表和扩展，不建议用于首次初始化。

### 4. 启动并完成首次配置

```bash
pnpm dev
```

打开 `http://localhost:3000`：

1. 注册第一个账号。
2. 填写组织名称，选择或创建销售漏斗。
3. 进入「Agent 与自动化 → 凭据」，绑定 OpenAI、Anthropic、Google 或兼容接口的密钥。
4. 打开「Agent 工作台」，选择一个内置 Agent 和一个 CRM 对象开始运行。

使用 Supabase 云端项目做本地开发时，把 Supabase Auth 的 Site URL 设为 `http://localhost:3000`，并允许 `http://localhost:3000/auth/confirm` 作为跳转地址。

### 5. 可选：写入一组本地样例

只有在本机 Supabase（`127.0.0.1` / `localhost`）并且 `CRM_DEMO_MODE=true` 时才允许执行：

```bash
pnpm db:seed-samples
```

脚本会创建带联系人的销售漏斗、任务和会话，拒绝连接云端生产库。

## 部署

### Vercel + Supabase

1. 在 Vercel 导入仓库。
2. 把 `.env.local` 的变量填进 Project Settings → Environment Variables。
3. Install Command 使用 `pnpm install --frozen-lockfile`，Build Command 使用 `pnpm build`。
4. 部署后把 Supabase Auth 的 Site URL 和 Redirect URLs 改成正式域名。
5. 在本地执行一次 `pnpm db:init`，连接云端数据库完成初始化。

`next.config.ts` 会自动识别 `VERCEL`，关闭 `standalone` 输出，不需要改代码。

### 自有服务器

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

需要后台执行 Agent 时，再启动一个常驻进程：

```bash
pnpm worker
```

不想维护 worker 时，可以设置 `AGENT_DISPATCH_CONSUMER=native`，让 Next 进程内的调度器消费事件；功能相同，吞吐和隔离性较弱。Cron、WhatsApp（WAHA）、语音和对象存储都是可选模块，只使用 CRM、销售漏斗、任务和 Agent 工作台时可以先不配置。

## 常用命令

| 命令 | 用途 |
| --- | --- |
| `pnpm dev` | 启动开发服务 |
| `pnpm build` / `pnpm start` | 生产构建与启动 |
| `pnpm typecheck` | TypeScript 检查 |
| `pnpm lint` | ESLint |
| `pnpm test:smoke` | 关键回归测试（品牌、首页、Agent 输出） |
| `pnpm test:unit` | 完整单元测试；部分用例需要发布证据或外部网络 |
| `pnpm worker` | Agent 执行进程 |
| `pnpm db:init` | 初始化空数据库 |
| `pnpm db:seed-samples` | 仅本地：写入一组样例数据 |

## 目录

| 目录 | 内容 |
| --- | --- |
| `app/` | 页面、路由和产品 API |
| `components/` | 工作台、侧栏、表单、看板等界面组件 |
| `lib/` | CRM 领域逻辑、权限、Agent Harness、知识检索、模型适配 |
| `workers/` | Agent 执行和后台任务 |
| `supabase/` | 基线 schema、迁移和 RLS |
| `scripts/` | 数据库初始化、种子数据和辅助脚本 |
| `tests/` | 单元、数据库和浏览器测试 |
| `docs/` | 部署、架构和界面截图 |

## 品牌与二次分发

产品名、图标、Logo 和主题都可以通过环境变量或组织设置替换：

- `APP_NAME`：安装级产品名
- `APP_LOGO_URL`：安装级 Logo
- `APP_ACCENT_HEX`：主题强调色

组织管理员还可以在「设置 → 品牌」里覆盖当前工作区的名称、Logo 和颜色，不影响其他组织。默认图标是绿底白色的几何标记；换成自己的 Logo 后，侧栏、登录页和 favicon 会一起切换。

本仓库基于 MIT 许可的 AiNativeCrm 修改，保留原始版权声明。修改范围见 [NOTICE.md](NOTICE.md)。

## 许可

[MIT](LICENSE)。Copyright (c) 2026 Rafael Melgaço。
