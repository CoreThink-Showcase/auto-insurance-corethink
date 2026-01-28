import * as React from "react"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  variant?: 'default' | 'gradient' | 'minimal'
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  ({ className, size = 'md', text, variant = 'default', ...props }, ref) => {
    const sizeClasses: Record<string, string> = {
      sm: 'h-6 w-6 border-3',
      md: 'h-10 w-10 border-3',
      lg: 'h-14 w-14 border-4',
      xl: 'h-20 w-20 border-4',
    }

    const variantClasses: Record<string, string> = {
      default: 'border-primary border-t-transparent',
      gradient: 'border-transparent border-t-primary',
      minimal: 'border-slate-300 border-t-slate-500',
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col items-center justify-center gap-4", className)}
        {...props}
      >
        <div 
          className={cn(
            "animate-spin rounded-full shadow-lg",
            sizeClasses[size] || sizeClasses.md,
            variantClasses[variant] || variantClasses.default
          )}
          style={variant === 'gradient' ? {
            background: 'conic-gradient(from 0deg, transparent 0deg, #3b82f6 180deg, transparent 360deg)',
            borderRadius: '50%',
          } : undefined}
        />
        {text && (
          <p className="text-base font-medium text-slate-600 animate-pulse">{text}</p>
        )}
      </div>
    )
  }
)
LoadingSpinner.displayName = "LoadingSpinner"

export { LoadingSpinner }