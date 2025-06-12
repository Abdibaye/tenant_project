"use client"

import React from 'react'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getApplicationSettings, updateApplicationSettings, type ApplicationSettings } from "@/lib/settings"
import { getSession, signOut } from "@/lib/auth"
import { getSettings } from "@/lib/settings"

export default function AdminDashboard() {
  const router = useRouter()
  const [settings, setSettings] = useState<ApplicationSettings>({
    tourDateNote: "",
    zelleEmail: "",
    zelleName: "",
    cashAppTag: "",
    tourDateDescription: "",
    paymentInstructions: {
      zelle: {
        email: "",
        name: ""
      },
      cashApp: {
        cashtag: ""
      },
      applicationFee: 0,
      refundAmount: 0
    }
  })
  const [saved, setSaved] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      const session = await getSession()
      if (!session) {
        router.push("/admin/login")
        return
      }

      try {
        const currentSettings = await getSettings()
        // Initialize Zelle and Cash App fields from payment instructions
        setSettings({
          ...currentSettings,
          zelleEmail: currentSettings.paymentInstructions.zelle.email,
          zelleName: currentSettings.paymentInstructions.zelle.name,
          cashAppTag: currentSettings.paymentInstructions.cashApp.cashtag
        })
      } catch (error) {
        console.error("Error loading settings:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Update payment instructions with current Zelle and Cash App information
      const updatedSettings = {
        ...settings,
        paymentInstructions: {
          ...settings.paymentInstructions,
          zelle: {
            email: settings.zelleEmail,
            name: settings.zelleName
          },
          cashApp: {
            cashtag: settings.cashAppTag
          }
        }
      }

      // Save the updated settings
      await updateApplicationSettings(updatedSettings)
      
      // Wait a moment to ensure the database has updated
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Refresh the settings to ensure we have the latest data
      const currentSettings = await getSettings()
      
      // Update the state with the latest settings
      setSettings(prevSettings => ({
        ...currentSettings,
        zelleEmail: currentSettings.zelleEmail,
        zelleName: currentSettings.zelleName,
        cashAppTag: currentSettings.cashAppTag
      }))

      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      alert("Failed to save settings. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      router.push("/admin/login")
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Application Settings</CardTitle>
            <CardDescription>
              Update the application settings and payment information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="tourDateNote">Tour Date Note</Label>
                  <Textarea
                    id="tourDateNote"
                    value={settings.tourDateNote}
                    onChange={(e) =>
                      setSettings({ ...settings, tourDateNote: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="tourDateDescription">Tour Date Description</Label>
                  <Textarea
                    id="tourDateDescription"
                    value={settings.tourDateDescription}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        tourDateDescription: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="zelleEmail">Zelle Email</Label>
                    <Input
                      id="zelleEmail"
                      value={settings.zelleEmail}
                      onChange={(e) =>
                        setSettings({ ...settings, zelleEmail: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="zelleName">Zelle Name</Label>
                    <Input
                      id="zelleName"
                      value={settings.zelleName}
                      onChange={(e) =>
                        setSettings({ ...settings, zelleName: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="cashAppTag">Cash App Tag</Label>
                  <Input
                    id="cashAppTag"
                    value={settings.cashAppTag}
                    onChange={(e) =>
                      setSettings({ ...settings, cashAppTag: e.target.value })
                    }
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="applicationFee">Application Fee</Label>
                    <Input
                      id="applicationFee"
                      type="number"
                      value={settings.paymentInstructions.applicationFee}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          paymentInstructions: {
                            ...settings.paymentInstructions,
                            applicationFee: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="refundAmount">Refund Amount</Label>
                    <Input
                      id="refundAmount"
                      type="number"
                      value={settings.paymentInstructions.refundAmount}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          paymentInstructions: {
                            ...settings.paymentInstructions,
                            refundAmount: Number(e.target.value),
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : saved ? "Saved!" : "Save Changes"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 