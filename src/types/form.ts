
export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  medicalConditions: string[];
  medications: string;
  allergies: string;
}

export const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  medicalConditions: [],
  medications: "",
  allergies: "",
};

export const commonIllnesses = [
  "Hypertension",
  "Diabetes",
  "Asthma",
  "Arthritis",
  "Depression",
  "Anxiety",
  "Heart Disease",
  "Chronic Pain",
  "Migraines",
  "Sleep Disorders",
];
