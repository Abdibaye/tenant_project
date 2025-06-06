import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ApplicationFormData {
  // Step 1: Basic Information
  fullName: string
  email: string
  phoneNumber: string
  currentAddress: string

  // Step 2: Application Questions
  monthlyIncome: string
  annualIncome: string
  outstandingDebts: string
  missedRentPayments: string
  numberOfOccupants: string
  hasPets: string
  petDetails: string
  hasCriminalRecord: string
  criminalRecordDetails: string
  hasEvictionHistory: string
  evictionHistoryDetails: string
  hasBankruptcy: string
  bankruptcyDetails: string
  hasCosigner: string
  cosignerDetails: string
  hasRentalHistory: string
  rentalHistoryDetails: string
  hasEmploymentHistory: string
  employmentHistoryDetails: string
  hasReferences: string
  referenceDetails: string
  hasVehicle: string
  vehicleDetails: string
  hasSmoking: string
  smokingDetails: string
  hasWaterbed: string
  waterbedDetails: string
  hasAquarium: string
  aquariumDetails: string
  hasMusicalInstruments: string
  musicalInstrumentsDetails: string
  hasHomeBusiness: string
  homeBusinessDetails: string
  hasRoommates: string
  roommatesDetails: string
  hasSubletting: string
  sublettingDetails: string
  hasRentersInsurance: string
  rentersInsuranceDetails: string
  hasEmergencyContact: string
  emergencyContactDetails: string
  hasSpecialNeeds: string
  specialNeedsDetails: string
  hasServiceAnimal: string
  serviceAnimalDetails: string
  hasParkingNeeds: string
  parkingNeedsDetails: string
  hasStorageNeeds: string
  storageNeedsDetails: string
  hasMaintenanceRequests: string
  maintenanceRequestsDetails: string
  hasRenovationPlans: string
  renovationPlansDetails: string
  hasFurnitureDelivery: string
  furnitureDeliveryDetails: string
  hasMovingTruck: string
  movingTruckDetails: string
  hasStorageUnit: string
  storageUnitDetails: string
  hasOtherPets: string
  otherPetsDetails: string
  hasOtherVehicles: string
  otherVehiclesDetails: string
  hasOtherOccupants: string
  otherOccupantsDetails: string
  hasOtherIncome: string
  otherIncomeDetails: string
  hasOtherDebts: string
  otherDebtsDetails: string
  hasOtherCriminalRecord: string
  otherCriminalRecordDetails: string
  hasOtherEvictionHistory: string
  otherEvictionHistoryDetails: string
  hasOtherBankruptcy: string
  otherBankruptcyDetails: string
  hasOtherCosigner: string
  otherCosignerDetails: string
  hasOtherRentalHistory: string
  otherRentalHistoryDetails: string
  hasOtherEmploymentHistory: string
  otherEmploymentHistoryDetails: string
  hasOtherReferences: string
  otherReferencesDetails: string
  hasOtherSmoking: string
  otherSmokingDetails: string
  hasOtherWaterbed: string
  otherWaterbedDetails: string
  hasOtherAquarium: string
  otherAquariumDetails: string
  hasOtherMusicalInstruments: string
  otherMusicalInstrumentsDetails: string
  hasOtherHomeBusiness: string
  otherHomeBusinessDetails: string
  hasOtherRoommates: string
  otherRoommatesDetails: string
  hasOtherSubletting: string
  otherSublettingDetails: string
  hasOtherRentersInsurance: string
  otherRentersInsuranceDetails: string
  hasOtherEmergencyContact: string
  otherEmergencyContactDetails: string
  hasOtherSpecialNeeds: string
  otherSpecialNeedsDetails: string
  hasOtherServiceAnimal: string
  otherServiceAnimalDetails: string
  hasOtherParkingNeeds: string
  otherParkingNeedsDetails: string
  hasOtherStorageNeeds: string
  otherStorageNeedsDetails: string
  hasOtherMaintenanceRequests: string
  otherMaintenanceRequestsDetails: string
  hasOtherRenovationPlans: string
  otherRenovationPlansDetails: string
  hasOtherFurnitureDelivery: string
  otherFurnitureDeliveryDetails: string
  hasOtherMovingTruck: string
  otherMovingTruckDetails: string
  hasOtherStorageUnit: string
  otherStorageUnitDetails: string

  // Step 3: Tour Date
  tourDate: Date | null

  // Step 4: Payment
  paymentMethod: string
  receiptFile: File | null
}

interface ApplicationStore {
  formData: ApplicationFormData
  setFormData: (data: Partial<ApplicationFormData>) => void
  resetFormData: () => void
}

