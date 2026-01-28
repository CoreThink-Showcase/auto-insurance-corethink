import { FormProvider } from "@/context/FormContext"
import { Layout } from "@/components/layout/Layout"
import { Wizard } from "@/components/wizard/Wizard"
import { Quote } from "@/types"

function App() {
  const handleComplete = (selectedQuote: Quote) => {
    console.log("Selected quote:", selectedQuote)
    // In a real app, this would redirect to a confirmation page
    // or initiate the purchase flow
  }

  return (
    <FormProvider>
      <Layout>
        <Wizard onComplete={handleComplete} />
      </Layout>
    </FormProvider>
  )
}

export default App