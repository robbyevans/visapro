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
  type: "passport" | "invitation_letter" | "supporting_doc";
  error?: string;
}

type AthleteApplication = {
  first_name: string;
  last_name: string;
  passport_number: string;
  date_of_birth: string;
  phone_number: string;
  email: string;
  country: string;
  proposed_travel_date: string;
  remarks: string;
  documents: DocumentUpload[];
};

const initialFormState: AthleteApplication = {
  first_name: "",
  last_name: "",
  passport_number: "",
  date_of_birth: "",
  phone_number: "",
  email: "",
  country: "",
  proposed_travel_date: "",
  remarks: "",
  documents: [
    { file: null, type: "passport" },
    { file: null, type: "invitation_letter" },
    { file: null, type: "supporting_doc" },
  ],
};

const ApplicationFormPage: React.FC = () => {
  const navigate = useNavigate();
  const { createApplication, uploadDocument, isLoading } = useApplications();
  const { currentUser } = useUser();

  const isCorporateUser = currentUser?.role === "corporate";
  const isIndividual = currentUser?.role === "individual"

  // State for the list of applications ready to be submitted
  const [applications, setApplications] = useState<AthleteApplication[]>([]);
  // State for the form currently being filled
  const [currentFormData, setCurrentFormData] = useState<AthleteApplication>(initialFormState);

  const [uploading, setUploading] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof Omit<AthleteApplication, 'documents'>, value: string) => {
    setCurrentFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleFileSelect = (file: File, type: "passport" | "invitation_letter" | "supporting_doc") => {
    setCurrentFormData((prev) => ({
      ...prev,
      documents: prev.documents.map((doc) =>
        doc.type === type ? { ...doc, file, error: "" } : doc
      ),
    }));
    if (formErrors.passport) {
      setFormErrors((prev) => ({ ...prev, passport: "" }));
    }
  };

  const validateData = (data: AthleteApplication): boolean => {
    const errors: Record<string, string> = {};
    if (!data.first_name.trim()) errors.first_name = "First name is required";
    if (!data.last_name.trim()) errors.last_name = "Last name is required";
    if (!data.country) errors.country = "Destination country is required";


    if(isIndividual){
      const passportDoc = data.documents.find((doc) => doc.type === "passport");
      if (!passportDoc?.file) errors.passport = "Passport copy is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddMore = () => {
    if (!validateData(currentFormData)) {
      return;
    }
    setApplications((prev) => [...prev, currentFormData]);
    setCurrentFormData(initialFormState); //clear the form for the next entry
  };

  const handleRemoveApplication = (indexToRemove: number) => {
    setApplications((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let applicationsToSubmit = [...applications];
    const isCurrentFormPopulated = currentFormData.first_name.trim() !== "" || currentFormData.last_name.trim() !== "";

    //for corporate user, if the current form is filled, add it to the list before submitting
    if (isCorporateUser && isCurrentFormPopulated) {
      if (validateData(currentFormData)) {
        applicationsToSubmit.push(currentFormData);
      } else {
        return; 
      }
    }

    //for individual user
    if (!isCorporateUser) {
       if (validateData(currentFormData)) {
        applicationsToSubmit = [currentFormData];
       } else {
        return;
       }
    }

    if (applicationsToSubmit.length === 0) {
        setFormErrors({ general: "Please add at least one application to submit." });
        return;
    }

    setUploading(true);
    try {
      for (const appData of applicationsToSubmit) {
        const payload: ICreateApplicationPayload = {
          application: {
            athlete_attributes: {
              first_name: appData.first_name,
              last_name: appData.last_name,
              passport_number: appData.passport_number || undefined,
              date_of_birth: appData.date_of_birth || undefined,
              phone_number: appData.phone_number || undefined,
              email: appData.email || undefined,
            },
            country: appData.country,
            proposed_travel_date: appData.proposed_travel_date,
            remarks: appData.remarks,
          },
        };

        const result = await createApplication(payload);
        if (result.type === "applications/create/rejected") {
          throw new Error(result.payload as string);
        }
        const application = result.payload as IApplication;

        if (application?.id) {
          for (const doc of appData.documents) {
            if (doc.file) {
              const uploadFormData = new FormData();
              uploadFormData.append("document", doc.file);
              uploadFormData.append("application_id", application.id.toString());
              uploadFormData.append("doc_type", doc.type);
              await uploadDocument(application.id, uploadFormData);
            }
          }
        }
      }
      navigate("/dashboard", { state: { message: "Application(s) submitted successfully!" } });
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Failed to submit one or more applications. Please try again.");
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
  const { documents } = currentFormData;
  const passportDoc = documents.find((doc) => doc.type === "passport");
  const invitationDoc = documents.find((doc) => doc.type === "invitation_letter");
  const supportingDoc = documents.find((doc) => doc.type === "supporting_doc");

  if (isLoading) {
    return <S.ApplicationFormContainer><Spinner size="lg" /></S.ApplicationFormContainer>;
  }

  return (
    <S.ApplicationFormContainer>
      <S.FormHeader>
        <S.BackButton onClick={() => navigate("/dashboard")}>← Back to Dashboard</S.BackButton>
        <S.FormTitle>New Visa Application</S.FormTitle>
      </S.FormHeader>

      {isCorporateUser && applications.length > 0 && (
        <S.FormSection>
          <S.SectionTitle>Added Applications ({applications.length})</S.SectionTitle>
          <div style={{ width: "100%" }}>
            {applications.map((app, index) => (
              <div
                key={index}
                style={{ padding: "8px 12px", marginBottom: "8px", border: "1px solid #ddd", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}
              >
                <span>{app.first_name} {app.last_name} - {app.country}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveApplication(index)}
                  style={{ background: "transparent", border: "none", color: "#d00", cursor: "pointer", fontWeight: 600 }}
                  disabled={isSubmitting}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </S.FormSection>
      )}

      <S.FormContainer onSubmit={handleSubmit}>
        <S.FormSection>
           <S.SectionTitle>{isCorporateUser ? `Athlete Information (${applications.length + 1})` : 'Athlete Information'}</S.SectionTitle>
          <S.FormRow>
            <Input type="text" label="First Name" value={currentFormData.first_name} placeholder="Enter first name" onChange={(value) => handleInputChange("first_name", value)} required error={formErrors.first_name} />
            <Input type="text" label="Last Name" value={currentFormData.last_name} placeholder="Enter last name" onChange={(value) => handleInputChange("last_name", value)} required error={formErrors.last_name} />
          </S.FormRow>
          <S.FormRow>
            <Input type="text" label="Phone Number" value={currentFormData.phone_number} onChange={(value) => handleInputChange("phone_number", value)} placeholder="Enter phone number (optional)" />
          </S.FormRow>
        </S.FormSection>

        <S.FormSection>
          <S.SectionTitle>Application Details</S.SectionTitle>
          <Input type="text" label="Destination Country" value={currentFormData.country} onChange={(value) => handleInputChange("country", value)} placeholder="Enter destination country" required error={formErrors.country} />
          <S.TextAreaContainer>
            <S.TextAreaLabel>Competition Description *</S.TextAreaLabel>
            <S.TextAreaHelp>Please provide details about the competition, tournament, or event you are attending</S.TextAreaHelp>
            <S.TextArea value={currentFormData.remarks} onChange={(e) => handleInputChange("remarks", e.target.value)} placeholder="Describe the competition, event, or purpose of travel..." rows={4} />
          </S.TextAreaContainer>
          <Input type="date" label="Proposed Date Of Travel" value={currentFormData.proposed_travel_date} onChange={(value) => handleInputChange("proposed_travel_date", value)} required placeholder="Select date of travel" />
        </S.FormSection>

        <S.FormSection>
          <S.SectionTitle>Required Documents</S.SectionTitle>
          <S.DocumentsInfo>
            <p><strong>Required:</strong> Passport copy</p>
            <p><strong>Optional:</strong> Invitation letter</p>
            <p>Supported formats: PDF, JPG, JPEG, PNG (Max 5MB each)</p>
          </S.DocumentsInfo>

          <S.DocumentUploadSection>
            <S.DocumentUploadHeader>
              <S.DocumentTitle>Passport Copy</S.DocumentTitle>
              { isIndividual &&
                <S.DocumentRequired>Required</S.DocumentRequired>
              }
            </S.DocumentUploadHeader>
            {!passportDoc?.file ? (
              <>
                <FileDropzone onFileSelect={(file) => handleFileSelect(file, "passport")} accept=".pdf,.jpg,.jpeg,.png" maxSize={5 * 1024 * 1024} label="Drop passport copy here or click to browse" />
                {formErrors.passport && <S.DocumentError>{formErrors.passport}</S.DocumentError>}
              </>
            ) : (
              <EditDocument fileName={passportDoc.file.name} fileUrl={URL.createObjectURL(passportDoc.file)} onReplace={(file) => handleFileSelect(file, "passport")} onDownload={() => handleDownloadFile(passportDoc.file!)} type="passport" />
            )}
          </S.DocumentUploadSection>

          <S.DocumentUploadSection>
            <S.DocumentUploadHeader>
              <S.DocumentTitle>Invitation Letter</S.DocumentTitle>
              <S.DocumentOptional>Optional</S.DocumentOptional>
            </S.DocumentUploadHeader>
            {!invitationDoc?.file ? (
              <FileDropzone onFileSelect={(file) => handleFileSelect(file, "invitation_letter")} accept=".pdf,.jpg,.jpeg,.png" maxSize={5 * 1024 * 1024} label="Drop invitation letter here or click to browse" />
            ) : (
              <EditDocument fileName={invitationDoc.file.name} fileUrl={URL.createObjectURL(invitationDoc.file)} onReplace={(file) => handleFileSelect(file, "invitation_letter")} onDownload={() => handleDownloadFile(invitationDoc.file!)} type="invitation_letter" />
            )}
          </S.DocumentUploadSection>

          {isCorporateUser && (
            <S.DocumentUploadSection>
              <S.DocumentUploadHeader>
                <S.DocumentTitle>Supporting Document</S.DocumentTitle>
                <S.DocumentOptional>Optional</S.DocumentOptional>
              </S.DocumentUploadHeader>
              {!supportingDoc?.file ? (
                <FileDropzone onFileSelect={(file) => handleFileSelect(file, "supporting_doc")} accept=".pdf,.jpg,.jpeg,.png" maxSize={5 * 1024 * 1024} label="Drop supporting document here or click to browse" />
              ) : (
                <EditDocument fileName={supportingDoc.file.name} fileUrl={URL.createObjectURL(supportingDoc.file)} onReplace={(file) => handleFileSelect(file, "supporting_doc")} onDownload={() => handleDownloadFile(supportingDoc.file!)} type="supporting_doc" />
              )}
            </S.DocumentUploadSection>
          )}
        </S.FormSection>
        {formErrors.general && <p style={{color: 'red', textAlign: 'center'}}>{formErrors.general}</p>}

        <S.FormActions>
          <Button type="button" variant="secondary" onClick={() => navigate("/dashboard")} disabled={isSubmitting}>Cancel</Button>
          {isCorporateUser && (
             <Button type="button" variant="secondary" onClick={handleAddMore} disabled={isSubmitting}>Add More</Button>
          )}
          <Button type="submit" variant="primary" loading={isSubmitting} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : `Submit Application${isCorporateUser ? '(s)' : ''}`}
          </Button>
        </S.FormActions>
      </S.FormContainer>
    </S.ApplicationFormContainer>
  );
};

export default ApplicationFormPage;