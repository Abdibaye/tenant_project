"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Settings {
  tourDateNote: string
  zelleEmail: string
  zelleName: string
  cashAppTag: string
  tourDateDescription: string
  paymentInstructions: {
    zelle: {
      email: string
      name: string
    }
    cashApp: {
      cashtag: string
    }
    applicationFee: number
  }
}

export default function AdminDashboard() {
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({
    tourDateNote: "",
    zelleEmail: "",
    zelleName: "",
    cashAppTag: "",
    tourDateDescription: "The current tenant's lease expires on September 15, 2025. Kindly select a tour date after this date.",
    paymentInstructions: {
      zelle: {
        email: "payments@example.com",
        name: "Pinnacle Property Management"
      },
      cashApp: {
        cashtag: "$PinnaclePropertyManagement"
      },
      applicationFee: 0
    }
  })
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem("adminAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin/login")
      return
    }

    // Load saved settings
    const savedSettings = localStorage.getItem("applicationSettings")
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      // Ensure paymentInstructions exists in the loaded settings
      setSettings({
        ...parsedSettings,
        paymentInstructions: parsedSettings.paymentInstructions || {
          zelle: {
            email: "payments@example.com",
            name: "Pinnacle Property Management"
          },
          cashApp: {
            cashtag: "$PinnaclePropertyManagement"
          },
          applicationFee: 0
        }
      })
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Ensure paymentInstructions is included when saving
    const settingsToSave = {
      ...settings,
      paymentInstructions: settings.paymentInstructions || {
        zelle: {
          email: "payments@example.com",
          name: "Pinnacle Property Management"
        },
        cashApp: {
          cashtag: "$PinnaclePropertyManagement"
        },
        applicationFee: 0
      }
    }
    localStorage.setItem("applicationSettings", JSON.stringify(settingsToSave))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-slate-200 hover:bg-slate-50"
          >
            Logout
          </Button>
        </div>

        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-white border-b border-slate-200">
            <CardTitle className="text-xl text-slate-900">Application Settings</CardTitle>
            <CardDescription className="text-slate-600">
              Update the application form settings
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Tour Date Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Tour Date Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="tourDateNote" className="text-slate-700">Tour Date Note</Label>
                  <Textarea
                    id="tourDateNote"
                    value={settings.tourDateNote}
                    onChange={(e) => setSettings({ ...settings, tourDateNote: e.target.value })}
                    placeholder="Enter the note to display for tour date selection"
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tourDateDescription" className="text-slate-700">Tour Date Description</Label>
                  <Textarea
                    id="tourDateDescription"
                    value={settings.tourDateDescription}
                    onChange={(e) => setSettings({ ...settings, tourDateDescription: e.target.value })}
                    placeholder="Enter the description for tour date selection"
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    rows={3}
                  />
                </div>
              </div>

              {/* Payment Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Payment Settings</h3>
                <div className="space-y-6">
                  {/* Application Fee */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700">Application Fee</h4>
                    <div className="space-y-2">
                      <Label htmlFor="applicationFee" className="text-slate-700">Application Fee Amount ($)</Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                        <Input
                          id="applicationFee"
                          type="number"
                          min="0"
                          step="1"
                          value={settings.paymentInstructions.applicationFee}
                          onChange={(e) => setSettings({
                            ...settings,
                            paymentInstructions: {
                              ...settings.paymentInstructions,
                              applicationFee: parseInt(e.target.value) || 0
                            }
                          })}
                          placeholder="Enter application fee amount"
                          className="pl-7 border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Zelle Settings */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700">Zelle Payment Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="zellePaymentEmail" className="text-slate-700">Zelle Email</Label>
                        <Input
                          id="zellePaymentEmail"
                          type="email"
                          value={settings.paymentInstructions.zelle.email}
                          onChange={(e) => setSettings({
                            ...settings,
                            paymentInstructions: {
                              ...settings.paymentInstructions,
                              zelle: {
                                ...settings.paymentInstructions.zelle,
                                email: e.target.value
                              }
                            }
                          })}
                          placeholder="Enter Zelle payment email"
                          className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zellePaymentName" className="text-slate-700">Zelle Name</Label>
                        <Input
                          id="zellePaymentName"
                          type="text"
                          value={settings.paymentInstructions.zelle.name}
                          onChange={(e) => setSettings({
                            ...settings,
                            paymentInstructions: {
                              ...settings.paymentInstructions,
                              zelle: {
                                ...settings.paymentInstructions.zelle,
                                name: e.target.value
                              }
                            }
                          })}
                          placeholder="Enter Zelle payment name"
                          className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cash App Settings */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium text-slate-700">Cash App Payment Information</h4>
                    <div className="space-y-2">
                      <Label htmlFor="cashAppCashtag" className="text-slate-700">Cash App $Cashtag</Label>
                      <Input
                        id="cashAppCashtag"
                        value={settings.paymentInstructions.cashApp.cashtag}
                        onChange={(e) => setSettings({
                          ...settings,
                          paymentInstructions: {
                            ...settings.paymentInstructions,
                            cashApp: {
                              ...settings.paymentInstructions.cashApp,
                              cashtag: e.target.value
                            }
                          }
                        })}
                        placeholder="Enter Cash App $Cashtag"
                        className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                {saved && (
                  <p className="text-sm text-green-600">Settings saved successfully!</p>
                )}
                <Button
                  type="submit"
                  className="bg-slate-900 hover:bg-slate-800 text-white"
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 