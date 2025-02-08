
import { motion } from "framer-motion";
import { FormData } from "@/types/form";

interface AdditionalInfoFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const AdditionalInfoForm = ({ formData, handleInputChange }: AdditionalInfoFormProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-gray-200">Additional Information</h2>
      <textarea
        name="allergies"
        placeholder="Please list any allergies"
        value={formData.allergies}
        onChange={handleInputChange}
        className="input-field min-h-[100px]"
      />
    </motion.div>
  );
};
