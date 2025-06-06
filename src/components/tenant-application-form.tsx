"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TenantApplicationForm() {
  const router = useRouter()

  const handleStartApplication = () => {
    // Clear any existing application data
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tenant Application</h1>
          <p className="text-slate-600">Start your application process</p>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Application Process</CardTitle>
            <CardDescription className="text-slate-600">
              Complete the following steps to submit your application
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Application Steps</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">1</span>
                      </span>
                      <div>
                        <p className="text-slate-900 font-medium">Basic Information</p>
                        <p className="text-sm text-slate-600">Provide your contact details and basic information</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">2</span>
                      </span>
                      <div>
                        <p className="text-slate-900 font-medium">Application Questions</p>
                        <p className="text-sm text-slate-600">Answer questions about your financial and personal situation</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">3</span>
                      </span>
                      <div>
                        <p className="text-slate-900 font-medium">Schedule Tour</p>
                        <p className="text-sm text-slate-600">Select a date for your property tour</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex-shrink-0 h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center mr-3">
                        <span className="text-slate-600 text-sm">4</span>
                      </span>
                      <div>
                        <p className="text-slate-900 font-medium">Payment</p>
                        <p className="text-sm text-slate-600">Pay the application fee and upload receipt</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-2">Application Fee</h4>
                  <p className="text-sm text-blue-700">
                    A non-refundable application fee of $50 is required to process your application.
                    This fee covers the cost of background and credit checks.
                  </p>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2">Required Documents</h4>
                  <p className="text-sm text-yellow-700">
                    Please have the following information ready:
                  </p>
                  <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside">
                    <li>Valid government-issued photo ID</li>
                    <li>Proof of income (pay stubs, bank statements)</li>
                    <li>Employment verification</li>
                    <li>Rental history</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center pt-6">
                <Button
                  onClick={handleStartApplication}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8"
                >
                  Start Application
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
