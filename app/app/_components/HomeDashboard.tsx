import Link from "next/link";
import {
  ArrowRight,
  ArrowSquareOut,
  CalendarBlank,
  CheckCircle,
  ClockCountdown,
  CurrencyDollar,
  Robot,
  Users,
} from "@/lib/ui/icons";
import type { HomeDashboardData } from "@/lib/home/types";

function money(cents: number) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

function dateLabel(value: string | null) {
  if (!value) return "无截止日期";
  return new Intl.DateTimeFormat("zh-CN", {
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function shortDate(value: string) {
  return new Intl.DateTimeFormat("zh-CN", { month: "numeric", day: "numeric" }).format(
    new Date(value),
  );
}

const statusLabels: Record<string, string> = {
  queued: "排队中",
  running: "运行中",
  awaiting_confirmation: "待确认",
  completed: "已完成",
  partial: "部分完成",
  failed: "失败",
  cancelled: "已取消",
};

const priorityLabels: Record<string, string> = {
  urgent: "紧急",
  high: "高优先级",
  medium: "普通",
  low: "低优先级",
};

function SectionHeading({
  title,
  detail,
  href,
  action,
}: {
  title: string;
  detail: string;
  href: string;
  action: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4">
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
      </div>
      <Link href={href} className="text-sm text-accent hover:underline">
        {action} <ArrowRight size={14} className="ml-1 inline" aria-hidden />
      </Link>
    </div>
  );
}

export function HomeDashboard({
  data,
  displayName,
  workspaceName,
}: {
  data: HomeDashboardData;
  displayName: string;
  workspaceName: string;
}) {
  const now = new Date(data.nowIso);
  const today = new Intl.DateTimeFormat("zh-CN", { dateStyle: "full" }).format(now);
  const maxStage = Math.max(1, ...data.stages.map((stage) => stage.count));
  const overdueTasks = data.tasks.filter(
    (task) =>
      task.dueDate && new Date(task.dueDate).getTime() < now.getTime() && task.status !== "done",
  );
  const priorityTasks = [...data.tasks]
    .sort((left, right) => {
      const leftDue = left.dueDate ? new Date(left.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      const rightDue = right.dueDate ? new Date(right.dueDate).getTime() : Number.MAX_SAFE_INTEGER;
      return leftDue - rightDue;
    })
    .slice(0, 3);
  const recentRuns = data.agentRuns.slice(0, 4);
  const pipelineValue = data.stages.reduce((sum, stage) => sum + stage.valueCents, 0);

  const metrics = [
    { label: "客户总数", value: data.contactCount.toLocaleString("zh-CN"), detail: "组织内有效联系人", Icon: Users },
    { label: "在途商机", value: data.activeLeadCount.toLocaleString("zh-CN"), detail: "所有销售漏斗", Icon: ArrowSquareOut },
    { label: "待处理任务", value: data.openTaskCount.toLocaleString("zh-CN"), detail: "尚未完成", Icon: CalendarBlank },
    { label: "在途金额", value: money(data.activeLeadValueCents), detail: "按开放商机汇总", Icon: CurrencyDollar },
  ];

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6 px-1 py-2 sm:px-2 lg:space-y-7">
      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.55fr)]">
        <div className="relative overflow-hidden rounded-[26px] border bg-card p-6 shadow-sm sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -bottom-24 h-72 w-72 rounded-full border border-[#d9c9ae]/50 bg-[#ead9bf]/30"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -right-4 -bottom-12 h-48 w-48 rounded-full border border-[#d9c9ae]/40"
          />
          <p className="relative z-10 font-mono text-[11px] tracking-[0.14em] text-[var(--color-warning-fg)] uppercase">
            {today} · {workspaceName}
          </p>
          <h1 className="relative z-10 mt-4 max-w-[14ch] text-4xl leading-[1.12] font-semibold tracking-tight sm:text-5xl">
            今天，把客户推进到下一步。
          </h1>
          <p className="relative z-10 mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
            早上好，{displayName}。从客户信号、待办任务到 Agent 执行，所有变化都留在同一套可追溯的 CRM 记录里。
          </p>
          <div className="relative z-10 mt-6 flex flex-wrap gap-2">
            <Link
              href="/app/ai/workbench"
              className="inline-flex h-10 items-center gap-2 rounded-[11px] bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-[var(--color-accent-hover)]"
            >
              <Robot size={17} aria-hidden /> 打开 Agent 工作台 <ArrowRight size={16} aria-hidden />
            </Link>
            <Link
              href="/app/kanban"
              className="inline-flex h-10 items-center gap-2 rounded-[11px] border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              查看销售漏斗
            </Link>
            <Link
              href="/app/inbox"
              className="inline-flex h-10 items-center gap-2 rounded-[11px] px-4 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              处理会话
            </Link>
          </div>
        </div>

        <aside
          aria-label="工作区脉搏"
          className="flex flex-col justify-between gap-6 rounded-[26px] bg-[var(--color-sidebar)] p-6 text-[#fff9ef] shadow-lg sm:p-7"
        >
          <div>
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 font-mono text-[10px] tracking-[0.14em] uppercase">
              工作区脉搏
            </span>
            <h2 className="mt-5 text-xl font-semibold">先看今天的关键变化</h2>
            <p className="mt-2 text-sm leading-6 text-[#afc2b8]">
              数据实时读取当前工作区；打开记录即可继续处理。
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {[
              ["在途商机", data.activeLeadCount.toLocaleString("zh-CN")],
              ["待处理任务", data.openTaskCount.toLocaleString("zh-CN")],
              ["Agent 运行", data.agentRuns.length.toLocaleString("zh-CN")],
              ["逾期任务", overdueTasks.length.toLocaleString("zh-CN")],
            ].map(([label, value]) => (
              <li key={label} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3 last:border-0 last:pb-0">
                <span className="text-[#afc2b8]">{label}</span>
                <strong className="font-mono text-base font-semibold text-[#fff9ef]">{value}</strong>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section aria-label="业务概览" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, detail, Icon }, index) => (
          <article key={label} className="rounded-[18px] border bg-card p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span className="font-mono tracking-[0.1em] uppercase">
                {String(index + 1).padStart(2, "0")} / {label}
              </span>
              <Icon size={17} className="text-accent" aria-hidden />
            </div>
            <p className="mt-3 text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
            <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
          </article>
        ))}
      </section>

      <div className="grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.9fr)]">
        <section className="rounded-[18px] border bg-card">
          <SectionHeading
            title="今日优先"
            detail="按截止时间排序，先处理最接近的承诺"
            href="/app/tasks"
            action="全部任务"
          />
          {priorityTasks.length ? (
            <ul className="divide-y">
              {priorityTasks.map((task, index) => {
                const overdue =
                  task.dueDate &&
                  new Date(task.dueDate).getTime() < now.getTime() &&
                  task.status !== "done";
                return (
                  <li key={task.id}>
                    <Link
                      href="/app/tasks"
                      className="flex items-start gap-4 px-5 py-4 transition-colors hover:bg-muted/50"
                    >
                      <span className="mt-0.5 font-mono text-xs text-[#b96b3b]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
                          {task.title}
                          <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[11px] font-normal text-muted-foreground">
                            {priorityLabels[task.priority] ?? task.priority}
                          </span>
                        </span>
                        <span className={`mt-1 block text-xs ${overdue ? "text-destructive" : "text-muted-foreground"}`}>
                          {dateLabel(task.dueDate)}
                          {overdue ? " · 已逾期" : task.status === "in_progress" ? " · 进行中" : " · 待处理"}
                        </span>
                      </span>
                      <ArrowRight size={16} className="mt-1 shrink-0 text-text-subtle" aria-hidden />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="flex min-h-44 flex-col items-center justify-center px-5 text-center">
              <CheckCircle size={24} className="text-success" aria-hidden />
              <p className="mt-3 text-sm font-medium">当前没有待处理任务</p>
              <Link href="/app/tasks" className="mt-2 text-sm text-accent hover:underline">
                查看任务列表
              </Link>
            </div>
          )}
        </section>

        <section className="rounded-[18px] border bg-card">
          <SectionHeading
            title="Agent 执行"
            detail="最近运行与当前状态"
            href="/app/ai/workbench"
            action="打开工作台"
          />
          {recentRuns.length ? (
            <ul className="divide-y">
              {recentRuns.map((run) => (
                <li key={run.id}>
                  <Link
                    href={`/app/ai/workbench?run=${encodeURIComponent(run.id)}`}
                    className="flex items-start gap-3 px-5 py-4 transition-colors hover:bg-muted/50"
                  >
                    <span className="mt-0.5 rounded-md bg-accent-soft p-2 text-accent">
                      <Robot size={17} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2 text-sm font-medium">
                        {run.agentName}
                        <span className="rounded-sm bg-muted px-1.5 py-0.5 text-[11px] font-normal text-muted-foreground">
                          {statusLabels[run.status] ?? run.status}
                        </span>
                      </span>
                      <span className="mt-1 block truncate text-sm text-muted-foreground">{run.task}</span>
                      <span className="mt-1 block text-xs text-text-subtle">{dateLabel(run.createdAt)}</span>
                    </span>
                    <ArrowSquareOut size={16} className="mt-1 shrink-0 text-text-subtle" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-44 flex-col items-center justify-center px-5 text-center">
              <span className="rounded-full bg-accent-soft p-3 text-accent">
                <Robot size={22} aria-hidden />
              </span>
              <p className="mt-3 text-sm font-medium">还没有 Agent 执行记录</p>
              <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                选择一个内置 Agent，给它一个明确的 CRM 目标，第一条运行记录会出现在这里。
              </p>
              <Link href="/app/ai/workbench" className="mt-3 text-sm font-medium text-accent hover:underline">
                运行第一个任务 <ArrowRight size={14} className="ml-1 inline" aria-hidden />
              </Link>
            </div>
          )}
        </section>
      </div>

      <section className="rounded-[18px] border bg-card">
        <SectionHeading
          title="销售漏斗"
          detail={data.pipelineName ? `${data.pipelineName} · 当前开放商机` : "开放商机按阶段分布"}
          href="/app/kanban"
          action="查看完整漏斗"
        />
        {data.stages.length ? (
          <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-4">
            {data.stages.map((stage) => (
              <article key={stage.id} className="min-w-0 rounded-[14px] border bg-background/60 p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="truncate text-sm font-medium">{stage.name}</h3>
                  <span className="font-mono text-sm tabular-nums text-muted-foreground">
                    {stage.count}
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${Math.max(stage.count ? 8 : 0, Math.round((stage.count / maxStage) * 100))}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-muted-foreground">{money(stage.valueCents)}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="px-5 py-8 text-center text-sm text-muted-foreground">
            尚未配置可展示的销售阶段。
            <Link href="/app/kanban" className="ml-1 text-accent hover:underline">
              设置销售漏斗
            </Link>
          </div>
        )}
        <div className="flex flex-wrap items-center justify-between gap-2 border-t px-5 py-3 text-xs text-muted-foreground">
          <span>{data.stages.length} 个阶段 · {data.activeLeadCount} 个在途商机</span>
          <span className="font-mono">漏斗金额 {money(pipelineValue)}</span>
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-[18px] border bg-card">
          <SectionHeading
            title="客户信号"
            detail="需要优先关注的经营状态"
            href="/app/contacts"
            action="查看联系人"
          />
          <div className="grid gap-3 p-5 sm:grid-cols-3">
            {[
              {
                label: "逾期任务",
                value: overdueTasks.length.toLocaleString("zh-CN"),
                detail: "需要重新安排",
                href: "/app/tasks",
                Icon: ClockCountdown,
              },
              {
                label: "客户总数",
                value: data.contactCount.toLocaleString("zh-CN"),
                detail: "组织内联系人",
                href: "/app/contacts",
                Icon: Users,
              },
              {
                label: "在途金额",
                value: money(data.activeLeadValueCents),
                detail: "开放商机合计",
                href: "/app/kanban",
                Icon: CurrencyDollar,
              },
            ].map(({ label, value, detail, href, Icon }) => (
              <Link
                key={label}
                href={href}
                className="rounded-[14px] border bg-background/60 p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-muted/50"
              >
                <Icon size={18} className="text-accent" aria-hidden />
                <p className="mt-3 text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-xl font-semibold tracking-tight tabular-nums">{value}</p>
                <p className="mt-1 text-[11px] text-text-subtle">{detail}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-[18px] border bg-card">
          <SectionHeading
            title="快速入口"
            detail="继续处理客户关系中的下一步"
            href="/app/crm"
            action="查看全部"
          />
          <div className="grid gap-3 p-5 sm:grid-cols-2">
            {[
              { title: "客户与联系人", detail: "查看客户档案与关系时间线", href: "/app/contacts" },
              { title: "会话收件箱", detail: "处理客户消息与人工接管", href: "/app/inbox" },
              { title: "任务与日程", detail: "安排跟进、截止日期与提醒", href: "/app/tasks" },
              { title: "销售漏斗", detail: "推进商机阶段与成交计划", href: "/app/kanban" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-start justify-between gap-3 rounded-[14px] border bg-background/60 p-4 transition-colors hover:border-[var(--color-border-strong)] hover:bg-muted/50"
              >
                <span>
                  <span className="block text-sm font-medium">{item.title}</span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">{item.detail}</span>
                </span>
                <ArrowRight size={15} className="mt-1 shrink-0 text-text-subtle transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            ))}
          </div>
        </section>
      </div>

      <p className="pb-1 text-center text-[11px] text-text-subtle">
        数据读取自当前工作区 · 最近刷新 {shortDate(new Date().toISOString())}
      </p>
    </div>
  );
}
