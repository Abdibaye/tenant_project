"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
})

// Hardcoded credentials
const ADMIN_EMAIL = "admin@example.com"
const ADMIN_PASSWORD = "admin123456"

export default function AdminLogin() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    setError("")
    try {
      // Check credentials
      if (values.email === ADMIN_EMAIL && values.password === ADMIN_PASSWORD) {
        // Set authentication state
        localStorage.setItem("adminAuthenticated", "true")
        // Redirect to dashboard
        router.push("/admin/dashboard")
      } else {
        setError("Invalid email or password")
      }
    } catch (error) {
      console.error("Error logging in:", error)
      setError("An error occurred during login")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Admin Login</CardTitle>
            <CardDescription className="text-slate-600">
              Sign in to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <Formik
              initialValues={{
                email: "",
                password: ""
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Email Address</Label>
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
                      <Label htmlFor="password" className="text-slate-700">Password</Label>
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className={`border-slate-200 focus:border-slate-400 focus:ring-slate-400 ${
                          errors.password && touched.password ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""
                        }`}
                      />
                      <ErrorMessage
                        name="password"
                        component="p"
                        className="text-sm text-red-500"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                  {error && (
                    <p className="text-sm text-red-500 mt-2 text-center">{error}</p>
                  )}
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
} 