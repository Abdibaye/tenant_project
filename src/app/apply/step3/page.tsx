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
import { Loader2, Calendar as CalendarIcon } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

const validationSchema = Yup.object().shape({
  numberOfOccupants: Yup.number()
    .required("Number of occupants is required")
    .positive("Number of occupants must be positive")
    .integer("Number of occupants must be a whole number"),
  hasChildren: Yup.string()
    .required("Please indicate if you have children"),
  plannedStayDuration: Yup.string()
    .required("Please indicate how long you plan to stay"),
  hasPets: Yup.string()
    .required("Please indicate if you have pets"),
  petDetails: Yup.string()
    .when("hasPets", {
      is: "yes",
      then: (schema) => schema.required("Please provide details about your pets")
    }),
  hasSmoking: Yup.string()
    .required("Please indicate if you smoke or vape"),
  repairHandling: Yup.string()
    .required("Please describe how you handle minor repairs"),
  moveInDate: Yup.string()
    .required("Please indicate when you can move in"),
  needsFlexibility: Yup.string()
    .required("Please indicate if you need flexibility"),
  hasConsent: Yup.string()
    .required("Please indicate if you consent to background/credit check")
})

export default function Step3() {
  const router = useRouter()
  const { formData, updateFormData } = useApplicationStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true)
    try {
      // Update store with step 3 data
      updateFormData(values)
      
      // Reset form fields
      resetForm()
      
      // Navigate to next step
      router.push("/apply/step4")
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Personal Information</h1>
          <p className="text-slate-600">Step 3 of 4</p>
          <Progress value={75} className="mt-4" />
        </div>

        <Formik
          initialValues={{
            numberOfOccupants: formData.numberOfOccupants || "",
            hasChildren: formData.hasChildren || "",
            plannedStayDuration: formData.plannedStayDuration || "",
            hasPets: formData.hasPets || "",
            petDetails: formData.petDetails || "",
            hasSmoking: formData.hasSmoking || "",
            repairHandling: formData.repairHandling || "",
            moveInDate: formData.moveInDate || "",
            needsFlexibility: formData.needsFlexibility || "",
            hasConsent: formData.hasConsent || ""
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={false}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="space-y-8">
              <Card className="shadow-sm border border-slate-200">
                <CardHeader className="bg-white border-b border-slate-200">
                  <CardTitle className="text-xl text-slate-900">Personal Information</CardTitle>
                  <CardDescription className="text-slate-600">
                    Please provide details about your living situation and preferences
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                  {/* Living Situation Section */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Living Situation</h3>
                      <p className="text-sm text-slate-600">Please provide information about your household and living preferences</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="numberOfOccupants" className="text-slate-700">Number of Occupants *</Label>
                        <Field
                          as={Input}
                          id="numberOfOccupants"
                          name="numberOfOccupants"
                          type="number"
                          placeholder="Enter number of occupants"
                          className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                            errors.numberOfOccupants && touched.numberOfOccupants ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="numberOfOccupants"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasChildren" className="text-slate-700">Do you have children? *</Label>
                        <RadioGroup
                          value={values.hasChildren}
                          onValueChange={(value) => setFieldValue("hasChildren", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hasChildren-yes" />
                            <Label htmlFor="hasChildren-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hasChildren-no" />
                            <Label htmlFor="hasChildren-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="hasChildren"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="plannedStayDuration" className="text-slate-700">How long do you plan to stay? *</Label>
                        <Field
                          as={Input}
                          id="plannedStayDuration"
                          name="plannedStayDuration"
                          placeholder="e.g., 1 year, 2 years, etc."
                          className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                            errors.plannedStayDuration && touched.plannedStayDuration ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="plannedStayDuration"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="moveInDate" className="text-slate-700 flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4" />
                          When can you move in? *
                        </Label>
                        <Field
                          as={Input}
                          id="moveInDate"
                          name="moveInDate"
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                            errors.moveInDate && touched.moveInDate ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="moveInDate"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Lifestyle Section */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Lifestyle & Preferences</h3>
                      <p className="text-sm text-slate-600">Please provide information about your lifestyle and preferences</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="hasPets" className="text-slate-700">Do you have any pets? *</Label>
                        <RadioGroup
                          value={values.hasPets}
                          onValueChange={(value) => setFieldValue("hasPets", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hasPets-yes" />
                            <Label htmlFor="hasPets-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hasPets-no" />
                            <Label htmlFor="hasPets-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="hasPets"
                          component="p"
                          className="text-sm text-red-500"
                        />
                        {values.hasPets === "yes" && (
                          <Field
                            as={Textarea}
                            name="petDetails"
                            placeholder="Please provide details about your pets (breed, size, etc.)"
                            className="border-slate-200 focus:border-slate-400 focus:ring-slate-400 min-h-[100px]"
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasSmoking" className="text-slate-700">Do you smoke or vape? *</Label>
                        <RadioGroup
                          value={values.hasSmoking}
                          onValueChange={(value) => setFieldValue("hasSmoking", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hasSmoking-yes" />
                            <Label htmlFor="hasSmoking-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hasSmoking-no" />
                            <Label htmlFor="hasSmoking-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="hasSmoking"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="needsFlexibility" className="text-slate-700">Do you need flexibility? *</Label>
                        <RadioGroup
                          value={values.needsFlexibility}
                          onValueChange={(value) => setFieldValue("needsFlexibility", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="needsFlexibility-yes" />
                            <Label htmlFor="needsFlexibility-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="needsFlexibility-no" />
                            <Label htmlFor="needsFlexibility-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="needsFlexibility"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Maintenance & Consent Section */}
                  <div className="space-y-6">
                    <div className="border-b border-slate-200 pb-2">
                      <h3 className="text-lg font-semibold text-slate-900">Maintenance & Consent</h3>
                      <p className="text-sm text-slate-600">Please provide information about maintenance preferences and consent</p>
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="repairHandling" className="text-slate-700">How do you handle minor repairs? *</Label>
                        <Field
                          as={Textarea}
                          id="repairHandling"
                          name="repairHandling"
                          placeholder="e.g., changing air filters, basic maintenance"
                          className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 min-h-[100px] ${
                            errors.repairHandling && touched.repairHandling ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="repairHandling"
                          component="p"
                          className="text-sm text-red-500"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="hasConsent" className="text-slate-700">Do you consent to background/credit check? *</Label>
                        <RadioGroup
                          value={values.hasConsent}
                          onValueChange={(value) => setFieldValue("hasConsent", value)}
                          className="space-y-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="hasConsent-yes" />
                            <Label htmlFor="hasConsent-yes" className="text-slate-700">Yes</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="hasConsent-no" />
                            <Label htmlFor="hasConsent-no" className="text-slate-700">No</Label>
                          </div>
                        </RadioGroup>
                        <ErrorMessage
                          name="hasConsent"
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
                      onClick={() => router.push("/apply/step2")}
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