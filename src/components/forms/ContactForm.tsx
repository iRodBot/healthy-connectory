
import { motion } from "framer-motion";
import { FormData } from "@/types/form";

interface ContactFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const ContactForm = ({ formData, handleInputChange }: ContactFormProps) => {
  return (
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
  );
};
