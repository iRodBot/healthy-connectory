import { motion } from "framer-motion";
import { FormData } from "@/types/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, CheckCircle, ArrowLeft } from "lucide-react";

interface ReviewScreenProps {
  formData: FormData;
  onEdit: () => void;
  onFinalSubmit: () => void;
  onBack: () => void;
}

export const ReviewScreen = ({ formData, onEdit, onFinalSubmit, onBack }: ReviewScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-gray-900">Review Your Information</h2>
        <Button variant="outline" onClick={onBack} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Form
        </Button>
      </div>
      
      <p className="text-gray-600 mb-6">
        Please review all your information below before final submission. You can edit any section if needed.
      </p>

      {/* Contact Information Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Contact Information</CardTitle>
          <Button variant="ghost" size="sm" onClick={onEdit} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">First Name</label>
              <p className="text-gray-900 font-medium">{formData.firstName || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Last Name</label>
              <p className="text-gray-900 font-medium">{formData.lastName || "Not provided"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Email</label>
              <p className="text-gray-900 font-medium">{formData.email || "Not provided"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Phone</label>
              <p className="text-gray-900 font-medium">{formData.phone || "Not provided"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical History Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Medical History</CardTitle>
          <Button variant="ghost" size="sm" onClick={onEdit} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <label className="text-sm font-medium text-gray-500">Medical Conditions</label>
            {formData.medicalConditions.length > 0 ? (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.medicalConditions.map((condition) => (
                  <span
                    key={condition}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {condition}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-900 font-medium">No conditions selected</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500">Current Medications</label>
            <p className="text-gray-900 font-medium whitespace-pre-wrap">
              {formData.medications || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Information Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-semibold">Additional Information</CardTitle>
          <Button variant="ghost" size="sm" onClick={onEdit} className="flex items-center gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div>
            <label className="text-sm font-medium text-gray-500">Allergies</label>
            <p className="text-gray-900 font-medium whitespace-pre-wrap">
              {formData.allergies || "Not provided"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Final Submission Button */}
      <div className="flex justify-center pt-6">
        <Button 
          onClick={onFinalSubmit} 
          size="lg"
          className="flex items-center gap-2 px-8 py-3 text-lg"
        >
          <CheckCircle className="h-5 w-5" />
          Confirm & Submit
        </Button>
      </div>
    </motion.div>
  );
};