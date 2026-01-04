"use client"

import {
    CircleCheckIcon,
    InfoIcon,
    Loader2Icon,
    OctagonXIcon,
    TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
    const { theme = "system" } = useTheme()

    return (
        <Sonner
            theme={theme as ToasterProps["theme"]}
            className="toaster group"
            icons={{
                success: <CircleCheckIcon className="size-4" />,
                info: <InfoIcon className="size-4" />,
                warning: <TriangleAlertIcon className="size-4" />,
                error: <OctagonXIcon className="size-4" />,
                loading: <Loader2Icon className="size-4 animate-spin" />,
            }}
            style={
                {
                    "--normal-bg": "var(--popover)",
                    "--normal-text": "var(--popover-foreground)",
                    "--normal-border": "var(--border)",
                    "--border-radius": "var(--radius)",
                    
                    // Success state
                    "--success-bg": "hsl(var(--success) / 0.1)",
                    "--success-text": "hsl(var(--success))",
                    "--success-border": "hsl(var(--success) / 0.3)",

                    // Info state
                    "--info-bg": "hsl(var(--info) / 0.1)",
                    "--info-text": "hsl(var(--info))",
                    "--info-border": "hsl(var(--info) / 0.3)",

                    // Warning state
                    "--warning-bg": "hsl(var(--warning) / 0.1)",
                    "--warning-text": "hsl(var(--warning))",
                    "--warning-border": "hsl(var(--warning) / 0.3)",

                    // Error state
                    "--error-bg": "hsl(var(--destructive) / 0.1)",
                    "--error-text": "hsl(var(--destructive))",
                    "--error-border": "hsl(var(--destructive) / 0.3)",

                    // Loading state
                    "--loading-bg": "hsl(var(--muted))",
                    "--loading-text": "hsl(var(--muted-foreground))",
                    "--loading-border": "hsl(var(--border))",
                } as React.CSSProperties
            }
            {...props}
        />
    )
}

export { Toaster }
