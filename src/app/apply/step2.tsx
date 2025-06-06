"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Step2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    monthlyIncome: "",
    annualIncome: "",
    outstandingDebts: "",
    missedRent: "",
    landlordReferences: "",
    numberOfPeople: "",
    hasChildren: "",
    stayDuration: "",
    hasPets: "",
    petDetails: "",
    smokes: "",
    evictionHistory: "",
    bankruptcyHistory: "",
    minorRepairs: "",
    moveInDate: "",
    flexibility: "",
    consentCheck: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("application_step2", JSON.stringify(formData))
    router.push("/apply/step3")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Application Questions</h1>
          <p className="text-slate-600">Step 2 of 4</p>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Financial & Personal Information</CardTitle>
            <CardDescription className="text-slate-600">
              Please answer all questions honestly
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Financial Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="monthlyIncome" className="text-slate-700">Monthly Income *</Label>
                    <Input
                      id="monthlyIncome"
                      type="number"
                      value={formData.monthlyIncome}
                      onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                      placeholder="Enter monthly income"
                      required
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualIncome" className="text-slate-700">Annual Income *</Label>
                    <Input
                      id="annualIncome"
                      type="number"
                      value={formData.annualIncome}
                      onChange={(e) => setFormData({ ...formData, annualIncome: e.target.value })}
                      placeholder="Enter annual income"
                      required
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="outstandingDebts" className="text-slate-700">Outstanding Debts</Label>
                  <Textarea
                    id="outstandingDebts"
                    value={formData.outstandingDebts}
                    onChange={(e) => setFormData({ ...formData, outstandingDebts: e.target.value })}
                    placeholder="List any outstanding debts"
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Have you ever missed rent payments? *</Label>
                  <RadioGroup
                    value={formData.missedRent}
                    onValueChange={(value) => setFormData({ ...formData, missedRent: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="missedRent-yes" />
                      <Label htmlFor="missedRent-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="missedRent-no" />
                      <Label htmlFor="missedRent-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numberOfPeople" className="text-slate-700">Number of People *</Label>
                    <Input
                      id="numberOfPeople"
                      type="number"
                      value={formData.numberOfPeople}
                      onChange={(e) => setFormData({ ...formData, numberOfPeople: e.target.value })}
                      placeholder="Enter number of occupants"
                      required
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-700">Do you have children? *</Label>
                    <RadioGroup
                      value={formData.hasChildren}
                      onValueChange={(value) => setFormData({ ...formData, hasChildren: value })}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="children-yes" />
                        <Label htmlFor="children-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="children-no" />
                        <Label htmlFor="children-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stayDuration" className="text-slate-700">How long do you plan to stay? *</Label>
                  <Input
                    id="stayDuration"
                    value={formData.stayDuration}
                    onChange={(e) => setFormData({ ...formData, stayDuration: e.target.value })}
                    placeholder="e.g., 1 year, 2 years"
                    required
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Do you have any pets? *</Label>
                  <RadioGroup
                    value={formData.hasPets}
                    onValueChange={(value) => setFormData({ ...formData, hasPets: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="pets-yes" />
                      <Label htmlFor="pets-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="pets-no" />
                      <Label htmlFor="pets-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.hasPets === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="petDetails" className="text-slate-700">Pet Details</Label>
                    <Textarea
                      id="petDetails"
                      value={formData.petDetails}
                      onChange={(e) => setFormData({ ...formData, petDetails: e.target.value })}
                      placeholder="Please describe your pets (breed, size, age)"
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-slate-700">Do you smoke or vape? *</Label>
                  <RadioGroup
                    value={formData.smokes}
                    onValueChange={(value) => setFormData({ ...formData, smokes: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="smoke-yes" />
                      <Label htmlFor="smoke-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="smoke-no" />
                      <Label htmlFor="smoke-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {/* Additional Questions */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Additional Information</h3>
                <div className="space-y-2">
                  <Label className="text-slate-700">Have you ever been evicted? *</Label>
                  <RadioGroup
                    value={formData.evictionHistory}
                    onValueChange={(value) => setFormData({ ...formData, evictionHistory: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="eviction-yes" />
                      <Label htmlFor="eviction-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="eviction-no" />
                      <Label htmlFor="eviction-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Have you ever filed for bankruptcy? *</Label>
                  <RadioGroup
                    value={formData.bankruptcyHistory}
                    onValueChange={(value) => setFormData({ ...formData, bankruptcyHistory: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="bankruptcy-yes" />
                      <Label htmlFor="bankruptcy-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="bankruptcy-no" />
                      <Label htmlFor="bankruptcy-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Are you willing to do minor repairs? *</Label>
                  <RadioGroup
                    value={formData.minorRepairs}
                    onValueChange={(value) => setFormData({ ...formData, minorRepairs: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="repairs-yes" />
                      <Label htmlFor="repairs-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="repairs-no" />
                      <Label htmlFor="repairs-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-700">Do you consent to background and credit checks? *</Label>
                  <RadioGroup
                    value={formData.consentCheck}
                    onValueChange={(value) => setFormData({ ...formData, consentCheck: value })}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="consent-yes" />
                      <Label htmlFor="consent-yes">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="consent-no" />
                      <Label htmlFor="consent-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/apply/step1")}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  Previous
                </Button>
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