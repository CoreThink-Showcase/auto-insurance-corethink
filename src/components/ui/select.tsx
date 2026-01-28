import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Check } from "lucide-react"

// Select Context
interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

function useSelectContext() {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("Select components must be used within a Select")
  }
  return context
}

// Root Select Component
export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
}

export function Select({ value, defaultValue, onValueChange, children }: SelectProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "")
  const [open, setOpen] = React.useState(false)

  const currentValue = value !== undefined ? value : internalValue

  const handleValueChange = (newValue: string) => {
    if (value === undefined) {
      setInternalValue(newValue)
    }
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        open,
        setOpen,
      }}
    >
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

// SelectTrigger
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { setOpen } = useSelectContext()

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-xl border-2 border-slate-200 bg-white/80 px-4 py-3 text-base ring-offset-background placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 input-focus-modern shadow-sm hover:shadow-md hover:border-slate-300",
          className
        )}
        onClick={() => setOpen((prev: boolean) => !prev)}
        {...props}
      >
        {children}
        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200" />
      </button>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

// SelectValue
export interface SelectValueProps {
  placeholder?: string
}

export function SelectValue({ placeholder }: SelectValueProps) {
  const { value } = useSelectContext()

  return (
    <span className={cn("text-base", !value && "text-slate-400")}>
      {value || placeholder}
    </span>
  )
}

// SelectContent
export interface SelectContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, ...props }, ref) => {
    const { open, setOpen } = useSelectContext()

    if (!open) return null

    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm animate-fade-in"
          onClick={() => setOpen(false)}
        />
        {/* Content */}
        <div
          ref={ref}
          className={cn(
            "absolute z-50 min-w-[8rem] overflow-hidden rounded-xl border border-slate-200 bg-white/95 backdrop-blur-md shadow-xl animate-slide-down",
            "top-full mt-2",
            className
          )}
          {...props}
        >
          <div className="max-h-60 overflow-auto p-1">{children}</div>
        </div>
      </>
    )
  }
)
SelectContent.displayName = "SelectContent"

// SelectItem
export interface SelectItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, children, value, ...props }, ref) => {
    const { value: currentValue, onValueChange } = useSelectContext()
    const isSelected = currentValue === value

    return (
      <button
        type="button"
        ref={ref}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-lg py-3 pl-10 pr-4 text-base font-medium outline-none transition-all duration-200",
          "hover:bg-slate-100 hover:text-primary",
          "focus:bg-slate-100 focus:text-primary",
          isSelected && "bg-gradient-primary text-white shadow-md",
          !isSelected && "text-slate-700",
          className
        )}
        onClick={() => onValueChange(value)}
        {...props}
      >
        <span className="absolute left-3 flex h-5 w-5 items-center justify-center">
          {isSelected && (
            <Check className="h-4 w-4 animate-fade-in" strokeWidth={3} />
          )}
        </span>
        {children}
      </button>
    )
  }
)
SelectItem.displayName = "SelectItem"