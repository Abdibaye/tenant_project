"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function Step3() {
  const router = useRouter()
  const [date, setDate] = useState<Date>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (date) {
      localStorage.setItem("application_step3", JSON.stringify({ tourDate: date.toISOString() }))
      router.push("/apply/step4")
    }
  }

  // Function to check if a date should be disabled
  const isDateDisabled = (date: Date) => {
    const leaseExpiry = new Date("2025-09-15")
    return date < leaseExpiry
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Schedule Tour</h1>
          <p className="text-slate-600">Step 3 of 4</p>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Select Tour Date</CardTitle>
            <CardDescription className="text-slate-600">
              Choose a date for your property tour
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-slate-700">Preferred Tour Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`w-full justify-start text-left font-normal ${
                          !date && "text-slate-500"
                        } border-slate-200 hover:bg-slate-50`}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Select tour date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        disabled={isDateDisabled}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <p className="text-sm text-slate-500 mt-2">
                    Note: The current tenant's lease expires on September 15th, 2025. 
                    Please select a tour date after this date.
                  </p>
                </div>
              </div>

              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/apply/step2")}
                  className="border-slate-200 hover:bg-slate-50"
                >
                  Previous
                </Button>
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                  disabled={!date}
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