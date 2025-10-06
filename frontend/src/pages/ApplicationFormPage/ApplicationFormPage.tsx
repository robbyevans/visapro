import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import Input from "../../components/Forms/Input";
import Select from "../../components/Forms/Select";
import FileDropzone from "../../components/Forms/FileDropzone";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import * as S from "./styles";

const ApplicationFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { createApplication, uploadDocument, isLoading } = useApplications();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    passport_number: "",
    date_of_birth: "",
    country: "",
    remarks: "",
  });
  const [documents, setDocuments] = useState<File[]>([]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileSelect = (file: File) => {
    setDocuments((prev) => [...prev, file]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Prepare application data
      const applicationData = {
        athlete: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          passport_number: formData.passport_number,
          date_of_birth: formData.date_of_birth || undefined,
        },
        country: formData.country,
        remarks: formData.remarks,
      };

      // Create application
      const application = await createApplication(applicationData);

      // Upload documents
      if (documents.length > 0 && application?.id) {
        for (const file of documents) {
          const formData = new FormData();
          formData.append("document", file);
          formData.append("application_id", application.id.toString());
          formData.append("doc_type", "passport");
          await uploadDocument(application.id, formData);
        }
      }

      // Redirect to dashboard
      navigate("/dashboard", {
        state: { message: "Application submitted successfully!" },
      });
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  const countryOptions = [
    { value: "usa", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "canada", label: "Canada" },
    { value: "australia", label: "Australia" },
    { value: "germany", label: "Germany" },
    { value: "france", label: "France" },
  ];

  if (isLoading) {
    return (
      <S.ApplicationFormContainer>
        <Spinner size="lg" />
      </S.ApplicationFormContainer>
    );
  }

  return (
    <S.ApplicationFormContainer>
      <S.FormHeader>
        <S.BackButton onClick={() => navigate("/dashboard")}>
          ← Back to Dashboard
        </S.BackButton>
        <S.FormTitle>New Visa Application</S.FormTitle>
      </S.FormHeader>

      <S.FormContainer onSubmit={handleSubmit}>
        {/* Athlete Information Section */}
        <S.FormSection>
          <S.SectionTitle>Athlete Information</S.SectionTitle>

          <S.FormRow>
            <Input
              label="First Name"
              value={formData.first_name}
              onChange={(value) => handleInputChange("first_name", value)}
              placeholder="Enter first name"
              required
            />
            <Input
              label="Last Name"
              value={formData.last_name}
              onChange={(value) => handleInputChange("last_name", value)}
              placeholder="Enter last name"
              required
            />
          </S.FormRow>
          <S.FormRow>
            <Input
              label="Passport Number"
              value={formData.passport_number}
              onChange={(value) => handleInputChange("passport_number", value)}
              placeholder="Enter passport number"
              required
            />
            <Input
              label="Date of Birth"
              type="date"
              value={formData.date_of_birth}
              onChange={(value) => handleInputChange("date_of_birth", value)}
              placeholder="Select date of birth"
            />
          </S.FormRow>
        </S.FormSection>

        {/* Application Details Section */}
        <S.FormSection>
          <S.SectionTitle>Application Details</S.SectionTitle>

          <Select
            label="Destination Country"
            value={formData.country}
            onChange={(value) => handleInputChange("country", value)}
            options={countryOptions}
            placeholder="Select destination country"
            required
          />

          <Input
            label="Remarks (Optional)"
            value={formData.remarks}
            onChange={(value) => handleInputChange("remarks", value)}
            placeholder="Any additional notes or remarks"
          />
        </S.FormSection>

        {/* Documents Section */}
        <S.FormSection>
          <S.SectionTitle>Required Documents</S.SectionTitle>
          <S.DocumentsInfo>
            Please upload passport copy and any supporting documents
          </S.DocumentsInfo>

          <FileDropzone
            onFileSelect={handleFileSelect}
            accept=".pdf,.jpg,.jpeg,.png"
            maxSize={5 * 1024 * 1024} // 5MB
            label="Drop documents here or click to browse"
          />

          {documents.length > 0 && (
            <S.UploadedFiles>
              <h4>Uploaded Files:</h4>
              {documents.map((file, index) => (
                <S.FileItem key={index}>
                  {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                </S.FileItem>
              ))}
            </S.UploadedFiles>
          )}
        </S.FormSection>

        <S.FormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isLoading}
            disabled={isLoading}
          >
            Submit Application
          </Button>
        </S.FormActions>
      </S.FormContainer>
    </S.ApplicationFormContainer>
  );
};

export default ApplicationFormPage;
