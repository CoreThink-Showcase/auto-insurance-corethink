import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { coveragePreferencesSchema } from "@/lib/validation"
import { CoveragePreferences } from "@/types"
import { useFormContext } from "@/context/FormContext"
import { Shield, DollarSign, Info, ArrowLeft, Sparkles } from "lucide-react"

type FormData = z.infer<typeof coveragePreferencesSchema>

interface StepThreeProps {
  onNext: () => void
  onPrevious: () => void
}

const COVERAGE_LEVELS = [
  { value: "basic", label: "Basic", description: "State minimum coverage" },
  { value: "standard", label: "Standard", description: "Recommended for most drivers" },
  { value: "premium", label: "Premium", description: "Maximum protection" },
]

const LIABILITY_LIMITS = [
  { value: "25/50/25", label: "$25,000 / $50,000 / $25,000" },
  { value: "50/100/50", label: "$50,000 / $100,000 / $50,000" },
  { value: "100/300/100", label: "$100,000 / $300,000 / $100,000" },
  { value: "250/500/250", label: "$250,000 / $500,000 / $250,000" },
]

const DEDUCTIBLES = [
  { value: "250", label: "$250" },
  { value: "500", label: "$500" },
  { value: "1000", label: "$1,000" },
  { value: "2000", label: "$2,000" },
]

export function StepThree({ onNext, onPrevious }: StepThreeProps) {
  const { setCoveragePreferences, coveragePreferences } = useFormContext()

  const form = useForm<FormData>({
    resolver: zodResolver(coveragePreferencesSchema),
    defaultValues: coveragePreferences || {
      coverageLevel: "standard",
      liabilityLimit: "100/300/100",
      deductible: "500",
      comprehensiveCoverage: true,
      collisionCoverage: true,
      roadsideAssistance: false,
      rentalCarCoverage: false,
    },
  })

  const onSubmit = (data: FormData) => {
    const coveragePreferencesData: CoveragePreferences = {
      coverageLevel: data.coverageLevel,
      liabilityLimit: data.liabilityLimit,
      deductible: data.deductible,
      comprehensiveCoverage: data.comprehensiveCoverage,
      collisionCoverage: data.collisionCoverage,
      roadsideAssistance: data.roadsideAssistance,
      rentalCarCoverage: data.rentalCarCoverage,
    }
    setCoveragePreferences(coveragePreferencesData)
    onNext()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto glass-card shadow-modern-lg animate-slide-in">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-accent text-white shadow-lg">
            <Shield className="h-6 w-6" strokeWidth={2} />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">Coverage Preferences</CardTitle>
            <CardDescription className="text-base text-slate-600">
              Choose your coverage level and additional options to customize your insurance.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Coverage Level */}
            <FormField
              control={form.control}
              name="coverageLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-slate-700">Coverage Level</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coverage level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COVERAGE_LEVELS.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          <div className="flex flex-col">
                            <span className="font-medium">{level.label}</span>
                            <span className="text-xs text-slate-500">
                              {level.description}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Liability Limit */}
            <FormField
              control={form.control}
              name="liabilityLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-slate-700">Liability Limit</FormLabel>
                  <FormDescription className="flex items-center gap-1 text-sm text-slate-500">
                    <Info className="h-3 w-3" />
                    Bodily Injury / Property Damage per accident
                  </FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select liability limit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {LIABILITY_LIMITS.map((limit) => (
                        <SelectItem key={limit.value} value={limit.value}>
                          {limit.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Deductible */}
            <FormField
              control={form.control}
              name="deductible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-slate-700">Deductible</FormLabel>
                  <FormDescription className="flex items-center gap-1 text-sm text-slate-500">
                    <DollarSign className="h-3 w-3" />
                    Higher deductible = lower premium
                  </FormDescription>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select deductible" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DEDUCTIBLES.map((deductible) => (
                        <SelectItem key={deductible.value} value={deductible.value}>
                          {deductible.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Additional Coverage Options */}
            <div className="space-y-4">
              <FormLabel className="text-base font-semibold text-slate-700">Additional Coverage</FormLabel>

              <FormField
                control={form.control}
                name="comprehensiveCoverage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-2 border-slate-200 bg-white/60 p-4 hover:border-primary/50 hover:bg-white/80 transition-all duration-200">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-semibold text-slate-800">Comprehensive Coverage</FormLabel>
                      <FormDescription className="text-sm text-slate-600">
                        Covers damage to your vehicle from non-collision events (theft, weather, etc.)
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="collisionCoverage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-2 border-slate-200 bg-white/60 p-4 hover:border-primary/50 hover:bg-white/80 transition-all duration-200">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-semibold text-slate-800">Collision Coverage</FormLabel>
                      <FormDescription className="text-sm text-slate-600">
                        Covers damage to your vehicle from collisions with other vehicles or objects
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roadsideAssistance"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-2 border-slate-200 bg-white/60 p-4 hover:border-primary/50 hover:bg-white/80 transition-all duration-200">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-semibold text-slate-800">Roadside Assistance</FormLabel>
                      <FormDescription className="text-sm text-slate-600">
                        24/7 roadside assistance for towing, flat tires, and lockouts
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rentalCarCoverage"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border-2 border-slate-200 bg-white/60 p-4 hover:border-primary/50 hover:bg-white/80 transition-all duration-200">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-base font-semibold text-slate-800">Rental Car Coverage</FormLabel>
                      <FormDescription className="text-sm text-slate-600">
                        Covers rental car expenses while your vehicle is being repaired
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={onPrevious} 
                size="lg"
                className="min-w-[120px] text-base font-semibold px-8 py-3 rounded-xl gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                className="min-w-[140px] text-base font-semibold px-8 py-3 rounded-xl gap-2"
              >
                <Sparkles className="h-5 w-5" />
                Get Quotes
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}