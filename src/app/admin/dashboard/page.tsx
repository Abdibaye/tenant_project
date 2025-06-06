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
}

export default function AdminDashboard() {
  const router = useRouter()
  const [settings, setSettings] = useState<Settings>({
    tourDateNote: "",
    zelleEmail: "",
    zelleName: "",
    cashAppTag: "",
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
      setSettings(JSON.parse(savedSettings))
    }
  }, [router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem("applicationSettings", JSON.stringify(settings))
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
              </div>

              {/* Zelle Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Zelle Payment Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="zelleEmail" className="text-slate-700">Zelle Email</Label>
                    <Input
                      id="zelleEmail"
                      type="email"
                      value={settings.zelleEmail}
                      onChange={(e) => setSettings({ ...settings, zelleEmail: e.target.value })}
                      placeholder="Enter Zelle email"
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zelleName" className="text-slate-700">Zelle Name</Label>
                    <Input
                      id="zelleName"
                      value={settings.zelleName}
                      onChange={(e) => setSettings({ ...settings, zelleName: e.target.value })}
                      placeholder="Enter Zelle name"
                      className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                    />
                  </div>
                </div>
              </div>

              {/* Cash App Settings */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Cash App Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="cashAppTag" className="text-slate-700">Cash App $Cashtag</Label>
                  <Input
                    id="cashAppTag"
                    value={settings.cashAppTag}
                    onChange={(e) => setSettings({ ...settings, cashAppTag: e.target.value })}
                    placeholder="Enter Cash App $Cashtag"
                    className="border-slate-200 focus:border-slate-400 focus:ring-slate-400"
                  />
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