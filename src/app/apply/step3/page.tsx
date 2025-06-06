"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useApplicationStore } from "@/lib/store"

export default function Step3() {
  const router = useRouter()
  const { formData, setFormData } = useApplicationStore()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/apply/step4")
  }

  const isDateDisabled = (date: Date) => {
    const leaseExpiry = new Date("2025-09-15")
    return date < leaseExpiry
  }

  return (
    <div className="container max-w-2xl py-10">
      <Card>
        <CardHeader>
          <CardTitle>Select Tour Date</CardTitle>
          <CardDescription>
            Choose your preferred date for a property tour. Note that tours are only available after the current tenant's lease expiry on September 15, 2025.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label>Preferred Tour Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.tourDate ? (
                      format(formData.tourDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={formData.tourDate || undefined}
                    onSelect={(date) => setFormData({ tourDate: date })}
                    disabled={isDateDisabled}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/apply/step2")}
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