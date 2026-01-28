import { FormData, Quote, QuotesResponse } from '@/types';

/**
 * Simulated delay for API calls
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Mock insurance providers
 */
const PROVIDERS = [
  {
    id: 'safe-guard',
    name: 'SafeGuard Insurance',
    rating: 4.8,
    reviewCount: 12450,
  },
  {
    id: 'trust-shield',
    name: 'TrustShield',
    rating: 4.6,
    reviewCount: 8930,
  },
  {
    id: 'prime-cover',
    name: 'PrimeCover',
    rating: 4.5,
    reviewCount: 15670,
  },
  {
    id: 'secure-path',
    name: 'SecurePath',
    rating: 4.7,
    reviewCount: 6780,
  },
  {
    id: 'reliance-auto',
    name: 'Reliance Auto',
    rating: 4.4,
    reviewCount: 9420,
  },
];

/**
 * Generate mock quotes based on form data
 */
export async function fetchQuotes(formData: FormData): Promise<QuotesResponse> {
  // Simulate API delay
  await delay(1500);

  const { personalInfo, vehicleInfo, coveragePreferences } = formData;

  // Calculate base premium based on various factors
  const basePremium = calculateBasePremium(personalInfo, vehicleInfo);
  
  // Apply coverage level multiplier
  const coverageMultiplier = getCoverageMultiplier(coveragePreferences.coverageLevel);
  
  // Generate quotes for each provider
  const quotes: Quote[] = PROVIDERS.map((provider, index) => {
    const providerMultiplier = 0.85 + (index * 0.08); // Varies by provider
    const monthlyPremium = Math.round(basePremium * coverageMultiplier * providerMultiplier);
    const annualPremium = monthlyPremium * 12;

    return {
      id: `${provider.id}-${Date.now()}`,
      provider: provider.name,
      monthlyPremium,
      annualPremium,
      coverageLevel: coveragePreferences.coverageLevel,
      rating: provider.rating,
      reviewCount: provider.reviewCount,
      isRecommended: index === 0, // First provider is recommended
      savings: index === 0 ? undefined : `Save $${Math.round((quotes[0]?.monthlyPremium || monthlyPremium) - monthlyPremium)}/mo`,
      coverageOptions: getCoverageOptions(coveragePreferences),
      features: getProviderFeatures(index),
    };
  });

  // Sort by monthly premium
  quotes.sort((a, b) => a.monthlyPremium - b.monthlyPremium);

  // Mark best match
  const bestMatch = quotes[0];
  if (bestMatch) {
    bestMatch.isRecommended = true;
  }

  const averagePremium = Math.round(
    quotes.reduce((sum, quote) => sum + quote.monthlyPremium, 0) / quotes.length
  );

  const potentialSavings = quotes.length > 1 && quotes[0] && quotes[quotes.length - 1]
    ? Math.round((quotes[quotes.length - 1]!.monthlyPremium - quotes[0]!.monthlyPremium) * 12)
    : 0;

  return {
    quotes,
    bestMatch,
    averagePremium,
    potentialSavings,
  };
}

/**
 * Calculate base premium based on personal and vehicle info
 */
function calculateBasePremium(
  personalInfo: FormData['personalInfo'],
  vehicleInfo: FormData['vehicleInfo']
): number {
  let premium = 100; // Base rate

  // Age factor
  const age = calculateAge(personalInfo.dateOfBirth);
  if (age < 25) premium *= 1.5;
  else if (age < 35) premium *= 1.2;
  else if (age >= 50) premium *= 0.9;

  // Vehicle age factor
  const vehicleAge = new Date().getFullYear() - parseInt(vehicleInfo.year);
  if (vehicleAge < 3) premium *= 1.3;
  else if (vehicleAge > 10) premium *= 0.85;

  // Mileage factor
  const mileage = parseInt(vehicleInfo.annualMileage);
  if (mileage > 15000) premium *= 1.2;
  else if (mileage < 5000) premium *= 0.9;

  // Primary use factor
  if (vehicleInfo.primaryUse === 'business') premium *= 1.25;
  else if (vehicleInfo.primaryUse === 'commute') premium *= 1.1;

  // Ownership factor
  if (vehicleInfo.ownership === 'financed' || vehicleInfo.ownership === 'leased') {
    premium *= 1.15;
  }

  return Math.round(premium);
}

/**
 * Get coverage multiplier based on coverage level
 */
function getCoverageMultiplier(level: FormData['coveragePreferences']['coverageLevel']): number {
  switch (level) {
    case 'basic':
      return 0.7;
    case 'standard':
      return 1.0;
    case 'premium':
      return 1.4;
    default:
      return 1.0;
  }
}

/**
 * Get coverage options based on preferences
 */
function getCoverageOptions(
  preferences: FormData['coveragePreferences']
): string[] {
  const options = [
    'Bodily Injury Liability',
    'Property Damage Liability',
  ];

  if (preferences.comprehensiveCoverage) {
    options.push('Comprehensive Coverage');
  }

  if (preferences.collisionCoverage) {
    options.push('Collision Coverage');
  }

  return options;
}

/**
 * Get provider-specific features
 */
function getProviderFeatures(index: number): string[] {
  const allFeatures = [
    '24/7 Claims Support',
    'Roadside Assistance',
    'Rental Car Coverage',
    'Gap Coverage Available',
    'Accident Forgiveness',
    'New Car Replacement',
    'Vanishing Deductible',
    'Pet Injury Coverage',
  ];

  // Each provider gets 3-5 features
  const numFeatures = 3 + (index % 3);
  const startIndex = (index * 2) % allFeatures.length;
  
  return allFeatures
    .slice(startIndex, startIndex + numFeatures)
    .concat(allFeatures.slice(0, Math.max(0, startIndex + numFeatures - allFeatures.length)));
}

/**
 * Calculate age from date of birth
 */
function calculateAge(dateOfBirth: string): number {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Validate form data before submitting
 */
export function validateFormData(formData: FormData): { isValid: boolean; errors?: string[] } {
  const errors: string[] = [];

  // Validate personal info
  if (!formData.personalInfo.firstName || formData.personalInfo.firstName.length < 2) {
    errors.push('First name is required');
  }
  if (!formData.personalInfo.email || !formData.personalInfo.email.includes('@')) {
    errors.push('Valid email is required');
  }

  // Validate vehicle info
  if (!formData.vehicleInfo.year || formData.vehicleInfo.year.length !== 4) {
    errors.push('Valid vehicle year is required');
  }
  if (!formData.vehicleInfo.make || formData.vehicleInfo.make.length < 2) {
    errors.push('Vehicle make is required');
  }

  // Validate coverage preferences
  if (!formData.coveragePreferences.coverageLevel) {
    errors.push('Coverage level is required');
  }

  return {
    isValid: errors.length === 0,
    errors: errors.length > 0 ? errors : undefined,
  };
}