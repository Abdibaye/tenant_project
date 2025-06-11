"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export default function Confirmation() {
  const router = useRouter()
  const [applicationData, setApplicationData] = useState<any>(null)

  useEffect(() => {
    // Retrieve all application data from localStorage
    const step1Data = JSON.parse(localStorage.getItem("application_step1") || "{}")
    const step2Data = JSON.parse(localStorage.getItem("application_step2") || "{}")
    const step3Data = JSON.parse(localStorage.getItem("application_step3") || "{}")
    const step4Data = JSON.parse(localStorage.getItem("application_step4") || "{}")

    setApplicationData({
      ...step1Data,
      ...step2Data,
      ...step3Data,
      ...step4Data
    })
  }, [])

  const handleStartOver = () => {
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
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Submitted!</h1>
          <p className="text-slate-600">Thank you for your application</p>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">What's Next?</CardTitle>
            <CardDescription className="text-slate-600">
              Here's what you can expect in the coming days
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2">Application Received</h3>
                  <p className="text-sm text-green-700">
                    We have received your application and will begin processing it within 1-3 business days.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900">Next Steps:</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">1</span>
                      </span>
                      <p className="text-slate-600">
                        We will review your application and verify the provided information
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">2</span>
                      </span>
                      <p className="text-slate-600">
                        Background and credit checks will be conducted
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">3</span>
                      </span>
                      <p className="text-slate-600">
                        You will receive an email with the application decision within 3-5 business days
                      </p>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">4</span>
                      </span>
                      <p className="text-slate-600">
                        If approved, we will schedule your property tour for the selected date
                      </p>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Contact Information</h4>
                  <p className="text-sm text-blue-700">
                    If you have any questions about your application, please contact us at:
                    <br />
                    <span className="font-medium">support@example.com</span>
                    <br />
                    <span className="font-medium">(555) 123-4567</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleStartOver}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  Start New Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 