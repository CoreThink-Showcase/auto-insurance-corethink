import * as React from "react"
import { PersonalInfo, VehicleInfo, CoveragePreferences, FormStep } from "@/types"

interface FormContextValue {
  // Form data
  personalInfo: PersonalInfo | null
  vehicleInfo: VehicleInfo | null
  coveragePreferences: CoveragePreferences | null
  
  // Current step
  currentStep: FormStep
  completedSteps: FormStep[]
  
  // Actions
  setPersonalInfo: (info: PersonalInfo) => void
  setVehicleInfo: (info: VehicleInfo) => void
  setCoveragePreferences: (preferences: CoveragePreferences) => void
  setCurrentStep: (step: FormStep) => void
  goToNextStep: () => void
  goToPreviousStep: () => void
  resetForm: () => void
  
  // Validation state
  isStepValid: (step: FormStep) => boolean
  markStepComplete: (step: FormStep) => void
}

const FormContext = React.createContext<FormContextValue | undefined>(undefined)

interface FormProviderProps {
  children: React.ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  const [personalInfo, setPersonalInfo] = React.useState<PersonalInfo | null>(null)
  const [vehicleInfo, setVehicleInfo] = React.useState<VehicleInfo | null>(null)
  const [coveragePreferences, setCoveragePreferences] = React.useState<CoveragePreferences | null>(null)
  const [currentStep, setCurrentStep] = React.useState<FormStep>(FormStep.PersonalInfo)
  const [completedSteps, setCompletedSteps] = React.useState<FormStep[]>([])

  const goToNextStep = React.useCallback(() => {
    const steps = Object.values(FormStep) as FormStep[]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex < steps.length - 1) {
      const nextStep = steps[currentIndex + 1]
      if (nextStep !== undefined) {
        setCurrentStep(nextStep)
      }
      // Mark current step as complete
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep])
      }
    }
  }, [currentStep, completedSteps])

  const goToPreviousStep = React.useCallback(() => {
    const steps = Object.values(FormStep) as FormStep[]
    const currentIndex = steps.indexOf(currentStep)
    if (currentIndex > 0) {
      const previousStep = steps[currentIndex - 1]
      if (previousStep !== undefined) {
        setCurrentStep(previousStep)
      }
    }
  }, [currentStep])

  const isStepValid = React.useCallback(
    (step: FormStep): boolean => {
      switch (step) {
        case FormStep.PersonalInfo:
          return personalInfo !== null
        case FormStep.VehicleInfo:
          return vehicleInfo !== null
        case FormStep.CoveragePreferences:
          return coveragePreferences !== null
        case FormStep.Quotes:
          return (
            personalInfo !== null &&
            vehicleInfo !== null &&
            coveragePreferences !== null
          )
        default:
          return false
      }
    },
    [personalInfo, vehicleInfo, coveragePreferences]
  )

  const markStepComplete = React.useCallback((step: FormStep) => {
    setCompletedSteps((prev) => {
      if (prev.includes(step)) return prev
      return [...prev, step]
    })
  }, [])

  const resetForm = React.useCallback(() => {
    setPersonalInfo(null)
    setVehicleInfo(null)
    setCoveragePreferences(null)
    setCurrentStep(FormStep.PersonalInfo)
    setCompletedSteps([])
  }, [])

  const value: FormContextValue = {
    personalInfo,
    vehicleInfo,
    coveragePreferences,
    currentStep,
    completedSteps,
    setPersonalInfo,
    setVehicleInfo,
    setCoveragePreferences,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
    resetForm,
    isStepValid,
    markStepComplete,
  }

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>
}

export function useFormContext() {
  const context = React.useContext(FormContext)
  if (context === undefined) {
    throw new Error("useFormContext must be used within a FormProvider")
  }
  return context
}