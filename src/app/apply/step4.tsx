"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Step4() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    paymentMethod: "",
    receiptFile: null as File | null,
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receiptFile: e.target.files[0] })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("application_step4", JSON.stringify({
      paymentMethod: formData.paymentMethod,
      receiptFileName: formData.receiptFile?.name
    }))
    router.push("/apply/confirmation")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment Information</h1>
          <p className="text-slate-600">Step 4 of 4</p>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Application Fee Payment</CardTitle>
            <CardDescription className="text-slate-600">
              Please select your preferred payment method and upload the receipt
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h3 className="font-semibold text-slate-900 mb-2">Application Fee: $50</h3>
                  <p className="text-sm text-slate-600">
                    This fee covers the cost of processing your application, including background and credit checks.
                    The fee is non-refundable and does not guarantee approval.
                  </p>
                </div>

                <div className="space-y-4">
                  <Label className="text-slate-700">Select Payment Method *</Label>
                  <RadioGroup
                    value={formData.paymentMethod}
                    onValueChange={(value) => setFormData({ ...formData, paymentMethod: value })}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <RadioGroupItem value="credit" id="credit" />
                      <Label htmlFor="credit" className="cursor-pointer">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <RadioGroupItem value="debit" id="debit" />
                      <Label htmlFor="debit" className="cursor-pointer">Debit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                      <RadioGroupItem value="bank" id="bank" />
                      <Label htmlFor="bank" className="cursor-pointer">Bank Transfer</Label>
                    </div>
                  </RadioGroup>
                </div>

                {formData.paymentMethod && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">Payment Instructions</h4>
                      <p className="text-sm text-blue-700">
                        Please make the payment using your selected method and upload the receipt below.
                        Your application will be processed once the payment is confirmed.
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="receipt" className="text-slate-700">Upload Payment Receipt *</Label>
                      <div className="flex items-center justify-center w-full">
                        <label
                          htmlFor="receipt"
                          className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-lg cursor-pointer hover:bg-slate-50"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-slate-500"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-slate-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-slate-500">PNG, JPG or PDF (MAX. 10MB)</p>
                          </div>
                          <input
                            id="receipt"
                            type="file"
                            className="hidden"
                            accept=".png,.jpg,.jpeg,.pdf"
                            onChange={handleFileChange}
                            required
                          />
                        </label>
                      </div>
                      {formData.receiptFile && (
                        <p className="text-sm text-slate-600 mt-2">
                          Selected file: {formData.receiptFile.name}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/apply/step3")}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                  disabled={!formData.paymentMethod || !formData.receiptFile}
                >
                  Submit Application
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 