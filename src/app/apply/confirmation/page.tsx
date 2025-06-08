"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Mail, Clock, Calendar } from "lucide-react"

export default function Confirmation() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md shadow-sm border border-slate-200">
        <CardHeader className="bg-white border-b border-slate-200">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-center text-slate-900">Application Submitted!</CardTitle>
          <CardDescription className="text-center text-slate-600">
            Thank you for submitting your application. We will review it and get back to you soon.
          </CardDescription>
        </CardHeader>

        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">What's Next?</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email Confirmation</p>
                    <p className="text-sm text-slate-600">You will receive an email confirmation shortly with your application details.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Application Review</p>
                    <p className="text-sm text-slate-600">Our team will review your application within 1-3 business days.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-slate-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Property Tour</p>
                    <p className="text-sm text-slate-600">We will contact you to confirm your scheduled property tour.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => router.push("/")}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white"
              >
                Return to Home
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 