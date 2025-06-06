"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

interface ApplicationData {
  step1?: {
    fullName: string
    email: string
    phone: string
    currentAddress: string
  }
  step2?: {
    monthlyIncome: string
    annualIncome: string
    outstandingDebts: string
    missedRentPayments: string
    occupants: string
    pets: string
    petDetails: string
    smoking: string
    moveInDate: string
    additionalInfo: string
  }
  step3?: {
    tourDate: string
  }
  step4?: {
    paymentMethod: string
    receiptFileName: string
  }
}

export default function Confirmation() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<ApplicationData>({})

  useEffect(() => {
    // Retrieve all application data from localStorage
    const step1Data = localStorage.getItem("application_step1")
    const step2Data = localStorage.getItem("application_step2")
    const step3Data = localStorage.getItem("application_step3")
    const step4Data = localStorage.getItem("application_step4")

    setApplicationData({
      step1: step1Data ? JSON.parse(step1Data) : undefined,
      step2: step2Data ? JSON.parse(step2Data) : undefined,
      step3: step3Data ? JSON.parse(step3Data) : undefined,
      step4: step4Data ? JSON.parse(step4Data) : undefined,
    })
  }, [])

  const handleStartNewApplication = () => {
    // Clear all application data from localStorage
    localStorage.removeItem("application_step1")
    localStorage.removeItem("application_step2")
    localStorage.removeItem("application_step3")
    localStorage.removeItem("application_step4")
    router.push("/apply/step1")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Submitted Successfully!</h1>
          <p className="text-slate-600">Thank you for applying to rent with us.</p>
        </div>

        <Card className="shadow-sm border border-slate-200 mb-8">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Next Steps</CardTitle>
            <CardDescription className="text-slate-600">
              Here's what happens next in the application process
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-2">Application Received</h3>
                <p className="text-sm text-green-700">
                  We have received your application and will begin processing it immediately.
                  You will receive a confirmation email shortly.
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-slate-900">Application Process Timeline</h4>
                <ol className="space-y-3 list-decimal list-inside text-slate-600">
                  <li>Application Review (1-2 business days)</li>
                  <li>Background & Credit Check (2-3 business days)</li>
                  <li>Landlord Reference Check (1-2 business days)</li>
                  <li>Final Decision (1 business day)</li>
                </ol>
                <p className="text-sm text-slate-500 mt-2">
                  Total processing time: 5-8 business days
                </p>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Contact Information</h4>
                <p className="text-sm text-blue-700">
                  If you have any questions about your application, please contact us at:
                </p>
                <div className="mt-2 text-sm text-blue-700">
                  <p>Email: applications@example.com</p>
                  <p>Phone: (555) 123-4567</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button
            onClick={handleStartNewApplication}
            className="bg-slate-900 hover:bg-slate-800 text-white"
          >
            Start New Application
          </Button>
        </div>
      </div>
    </div>
  )
} 