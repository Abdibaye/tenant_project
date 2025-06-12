"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Loader2, Calendar as CalendarIcon, Clock } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  tourDate: Yup.string().required("Tour date is required"),
  tourTime: Yup.string().required("Tour time is required")
})

export default function Step4() {
  const router = useRouter()
  const { formData, updateFormData } = useApplicationStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tourDateDescription, setTourDateDescription] = useState("")
  const [minDate, setMinDate] = useState<Date | undefined>(undefined)

  useEffect(() => {
    const savedSettings = localStorage.getItem("applicationSettings")
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings)
        const description = settings.tourDateDescription || "Note: The current tenant's lease expires on July 28th. Please select a tour date after this date."
        setTourDateDescription(description)

        const dateMatch = description.match(/expires on ([A-Za-z]+ \d{1,2})/i)
        if (dateMatch) {
          try {
            const expiryDate = new Date(dateMatch[1])
            if (!isNaN(expiryDate.getTime())) {
              const nextDay = new Date(expiryDate)
              nextDay.setDate(nextDay.getDate() + 1)
              setMinDate(nextDay)
            } else {
              setDefaultMinDate()
            }
          } catch (error) {
            console.error("Error parsing date:", error)
            setDefaultMinDate()
          }
        } else {
          setDefaultMinDate()
        }
      } catch (error) {
        console.error("Error parsing settings:", error)
        setTourDateDescription("Note: The current tenant's lease expires on July 28th. Please select a tour date after this date.")
        setDefaultMinDate()
      }
    } else {
      setTourDateDescription("Note: The current tenant's lease expires on July 28th. Please select a tour date after this date.")
      setDefaultMinDate()
    }
  }, [])

  const setDefaultMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    setMinDate(tomorrow)
  }

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true)
    try {
      updateFormData(values)
      resetForm()
      router.push("/apply/step5")
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Tour Schedule</h1>
          <p className="text-slate-600">Step 4 of 5</p>
          <Progress value={80} className="mt-4" />
        </div>

        <Formik
          initialValues={{
            tourDate: formData.tourDate
              ? new Date(formData.tourDate).toISOString().split("T")[0]
              : "",
            tourTime: formData.tourTime || ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={false}
        >
          {({ errors, touched }) => (
            <Form className="space-y-8">
              <Card className="shadow-sm border border-slate-200">
                <CardHeader className="bg-white border-b border-slate-200">
                  <CardTitle className="text-xl text-slate-900">Tour Schedule</CardTitle>
                  <CardDescription className="text-slate-600">
                    Select your preferred date and time for the property tour
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Tour Schedule</h3>
                      <p className="text-sm text-slate-600">Select your preferred date and time for the property tour</p>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-slate-900">Tour Date Selection</h3>
                      {tourDateDescription && (
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <h4 className="font-semibold text-blue-900 mb-2">Tour Date Information</h4>
                          <p className="text-sm text-blue-700">{tourDateDescription}</p>
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="tourDate" className="text-slate-700 flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4" />
                            Tour Date *
                          </Label>
                          <Field
                            as={Input}
                            id="tourDate"
                            name="tourDate"
                            type="date"
                            min={minDate?.toISOString().split("T")[0]}
                            className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                              errors.tourDate && touched.tourDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="tourDate"
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="tourTime" className="text-slate-700 flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            Tour Time *
                          </Label>
                          <Field
                            as={Input}
                            id="tourTime"
                            name="tourTime"
                            type="time"
                            className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                              errors.tourTime && touched.tourTime ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                          />
                          <ErrorMessage
                            name="tourTime"
                            component="p"
                            className="text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 border-t border-slate-200">
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/apply/step3")}
                      className="border-slate-200 text-slate-700 hover:bg-slate-50"
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white min-w-[120px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Next...
                        </>
                      ) : (
                        "Next"
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </motion.div>
  )
}
