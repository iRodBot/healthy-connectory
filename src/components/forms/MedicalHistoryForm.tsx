
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { FormData, commonIllnesses } from "@/types/form";

interface MedicalHistoryFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleConditionToggle: (condition: string) => void;
}

export const MedicalHistoryForm = ({
  formData,
  handleInputChange,
  handleConditionToggle,
}: MedicalHistoryFormProps) => {
  return (
    <motion.div
      initial={{ x: 20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-6">Medical History</h2>
      <div className="space-y-4">
        <label className="text-sm font-medium text-gray-700 mb-2 block">
          Select any conditions you have:
        </label>
        <div className="grid grid-cols-2 gap-4">
          {commonIllnesses.map((illness) => (
            <label
              key={illness}
              className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
            >
              <Checkbox
                checked={formData.medicalConditions.includes(illness)}
                onCheckedChange={() => handleConditionToggle(illness)}
                className="data-[state=checked]:bg-primary"
              />
              <span className="text-sm">{illness}</span>
            </label>
          ))}
        </div>
      </div>
      <textarea
        name="medications"
        placeholder="Current medications"
        value={formData.medications}
        onChange={handleInputChange}
        className="input-field min-h-[100px]"
      />
    </motion.div>
  );
};
