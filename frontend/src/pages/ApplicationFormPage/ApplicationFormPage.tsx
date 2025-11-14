import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import Input from "../../components/Forms/Input";
import FileDropzone from "../../components/Forms/FileDropzone";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import { useUser } from "../../redux/hooks/useUser";
import type {
  ICreateApplicationPayload,
  IApplication,
} from "../../redux/types";
import EditDocument from "../../components/Documents/EditDocument";
import * as S from "./styles";

interface DocumentUpload {
  file: File | null;
  type: "passport" | "invitation_letter";
  error?: string;
}

const ApplicationFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { createApplication, uploadDocument, isLoading } = useApplications();
  const { currentUser } = useUser();

  const isCorporateUser = currentUser?.role === "corporate";
  const isIndividualUser = currentUser?.role === "individual";

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    passport_number: "",
    date_of_birth: "",
    phone_number: "",
    email: "",
    country: "",
    remarks: "",
  });

  const [documents, setDocuments] = useState<DocumentUpload[]>([
    { file: null, type: "passport" },
    { file: null, type: "invitation_letter" },
  ]);

  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileSelect = (
    file: File,
    type: "passport" | "invitation_letter"
  ) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.type === type ? { ...doc, file, error: "" } : doc))
    );
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    // Validate required fields
    if (!formData.first_name.trim()) {
      errors.first_name = "First name is required";
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Last name is required";
    }

    if (!formData.country) {
      errors.country = "Destination country is required";
    }

    // Validate passport document (required)
    const passportDoc = documents.find((doc) => doc.type === "passport");
    if (!passportDoc?.file) {
      errors.passport = "Passport copy is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setUploading(true);

      // Create the payload with the correct type
      const applicationData: ICreateApplicationPayload = {
        application: {
          athlete_attributes: {
            first_name: formData.first_name,
            last_name: formData.last_name,
            passport_number: formData.passport_number,
            date_of_birth: formData.date_of_birth || undefined,
            phone_number: formData.phone_number || undefined, // NEW
            email: formData.email || undefined, // NEW
          },

          country: formData.country,
          remarks: formData.remarks,
        },
      };

      console.log("Submitting application:", applicationData);

      // Create application - the action returns a promise that resolves with the action object
      const result = await createApplication(applicationData);

      if (result.type === "applications/create/rejected") {
        throw new Error(result.payload as string);
      }

      // The fulfilled action contains the application in the payload
      const application = result.payload as IApplication;
      console.log("Application created:", application);

      // Upload documents
      if (application?.id) {
        console.log("Uploading documents...");

        for (const doc of documents) {
          if (doc.file) {
            const uploadFormData = new FormData();
            uploadFormData.append("document", doc.file);
            uploadFormData.append("application_id", application.id.toString());
            uploadFormData.append("doc_type", doc.type);

            console.log(`Uploading ${doc.type}:`, doc.file.name);
            await uploadDocument(application.id, uploadFormData);
          }
        }
      }

      // Redirect to dashboard
      navigate("/dashboard", {
        state: { message: "Application submitted successfully!" },
      });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit application. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDownloadFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const link = document.createElement("a");
    link.href = url;
    link.download = file.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const isSubmitting = isLoading || uploading;

  // Get document references with proper null checking
  const passportDoc = documents.find((doc) => doc.type === "passport");
  const invitationDoc = documents.find(
    (doc) => doc.type === "invitation_letter"
  );

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
              type="text"
              label="First Name"
              value={formData.first_name}
              onChange={(value) => handleInputChange("first_name", value)}
              placeholder="Enter first name"
              required
              error={formErrors.first_name}
            />
            <Input
              type="text"
              label="Last Name"
              value={formData.last_name}
              onChange={(value) => handleInputChange("last_name", value)}
              placeholder="Enter last name"
              required
              error={formErrors.last_name}
            />
          </S.FormRow>
          <S.FormRow>
            {isIndividualUser && (
              <>
                <Input
                  type="text"
                  label="Passport Number"
                  value={formData.passport_number}
                  onChange={(value) =>
                    handleInputChange("passport_number", value)
                  }
                  placeholder="Enter passport number"
                  error={formErrors.passport_number}
                />
                <Input
                  type="date"
                  label="Date of Birth"
                  value={formData.date_of_birth}
                  onChange={(value) =>
                    handleInputChange("date_of_birth", value)
                  }
                  placeholder="Select date of birth"
                />
              </>
            )}
            <Input
              type="text"
              label="Phone Number"
              value={formData.phone_number}
              onChange={(value) => handleInputChange("phone_number", value)}
              placeholder="Enter phone number (optional)"
            />

            <Input
              type="email"
              label="Email Address"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              placeholder="Enter email (optional)"
            />
          </S.FormRow>
        </S.FormSection>

        {/* Application Details Section */}
        <S.FormSection>
          <S.SectionTitle>Application Details</S.SectionTitle>

          <Input
            type="text"
            label="Destination Country"
            value={formData.country}
            onChange={(value) => handleInputChange("country", value)}
            placeholder="Enter destination country"
            required
            error={formErrors.country}
          />

          <S.TextAreaContainer>
            <S.TextAreaLabel>Competition Description *</S.TextAreaLabel>
            <S.TextArea
              value={formData.remarks}
              onChange={(e) => handleInputChange("remarks", e.target.value)}
              placeholder="Describe the competition, event, or purpose of travel..."
              rows={4}
            />
            <S.TextAreaHelp>
              Please provide details about the competition, tournament, or event
              you are attending
            </S.TextAreaHelp>
          </S.TextAreaContainer>
        </S.FormSection>

        {/* Documents Section */}
        <S.FormSection>
          <S.SectionTitle>Required Documents</S.SectionTitle>
          <S.DocumentsInfo>
            <p>
              <strong>Required:</strong> Passport copy
            </p>
            <p>
              <strong>Optional:</strong> Invitation letter
            </p>
            <p>Supported formats: PDF, JPG, JPEG, PNG (Max 5MB each)</p>
          </S.DocumentsInfo>

          {/* Passport Upload (Required) */}
          <S.DocumentUploadSection>
            <S.DocumentUploadHeader>
              <S.DocumentTitle>Passport Copy *</S.DocumentTitle>
              <S.DocumentRequired>Required</S.DocumentRequired>
            </S.DocumentUploadHeader>
            <S.DocumentDescription>
              Upload a clear copy of the passport information page
            </S.DocumentDescription>

            {/* Show FileDropzone only if no passport file is selected */}
            {!passportDoc?.file ? (
              <>
                <FileDropzone
                  onFileSelect={(file) => handleFileSelect(file, "passport")}
                  accept=".pdf,.jpg,.jpeg,.png"
                  maxSize={5 * 1024 * 1024} // 5MB
                  label="Drop passport copy here or click to browse"
                />
                {formErrors.passport && (
                  <S.DocumentError>{formErrors.passport}</S.DocumentError>
                )}
              </>
            ) : (
              <EditDocument
                fileName={passportDoc.file.name}
                fileUrl={URL.createObjectURL(passportDoc.file)}
                onReplace={(file) => handleFileSelect(file, "passport")}
                onDownload={() => handleDownloadFile(passportDoc.file!)}
                type="passport"
              />
            )}
          </S.DocumentUploadSection>

          {/* Invitation Letter Upload (Optional) */}
          <S.DocumentUploadSection>
            <S.DocumentUploadHeader>
              <S.DocumentTitle>Invitation Letter</S.DocumentTitle>
              <S.DocumentOptional>Optional</S.DocumentOptional>
            </S.DocumentUploadHeader>
            <S.DocumentDescription>
              Upload invitation letter from the host organization (if available)
            </S.DocumentDescription>

            {/* Show FileDropzone only if no invitation letter file is selected */}
            {!invitationDoc?.file ? (
              <FileDropzone
                onFileSelect={(file) =>
                  handleFileSelect(file, "invitation_letter")
                }
                accept=".pdf,.jpg,.jpeg,.png"
                maxSize={5 * 1024 * 1024} // 5MB
                label="Drop invitation letter here or click to browse"
              />
            ) : (
              <EditDocument
                fileName={invitationDoc.file.name}
                fileUrl={URL.createObjectURL(invitationDoc.file)}
                onReplace={(file) =>
                  handleFileSelect(file, "invitation_letter")
                }
                onDownload={() => handleDownloadFile(invitationDoc.file!)}
                type="invitation_letter"
              />
            )}
          </S.DocumentUploadSection>
        </S.FormSection>

        <S.FormActions>
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/dashboard")}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={isSubmitting}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </S.FormActions>
      </S.FormContainer>
    </S.ApplicationFormContainer>
  );
};

export default ApplicationFormPage;
