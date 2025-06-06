"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"

export default function Step4() {
  const router = useRouter()
  const { formData, setFormData } = useApplicationStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/apply/confirmation")
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setFormData({ receiptFile: file })
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Payment Information</CardTitle>
          <CardDescription>
            Please select your payment method and upload your payment receipt.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Application Fee</h3>
              <p className="text-sm text-gray-500">
                A non-refundable application fee of $50 is required. This fee covers the cost of processing your application and conducting background checks.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Method</h3>
              <RadioGroup
                value={formData.paymentMethod}
                onValueChange={(value) => setFormData({ paymentMethod: value })}
                required
              >
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="credit" id="credit" />
                    <Label htmlFor="credit">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="debit" id="debit" />
                    <Label htmlFor="debit">Debit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="zelle" id="zelle" />
                    <Label htmlFor="zelle">Zelle</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cashapp" id="cashapp" />
                    <Label htmlFor="cashapp">Cash App</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Instructions</h3>
              <div className="rounded-lg border p-4">
                <p className="text-sm">
                  {formData.paymentMethod === "zelle" && (
                    <>
                      Please send your payment to:<br />
                      Email: payments@example.com<br />
                      Name: Property Management LLC
                    </>
                  )}
                  {formData.paymentMethod === "cashapp" && (
                    <>
                      Please send your payment to:<br />
                      $PropertyManagementLLC
                    </>
                  )}
                  {formData.paymentMethod === "bank" && (
                    <>
                      Please send your payment to:<br />
                      Bank: Example Bank<br />
                      Account Number: 1234567890<br />
                      Routing Number: 987654321
                    </>
                  )}
                  {!["zelle", "cashapp", "bank"].includes(formData.paymentMethod) && (
                    "Please proceed with your payment using the selected method."
                  )}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Upload Receipt</h3>
              <div className="space-y-2">
                <Label htmlFor="receipt">Payment Receipt</Label>
                <input
                  id="receipt"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  required
                  className="w-full"
                />
                <p className="text-sm text-gray-500">
                  Please upload a screenshot or photo of your payment receipt. Accepted formats: PDF, JPG, PNG
                </p>
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/apply/step3")}
              >
                Previous
              </Button>
              <Button type="submit">Submit Application</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 