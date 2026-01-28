import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Quote } from "@/types"
import { Star, Check, Shield, Award, TrendingDown, Zap } from "lucide-react"

interface QuoteCardProps {
  quote: Quote
  onSelect?: (quote: Quote) => void
  isRecommended?: boolean
}

export function QuoteCard({ quote, onSelect, isRecommended = false }: QuoteCardProps) {
  const handleSelect = () => {
    onSelect?.(quote)
  }

  return (
    <Card className={cn(
      "w-full transition-all duration-300 card-hover glass-card",
      isRecommended && "border-primary/50 ring-4 ring-primary/20 shadow-modern-xl"
    )}>
      <CardHeader className="space-y-3 pb-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl font-bold text-slate-800">{quote.provider}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-slate-700">{quote.rating}</span>
              <span className="text-slate-500">({quote.reviewCount} reviews)</span>
            </CardDescription>
          </div>
          {isRecommended && (
            <Badge variant="success" className="shadow-md">
              <Award className="h-3 w-3 mr-1" />
              Best Value
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Pricing */}
        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ${quote.monthlyPremium}
            </span>
            <span className="text-slate-500 text-lg">/month</span>
          </div>
          <div className="text-sm text-slate-500">
            ${quote.annualPremium} annually
          </div>
          {quote.savings && (
            <div className="flex items-center gap-1 text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg inline-flex">
              <TrendingDown className="h-4 w-4" />
              Save ${quote.savings} per year
            </div>
          )}
        </div>

        {/* Coverage Level */}
        <div className="flex items-center gap-2 px-3 py-2 bg-gradient-primary/10 rounded-lg">
          <Shield className="h-5 w-5 text-primary" />
          <span className="font-semibold text-primary">{quote.coverageLevel}</span>
        </div>

        {/* Coverage Options */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-700">Coverage includes:</div>
          <div className="grid grid-cols-1 gap-2">
            {quote.coverageOptions.map((option, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100">
                  <Check className="h-3 w-3 text-emerald-600" strokeWidth={3} />
                </div>
                <span>{option}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        {quote.features && quote.features.length > 0 && (
          <div className="space-y-3">
            <div className="text-sm font-semibold text-slate-700">Additional benefits:</div>
            <div className="flex flex-wrap gap-2">
              {quote.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs font-medium px-3 py-1">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          onClick={handleSelect} 
          className="w-full text-base font-semibold px-6 py-3 rounded-xl gap-2"
          size="lg"
        >
          <Zap className="h-5 w-5" />
          Select This Plan
        </Button>
      </CardFooter>
    </Card>
  )
}

// Helper function for className merging
import { cn } from "@/lib/utils"