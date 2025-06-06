"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"

export default function Step2() {
  const router = useRouter()
  const { formData, setFormData } = useApplicationStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/apply/step3")
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Application Questions</CardTitle>
          <CardDescription>
            Please provide detailed information about your financial and personal situation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Financial Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Financial Information</h3>
              
              <div className="space-y-2">
                <Label htmlFor="monthlyIncome">Monthly Income</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => setFormData({ monthlyIncome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annualIncome">Annual Income</Label>
                <Input
                  id="annualIncome"
                  type="number"
                  value={formData.annualIncome}
                  onChange={(e) => setFormData({ annualIncome: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="outstandingDebts">Outstanding Debts</Label>
                <Input
                  id="outstandingDebts"
                  type="number"
                  value={formData.outstandingDebts}
                  onChange={(e) => setFormData({ outstandingDebts: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="missedRentPayments">Have you ever missed a rent payment?</Label>
                <RadioGroup
                  value={formData.missedRentPayments}
                  onValueChange={(value) => setFormData({ missedRentPayments: value })}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="missedRentPayments-yes" />
                    <Label htmlFor="missedRentPayments-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="missedRentPayments-no" />
                    <Label htmlFor="missedRentPayments-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>

              <div className="space-y-2">
                <Label htmlFor="numberOfOccupants">Number of Occupants</Label>
                <Input
                  id="numberOfOccupants"
                  type="number"
                  value={formData.numberOfOccupants}
                  onChange={(e) => setFormData({ numberOfOccupants: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hasPets">Do you have any pets?</Label>
                <RadioGroup
                  value={formData.hasPets}
                  onValueChange={(value) => setFormData({ hasPets: value })}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hasPets-yes" />
                    <Label htmlFor="hasPets-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hasPets-no" />
                    <Label htmlFor="hasPets-no">No</Label>
                  </div>
                </RadioGroup>
                {formData.hasPets === "yes" && (
                  <Textarea
                    placeholder="Please provide details about your pets"
                    value={formData.petDetails}
                    onChange={(e) => setFormData({ petDetails: e.target.value })}
                    required
                  />
                )}
              </div>
            </div>

            {/* Additional Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Additional Questions</h3>

              <div className="space-y-2">
                <Label htmlFor="hasCriminalRecord">Do you have any criminal record?</Label>
                <RadioGroup
                  value={formData.hasCriminalRecord}
                  onValueChange={(value) => setFormData({ hasCriminalRecord: value })}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hasCriminalRecord-yes" />
                    <Label htmlFor="hasCriminalRecord-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hasCriminalRecord-no" />
                    <Label htmlFor="hasCriminalRecord-no">No</Label>
                  </div>
                </RadioGroup>
                {formData.hasCriminalRecord === "yes" && (
                  <Textarea
                    placeholder="Please provide details about your criminal record"
                    value={formData.criminalRecordDetails}
                    onChange={(e) => setFormData({ criminalRecordDetails: e.target.value })}
                    required
                  />
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="hasEvictionHistory">Have you ever been evicted?</Label>
                <RadioGroup
                  value={formData.hasEvictionHistory}
                  onValueChange={(value) => setFormData({ hasEvictionHistory: value })}
                  required
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="hasEvictionHistory-yes" />
                    <Label htmlFor="hasEvictionHistory-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="hasEvictionHistory-no" />
                    <Label htmlFor="hasEvictionHistory-no">No</Label>
                  </div>
                </RadioGroup>
                {formData.hasEvictionHistory === "yes" && (
                  <Textarea
                    placeholder="Please provide details about your eviction history"
                    value={formData.evictionHistoryDetails}
                    onChange={(e) => setFormData({ evictionHistoryDetails: e.target.value })}
                    required
                  />
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/apply/step1")}
              >
                Previous
              </Button>
              <Button type="submit">Next Step</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 