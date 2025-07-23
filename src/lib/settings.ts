import { supabase } from './supabase'

export interface ApplicationSettings {
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
    refundAmount: number
  }
  godaddyPaymentEnabled?: boolean
  godaddyPayLink?: string
  cashAppEnabled?: boolean
  zelleEnabled?: boolean
}

const defaultSettings: ApplicationSettings = {
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
  },
  godaddyPaymentEnabled: false,
  godaddyPayLink: "",
  cashAppEnabled: true,
  zelleEnabled: true
}

export async function getApplicationSettings(): Promise<ApplicationSettings> {
  try {
    // Try to get existing settings
    const { data, error } = await supabase
      .from('application_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Error fetching settings:', error)
      return defaultSettings
    }

    // If no settings exist, create default settings
    if (!data) {
      const { error: insertError } = await supabase
        .from('application_settings')
        .insert([{
          tour_date_note: defaultSettings.tourDateNote,
          zelle_email: defaultSettings.zelleEmail,
          zelle_name: defaultSettings.zelleName,
          cash_app_tag: defaultSettings.cashAppTag,
          tour_date_description: defaultSettings.tourDateDescription,
          payment_instructions: defaultSettings.paymentInstructions,
          godaddy_payment_enabled: defaultSettings.godaddyPaymentEnabled,
          godaddy_pay_link: defaultSettings.godaddyPayLink,
          cash_app_enabled: defaultSettings.cashAppEnabled,
          zelle_enabled: defaultSettings.zelleEnabled
        }])

      if (insertError) {
        console.error('Error creating default settings:', insertError)
        return defaultSettings
      }

      return defaultSettings
    }

    // Convert database fields to application fields
    return {
      tourDateNote: data.tour_date_note || "",
      zelleEmail: data.zelle_email || "",
      zelleName: data.zelle_name || "",
      cashAppTag: data.cash_app_tag || "",
      tourDateDescription: data.tour_date_description || "",
      paymentInstructions: data.payment_instructions || defaultSettings.paymentInstructions,
      godaddyPaymentEnabled: data.godaddy_payment_enabled || defaultSettings.godaddyPaymentEnabled,
      godaddyPayLink: data.godaddy_pay_link || defaultSettings.godaddyPayLink,
      cashAppEnabled: data.cash_app_enabled || defaultSettings.cashAppEnabled,
      zelleEnabled: data.zelle_enabled || defaultSettings.zelleEnabled
    }
  } catch (error) {
    console.error('Error fetching settings:', error)
    return defaultSettings
  }
}

export async function updateApplicationSettings(settings: ApplicationSettings) {
  try {
    // First get the latest settings record
    const { data: latestSettings, error: fetchError } = await supabase
      .from('application_settings')
      .select('id')
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned" error
      console.error('Error fetching latest settings:', fetchError)
      throw fetchError
    }

    let updateError;
    if (latestSettings) {
      // Update existing record
      const { error } = await supabase
        .from('application_settings')
        .update({
          tour_date_note: settings.tourDateNote,
          zelle_email: settings.zelleEmail,
          zelle_name: settings.zelleName,
          cash_app_tag: settings.cashAppTag,
          tour_date_description: settings.tourDateDescription,
          payment_instructions: {
            zelle: {
              email: settings.zelleEmail,
              name: settings.zelleName
            },
            cashApp: {
              cashtag: settings.cashAppTag
            },
            applicationFee: settings.paymentInstructions.applicationFee,
            refundAmount: settings.paymentInstructions.refundAmount
          },
          godaddy_payment_enabled: settings.godaddyPaymentEnabled,
          godaddy_pay_link: settings.godaddyPayLink,
          cash_app_enabled: settings.cashAppEnabled,
          zelle_enabled: settings.zelleEnabled
        })
        .eq('id', latestSettings.id)

      updateError = error;
    } else {
      // If no record exists, create a new one
      const { error } = await supabase
        .from('application_settings')
        .insert([{
          tour_date_note: settings.tourDateNote,
          zelle_email: settings.zelleEmail,
          zelle_name: settings.zelleName,
          cash_app_tag: settings.cashAppTag,
          tour_date_description: settings.tourDateDescription,
          payment_instructions: {
            zelle: {
              email: settings.zelleEmail,
              name: settings.zelleName
            },
            cashApp: {
              cashtag: settings.cashAppTag
            },
            applicationFee: settings.paymentInstructions.applicationFee,
            refundAmount: settings.paymentInstructions.refundAmount
          },
          godaddy_payment_enabled: settings.godaddyPaymentEnabled,
          godaddy_pay_link: settings.godaddyPayLink,
          cash_app_enabled: settings.cashAppEnabled,
          zelle_enabled: settings.zelleEnabled
        }])

      updateError = error;
    }

    if (updateError) {
      console.error('Error updating settings:', updateError)
      throw updateError
    }

    // Update localStorage to ensure immediate synchronization
    localStorage.setItem('applicationSettings', JSON.stringify(settings))

    // Return the updated settings
    return settings
  } catch (error) {
    console.error('Error saving settings:', error)
    throw error
  }
}

export async function getSettings(): Promise<ApplicationSettings> {
  try {
    // First try to get from Supabase
    const { data, error } = await supabase
      .from('application_settings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Error fetching settings from Supabase:', error)
      return defaultSettings
    }

    if (!data) {
      return defaultSettings
    }

    // Convert database fields to application fields
    const settings = {
      tourDateNote: data.tour_date_note || "",
      zelleEmail: data.zelle_email || "",
      zelleName: data.zelle_name || "",
      cashAppTag: data.cash_app_tag || "",
      tourDateDescription: data.tour_date_description || "",
      paymentInstructions: {
        zelle: {
          email: data.zelle_email || data.payment_instructions?.zelle?.email || "",
          name: data.zelle_name || data.payment_instructions?.zelle?.name || ""
        },
        cashApp: {
          cashtag: data.cash_app_tag || data.payment_instructions?.cashApp?.cashtag || ""
        },
        applicationFee: data.payment_instructions?.applicationFee || 99,
        refundAmount: data.payment_instructions?.refundAmount || 75
      },
      godaddyPaymentEnabled: data.godaddy_payment_enabled ?? defaultSettings.godaddyPaymentEnabled,
      godaddyPayLink: data.godaddy_pay_link ?? defaultSettings.godaddyPayLink,
      cashAppEnabled: data.cash_app_enabled ?? defaultSettings.cashAppEnabled,
      zelleEnabled: data.zelle_enabled ?? defaultSettings.zelleEnabled
    }

    // Update localStorage with the latest settings
    localStorage.setItem('applicationSettings', JSON.stringify(settings))

    return settings
  } catch (error) {
    console.error('Error fetching settings:', error)
    return defaultSettings
  }
} 