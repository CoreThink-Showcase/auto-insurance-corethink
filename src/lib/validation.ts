import { z } from 'zod';

/**
 * Personal Information Validation Schema
 */
export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be less than 50 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[\d\s\-\(\)]+$/, 'Please enter a valid phone number'),
  dateOfBirth: z
    .string()
    .min(1, 'Date of birth is required')
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
        ? age - 1 
        : age;
      return actualAge >= 16 && actualAge <= 100;
    }, 'You must be between 16 and 100 years old to get insurance'),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address must be less than 100 characters'),
  city: z
    .string()
    .min(2, 'City must be at least 2 characters')
    .max(50, 'City must be less than 50 characters')
    .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),
  state: z
    .string()
    .min(2, 'State must be 2 characters')
    .max(2, 'State must be 2 characters')
    .regex(/^[A-Z]{2}$/, 'State must be a valid 2-letter state code'),
  zipCode: z
    .string()
    .min(5, 'ZIP code must be at least 5 digits')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),
});

/**
 * Vehicle Information Validation Schema
 */
export const vehicleInfoSchema = z.object({
  year: z
    .string()
    .min(4, 'Please select a vehicle year')
    .regex(/^\d{4}$/, 'Please enter a valid 4-digit year')
    .refine((year) => {
      const currentYear = new Date().getFullYear();
      const yearNum = parseInt(year, 10);
      return yearNum >= 1990 && yearNum <= currentYear + 1;
    }, 'Vehicle year must be between 1990 and next year'),
  make: z
    .string()
    .min(2, 'Vehicle make is required')
    .max(50, 'Vehicle make must be less than 50 characters'),
  model: z
    .string()
    .min(2, 'Vehicle model is required')
    .max(50, 'Vehicle model must be less than 50 characters'),
  vin: z
    .string()
    .optional()
    .refine((vin) => {
      if (!vin) return true;
      return /^[A-HJ-NPR-Z0-9]{17}$/.test(vin);
    }, 'VIN must be exactly 17 characters'),
  mileage: z
    .string()
    .min(1, 'Mileage is required')
    .regex(/^\d+$/, 'Mileage must be a number'),
  primaryUse: z.enum(['commute', 'pleasure', 'business'], {
    required_error: 'Please select primary use',
  }),
  annualMileage: z
    .string()
    .min(1, 'Annual mileage is required')
    .regex(/^\d+$/, 'Annual mileage must be a number')
    .refine((miles) => {
      const milesNum = parseInt(miles, 10);
      return milesNum >= 1000 && milesNum <= 100000;
    }, 'Annual mileage must be between 1,000 and 100,000 miles'),
  ownership: z.enum(['owned', 'financed', 'leased'], {
    required_error: 'Please select ownership type',
  }),
});

/**
 * Coverage Preferences Validation Schema
 */
export const coveragePreferencesSchema = z.object({
  coverageLevel: z.enum(['basic', 'standard', 'premium'], {
    required_error: 'Please select a coverage level',
  }),
  liabilityLimit: z
    .string()
    .min(1, 'Please select a liability limit'),
  deductible: z
    .string()
    .min(1, 'Please select a deductible'),
  comprehensiveCoverage: z.boolean(),
  collisionCoverage: z.boolean(),
  roadsideAssistance: z.boolean(),
  rentalCarCoverage: z.boolean(),
});

/**
 * Complete Form Validation Schema
 */
export const formDataSchema = z.object({
  personalInfo: personalInfoSchema,
  vehicleInfo: vehicleInfoSchema,
  coveragePreferences: coveragePreferencesSchema,
});

/**
 * Type inference from schemas
 */
export type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;
export type VehicleInfoFormData = z.infer<typeof vehicleInfoSchema>;
export type CoveragePreferencesFormData = z.infer<typeof coveragePreferencesSchema>;
export type CompleteFormData = z.infer<typeof formDataSchema>;