const initialFormData: ApplicationFormData = {
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
  numberOfOccupants: "",
  hasPets: "",
  petDetails: "",
  hasCriminalRecord: "",
  criminalRecordDetails: "",
  hasEvictionHistory: "",
  evictionHistoryDetails: "",
  hasBankruptcy: "",
  bankruptcyDetails: "",
  hasCosigner: "",
  cosignerDetails: "",
  hasRentalHistory: "",
  rentalHistoryDetails: "",
  hasEmploymentHistory: "",
  employmentHistoryDetails: "",
  hasReferences: "",
  referenceDetails: "",
  hasVehicle: "",
  vehicleDetails: "",
  hasSmoking: "",
  smokingDetails: "",
  hasWaterbed: "",
  waterbedDetails: "",
  hasAquarium: "",
  aquariumDetails: "",
  hasMusicalInstruments: "",
  musicalInstrumentsDetails: "",
  hasHomeBusiness: "",
  homeBusinessDetails: "",
  hasRoommates: "",
  roommatesDetails: "",
  hasSubletting: "",
  sublettingDetails: "",
  hasRentersInsurance: "",
  rentersInsuranceDetails: "",
  hasEmergencyContact: "",
  emergencyContactDetails: "",
  hasSpecialNeeds: "",
  specialNeedsDetails: "",
  hasServiceAnimal: "",
  serviceAnimalDetails: "",
  hasParkingNeeds: "",
  parkingNeedsDetails: "",
  hasStorageNeeds: "",
  storageNeedsDetails: "",
  hasMaintenanceRequests: "",
  maintenanceRequestsDetails: "",
  hasRenovationPlans: "",
  renovationPlansDetails: "",
  hasFurnitureDelivery: "",
  furnitureDeliveryDetails: "",
  hasMovingTruck: "",
  movingTruckDetails: "",
  hasStorageUnit: "",
  storageUnitDetails: "",
  hasOtherPets: "",
  otherPetsDetails: "",
  hasOtherVehicles: "",
  otherVehiclesDetails: "",
  hasOtherOccupants: "",
  otherOccupantsDetails: "",
  hasOtherIncome: "",
  otherIncomeDetails: "",
  hasOtherDebts: "",
  otherDebtsDetails: "",
  hasOtherCriminalRecord: "",
  otherCriminalRecordDetails: "",
  hasOtherEvictionHistory: "",
  otherEvictionHistoryDetails: "",
  hasOtherBankruptcy: "",
  otherBankruptcyDetails: "",
  hasOtherCosigner: "",
  otherCosignerDetails: "",
  hasOtherRentalHistory: "",
  otherRentalHistoryDetails: "",
  hasOtherEmploymentHistory: "",
  otherEmploymentHistoryDetails: "",
  hasOtherReferences: "",
  otherReferencesDetails: "",
  hasOtherSmoking: "",
  otherSmokingDetails: "",
  hasOtherWaterbed: "",
  otherWaterbedDetails: "",
  hasOtherAquarium: "",
  otherAquariumDetails: "",
  hasOtherMusicalInstruments: "",
  otherMusicalInstrumentsDetails: "",
  hasOtherHomeBusiness: "",
  otherHomeBusinessDetails: "",
  hasOtherRoommates: "",
  otherRoommatesDetails: "",
  hasOtherSubletting: "",
  otherSublettingDetails: "",
  hasOtherRentersInsurance: "",
  otherRentersInsuranceDetails: "",
  hasOtherEmergencyContact: "",
  otherEmergencyContactDetails: "",
  hasOtherSpecialNeeds: "",
  otherSpecialNeedsDetails: "",
  hasOtherServiceAnimal: "",
  otherServiceAnimalDetails: "",
  hasOtherParkingNeeds: "",
  otherParkingNeedsDetails: "",
  hasOtherStorageNeeds: "",
  otherStorageNeedsDetails: "",
  hasOtherMaintenanceRequests: "",
  otherMaintenanceRequestsDetails: "",
  hasOtherRenovationPlans: "",
  otherRenovationPlansDetails: "",
  hasOtherFurnitureDelivery: "",
  otherFurnitureDeliveryDetails: "",
  hasOtherMovingTruck: "",
  otherMovingTruckDetails: "",
  hasOtherStorageUnit: "",
  otherStorageUnitDetails: "",

  // Step 3
  tourDate: null,

  // Step 4
  paymentMethod: "",
  receiptFile: null,
}

export const useApplicationStore = create<ApplicationStore>()(
  persist(
    (set) => ({
      formData: initialFormData,
      setFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetFormData: () =>
        set({
          formData: initialFormData,
        }),
    }),
    {
      name: 'application-storage',
    }
  )
) 