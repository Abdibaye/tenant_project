"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Step1() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    currentAddress: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save form data to localStorage or state management
    localStorage.setItem("application_step1", JSON.stringify(formData))
    router.push("/apply/step2")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Basic Information</h1>
          <p className="text-slate-600">Step 1 of 4</p>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Personal Details</CardTitle>
            <CardDescription className="text-slate-600">
              Please provide your basic contact information
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-slate-700">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Enter your full name"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-slate-700">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(555) 123-4567"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currentAddress" className="text-slate-700">Current Address *</Label>
                  <Input
                    id="currentAddress"
                    value={formData.currentAddress}
                    onChange={(e) => setFormData({ ...formData, currentAddress: e.target.value })}
                    placeholder="Enter your current address"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Next Step
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 