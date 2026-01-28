import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        gradient: "bg-gradient-secondary text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        accent: "bg-gradient-accent text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
        outline:
          "border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white hover:shadow-lg transition-all duration-300",
        secondary:
          "bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 shadow-md hover:shadow-lg hover:scale-105 active:scale-95",
        ghost: "hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-primary transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-blue-600 transition-all duration-300",
        glass: "bg-gradient-glass text-primary border border-white/50 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95",
      },
      size: {
        default: "h-12 px-6 py-3",
        sm: "h-10 rounded-lg px-4 text-xs",
        lg: "h-14 rounded-xl px-10 text-base",
        icon: "h-12 w-12 rounded-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }