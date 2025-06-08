import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FormData {
  // Step 1 - Basic Information
  fullName: string
  email: string
  phoneNumber: string
  currentAddress: string

  // Step 2 - Financial Information
  monthlyIncome: string
  annualIncome: string
  outstandingDebts: string
  missedRentPayments: string
  landlordReferences: string
  hasEvictionHistory: string
  hasBankruptcy: string

  // Step 3 - Personal Information
  numberOfOccupants: string
  hasChildren: string
  plannedStayDuration: string
  hasPets: string
  petDetails: string
  hasSmoking: string
  repairHandling: string
  moveInDate: string
  needsFlexibility: string
  hasConsent: string

  // Step 4 - Tour Schedule
  tourDate: string
  tourTime: string

  // Step 5 - Payment
  paymentMethod: string
  paymentReceipt: any
}

interface ApplicationStore {
  formData: FormData
  updateFormData: (data: Partial<FormData>) => void
  setFormData: (data: FormData) => void
  clearFormData: () => void
}

const initialFormData: FormData = {
  // Step 1
  fullName: "",
  email: "",
  phoneNumber: "",
  currentAddress: "",

  // Step 2
  monthlyIncome: "",
  annualIncome: "",
  outstandingDebts: "",
  missedRentPayments: "",
  landlordReferences: "",
  hasEvictionHistory: "",
  hasBankruptcy: "",

  // Step 3
  numberOfOccupants: "",
  hasChildren: "",
  plannedStayDuration: "",
  hasPets: "",
  petDetails: "",
  hasSmoking: "",
  repairHandling: "",
  moveInDate: "",
  needsFlexibility: "",
  hasConsent: "",

  // Step 4
  tourDate: "",
  tourTime: "",

  // Step 5
  paymentMethod: "",
  paymentReceipt: null
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data }
        })),
      setFormData: (data) =>
        set(() => ({
          formData: data
        })),
      clearFormData: () =>
        set(() => ({
          formData: initialFormData
        }))
    }),
    {
      name: "application-storage"
    }
  )
) 