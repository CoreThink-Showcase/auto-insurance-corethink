import { Quote } from "@/types"
import { QuoteCard } from "./QuoteCard"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ErrorBanner } from "@/components/ui/error-banner"
import { EmptyState } from "@/components/ui/empty-state"
import { Button } from "@/components/ui/button"
import { RefreshCw, FileText, Sparkles } from "lucide-react"

interface QuoteListProps {
  quotes: Quote[]
  loading?: boolean
  error?: string | null
  onRetry?: () => void
  onSelectQuote?: (quote: Quote) => void
}

export function QuoteList({
  quotes,
  loading = false,
  error = null,
  onRetry,
  onSelectQuote,
}: QuoteListProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <LoadingSpinner size="lg" variant="gradient" text="Finding the best rates for you..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6 animate-fade-in">
        <ErrorBanner
          variant="error"
          title="Unable to load quotes"
          message={error}
        />
        {onRetry && (
          <div className="flex justify-center">
            <Button
              onClick={onRetry}
              variant="outline"
              size="lg"
              className="gap-2"
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </Button>
          </div>
        )}
      </div>
    )
  }

  if (quotes.length === 0) {
    return (
      <EmptyState
        variant="glass"
        icon={<FileText className="h-16 w-16 text-slate-400" />}
        title="No quotes available"
        description="We couldn't find any quotes matching your criteria. Please try adjusting your coverage preferences or contact us directly."
        action={onRetry ? { label: "Try Again", onClick: onRetry } : undefined}
      />
    )
  }

  // Find the best value quote (lowest monthly premium with good rating)
  const bestMatch = quotes.reduce((best, current) => {
    if (!best) return current
    // Prefer quotes with rating >= 4.0 and lower price
    if (current.rating >= 4.0 && current.monthlyPremium < best.monthlyPremium) {
      return current
    }
    return best
  }, quotes[0])

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 text-primary text-sm font-semibold">
          <Sparkles className="h-4 w-4" />
          <span>Great news!</span>
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Your Quotes</h2>
        <p className="text-lg text-slate-600">
          We found <span className="font-bold text-primary">{quotes.length}</span> insurance options for you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quotes.map((quote) => (
          <QuoteCard
            key={quote.id}
            quote={quote}
            onSelect={onSelectQuote}
            isRecommended={quote.id === bestMatch?.id}
          />
        ))}
      </div>
    </div>
  )
}