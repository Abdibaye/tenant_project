"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  monthlyIncome: Yup.number()
    .required("Monthly income is required")
    .positive("Monthly income must be positive"),
  annualIncome: Yup.number()
    .required("Annual income is required")
    .positive("Annual income must be positive"),
  outstandingDebts: Yup.number()
    .required("Outstanding debts are required")
    .min(0, "Outstanding debts cannot be negative"),
  missedRentPayments: Yup.string()
    .required("Please indicate if you have ever missed a rent payment"),
  landlordReferences: Yup.string()
    .required("Please provide landlord references"),
  hasEvictionHistory: Yup.string()
    .required("Please indicate if you have an eviction history"),
  hasBankruptcy: Yup.string()
    .required("Please indicate if you have filed for bankruptcy")
})

export default function Step2() {
  const router = useRouter()
  const { formData, updateFormData } = useApplicationStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true)
    try {
      // Update store with step 2 data
      updateFormData(values)
      
      // Reset form fields
      resetForm()
      
      // Navigate to next step
      router.push("/apply/step3")
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Financial Information</h1>
          <p className="text-slate-600">Step 2 of 4</p>
          <Progress value={50} className="mt-4" />
        </div>

        <Formik
          initialValues={{
            monthlyIncome: formData.monthlyIncome || "",
            annualIncome: formData.annualIncome || "",
            outstandingDebts: formData.outstandingDebts || "",
            missedRentPayments: formData.missedRentPayments || "",
            landlordReferences: formData.landlordReferences || "",
            hasEvictionHistory: formData.hasEvictionHistory || "",
            hasBankruptcy: formData.hasBankruptcy || ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={false}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="space-y-8">
              <Card className="shadow-sm border border-slate-200">
                <CardHeader className="bg-white border-b border-slate-200">
                  <CardTitle className="text-xl text-slate-900">Financial Information</CardTitle>
                  <CardDescription className="text-slate-600">
                    Please provide your financial details and history
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                  {/* Income Section */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Income Details</h3>
                      <p className="text-sm text-slate-600">Please provide your monthly and annual income information</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="monthlyIncome" className="text-slate-700">Monthly Income *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                          <Field
                            as={Input}
                            id="monthlyIncome"
                            name="monthlyIncome"
                            type="number"
                            placeholder="0.00"
                            className={`pl-7 border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                              errors.monthlyIncome && touched.monthlyIncome ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name="monthlyIncome"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="annualIncome" className="text-slate-700">Annual Income *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                          <Field
                            as={Input}
                            id="annualIncome"
                            name="annualIncome"
                            type="number"
                            placeholder="0.00"
                            className={`pl-7 border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                              errors.annualIncome && touched.annualIncome ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name="annualIncome"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Debts Section */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Debts & Financial History</h3>
                      <p className="text-sm text-slate-600">Please provide information about your outstanding debts and financial history</p>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="outstandingDebts" className="text-slate-700">Outstanding Debts *</Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                          <Field
                            as={Input}
                            id="outstandingDebts"
                            name="outstandingDebts"
                            type="number"
                            placeholder="0.00"
                            className={`pl-7 border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                              errors.outstandingDebts && touched.outstandingDebts ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name="outstandingDebts"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="landlordReferences" className="text-slate-700">Landlord References *</Label>
                        <Field
                          as={Textarea}
                          id="landlordReferences"
                          name="landlordReferences"
                          placeholder="Please provide contact information for your previous landlords (name, phone, email, address)"
                          className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 min-h-[100px] ${
                            errors.landlordReferences && touched.landlordReferences ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="landlordReferences"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rental History Section */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Rental History</h3>
                      <p className="text-sm text-slate-600">Please provide information about your rental history</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="missedRentPayments" className="text-slate-700">Have you ever missed a rent payment? *</Label>
                        <RadioGroup
                          value={values.missedRentPayments}
                          onValueChange={(value) => setFieldValue("missedRentPayments", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="missedRentPayments-yes" />
                            <Label htmlFor="missedRentPayments-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="missedRentPayments-no" />
                            <Label htmlFor="missedRentPayments-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="missedRentPayments"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasEvictionHistory" className="text-slate-700">Have you ever been evicted? *</Label>
                        <RadioGroup
                          value={values.hasEvictionHistory}
                          onValueChange={(value) => setFieldValue("hasEvictionHistory", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hasEvictionHistory-yes" />
                            <Label htmlFor="hasEvictionHistory-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hasEvictionHistory-no" />
                            <Label htmlFor="hasEvictionHistory-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="hasEvictionHistory"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasBankruptcy" className="text-slate-700">Have you filed for bankruptcy? *</Label>
                        <RadioGroup
                          value={values.hasBankruptcy}
                          onValueChange={(value) => setFieldValue("hasBankruptcy", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hasBankruptcy-yes" />
                            <Label htmlFor="hasBankruptcy-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hasBankruptcy-no" />
                            <Label htmlFor="hasBankruptcy-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="hasBankruptcy"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 border-t border-slate-200">
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/apply/step1")}
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
                          Saving...
                        </>
                      ) : (
                        "Next Step"
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