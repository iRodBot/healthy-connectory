
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Heart, CheckCircle } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { MedicalHistoryForm } from "@/components/forms/MedicalHistoryForm";
import { AdditionalInfoForm } from "@/components/forms/AdditionalInfoForm";
import { FormData, initialFormData } from "@/types/form";

const Index = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConditionToggle = (condition: string) => {
    setFormData((prev) => {
      const updatedConditions = prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter((c) => c !== condition)
        : [...prev.medicalConditions, condition];

      return {
        ...prev,
        medicalConditions: updatedConditions,
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      toast({
        title: "Please fill in all fields",
        description: "All contact information is required",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success!",
      description: "Your information has been submitted successfully.",
      action: (
        <div className="h-8 w-8 text-green-500">
          <CheckCircle className="h-full w-full" />
        </div>
      ),
    });
    setFormData(initialFormData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-primary/5">
      <div className="section-padding">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-4">
            <Heart className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Your Health Journey Starts Here</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Take the first step towards better health by sharing your information with us.
            We're here to support your wellness journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="form-container"
        >
          <form onSubmit={handleSubmit} className="space-y-12">
            <ContactForm formData={formData} handleInputChange={handleInputChange} />
            <MedicalHistoryForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleConditionToggle={handleConditionToggle}
            />
            <AdditionalInfoForm formData={formData} handleInputChange={handleInputChange} />

            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-primary">
                Submit
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
