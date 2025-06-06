export interface ApplicationSettings {
  tourDateNote: string
  zelleEmail: string
  zelleName: string
  cashAppTag: string
}

export const defaultSettings: ApplicationSettings = {
  tourDateNote: "Note: The current tenant's lease expires on September 15th, 2025. Please select a tour date after this date.",
  zelleEmail: "payments@example.com",
  zelleName: "Property Management LLC",
  cashAppTag: "$PropertyMgmt"
}

export function getApplicationSettings(): ApplicationSettings {
  if (typeof window === 'undefined') return defaultSettings
  
  const savedSettings = localStorage.getItem("applicationSettings")
  if (savedSettings) {
    return JSON.parse(savedSettings)
  }
  return defaultSettings
} 