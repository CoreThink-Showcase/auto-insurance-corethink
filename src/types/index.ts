/**
 * Personal Information Form Data
 */
export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

/**
 * Vehicle Information Form Data
 */
export interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  vin?: string;
  mileage: string;
  primaryUse: 'commute' | 'pleasure' | 'business';
  annualMileage: string;
  ownership: 'owned' | 'financed' | 'leased';
}

/**
 * Coverage Preferences Form Data
 */
export interface CoveragePreferences {
  coverageLevel: 'basic' | 'standard' | 'premium';
  liabilityLimit: string;
  deductible: string;
  comprehensiveCoverage: boolean;
  collisionCoverage: boolean;
  roadsideAssistance: boolean;
  rentalCarCoverage: boolean;
}

/**
 * Complete Form Data (all steps combined)
 */
export interface FormData {
  personalInfo: PersonalInfo;
  vehicleInfo: VehicleInfo;
  coveragePreferences: CoveragePreferences;
}

/**
 * Coverage Option Details
 */
export interface CoverageOption {
  id: string;
  name: string;
  description: string;
  included: string[];
  limit: string;
}

/**
 * Insurance Quote
 */
export interface Quote {
  id: string;
  provider: string;
  providerLogo?: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageLevel: 'basic' | 'standard' | 'premium';
  coverageOptions: string[];
  rating: number;
  reviewCount: number;
  features: string[];
  isRecommended?: boolean;
  savings?: string;
}

/**
 * API Response for Quotes
 */
export interface QuotesResponse {
  quotes: Quote[];
  bestMatch?: Quote;
  averagePremium: number;
  potentialSavings: number;
}

/**
 * Form Step Enum
 */
export enum FormStep {
  PersonalInfo = 0,
  VehicleInfo = 1,
  CoveragePreferences = 2,
  Quotes = 3,
}

/**
 * Form Validation Errors
 */
export interface FormErrors {
  [key: string]: string | undefined;
}

/**
 * Loading State
 */
export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

/**
 * Error State
 */
export interface ErrorState {
  hasError: boolean;
  message?: string;
  code?: string;
}