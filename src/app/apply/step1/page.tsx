"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  phoneNumber: Yup.string()
    .matches(/^\+?[\d\s-]{10,}$/, "Please enter a valid phone number")
    .required("Phone number is required"),
  currentAddress: Yup.string()
    .required("Current address is required")
    .min(5, "Address must be at least 5 characters")
})

export default function Step1() {
  const router = useRouter()
  const { formData, updateFormData } = useApplicationStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true)
    try {
      // Update store with step 1 data
      updateFormData(values)
      
      // Reset form fields
      resetForm()
      
      // Navigate to next step
      router.push("/apply/step2")
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
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-slate-50 py-12"
    >
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Basic Information</h1>
          <p className="text-slate-600">Step 1 of 4</p>
          <Progress value={25} className="mt-4" />
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Personal Details</CardTitle>
            <CardDescription className="text-slate-600">
              Please provide your contact information
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <Formik
              initialValues={{
                fullName: formData.fullName || "",
                email: formData.email || "",
                phoneNumber: formData.phoneNumber || "",
                currentAddress: formData.currentAddress || ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={false}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName" className="text-slate-700">Full Name *</Label>
                      <Field
                        as={Input}
                        id="fullName"
                        name="fullName"
                        placeholder="Enter your full name"
                        className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                          errors.fullName && touched.fullName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="fullName"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Email Address *</Label>
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                          errors.email && touched.email ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="email"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber" className="text-slate-700">Phone Number *</Label>
                      <Field
                        as={Input}
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        placeholder="(555) 123-4567"
                        className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                          errors.phoneNumber && touched.phoneNumber ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="phoneNumber"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="currentAddress" className="text-slate-700">Current Address *</Label>
                      <Field
                        as={Input}
                        id="currentAddress"
                        name="currentAddress"
                        placeholder="Enter your current address"
                        className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                          errors.currentAddress && touched.currentAddress ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="currentAddress"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-slate-900 hover:bg-slate-800 text-white min-w-[120px]"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Next Step"
                      )}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
} 