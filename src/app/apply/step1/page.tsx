"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"

export default function Step1() {
  const router = useRouter()
  const { formData, setFormData } = useApplicationStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/apply/step2")
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Please provide your basic contact information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={formData.fullName}
                onChange={(e) => setFormData({ fullName: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ phoneNumber: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address</Label>
              <Input
                id="currentAddress"
                value={formData.currentAddress}
                onChange={(e) => setFormData({ currentAddress: e.target.value })}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Next Step
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
} 