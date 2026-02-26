"use client"

import * as React from "react"
import * as RechartsPrimitive from "recharts"

import { cn } from "@/lib/utils"

const THEMES = {
  light: "",
  dark: ".dark",
} as const

type ThemeName = keyof typeof THEMES

interface ChartSeriesConfig {
  label?: React.ReactNode
  icon?: React.ComponentType
  color?: string
  theme?: Record<ThemeName, string>
}

export type ChartConfig = Partial<Record<string, ChartSeriesConfig>>

interface ChartContextValue {
  config: ChartConfig
}

const ChartContext = React.createContext<ChartContextValue | null>(null)

function useChartContext(): ChartContextValue {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("Chart components must be used inside <ChartContainer />.")
  }

  return context
}

function ChartContainer({
  id,
  className,
  children,
  config,
  ...props
}: React.ComponentProps<"div"> & {
  config: ChartConfig
  children: React.ComponentProps<
    typeof RechartsPrimitive.ResponsiveContainer
  >["children"]
}) {
  const uniqueId = React.useId()
  const chartId = `chart-${id ?? uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-slot="chart"
        data-chart={chartId}
        className={cn(
          "flex aspect-video justify-center text-xs [&_.recharts-layer]:outline-hidden [&_.recharts-sector]:outline-hidden [&_.recharts-surface]:outline-hidden",
          className
        )}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  )
}

function ChartStyle({ id, config }: { id: string; config: ChartConfig }) {
  const colorConfig = Object.entries(config).filter(
    (entry): entry is [string, ChartSeriesConfig] => {
      const item = entry[1]
      return item !== undefined && (item.color ?? item.theme) !== undefined
    }
  )

  if (colorConfig.length === 0) {
    return null
  }

  const css = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const lines = colorConfig
        .map(([key, item]) => {
          const themed = item.theme?.[theme as ThemeName]
          const color = themed ?? item.color
          if (!color) {
            return null
          }

          return `  --color-${key}: ${color};`
        })
        .filter((line): line is string => line !== null)
        .join("\n")

      return `${prefix} [data-chart=${id}] {\n${lines}\n}`
    })
    .join("\n")

  return <style dangerouslySetInnerHTML={{ __html: css }} />
}

function ChartTooltip(
  props: React.ComponentProps<typeof RechartsPrimitive.Tooltip>
) {
  return <RechartsPrimitive.Tooltip {...props} />
}

interface TooltipPayloadItem {
  name?: string
  value?: React.ReactNode
  color?: string
  dataKey?: string | number
  payload?: unknown
}

function isTooltipPayloadItem(value: unknown): value is TooltipPayloadItem {
  if (!value || typeof value !== "object") {
    return false
  }

  return true
}

function getPayloadFill(payload: unknown): string | undefined {
  if (!payload || typeof payload !== "object") {
    return undefined
  }

  if (!("fill" in payload)) {
    return undefined
  }

  const candidate = payload.fill
  return typeof candidate === "string" ? candidate : undefined
}

function ChartTooltipContent({
  active,
  payload,
  className,
  label,
  hideLabel = false,
}: React.ComponentProps<"div"> & {
    active?: boolean
    payload?: unknown
    label?: React.ReactNode
    hideLabel?: boolean
  }) {
  const { config } = useChartContext()
  const parsedPayload = Array.isArray(payload)
    ? payload.filter(isTooltipPayloadItem)
    : []

  if (!active || parsedPayload.length === 0) {
    return null
  }

  return (
    <div
      className={cn(
        "grid min-w-32 gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!hideLabel && label ? <div className="font-medium">{label}</div> : null}
      <div className="grid gap-1">
        {parsedPayload.map((item, index) => {
          const dataKey =
            typeof item.dataKey === "string"
              ? item.dataKey
              : item.dataKey === undefined
                ? ""
                : String(item.dataKey)
          const key = item.name ?? (dataKey.length > 0 ? dataKey : `item-${String(index)}`)
          const series = config[dataKey]
          const swatchColor = getPayloadFill(item.payload) ?? item.color

          return (
            <div
              key={key}
              className="flex items-center justify-between gap-2 text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                {swatchColor ? (
                  <span
                    className="h-2 w-2 rounded-[2px]"
                    style={{ backgroundColor: swatchColor }}
                  />
                ) : null}
                <span>{series?.label ?? item.name ?? dataKey}</span>
              </div>
              <span className="font-medium text-foreground">{item.value ?? "—"}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ChartLegend(
  props: Omit<React.ComponentProps<typeof RechartsPrimitive.Legend>, "ref">
) {
  return <RechartsPrimitive.Legend {...props} />
}

function ChartLegendContent({
  payload,
  className,
}: React.ComponentProps<"div"> & { payload?: unknown }) {
  const { config } = useChartContext()
  const legendPayload = Array.isArray(payload)
    ? payload.filter(isTooltipPayloadItem)
    : []

  if (legendPayload.length === 0) {
    return null
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {legendPayload.map((item, index) => {
        const dataKey =
          typeof item.dataKey === "string"
            ? item.dataKey
            : item.dataKey === undefined
              ? ""
              : String(item.dataKey)
        const key = item.name ?? (dataKey.length > 0 ? dataKey : `legend-${String(index)}`)
        const series = config[dataKey]
        const iconColor = item.color

        return (
          <div key={key} className="flex items-center gap-1.5 text-sm">
            {series?.icon ? (
              <series.icon />
            ) : (
              <span
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{ backgroundColor: iconColor }}
              />
            )}
            <span>{series?.label ?? item.name ?? dataKey}</span>
          </div>
        )
      })}
    </div>
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
}
