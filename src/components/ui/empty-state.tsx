import * as React from "react"
import { cn } from "@/lib/utils"
import { FileSearch, RefreshCw, ArrowRight } from "lucide-react"

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
    variant?: 'default' | 'gradient' | 'outline'
  }
  variant?: 'default' | 'glass' | 'minimal'
}

const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ className, icon, title, description, action, variant = 'default', ...props }, ref) => {
    const variantStyles = {
      default: {
        container: 'bg-gradient-to-br from-slate-50 to-slate-100/80 border-slate-200',
        iconBg: 'bg-white shadow-md',
        iconColor: 'text-slate-400',
      },
      glass: {
        container: 'glass-card border-white/60',
        iconBg: 'bg-white/80 backdrop-blur-sm shadow-lg',
        iconColor: 'text-slate-400',
      },
      minimal: {
        container: 'bg-transparent border-slate-200',
        iconBg: 'bg-slate-100',
        iconColor: 'text-slate-400',
      },
    }

    const styles = variantStyles[variant]

    const buttonVariant = action?.variant || 'default'
    const buttonStyles = {
      default: 'bg-gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
      gradient: 'bg-gradient-secondary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95',
      outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-md hover:shadow-lg',
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 text-center shadow-sm animate-fade-in",
          styles.container,
          className
        )}
        {...props}
      >
        <div className={cn("mb-6 flex h-20 w-20 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-110", styles.iconBg)}>
          {icon || <FileSearch className={cn("h-10 w-10", styles.iconColor)} strokeWidth={1.5} />}
        </div>
        <h3 className="mb-3 text-xl font-bold text-slate-800">{title}</h3>
        {description && (
          <p className="mb-8 max-w-md text-base text-slate-600 leading-relaxed">{description}</p>
        )}
        {action && (
          <button
            onClick={action.onClick}
            className={cn(
              "inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary/20 focus:ring-offset-2",
              buttonStyles[buttonVariant]
            )}
          >
            {buttonVariant === 'outline' ? <RefreshCw className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            {action.label}
          </button>
        )}
      </div>
    )
  }
)
EmptyState.displayName = "EmptyState"

export { EmptyState }