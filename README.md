# Auto Insurance Comparison Agent

## Prompt

### "Build an agent for auto insurance where people looking for best insurance and deals which can save hours of time and phone calls, can we do with react and typescript"

<img width="1440" height="755" alt="image" src="https://github.com/user-attachments/assets/afa4ba49-7c69-4dcf-bbe5-9b6dc4294ae9" />


A production-quality React + TypeScript application for comparing auto insurance quotes. Built with Vite, Tailwind CSS v3, and ShadCN UI components.

## 🎯 Features

- **Multi-Step Wizard Form**: Guided 4-step form with validation
  - Personal Information
  - Vehicle Information
  - Coverage Preferences
  - Quote Results

- **Real-Time Quote Comparison**: Compare quotes from multiple insurance providers
- **Form Validation**: Zod-based validation with React Hook Form
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Loading & Error States**: Thoughtful UX for all states
- **Type-Safe**: Full TypeScript coverage with strict mode

## 🎨 Design Theme: "Calm Confidence"

The application uses a professional, trustworthy color palette designed for the insurance industry:

- **Primary**: Deep Navy Blue (`#1e3a5f`) - Trust and professionalism
- **Secondary**: Soft Slate (`#64748b`) - Calm and approachable
- **Accent**: Teal (`#14b8a6`) - Optimism and clarity
- **Background**: Light Gray (`#f8fafc`) - Clean and modern

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/          # Layout components (header, footer)
│   ├── quotes/          # Quote display components
│   ├── steps/           # Form step components
│   ├── ui/              # ShadCN UI components
│   └── wizard/          # Multi-step wizard component
├── context/             # React Context for form state
├── lib/                 # Utilities and API layer
├── types/               # TypeScript interfaces
├── App.tsx              # Main application component
├── index.css            # Global styles and Tailwind imports
└── main.tsx             # Application entry point
```

## 🏗️ Architecture

### Component Breakdown

#### Layout Components
- **Layout**: Main layout wrapper with header and footer
- **Header**: Logo and security badge
- **Footer**: Company info and legal links

#### Form Components
- **Wizard**: Multi-step form manager with navigation
- **ProgressIndicator**: Visual progress tracker
- **StepOne**: Personal information form
- **StepTwo**: Vehicle information form
- **StepThree**: Coverage preferences form

#### Quote Components
- **QuoteList**: Container for quote cards with loading/error states
- **QuoteCard**: Individual quote display with pricing and features

#### UI Components (ShadCN)
- **Button**: Primary, secondary, outline, ghost variants
- **Card**: Card container with header, content, footer
- **Input**: Text input with validation
- **Label**: Form label
- **Select**: Dropdown select component
- **Checkbox**: Checkbox input
- **Badge**: Status badges
- **Form**: Form wrapper with React Hook Form integration
- **LoadingSpinner**: Loading indicator
- **ErrorBanner**: Error message display
- **EmptyState**: Empty state placeholder

### State Management

- **FormContext**: React Context for managing form state across steps
- **React Hook Form**: Form state and validation
- **Zod**: Schema validation

### API Layer

- **Mock API**: Simulated insurance quote generation
- **fetchQuotes()**: Generates quotes based on form data
- **validateFormData()**: Validates form before submission

## 📝 TypeScript Interfaces

### Form Data

```typescript
interface PersonalInfo {
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

interface VehicleInfo {
  year: string;
  make: string;
  model: string;
  vin: string;
  mileage: string;
  primaryUse: 'commute' | 'pleasure' | 'business';
  annualMileage: string;
  ownership: 'owned' | 'financed' | 'leased';
}

interface CoveragePreferences {
  coverageLevel: 'basic' | 'standard' | 'premium';
  liabilityLimit: string;
  deductible: string;
  comprehensiveCoverage: boolean;
  collisionCoverage: boolean;
  roadsideAssistance: boolean;
  rentalCarCoverage: boolean;
}
```

### Quote

```typescript
interface Quote {
  id: string;
  provider: string;
  monthlyPremium: number;
  annualPremium: number;
  coverageLevel: 'basic' | 'standard' | 'premium';
  coverageOptions: string[];
  rating: number;
  reviewCount: number;
  features: string[];
  isRecommended: boolean;
  savings?: string;
}
```

## 🧪 Validation

All form fields are validated using Zod schemas:

- **Personal Info**: Required fields, email format, phone format
- **Vehicle Info**: Valid year, make, model, VIN format
- **Coverage Preferences**: Required selections, valid ranges

## 🎯 User Flow

1. **Personal Information**: User enters name, contact, and address
2. **Vehicle Information**: User provides vehicle details and usage
3. **Coverage Preferences**: User selects coverage level and options
4. **Quote Results**: User views and compares insurance quotes

## 🔧 Tech Stack

- **React 19.2.0** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS v3** - Styling
- **ShadCN UI** - Component library
- **React Hook Form** - Form management
- **Zod** - Validation
- **Lucide React** - Icons

## 📦 Dependencies

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "typescript": "^5.8.3",
  "vite": "^6.4.1",
  "tailwindcss": "^3.4.0",
  "react-hook-form": "^7.55.0",
  "zod": "^3.24.2",
  "@hookform/resolvers": "^5.0.1",
  "lucide-react": "^0.562.0",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.4.0",
  "class-variance-authority": "^0.7.1"
}
```

## 🚀 Deployment

The application builds to a static bundle that can be deployed to any static hosting service:

```bash
npm run build
# Output in dist/ directory
```

Deploy to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 📄 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
