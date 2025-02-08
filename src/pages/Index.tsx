
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Heart, ArrowRight, CheckCircle } from "lucide-react";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  medicalConditions: string;
  medications: string;
  allergies: string;
}

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  medicalConditions: "",
  medications: "",
  allergies: "",
};

const Index = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step === 1 && (!formData.firstName || !formData.lastName || !formData.email || !formData.phone)) {
      toast({
        title: "Please fill in all fields",
        description: "All contact information is required",
        variant: "destructive",
      });
      return;
    }
    if (step < 3) setStep((prev) => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    setStep(1);
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
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className={`h-3 w-3 rounded-full ${
                  num <= step ? "bg-primary" : "bg-gray-200"
                } transition-all duration-300`}
              />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="input-field"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-field"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="input-field"
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold mb-6">Medical History</h2>
                <textarea
                  name="medicalConditions"
                  placeholder="Please list any medical conditions"
                  value={formData.medicalConditions}
                  onChange={handleInputChange}
                  className="input-field min-h-[100px]"
                />
                <textarea
                  name="medications"
                  placeholder="Current medications"
                  value={formData.medications}
                  onChange={handleInputChange}
                  className="input-field min-h-[100px]"
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-semibold mb-6">Additional Information</h2>
                <textarea
                  name="allergies"
                  placeholder="Please list any allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className="input-field min-h-[100px]"
                />
              </motion.div>
            )}

            <div className="flex justify-end pt-4">
              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex items-center"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              ) : (
                <button type="submit" className="btn-primary">
                  Submit
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
