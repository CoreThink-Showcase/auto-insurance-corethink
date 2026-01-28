import * as React from "react"
import { cn } from "@/lib/utils"
import { AlertCircle, X } from "lucide-react"

interface ErrorBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string
  message: string
  onDismiss?: () => void
  variant?: 'error' | 'warning' | 'info'
}

const ErrorBanner = React.forwardRef<HTMLDivElement, ErrorBannerProps>(
  ({ className, title = "Error", message, onDismiss, variant = 'error', ...props }, ref) => {
    const variantStyles = {
      error: {
        bg: 'bg-gradient-to-r from-red-50 to-red-100/80',
        border: 'border-red-200',
        icon: 'text-red-500',
        title: 'text-red-700',
        message: 'text-red-600',
        button: 'hover:bg-red-200/50',
      },
      warning: {
        bg: 'bg-gradient-to-r from-amber-50 to-amber-100/80',
        border: 'border-amber-200',
        icon: 'text-amber-500',
        title: 'text-amber-700',
        message: 'text-amber-600',
        button: 'hover:bg-amber-200/50',
      },
      info: {
        bg: 'bg-gradient-to-r from-blue-50 to-blue-100/80',
        border: 'border-blue-200',
        icon: 'text-blue-500',
        title: 'text-blue-700',
        message: 'text-blue-600',
        button: 'hover:bg-blue-200/50',
      },
    }

    const styles = variantStyles[variant]

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-start gap-4 rounded-xl border-2 p-5 shadow-lg backdrop-blur-sm animate-slide-in",
          styles.bg,
          styles.border,
          className
        )}
        {...props}
      >
        <div className={cn("flex-shrink-0 mt-0.5 p-1 rounded-lg bg-white/50", styles.icon)}>
          <AlertCircle className="h-5 w-5" strokeWidth={2.5} />
        </div>
        <div className="flex-1 space-y-1">
          {title && <p className={cn("font-bold text-base", styles.title)}>{title}</p>}
          <p className={cn("text-sm leading-relaxed", styles.message)}>{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className={cn(
              "flex-shrink-0 rounded-lg p-1.5 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2",
              styles.button,
              styles.icon
            )}
            aria-label="Dismiss"
          >
            <X className="h-4 w-4" strokeWidth={2.5} />
          </button>
        )}
      </div>
    )
  }
)
ErrorBanner.displayName = "ErrorBanner"

export { ErrorBanner }