import * as React from "react"
import { FormStep } from "@/types"
import { ProgressIndicator } from "@/components/ui/progress-indicator"
import { StepOne } from "@/components/steps/StepOne"
import { StepTwo } from "@/components/steps/StepTwo"
import { StepThree } from "@/components/steps/StepThree"
import { QuoteList } from "@/components/quotes/QuoteList"
import { Quote } from "@/types"
import { fetchQuotes } from "@/lib/api"
import { useFormContext } from "@/context/FormContext"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Sparkles } from "lucide-react"

const WIZARD_STEPS = [
  { id: 1, label: 'Personal Info', description: 'About you' },
  { id: 2, label: 'Vehicle Info', description: 'Your car' },
  { id: 3, label: 'Coverage', description: 'Preferences' },
  { id: 4, label: 'Quotes', description: 'Compare' },
]

interface WizardProps {
  onComplete?: (selectedQuote: Quote) => void
}

export function Wizard({ onComplete }: WizardProps) {
  const { currentStep, goToPreviousStep, resetForm, personalInfo, vehicleInfo, coveragePreferences } = useFormContext()
  const [quotes, setQuotes] = React.useState<Quote[]>([])
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [selectedQuote, setSelectedQuote] = React.useState<Quote | null>(null)

  const handleNext = () => {
    // Step navigation is handled by individual step components
  }

  const handlePrevious = () => {
    goToPreviousStep()
  }

  const handleFetchQuotes = async () => {
    if (!personalInfo || !vehicleInfo || !coveragePreferences) {
      setError("Please complete all form steps before fetching quotes.")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await fetchQuotes({
        personalInfo,
        vehicleInfo,
        coveragePreferences,
      })
      setQuotes(response.quotes)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch quotes")
    } finally {
      setLoading(false)
    }
  }

  const handleSelectQuote = (quote: Quote) => {
    setSelectedQuote(quote)
    onComplete?.(quote)
  }

  const handleRetry = () => {
    handleFetchQuotes()
  }

  const handleStartOver = () => {
    resetForm()
    setQuotes([])
    setSelectedQuote(null)
    setError(null)
  }

  const renderStep = () => {
    switch (currentStep) {
      case FormStep.PersonalInfo:
        return <StepOne onNext={handleNext} />
      case FormStep.VehicleInfo:
        return <StepTwo onNext={handleNext} onPrevious={handlePrevious} />
      case FormStep.CoveragePreferences:
        return <StepThree onNext={handleFetchQuotes} onPrevious={handlePrevious} />
      case FormStep.Quotes:
        return (
          <QuoteList
            quotes={quotes}
            loading={loading}
            error={error}
            onRetry={handleRetry}
            onSelectQuote={handleSelectQuote}
          />
        )
      default:
        return null
    }
  }

  const getStepTitle = () => {
    switch (currentStep) {
      case FormStep.PersonalInfo:
        return "Personal Information"
      case FormStep.VehicleInfo:
        return "Vehicle Information"
      case FormStep.CoveragePreferences:
        return "Coverage Preferences"
      case FormStep.Quotes:
        return "Your Quotes"
      default:
        return ""
    }
  }

  const getStepDescription = () => {
    switch (currentStep) {
      case FormStep.PersonalInfo:
        return "Tell us about yourself to get started"
      case FormStep.VehicleInfo:
        return "Provide details about your vehicle"
      case FormStep.CoveragePreferences:
        return "Choose your coverage level and options"
      case FormStep.Quotes:
        return "Compare quotes from top insurance providers"
      default:
        return ""
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-3 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-primary/10 text-primary text-sm font-semibold mb-2">
          <Sparkles className="h-4 w-4" />
          <span>Compare & Save</span>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Auto Insurance Comparison
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Compare quotes from top insurance providers in minutes
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="glass-card rounded-2xl p-6 shadow-modern-lg animate-slide-in">
        <ProgressIndicator steps={WIZARD_STEPS} currentStep={currentStep} />
      </div>

      {/* Step Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <h2 className="text-3xl font-bold text-slate-800">{getStepTitle()}</h2>
        <p className="text-base text-slate-600">{getStepDescription()}</p>
      </div>

      {/* Step Content */}
      <div className="min-h-[400px] animate-fade-in">
        {renderStep()}
      </div>

      {/* Back Button (for quotes step) */}
      {currentStep === FormStep.Quotes && !loading && quotes.length > 0 && (
        <div className="flex justify-center animate-fade-in">
          <Button 
            variant="outline" 
            onClick={handlePrevious} 
            className="gap-2 px-6 py-3 text-base font-semibold rounded-xl border-2 hover:bg-slate-50 hover:border-slate-300 transition-all duration-200"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Coverage
          </Button>
        </div>
      )}

      {/* Start Over Button */}
      {currentStep === FormStep.Quotes && selectedQuote && (
        <Card className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200 shadow-lg animate-slide-up">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                  <CheckCircle className="h-7 w-7" strokeWidth={2.5} />
                </div>
                <div>
                  <p className="font-bold text-lg text-emerald-900">
                    You selected {selectedQuote.provider}
                  </p>
                  <p className="text-base text-emerald-700 font-medium">
                    ${selectedQuote.monthlyPremium}/month - {selectedQuote.coverageLevel}
                  </p>
                </div>
              </div>
              <Button 
                variant="outline" 
                onClick={handleStartOver}
                className="px-6 py-3 text-base font-semibold rounded-xl border-2 border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition-all duration-200"
              >
                Start Over
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}