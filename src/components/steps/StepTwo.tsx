import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import { vehicleInfoSchema } from "@/lib/validation"
import { VehicleInfo } from "@/types"
import { useFormContext } from "@/context/FormContext"
import { Car, Gauge, MapPin, ArrowLeft, ArrowRight } from "lucide-react"

type FormData = z.infer<typeof vehicleInfoSchema>

interface StepTwoProps {
  onNext: () => void
  onPrevious: () => void
}

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i)
const MAKES = ["Toyota", "Honda", "Ford", "Chevrolet", "Nissan", "BMW", "Mercedes-Benz", "Audi", "Hyundai", "Kia", "Subaru", "Volkswagen", "Lexus", "Tesla", "Mazda", "Jeep", "Ram", "GMC", "Buick", "Cadillac"]
const PRIMARY_USES = ["commute", "pleasure", "business"]
const OWNERSHIP_TYPES = ["owned", "financed", "leased"]

export function StepTwo({ onNext, onPrevious }: StepTwoProps) {
  const { setVehicleInfo, vehicleInfo } = useFormContext()

  const form = useForm<FormData>({
    resolver: zodResolver(vehicleInfoSchema),
    defaultValues: vehicleInfo || {
      year: "",
      make: "",
      model: "",
      vin: "",
      mileage: "",
      primaryUse: undefined,
      annualMileage: "",
      ownership: undefined,
    },
  })

  const onSubmit = (data: FormData) => {
    const vehicleInfoData: VehicleInfo = {
      year: data.year,
      make: data.make,
      model: data.model,
      vin: data.vin,
      mileage: data.mileage,
      primaryUse: data.primaryUse,
      annualMileage: data.annualMileage,
      ownership: data.ownership,
    }
    setVehicleInfo(vehicleInfoData)
    onNext()
  }

  return (
    <Card className="w-full max-w-2xl mx-auto glass-card shadow-modern-lg animate-slide-in">
      <CardHeader className="space-y-3 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-secondary text-white shadow-lg">
            <Car className="h-6 w-6" strokeWidth={2} />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-slate-800">Vehicle Information</CardTitle>
            <CardDescription className="text-base text-slate-600">
              Tell us about your vehicle to get accurate insurance quotes.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Vehicle Identification */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">Year</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {YEARS.map((year) => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="make"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">Make</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select make" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {MAKES.map((make) => (
                          <SelectItem key={make} value={make}>
                            {make}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Camry" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* VIN */}
            <FormField
              control={form.control}
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-slate-700">VIN (Vehicle Identification Number)</FormLabel>
                  <FormControl>
                    <Input placeholder="1HGCM82633A123456" maxLength={17} {...field} />
                  </FormControl>
                  <FormDescription className="text-sm text-slate-500">
                    Optional - helps us provide more accurate quotes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Current Mileage */}
            <FormField
              control={form.control}
              name="mileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-slate-700">Current Mileage</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Gauge className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input type="number" placeholder="50000" className="pl-11" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Usage Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="primaryUse"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">Primary Use</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select use" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {PRIMARY_USES.map((use) => (
                          <SelectItem key={use} value={use}>
                            {use.charAt(0).toUpperCase() + use.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownership"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-slate-700">Ownership</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select ownership" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {OWNERSHIP_TYPES.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Annual Mileage */}
            <FormField
              control={form.control}
              name="annualMileage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold text-slate-700">Estimated Annual Mileage</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                      <Input type="number" placeholder="12000" className="pl-11" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription className="text-sm text-slate-500">
                    Average miles driven per year
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                Continue
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}