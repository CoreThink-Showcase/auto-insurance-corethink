import * as React from "react"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  label: string
  description?: string
}

interface ProgressIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  steps: Step[]
  currentStep: number
  completedSteps?: number[]
}

const ProgressIndicator = React.forwardRef<HTMLDivElement, ProgressIndicatorProps>(
  ({ className, steps, currentStep, completedSteps = [], ...props }, ref) => {
    return (
      <div ref={ref} className={cn("w-full py-4", className)} {...props}>
        <div className="relative flex items-center justify-between">
          {/* Progress line background */}
          <div className="absolute left-0 top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-slate-200" />
          
          {/* Progress line fill with gradient */}
          <div
            className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-primary progress-animated shadow-lg"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />

          {/* Steps */}
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = completedSteps.includes(stepNumber) || stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            const isPending = stepNumber > currentStep

            return (
              <div
                key={step.id}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                {/* Step circle */}
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full border-2 font-bold text-base transition-all duration-300 shadow-md",
                    isCompleted && "border-primary bg-gradient-primary text-white shadow-lg scale-110",
                    isCurrent && "border-primary bg-white text-primary shadow-lg scale-110 animate-pulse-glow",
                    isPending && "border-slate-300 bg-white text-slate-400"
                  )}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  {isCompleted ? (
                    <Check className="h-6 w-6 animate-fade-in" strokeWidth={3} />
                  ) : (
                    <span className="text-base">{stepNumber}</span>
                  )}
                </div>

                {/* Step label */}
                <div className="text-center">
                  <p
                    className={cn(
                      "text-sm font-bold transition-all duration-300",
                      isCurrent && "text-primary text-base",
                      isCompleted && "text-slate-700",
                      isPending && "text-slate-400"
                    )}
                  >
                    {step.label}
                  </p>
                  {step.description && (
                    <p
                      className={cn(
                        "text-xs font-medium mt-1 transition-all duration-300",
                        isCurrent && "text-slate-600",
                        isCompleted && "text-slate-500",
                        isPending && "text-slate-400"
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
)
ProgressIndicator.displayName = "ProgressIndicator"

export { ProgressIndicator }