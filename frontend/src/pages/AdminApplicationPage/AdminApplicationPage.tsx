import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useApplications } from "../../redux/hooks/useApplications";
import { useUser } from "../../redux/hooks/useUser";
import Spinner from "../../components/Spinner/Spinner";
import * as S from "./styles";
import type { IDocument } from "../../redux/types";

const AdminApplicationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    currentApplication,
    fetchApplication,
    updateApplication,
    uploadDocument,
    isLoading,
  } = useApplications();
  const { currentUser } = useUser();

  const [remarks, setRemarks] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (id) {
      fetchApplication(parseInt(id));
    }
  }, [id, fetchApplication]);

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/dashboard");
    }
  };

  const handleStatusUpdate = async (status: string) => {
    if (!id) return;

    const updates: any = { status };
    if (remarks) updates.remarks = remarks;

    await updateApplication(parseInt(id), updates);

    // Refresh application data
    fetchApplication(parseInt(id));
  };

  const handleVisaUpload = async () => {
    if (!id || !selectedFile) return;

    const formData = new FormData();
    formData.append("document", selectedFile);
    formData.append("application_id", id);
    formData.append("doc_type", "visa");

    await uploadDocument(parseInt(id), formData);
    setSelectedFile(null);

    // Refresh application data
    fetchApplication(parseInt(id));
  };

  const handleDownloadDocument = async (doc: IDocument, fileName: string) => {
    try {
      // Use download_url if available, otherwise fall back to file_url
      const downloadUrl = doc.download_url || doc.file_url;

      if (!downloadUrl) {
        console.error("No valid download URL for document:", doc);
        return;
      }

      const response = await fetch(downloadUrl, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = globalThis.document.createElement("a");
      link.href = url;
      link.download = fileName || `document_${doc.id}`;
      globalThis.document.body.appendChild(link);
      link.click();
      globalThis.document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      // Fallback: try to open the file_url in a new tab
      const fileUrl = doc.file_url;
      if (fileUrl) {
        window.open(fileUrl, "_blank");
      }
    }
  };

  const handlePreviewDocument = (fileUrl: string) => {
    // Open in new tab for preview
    window.open(fileUrl, "_blank", "noopener,noreferrer");
  };

  const getFileNameFromUrl = (url: string, docType: string, docId: number) => {
    if (!url) return `${docType}_${docId}`;

    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      const fileName = pathname.split("/").pop() || `${docType}_${docId}`;
      return fileName;
    } catch {
      return `${docType}_${docId}`;
    }
  };

  if (!currentUser || currentUser.role !== "admin") {
    return <div>Access denied. Admin only.</div>;
  }

  if (isLoading || !currentApplication) {
    return (
      <S.AdminApplicationContainer>
        <S.LoadingContainer>
          <Spinner size="lg" />
        </S.LoadingContainer>
      </S.AdminApplicationContainer>
    );
  }

  const userDocuments = currentApplication?.documents.filter(
    (doc) => doc.doc_type !== "visa"
  );
  const visaDocuments = currentApplication?.documents.filter(
    (doc) => doc.doc_type === "visa"
  );

  return (
    <S.AdminApplicationContainer>
      <S.Header>
        <S.BackButton onClick={handleBack}>← Back</S.BackButton>
        <S.PageTitle>
          Application #{currentApplication.id} -{" "}
          {currentApplication.athlete?.first_name}{" "}
          {currentApplication.athlete?.last_name}
        </S.PageTitle>
      </S.Header>

      <S.Content>
        <S.Section>
          <S.SectionTitle>Application Details</S.SectionTitle>
          <S.DetailGrid>
            <S.DetailItem>
              <S.DetailLabel>Applicant</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.first_name}{" "}
                {currentApplication.athlete?.last_name}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Passport Number</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.passport_number || "N/A"}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Phone Number</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.phone_number || "N/A"}
              </S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>Email</S.DetailLabel>
              <S.DetailValue>
                {currentApplication.athlete?.email || "N/A"}
              </S.DetailValue>
            </S.DetailItem>

            <S.DetailItem>
              <S.DetailLabel>Destination Country</S.DetailLabel>
              <S.DetailValue>{currentApplication.country}</S.DetailValue>
            </S.DetailItem>
            <S.TravelDateItem>
              <S.DetailLabel $noColor={true}>
                Proposed Travel Date
              </S.DetailLabel>
              <S.DetailValue $noColor={true}>
                {currentApplication.proposed_travel_date
                  ? new Date(
                      currentApplication.proposed_travel_date
                    ).toLocaleDateString()
                  : "N/A"}
              </S.DetailValue>
            </S.TravelDateItem>
            <S.DetailItem>
              <S.DetailLabel>Status</S.DetailLabel>
              <S.StatusBadge status={currentApplication.status}>
                {currentApplication.status}
              </S.StatusBadge>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Submitted Date</S.DetailLabel>
              <S.DetailValue>
                {new Date(currentApplication.created_at).toLocaleDateString()}
              </S.DetailValue>
            </S.DetailItem>
            <S.DetailItem>
              <S.DetailLabel>Last Updated</S.DetailLabel>
              <S.DetailValue>
                {new Date(currentApplication.updated_at).toLocaleDateString()}
              </S.DetailValue>
            </S.DetailItem>
          </S.DetailGrid>

          {currentApplication.remarks && (
            <S.Remarks>
              <strong>Admin Remarks:</strong> {currentApplication.remarks}
            </S.Remarks>
          )}
        </S.Section>

        <S.Section>
          <S.SectionTitle>Documents</S.SectionTitle>
          <S.DocumentsGrid>
            <S.DocumentSection>
              <S.DocumentSectionTitle>
                Applicant Documents
              </S.DocumentSectionTitle>
              <S.DocumentList>
                {userDocuments.length > 0 ? (
                  userDocuments.map((doc) => (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>{doc.doc_type}</S.DocumentType>
                        <S.DocumentName>
                          {getFileNameFromUrl(
                            doc.file_url,
                            doc.doc_type,
                            doc.id
                          )}
                        </S.DocumentName>
                      </S.DocumentInfo>
                      <S.DocumentActions>
                        <S.PreviewButton
                          onClick={() => handlePreviewDocument(doc.file_url)}
                        >
                          Preview
                        </S.PreviewButton>
                        <S.DownloadButton
                          onClick={() =>
                            handleDownloadDocument(
                              doc,
                              getFileNameFromUrl(
                                doc.file_url,
                                doc.doc_type,
                                doc.id
                              )
                            )
                          }
                        >
                          Download
                        </S.DownloadButton>
                      </S.DocumentActions>
                    </S.DocumentItem>
                  ))
                ) : (
                  <S.NoDocuments>No applicant documents uploaded</S.NoDocuments>
                )}
              </S.DocumentList>
            </S.DocumentSection>

            <S.DocumentSection>
              <S.DocumentSectionTitle>Visa Documents</S.DocumentSectionTitle>
              <S.UploadControls>
                <S.FileInput
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  accept=".pdf,.jpg,.jpeg,.png"
                />
                <S.UploadButton
                  onClick={handleVisaUpload}
                  disabled={!selectedFile}
                >
                  Upload Visa
                </S.UploadButton>
              </S.UploadControls>

              <S.DocumentList>
                {visaDocuments.length > 0 ? (
                  visaDocuments.map((doc) => (
                    <S.DocumentItem key={doc.id}>
                      <S.DocumentInfo>
                        <S.DocumentType>visa</S.DocumentType>
                        <S.DocumentName>
                          {getFileNameFromUrl(
                            doc.file_url,
                            doc.doc_type,
                            doc.id
                          )}
                        </S.DocumentName>
                      </S.DocumentInfo>
                      <S.DocumentActions>
                        <S.PreviewButton
                          onClick={() => handlePreviewDocument(doc.file_url)}
                        >
                          Preview
                        </S.PreviewButton>
                        <S.DownloadButton
                          onClick={() =>
                            handleDownloadDocument(
                              doc,
                              getFileNameFromUrl(
                                doc.file_url,
                                doc.doc_type,
                                doc.id
                              )
                            )
                          }
                        >
                          Download
                        </S.DownloadButton>
                      </S.DocumentActions>
                    </S.DocumentItem>
                  ))
                ) : (
                  <S.NoDocuments>No visa documents uploaded yet</S.NoDocuments>
                )}
              </S.DocumentList>
            </S.DocumentSection>
          </S.DocumentsGrid>
        </S.Section>

        <S.Section>
          <S.SectionTitle>Admin Actions</S.SectionTitle>
          <S.AdminActions>
            <S.RemarksInput>
              <S.RemarksLabel>Remarks:</S.RemarksLabel>
              <S.TextArea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                placeholder="Add remarks for the applicant..."
                rows={3}
              />
            </S.RemarksInput>

            <S.StatusButtons>
              <S.StatusButton
                variant="approve"
                onClick={() => handleStatusUpdate("approved")}
              >
                Approve Application
              </S.StatusButton>
              <S.StatusButton
                variant="reject"
                onClick={() => handleStatusUpdate("rejected")}
              >
                Reject Application
              </S.StatusButton>
              <S.StatusButton
                variant="complete"
                onClick={() => handleStatusUpdate("completed")}
                disabled={visaDocuments.length === 0}
              >
                Mark as Completed
              </S.StatusButton>
            </S.StatusButtons>
          </S.AdminActions>
        </S.Section>
      </S.Content>
    </S.AdminApplicationContainer>
  );
};

export default AdminApplicationPage;
